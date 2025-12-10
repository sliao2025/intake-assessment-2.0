// app/api/insights/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";

/**
 * POST /api/insights
 * Triggers both sentiment analysis and summarization for the user's profile
 * This is a fire-and-forget endpoint that runs both analyses in parallel
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    console.log("[Insights] Starting request for userId:", userId);

    if (!userId) {
      console.log("[Insights] Unauthorized - no userId in session");
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Run both sentiment analysis and summarization in parallel
    console.log(
      "[Insights] Triggering sentiment analysis and summarization in parallel"
    );

    // Get intake analysis service URL from environment
    const intakeAnalysisUrl = process.env.INTAKE_ANALYSIS_URL;

    if (!intakeAnalysisUrl) {
      console.error("[Insights] INTAKE_ANALYSIS_URL not configured");
      return NextResponse.json(
        {
          success: false,
          error: "INTAKE_ANALYSIS_URL not configured",
          sentiment: { success: false, error: "Service URL not configured" },
          summary: { success: false, error: "Service URL not configured" },
        },
        { status: 500 }
      );
    }

    // Build API endpoints
    const sentimentUrl = intakeAnalysisUrl.includes("/api/sentiment")
      ? intakeAnalysisUrl
      : `${intakeAnalysisUrl}/api/sentiment`;
    const summarizeUrl = intakeAnalysisUrl.includes("/api/summarize")
      ? intakeAnalysisUrl
      : `${intakeAnalysisUrl}/api/summarize`;

    // Get API key from environment
    const apiKey = process.env.INTAKE_ANALYSIS_API_KEY?.trim() || "";

    if (!apiKey) {
      console.error("[Insights] INTAKE_ANALYSIS_API_KEY not configured");
      return NextResponse.json(
        {
          success: false,
          error: "INTAKE_ANALYSIS_API_KEY not configured",
          sentiment: { success: false, error: "API key not configured" },
          summary: { success: false, error: "API key not configured" },
        },
        { status: 500 }
      );
    }

    console.log(
      `[Insights] Calling sentiment: ${sentimentUrl}, summarize: ${summarizeUrl}`
    );

    const [sentimentResponse, summaryResponse] = await Promise.allSettled([
      // Sentiment Analysis
      fetch(sentimentUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ userId }),
      }),

      // Summarization
      fetch(summarizeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ userId }),
      }),
    ]);

    // Process sentiment analysis result
    let sentimentData = null;
    let sentimentError = null;

    if (sentimentResponse.status === "fulfilled") {
      const response = sentimentResponse.value;
      if (response.ok) {
        sentimentData = await response.json();
        console.log(
          "[Insights] Sentiment analysis completed:",
          sentimentData.success ? "Success" : "Failed"
        );
      } else {
        const errorText = await response.text();
        sentimentError = `Sentiment analysis failed: ${response.status} ${errorText}`;
        console.error("[Insights]", sentimentError);
      }
    } else {
      sentimentError = `Sentiment analysis error: ${sentimentResponse.reason}`;
      console.error("[Insights]", sentimentError);
    }

    // Process summarization result
    let summaryData = null;
    let summaryError = null;

    if (summaryResponse.status === "fulfilled") {
      const response = summaryResponse.value;
      if (response.ok) {
        summaryData = await response.json();
        console.log(
          "[Insights] Summarization completed:",
          summaryData.success ? "Success" : "Failed"
        );

        // Save the summary to the database if successful
        if (summaryData.success && summaryData.summary) {
          try {
            const existingProfile = await prisma.profile.findUnique({
              where: { userId },
              select: { json: true },
            });

            if (existingProfile) {
              const profileJson = existingProfile.json as any;

              // Add summary to the profile JSON
              const updatedJson = {
                ...profileJson,
                summary: summaryData.summary,
              };

              // Update the database
              await prisma.profile.update({
                where: { userId },
                data: { json: updatedJson },
              });

              console.log(`[Insights] Summary saved for user ${userId}`);
            }
          } catch (dbError) {
            console.error("[Insights] Failed to save summary to DB:", dbError);
          }
        }
      } else {
        const errorText = await response.text();
        summaryError = `Summarization failed: ${response.status} ${errorText}`;
        console.error("[Insights]", summaryError);
      }
    } else {
      summaryError = `Summarization error: ${summaryResponse.reason}`;
      console.error("[Insights]", summaryError);
    }

    // Return combined results
    const overallSuccess =
      (sentimentData?.success || false) && (summaryData?.success || false);

    console.log(
      `[Insights] Completed - Sentiment: ${sentimentData?.success ? "✓" : "✗"}, Summary: ${summaryData?.success ? "✓" : "✗"}`
    );

    return NextResponse.json({
      success: overallSuccess,
      sentiment: sentimentData
        ? { success: sentimentData.success, data: sentimentData }
        : { success: false, error: sentimentError },
      summary: summaryData
        ? { success: summaryData.success, data: summaryData }
        : { success: false, error: summaryError },
    });
  } catch (error: any) {
    console.error("[Insights] Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
