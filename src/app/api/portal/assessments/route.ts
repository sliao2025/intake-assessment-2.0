import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";

/**
 * GET /api/portal/assessments
 *
 * Retrieves assessment history and assigned assessments for the current user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get all assessments for the user
    const allAssessments = await prisma.assessmentResponse.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: { completedAt: "desc" },
      select: {
        id: true,
        assessmentType: true,
        totalScore: true,
        completedAt: true,
        responses: true,
        requestedBy: true,
        dueDate: true,
        assignedAt: true,
      },
    });

    // Separate into completed (history) and assigned (pending)
    const history = allAssessments
      .filter((assessment) => {
        // Completed if it has responses with actual data (not empty object)
        const responses = assessment.responses as Record<string, any> | null;
        return (
          responses &&
          Object.keys(responses).length > 0 &&
          assessment.totalScore !== null
        );
      })
      .map(({ requestedBy, dueDate, ...rest }) => rest);

    // Assigned assessments: have requestedBy but not yet completed
    const assignedAssessments = allAssessments
      .filter((assessment) => {
        // Has requestedBy and is not completed
        const responses = assessment.responses as Record<string, any> | null;
        const isEmpty = !responses || Object.keys(responses).length === 0;
        return (
          assessment.requestedBy !== null &&
          (isEmpty || assessment.totalScore === null)
        );
      })
      .map(({ totalScore, responses, ...rest }) => rest);

    return NextResponse.json({ history, assignedAssessments });
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
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session?.user?.clinicId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { assessmentType, responses, totalScore, assessmentId } = body;

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

    const assessmentTypeLower = assessmentType.toLowerCase();

    let assessment;

    // If assessmentId is provided, update the specific assigned assessment
    if (assessmentId && typeof assessmentId === "string") {
      // Verify the assessment exists, belongs to the user, and is not yet completed
      const existingAssigned = await prisma.assessmentResponse.findUnique({
        where: { id: assessmentId },
        select: {
          id: true,
          userId: true,
          requestedBy: true,
          responses: true,
          totalScore: true,
        },
      });

      if (!existingAssigned) {
        return NextResponse.json(
          { error: "Assessment not found" },
          { status: 404 }
        );
      }

      // Verify it belongs to the current user
      if (existingAssigned.userId !== session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
      }

      // Verify it was assigned (has requestedBy) and is not yet completed
      const existingResponses = existingAssigned.responses as Record<
        string,
        any
      > | null;
      const isEmpty =
        !existingResponses || Object.keys(existingResponses).length === 0;
      const isNotCompleted = isEmpty || existingAssigned.totalScore === null;

      if (!existingAssigned.requestedBy || !isNotCompleted) {
        return NextResponse.json(
          { error: "Assessment is not available for completion" },
          { status: 400 }
        );
      }

      // Update the existing assigned assessment
      assessment = await prisma.assessmentResponse.update({
        where: { id: assessmentId },
        data: {
          responses,
          totalScore: totalScore || null,
          completedAt: new Date(), // Set when patient completes it
          // Keep requestedBy, dueDate, and assignedAt from the original assignment
        },
        select: {
          id: true,
          assessmentType: true,
          totalScore: true,
          completedAt: true,
        },
      });
    } else {
      // Create a new assessment response (user-initiated, not assigned)
      assessment = await prisma.assessmentResponse.create({
        data: {
          id: crypto.randomUUID(),
          userId: session.user.id,
          clinicId: session.user.clinicId,
          assessmentType: assessmentTypeLower,
          responses,
          totalScore: totalScore || null,
          completedAt: new Date(), // Set when user completes it
        },
        select: {
          id: true,
          assessmentType: true,
          totalScore: true,
          completedAt: true,
        },
      });
    }

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
