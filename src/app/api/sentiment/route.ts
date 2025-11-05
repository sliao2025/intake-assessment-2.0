// app/api/sentiment/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    const userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch the current profile
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
      select: { json: true },
    });

    if (!existingProfile) {
      return NextResponse.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    // Forward the request to the sentiment analysis service
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
      console.error("Sentiment API error:", errorText);
      return NextResponse.json(
        { success: false, error: "Failed to fetch sentiment data" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Save the sentiment analysis results to the database
    if (data.success && data.result) {
      const profileJson = existingProfile.json as any;

      // Add sentimentAnalysis to the profile JSON
      const updatedJson = {
        ...profileJson,
        sentimentAnalysis: data.result,
      };

      // Update the database
      await prisma.profile.update({
        where: { userId },
        data: { json: updatedJson },
      });

      console.log(`Sentiment analysis saved for user ${userId}`);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Sentiment analysis error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
