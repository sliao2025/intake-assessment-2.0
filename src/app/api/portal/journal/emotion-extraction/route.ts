import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { journalId } = body;

    // Validate inputs
    if (
      !journalId ||
      typeof journalId !== "string" ||
      journalId.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Journal ID is required" },
        { status: 400 }
      );
    }

    const EMOTION_EXTRACTOR_URL = "http://localhost:8081";

    const response = await fetch(`${EMOTION_EXTRACTOR_URL}/extract`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ journalEntryId: journalId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Emotion Extraction Service failed with status ${response.status}: ${errorText}`
      );
      throw new Error(
        `Failed to extract emotions: ${response.status} ${errorText}`
      );
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Emotion Extraction POST error:", error);
    return NextResponse.json(
      { error: "Failed to extract emotions" },
      { status: 500 }
    );
  }
}
