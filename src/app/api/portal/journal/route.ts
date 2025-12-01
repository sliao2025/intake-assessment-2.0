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
        sentimentResult: null,
        updatedAt: new Date(),
      },
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

/**
 * PATCH /api/portal/journal?id={entryId}
 *
 * Updates a journal entry's content for the current user
 * Only allows updates to entries owned by the user
 */
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get("id");

    if (!entryId || typeof entryId !== "string") {
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { content } = body;

    // Validate content
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

    // Verify the entry exists and belongs to the user
    const existingEntry = await prisma.journalEntry.findUnique({
      where: { id: entryId },
      select: { userId: true },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: "Journal entry not found" },
        { status: 404 }
      );
    }

    if (existingEntry.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized to update this entry" },
        { status: 403 }
      );
    }

    // Update the entry
    const updatedEntry = await prisma.journalEntry.update({
      where: { id: entryId },
      data: {
        content: content.trim(),
        updatedAt: new Date(),
      },
      select: {
        id: true,
        content: true,
        mood: true,
        sentimentResult: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      entry: updatedEntry,
    });
  } catch (error) {
    console.error("Journal PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update journal entry" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/portal/journal?id={entryId}
 *
 * Deletes a journal entry for the current user
 * Only allows deletion of entries owned by the user
 */
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const entryId = searchParams.get("id");

    if (!entryId || typeof entryId !== "string") {
      return NextResponse.json(
        { error: "Entry ID is required" },
        { status: 400 }
      );
    }

    // Verify the entry exists and belongs to the user
    const entry = await prisma.journalEntry.findUnique({
      where: { id: entryId },
      select: { userId: true },
    });

    if (!entry) {
      return NextResponse.json(
        { error: "Journal entry not found" },
        { status: 404 }
      );
    }

    if (entry.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete this entry" },
        { status: 403 }
      );
    }

    // Delete the entry
    await prisma.journalEntry.delete({
      where: { id: entryId },
    });

    return NextResponse.json({
      success: true,
      message: "Journal entry deleted successfully",
    });
  } catch (error) {
    console.error("Journal DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete journal entry" },
      { status: 500 }
    );
  }
}
