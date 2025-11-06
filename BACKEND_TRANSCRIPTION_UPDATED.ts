/**
 * UPDATED Core Audio Transcription Logic with Retry Support
 * Handles downloading audio from GCS and running Python transcription
 * INCLUDES OPTIMISTIC CONCURRENCY CONTROL TO PREVENT RACE CONDITIONS
 */

import { Storage } from "@google-cloud/storage";
import { prisma } from "../../shared/db/client";
import { spawn } from "child_process";
import * as path from "path";
import type {
  AudioTranscriptionResult,
  AudioFieldType,
  ProfileJson,
} from "../../shared/types/index";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
});

const bucketName =
  process.env.GCS_BUCKET_NAME || "intake-assessment-audio-files";

/**
 * Main transcription processing function
 * Downloads audio from GCS, transcribes it, and updates the profile WITH RETRY LOGIC
 */
export async function processTranscription(
  fileName: string,
  userId: string,
  fieldType: AudioFieldType,
  bucket: string = bucketName
): Promise<AudioTranscriptionResult> {
  console.log(`[Transcribe] ===== START PROCESSING =====`);
  console.log(`[Transcribe] File: ${fileName}`);
  console.log(`[Transcribe] User: ${userId}`);
  console.log(`[Transcribe] Field: ${fieldType}`);
  console.log(`[Transcribe] Bucket: ${bucket}`);
  console.log(`[Transcribe] ================================`);

  // Download audio from Cloud Storage
  console.log(`[Transcribe] Downloading from gs://${bucket}/${fileName}...`);
  const bucketObj = storage.bucket(bucket);
  const file = bucketObj.file(fileName);
  const [audioBuffer] = await file.download();
  console.log(`[Transcribe] Downloaded audio: ${audioBuffer.length} bytes`);

  // Get file metadata from GCS
  console.log(`[Transcribe] Fetching file metadata from GCS...`);
  const [metadata] = await file.getMetadata();
  const uploadedAt = String(
    metadata.metadata?.uploadedAt ||
      metadata.timeCreated ||
      new Date().toISOString()
  );
  console.log(`[Transcribe] File uploaded at: ${uploadedAt}`);

  // Get file extension
  const fileExtension = path.extname(fileName) || ".webm";

  // Transcribe the audio using Python
  console.log("[Transcribe] Starting transcription...");
  const transcript = await transcribeAudio(audioBuffer, fileExtension);
  console.log(
    `[Transcribe] Transcription complete: "${transcript.transcription?.text?.substring(
      0,
      50
    )}..."`
  );

  // Update profile in Cloud SQL with RETRY LOGIC
  console.log(`[Transcribe] Updating database for ${userId}/${fieldType}...`);
  await updateProfileWithTranscriptRetry(
    userId,
    fieldType,
    transcript,
    fileName,
    uploadedAt
  );
  console.log(`[Transcribe] ===== COMPLETED for ${userId}/${fieldType} =====`);

  return transcript;
}

/**
 * Transcribe audio by piping it to Python script
 * (No changes needed here)
 */
export function transcribeAudio(
  audioBuffer: Buffer,
  fileExtension: string
): Promise<AudioTranscriptionResult> {
  return new Promise((resolve, reject) => {
    const pythonPath = process.env.PYTHON_PATH || "python3";

    // In production (Docker), the Python script is at /app/functions/audio-transcription/
    // In development, need to point to source directory since .py files aren't in dist
    const scriptPath =
      process.env.NODE_ENV === "production"
        ? path.join(
            "/app",
            "functions",
            "audio-transcription",
            "audio_transcription.py"
          )
        : path.join(
            __dirname,
            "../../../functions/audio-transcription/audio_transcription.py"
          );

    console.log(
      `[Python] Running: ${pythonPath} ${scriptPath} --stdin ${fileExtension}`
    );
    console.log(
      `[Python] Script exists:`,
      require("fs").existsSync(scriptPath)
    );

    // Spawn Python process
    const pythonProcess = spawn(pythonPath, [
      scriptPath,
      "--stdin",
      fileExtension,
    ]);

    let stdoutData = "";
    let stderrData = "";

    // Collect stdout (JSON result)
    pythonProcess.stdout.on("data", (data) => {
      stdoutData += data.toString();
    });

    // Collect stderr (logs)
    pythonProcess.stderr.on("data", (data) => {
      const message = data.toString();
      console.log(`[Python] ${message.trim()}`);
      stderrData += message;
    });

    // Handle process completion
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        reject(
          new Error(`Python process exited with code ${code}\n${stderrData}`)
        );
        return;
      }

      try {
        const result = JSON.parse(stdoutData);
        resolve(result);
      } catch (error) {
        reject(new Error(`Failed to parse Python output: ${stdoutData}`));
      }
    });

    // Handle process errors
    pythonProcess.on("error", (error) => {
      reject(new Error(`Failed to start Python process: ${error.message}`));
    });

    // Write audio data to stdin
    pythonProcess.stdin.write(audioBuffer);
    pythonProcess.stdin.end();
  });
}

/**
 * ✅ NEW: Update profile JSON with RETRY LOGIC for concurrent updates
 *
 * Uses optimistic concurrency control to handle race conditions when:
 * - User is recording multiple fields simultaneously
 * - Frontend is saving metadata while backend is adding transcription
 *
 * Strategy:
 * 1. Fetch current profile with updatedAt timestamp
 * 2. Modify ONLY the specific field being transcribed
 * 3. Update with WHERE clause that checks updatedAt hasn't changed
 * 4. If conflict detected (P2025 error), retry with exponential backoff
 * 5. Maximum 5 retries before failing
 */
async function updateProfileWithTranscriptRetry(
  userId: string,
  fieldType: AudioFieldType,
  transcript: AudioTranscriptionResult,
  fileName: string,
  uploadedAt: string
): Promise<void> {
  const MAX_RETRIES = 5;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      console.log(
        `[DB] Update attempt ${attempt + 1}/${MAX_RETRIES} for ${userId}/${fieldType}`
      );

      await prisma.$transaction(async (tx) => {
        // Fetch current profile
        const profile = await tx.profile.findUnique({
          where: { userId },
        });

        if (!profile) {
          throw new Error(`Profile not found for user: ${userId}`);
        }

        // Parse existing data
        const profileData = profile.json as ProfileJson;

        // Construct the proxy URL for the audio file
        const proxyUrl = `/api/upload/audio/stream?fileName=${encodeURIComponent(
          fileName
        )}`;

        // Build complete audio object with ALL 6 fields
        const completeAudioData = {
          url: proxyUrl,
          fileName: fileName,
          uploadedAt: uploadedAt,
          transcription: transcript.transcription?.text,
          chunks: transcript.transcription?.chunks,
          transcribedAt: new Date().toISOString(),
        };

        // Handle followupQuestion fields specially
        if (fieldType.startsWith("followupQuestion")) {
          const questionNum = fieldType.replace("followupQuestion", "");
          const questionKey = `question${questionNum}`;

          console.log(
            `[DB] Updating followupQuestions.${questionKey}.answer.audio`
          );

          // Ensure nested structure exists
          if (!profileData.followupQuestions) {
            profileData.followupQuestions = {};
          }
          if (!profileData.followupQuestions[questionKey]) {
            profileData.followupQuestions[questionKey] = { answer: {} };
          }
          if (!profileData.followupQuestions[questionKey].answer) {
            profileData.followupQuestions[questionKey].answer = {};
          }

          // ✅ MERGE with existing audio data (preserves any fields set by frontend)
          profileData.followupQuestions[questionKey].answer.audio = {
            ...profileData.followupQuestions[questionKey].answer.audio,
            ...completeAudioData,
          };
        } else {
          // Standard fields (storyNarrative, goals, livingSituation, cultureContext)
          console.log(`[DB] Updating ${fieldType}.audio`);

          if (!profileData[fieldType]) {
            profileData[fieldType] = {};
          }

          // ✅ MERGE with existing audio data (preserves any fields set by frontend)
          profileData[fieldType]!.audio = {
            ...profileData[fieldType]!.audio,
            ...completeAudioData,
          };
        }

        // ✅ OPTIMISTIC LOCK: Update only if updatedAt hasn't changed
        await tx.profile.update({
          where: {
            userId,
            updatedAt: profile.updatedAt, // 🔒 This ensures no concurrent modifications
          },
          data: {
            json: profileData,
            updatedAt: new Date(),
          },
        });

        console.log(
          `[DB] Successfully saved transcription for ${fieldType} (attempt ${
            attempt + 1
          })`
        );
      });

      // ✅ Success - exit retry loop
      return;
    } catch (error: any) {
      lastError = error;

      // Check if it's a concurrency error (record was modified by another process)
      if (
        error.code === "P2025" || // Prisma error: Record to update not found
        error.message?.includes("Record to update not found")
      ) {
        console.log(
          `[DB] ⚠️  Concurrency conflict detected - another process modified the profile`
        );
        console.log(
          `[DB] Retrying in ${Math.pow(2, attempt) * 100}ms... (${
            attempt + 1
          }/${MAX_RETRIES})`
        );

        // Exponential backoff: 100ms, 200ms, 400ms, 800ms, 1600ms
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 100)
        );

        continue; // Retry
      }

      // Other errors should not retry
      console.error(`[DB] Non-retryable error:`, error);
      throw error;
    }
  }

  // ❌ If we exhausted all retries
  throw new Error(
    `[DB] Failed to update profile after ${MAX_RETRIES} retries for ${userId}/${fieldType}: ${lastError?.message}`
  );
}
