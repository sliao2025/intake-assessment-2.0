import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

/**
 * PATCH /api/profile/update-field
 *
 * Updates a SINGLE field in the profile JSON using optimistic concurrency control.
 * This prevents race conditions when multiple updates happen simultaneously
 * (e.g., user uploading audio while transcription service is running).
 *
 * Uses Prisma's `update` with `where` clause to ensure atomic updates.
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await request.json();
    const { fieldName, fieldValue } = body;

    if (!fieldName) {
      return NextResponse.json(
        { error: "fieldName is required" },
        { status: 400 }
      );
    }

    console.log(
      `[update-field] Updating ${fieldName} for user ${userId}`,
      fieldValue
    );

    // Use a transaction with retry logic for optimistic concurrency control
    const MAX_RETRIES = 3;
    let attempt = 0;
    let lastError: Error | null = null;

    while (attempt < MAX_RETRIES) {
      try {
        const result = await prisma.$transaction(async (tx) => {
          // Fetch current profile
          const profile = await tx.profile.findUnique({
            where: { userId },
          });

          if (!profile) {
            throw new Error(`Profile not found for user: ${userId}`);
          }

          const profileData = profile.json as any;

          // Handle nested followupQuestions fields
          if (fieldName.startsWith("followupQuestions.")) {
            const parts = fieldName.split(".");
            // e.g., "followupQuestions.question1.answer"
            if (parts.length >= 3) {
              const questionKey = parts[1]; // "question1", "question2", etc.
              const answerKey = parts[2]; // "answer"

              console.log(
                `[update-field] Updating nested field: ${questionKey}.${answerKey}`
              );

              if (!profileData.followupQuestions) {
                console.log(
                  `[update-field] Creating followupQuestions structure`
                );
                profileData.followupQuestions = {};
              }
              if (!profileData.followupQuestions[questionKey]) {
                console.log(`[update-field] Creating ${questionKey} structure`);
                profileData.followupQuestions[questionKey] = {};
              }
              if (!profileData.followupQuestions[questionKey][answerKey]) {
                console.log(
                  `[update-field] Creating ${questionKey}.${answerKey} structure`
                );
                profileData.followupQuestions[questionKey][answerKey] = {};
              }

              console.log(
                `[update-field] Before merge:`,
                JSON.stringify(
                  profileData.followupQuestions[questionKey][answerKey],
                  null,
                  2
                )
              );
              console.log(
                `[update-field] Merging fieldValue:`,
                JSON.stringify(fieldValue, null, 2)
              );

              // Merge field value, preserving existing fields (like transcription)
              profileData.followupQuestions[questionKey][answerKey] = {
                ...profileData.followupQuestions[questionKey][answerKey],
                ...fieldValue,
              };

              console.log(
                `[update-field] After merge:`,
                JSON.stringify(
                  profileData.followupQuestions[questionKey][answerKey],
                  null,
                  2
                )
              );
            }
          } else if (fieldName === "followupQuestions") {
            // Special case: Replace entire followupQuestions object
            // This is used when setting initial generated questions
            console.log(
              `[update-field] Replacing entire followupQuestions object`
            );
            profileData.followupQuestions = fieldValue;
          } else {
            // Standard top-level field update
            if (!profileData[fieldName]) {
              profileData[fieldName] = {};
            }

            // Merge field value, preserving existing fields (like audio.transcription)
            profileData[fieldName] = {
              ...profileData[fieldName],
              ...fieldValue,
            };
          }

          // Update with optimistic lock check
          const updated = await tx.profile.update({
            where: {
              userId,
              // Optimistic lock: ensure version hasn't changed
              updatedAt: profile.updatedAt,
            },
            data: {
              json: profileData,
              updatedAt: new Date(),
            },
          });

          return updated;
        });

        console.log(
          `[update-field] Successfully updated ${fieldName} for user ${userId}`
        );
        return NextResponse.json({ ok: true, profile: result });
      } catch (error: any) {
        lastError = error;

        // Check if it's a concurrency error (record was modified)
        if (
          error.code === "P2025" || // Record not found (was deleted or modified)
          error.message?.includes("Record to update not found")
        ) {
          attempt++;
          console.log(
            `[update-field] Concurrency conflict, retrying (${attempt}/${MAX_RETRIES})...`
          );

          // Exponential backoff
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, attempt) * 100)
          );
          continue;
        }

        // Other errors should not retry
        throw error;
      }
    }

    // If we exhausted retries
    throw new Error(
      `Failed to update after ${MAX_RETRIES} retries: ${lastError?.message}`
    );
  } catch (error: any) {
    console.error("[update-field] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update field" },
      { status: 500 }
    );
  }
}
