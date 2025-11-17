import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";

/**
 * GET /api/portal/modules
 * 
 * Retrieves all available psychoeducation modules with user progress
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

    // Get all active modules
    const modules = await prisma.psychoedModule.findMany({
      where: { isActive: true },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        totalSteps: true,
        duration: true,
        ageGroup: true,
      },
      orderBy: { createdAt: "desc" },
    });

    // Get user's progress for each module
    const moduleProgress = await prisma.moduleProgress.findMany({
      where: { userId: session.user.id },
      select: {
        moduleId: true,
        currentStep: true,
        isCompleted: true,
      },
    });

    // Map progress to modules
    const progressMap = new Map(
      moduleProgress.map((p) => [p.moduleId, p])
    );

    const modulesWithProgress = modules.map((module) => ({
      ...module,
      progress: progressMap.get(module.id) || null,
    }));

    return NextResponse.json({ modules: modulesWithProgress });
  } catch (error) {
    console.error("Modules GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch modules" },
      { status: 500 }
    );
  }
}

