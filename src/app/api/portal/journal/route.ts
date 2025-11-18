import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * GET /api/portal/journal
 *
 * Retrieves all journal entries for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const entries = await prisma.journalEntry.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        content: true,
        mood: true,
        sentimentResult: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Journal GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch journal entries" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/portal/journal
 *
 * Creates a new journal entry with mood tracking
 * Sentiment analysis is performed asynchronously
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.clinicId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { content, mood } = body;

    // Validate inputs
    if (
      !content ||
      typeof content !== "string" ||
      content.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    if (!mood || mood < 1 || mood > 5) {
      return NextResponse.json(
        { error: "Mood must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Create journal entry
    const entry = await prisma.journalEntry.create({
      data: {
        userId: session.user.id,
        clinicId: session.user.clinicId,
        content: content.trim(),
        mood,
        // Sentiment analysis will be added asynchronously
        sentimentResult: Prisma.DbNull,
      } as Prisma.JournalEntryUncheckedCreateInput,
      select: {
        id: true,
        content: true,
        mood: true,
        createdAt: true,
      },
    });

    // TODO: Trigger sentiment analysis job asynchronously
    // This would call your Python sentiment analyzer and update the entry
    // Example: await analyzeSentiment(entry.id, entry.content);

    return NextResponse.json({
      success: true,
      entry,
    });
  } catch (error) {
    console.error("Journal POST error:", error);
    return NextResponse.json(
      { error: "Failed to create journal entry" },
      { status: 500 }
    );
  }
}
