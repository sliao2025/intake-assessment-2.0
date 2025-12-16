import { NextRequest, NextResponse } from "next/server";
import { Storage } from "@google-cloud/storage";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
});

const bucketName =
  process.env.GCS_BUCKET_NAME || "intake-assessment-audio-files";

/**
 * Extract field name from GCS fileName
 * Example: "userId/cultureContext-1234567890.webm" -> "cultureContext"
 * Example: "userId/followupQuestion1-1234567890.webm" -> "followupQuestions.question1.answer"
 */
function extractFieldNameFromFileName(fileName: string): string | null {
  const parts = fileName.split("/");
  if (parts.length !== 2) return null;

  const fileNamePart = parts[1]; // e.g., "cultureContext-1234567890.webm"
  const match = fileNamePart.match(/^(.+)-\d+\.webm$/);
  if (!match) return null;

  const fieldName = match[1]; // e.g., "cultureContext" or "followupQuestion1"

  // Convert backend field names back to frontend format
  if (fieldName.startsWith("followupQuestion")) {
    const questionMatch = fieldName.match(/followupQuestion(\d)/);
    if (questionMatch) {
      return `followupQuestions.question${questionMatch[1]}.answer`;
    }
  }

  return fieldName;
}

/**
 * Clean up orphaned audio reference from database
 */
async function cleanupOrphanedReference(
  userId: string,
  fieldName: string
): Promise<void> {
  console.log(
    `[audio/stream] Cleaning up orphaned reference for user ${userId}, field ${fieldName}`
  );

  try {
    // Fetch current profile
    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: { json: true },
    });

    if (!profile) {
      console.warn(`[audio/stream] Profile not found for user ${userId}`);
      return;
    }

    const profileData = profile.json as any;

    // Navigate to the field and remove the audio reference
    const fieldParts = fieldName.split(".");
    let current = profileData;

    // Navigate to parent object
    for (let i = 0; i < fieldParts.length - 1; i++) {
      if (!current[fieldParts[i]]) {
        console.log(
          `[audio/stream] Field path not found: ${fieldParts.slice(0, i + 1).join(".")}`
        );
        return;
      }
      current = current[fieldParts[i]];
    }

    const lastKey = fieldParts[fieldParts.length - 1];

    // Check if the field exists and has audio
    if (current[lastKey] && typeof current[lastKey] === "object") {
      if (current[lastKey].audio) {
        console.log(
          `[audio/stream] Removing orphaned audio reference from ${fieldName}`
        );
        delete current[lastKey].audio;

        // Update the database
        await prisma.profile.update({
          where: { userId },
          data: { json: profileData },
        });

        console.log(
          `[audio/stream] Successfully cleaned up orphaned reference for ${fieldName}`
        );
      } else {
        console.log(`[audio/stream] No audio reference found in ${fieldName}`);
      }
    }
  } catch (error) {
    console.error(
      `[audio/stream] Error cleaning up orphaned reference:`,
      error
    );
  }
}

/**
 * Stream audio files from GCS with ownership verification.
 * This proxies the file through our API, ensuring only the owner can access it.
 * No signed URLs needed - we verify userId matches the file path.
 *
 * If a file is not found in GCS but is referenced in the database,
 * automatically clean up the orphaned reference.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    console.log("[audio/stream] Request received");
    console.log("[audio/stream] Session user:", session?.user?.email);

    if (!session?.user) {
      console.warn("[audio/stream] No session found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    console.log("[audio/stream] Requested fileName:", fileName);

    if (!fileName) {
      return NextResponse.json(
        { error: "fileName parameter required" },
        { status: 400 }
      );
    }

    // Security check: verify the file belongs to this user
    // The fileName format is: userId/fieldName-timestamp.webm
    const userId = (session.user as any).id;

    console.log("[audio/stream] Session userId:", userId);
    console.log(
      "[audio/stream] File path starts with:",
      fileName.split("/")[0]
    );

    if (!fileName.startsWith(`${userId}/`)) {
      console.warn(
        `[audio/stream] Unauthorized access attempt: user ${userId} tried to access ${fileName}`
      );
      return NextResponse.json(
        { error: "Unauthorized to access this file" },
        { status: 403 }
      );
    }

    // Stream the file from GCS
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    // Check if file exists
    const [exists] = await file.exists();

    console.log("[audio/stream] File exists:", exists);

    if (!exists) {
      console.error(`[audio/stream] File not found in GCS: ${fileName}`);

      // Extract field name and clean up orphaned reference
      const fieldName = extractFieldNameFromFileName(fileName);
      if (fieldName) {
        console.log(
          `[audio/stream] Detected orphaned reference, cleaning up field: ${fieldName}`
        );
        await cleanupOrphanedReference(userId, fieldName);

        // Return a special response indicating cleanup was performed
        return NextResponse.json(
          {
            error: "File not found",
            cleaned: true,
            message:
              "Audio file was missing from storage. Database reference has been cleaned up.",
          },
          { status: 404 }
        );
      }

      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Get file metadata
    const [metadata] = await file.getMetadata();

    console.log("[audio/stream] File metadata:", {
      contentType: metadata.contentType,
      size: metadata.size,
      timeCreated: metadata.timeCreated,
    });

    // Download file content
    const [content] = await file.download();

    console.log(
      `[audio/stream] Successfully streaming ${fileName} (${content.length} bytes) for user ${userId}`
    );

    // Return the audio file with proper headers
    return new NextResponse(content as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": metadata.contentType || "audio/webm",
        "Content-Length": String(content.length),
        "Cache-Control": "private, max-age=3600", // Cache for 1 hour
        "Content-Disposition": `inline; filename="${fileName.split("/").pop()}"`,
        // Security headers
        "X-Content-Type-Options": "nosniff",
        // CORS headers (if needed for audio playback)
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });
  } catch (error: any) {
    console.error("[audio/stream] Error:", error);
    console.error("[audio/stream] Error stack:", error.stack);
    return NextResponse.json(
      { error: error.message || "Failed to stream audio" },
      { status: 500 }
    );
  }
}
