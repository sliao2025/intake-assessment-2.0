import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";

/**
 * GET /api/portal/assessments
 * 
 * Retrieves assessment history for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const history = await prisma.assessmentResponse.findMany({
      where: { userId: session.user.id },
      orderBy: { completedAt: "desc" },
      select: {
        id: true,
        assessmentType: true,
        totalScore: true,
        severity: true,
        completedAt: true,
        responses: true,
      },
    });

    return NextResponse.json({ history });
  } catch (error) {
    console.error("Assessments GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch assessment history" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/portal/assessments
 * 
 * Submits a new assessment response
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user?.id || !session?.user?.clinicId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { assessmentType, responses, totalScore, severity, requestedBy } = body;

    // Validate inputs
    if (!assessmentType || typeof assessmentType !== "string") {
      return NextResponse.json(
        { error: "Assessment type is required" },
        { status: 400 }
      );
    }

    if (!responses || typeof responses !== "object") {
      return NextResponse.json(
        { error: "Responses are required" },
        { status: 400 }
      );
    }

    // Create assessment response
    const assessment = await prisma.assessmentResponse.create({
      data: {
        userId: session.user.id,
        clinicId: session.user.clinicId,
        assessmentType: assessmentType.toLowerCase(),
        responses,
        totalScore: totalScore || null,
        severity: severity || null,
        requestedBy: requestedBy || null,
      },
      select: {
        id: true,
        assessmentType: true,
        totalScore: true,
        severity: true,
        completedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      assessment,
    });
  } catch (error) {
    console.error("Assessment POST error:", error);
    return NextResponse.json(
      { error: "Failed to submit assessment" },
      { status: 500 }
    );
  }
}

