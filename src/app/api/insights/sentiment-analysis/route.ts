// app/api/insights/sentiment-analysis/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

interface SentimentResult {
  average_score: number;
  breakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  sentences: Array<{
    field: string;
    label: string;
    score: number;
    scores: {
      positive: number;
      neutral: number;
      negative: number;
    };
    sentence: string;
  }>;
  total_sentences: number;
}

/**
 * POST /api/insights/sentiment-analysis
 * Performs sentiment analysis on a journal entry's content
 * Body: { journalId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log("[Sentiment Analysis] Starting request for userId:", userId);

    if (!userId) {
      console.log("[Sentiment Analysis] Unauthorized - no userId in session");
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { journalId } = body;

    if (!journalId) {
      return NextResponse.json(
        { success: false, error: "journalId is required" },
        { status: 400 }
      );
    }

    // Fetch the journal entry
    const journalEntry = await prisma.journalEntry.findFirst({
      where: {
        id: journalId,
        userId: userId,
      },
      select: {
        id: true,
        content: true,
      },
    });

    if (!journalEntry) {
      return NextResponse.json(
        { success: false, error: "Journal entry not found" },
        { status: 404 }
      );
    }

    console.log(
      "[Sentiment Analysis] Analyzing journal entry:",
      journalId,
      "content length:",
      journalEntry.content.length
    );

    // Call the sentiment analysis service with the journal content
    const sentimentResponse = await fetch(
      "https://sentiment-analysis-b5ikba4x4q-uk.a.run.app/analyze-text",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: journalEntry.content,
          field: "journal",
        }),
      }
    );

    if (!sentimentResponse.ok) {
      const errorText = await sentimentResponse.text();
      console.error(
        "[Sentiment Analysis] Service error:",
        sentimentResponse.status,
        errorText
      );
      return NextResponse.json(
        {
          success: false,
          error: `Sentiment analysis failed: ${sentimentResponse.status}`,
        },
        { status: 500 }
      );
    }

    const jsonResponse = await sentimentResponse.json();
    const sentimentData = jsonResponse.result || jsonResponse;

    console.log(
      "[Sentiment Analysis] Result - average_score:",
      sentimentData.average_score,
      "breakdown:",
      sentimentData.breakdown
    );

    // Save the sentiment result to the journal entry
    await prisma.journalEntry.update({
      where: { id: journalId },
      data: {
        sentimentResult: sentimentData,
      },
    });

    console.log(
      "[Sentiment Analysis] Saved to database for journal entry:",
      journalId
    );

    return NextResponse.json({
      success: true,
      data: sentimentData,
    });
  } catch (error: any) {
    console.error("[Sentiment Analysis] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
