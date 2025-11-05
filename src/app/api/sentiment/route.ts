// app/api/sentiment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

    // Forward the request to the sentiment analysis service
    console.log("[Sentiment Analysis] Forwarding request to external service");
    const response = await fetch(
      "https://sentiment-analysis-b5ikba4x4q-uk.a.run.app/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        "[Sentiment Analysis] External API error:",
        response.status,
        errorText
      );
      return NextResponse.json(
        { success: false, error: "Failed to fetch sentiment data" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      "[Sentiment Analysis] Successfully received response:",
      data.success ? "Success" : "Failed"
    );

    // The sentiment analysis service handles saving to the database
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("[Sentiment Analysis] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
