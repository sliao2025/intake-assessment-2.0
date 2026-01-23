import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";

/**
 * GET /api/portal/dashboard
 *
 * Aggregates dashboard data for the current user:
 * - Assessment completion stats
 * - Recent assessment results with trends
 * - Current mood from latest journal entry
 * - Symptom severity metrics
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Get total available assessments (this could be dynamic based on user's profile)
    const totalAssessments = 14; // Example: PHQ-9, GAD-7, CRAFFT, ASRS-5, etc.

    // Get completed assessments count
    const completedAssessments = await prisma.assessmentResponse.count({
      where: { userId },
    });

    // Get recent assessments with scores
    const recentAssessments = await prisma.assessmentResponse.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 3,
      select: {
        assessmentType: true,
        totalScore: true,
        completedAt: true,
      },
    });

    // Format recent assessments with mock trend data
    const formattedRecent = recentAssessments.map((assessment) => ({
      name: formatAssessmentName(assessment.assessmentType),
      score: `${assessment.totalScore || 0}/27`,
      change: -3, // TODO: Calculate actual change from previous assessment
      date: assessment.completedAt.toISOString().split("T")[0],
    }));

    // Get most recent journal entry for mood
    const latestJournal = await prisma.journalEntry.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        mood: true,
        createdAt: true,
      },
    });

    const recentJournalEntries = await prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        content: true,
        mood: true,
        createdAt: true,
        sentimentResult: true,
      },
    });

    const totalJournalEntries = await prisma.journalEntry.count({
      where: { userId },
    });

    const moodLabels = ["Very Low", "Low", "Stable", "Good", "Very Good"];
    const currentMood = latestJournal
      ? moodLabels[latestJournal.mood - 1] || "Not set"
      : "Not set";

    const lastUpdated = latestJournal
      ? formatDate(latestJournal.createdAt)
      : "Never";

    // Calculate symptom severity (example using most recent PHQ-9 score)
    const latestPhq9 = await prisma.assessmentResponse.findFirst({
      where: {
        userId,
        assessmentType: "phq9",
      },
      orderBy: { completedAt: "desc" },
      select: { totalScore: true },
    });

    const severityPercentage = latestPhq9
      ? Math.round((latestPhq9.totalScore / 27) * 100)
      : 0;

    const severityLevel =
      severityPercentage < 20
        ? "Minimal"
        : severityPercentage < 40
          ? "Mild"
          : severityPercentage < 60
            ? "Moderate"
            : "Severe";

    // Compile response
    const dashboardData = {
      assessments: {
        completed: completedAssessments,
        total: totalAssessments,
        recent: formattedRecent,
      },
      mood: {
        current: currentMood,
        lastUpdated,
      },
      severity: {
        percentage: severityPercentage,
        level: severityLevel,
      },
      trends: {
        // TODO: Implement trend calculation from historical data
        phq9: {
          current: latestPhq9?.totalScore || 0,
          change: -3,
          direction: "down",
        },
        gad7: { current: 8, change: -2, direction: "down" },
        sleep: { current: 6.5, change: 1.5, direction: "up" },
      },
      journal: {
        recent: recentJournalEntries.map((entry) => ({
          ...entry,
          contentSnippet:
            entry.content.length > 100
              ? entry.content.substring(0, 100) + "..."
              : entry.content,
        })),
        total: totalJournalEntries,
      },
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to load dashboard data" },
      { status: 500 }
    );
  }
}

// Helper functions
function formatAssessmentName(type: string): string {
  const names: Record<string, string> = {
    phq9: "PHQ-9",
    gad7: "GAD-7",
    cssrs: "C-SSRS",
    snap: "SNAP-IV",
    scared: "SCARED",
    crafft: "CRAFFT",
    asrs5: "ASRS-5",
    ptsd: "PTSD-5",
  };
  return names[type.toLowerCase()] || type.toUpperCase();
}

function formatDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}
