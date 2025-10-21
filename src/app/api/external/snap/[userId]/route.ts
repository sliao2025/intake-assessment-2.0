import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const body = await req.json();

    // Validate incoming data
    const { informantName, informantRelation, responses } = body;

    if (!informantName || !informantRelation || !responses) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: informantName, informantRelation, or responses",
        },
        { status: 400 }
      );
    }

    // Validate that responses is an object with SNAP keys
    if (typeof responses !== "object" || Array.isArray(responses)) {
      return NextResponse.json(
        { error: "Invalid responses format" },
        { status: 400 }
      );
    }

    // Fetch existing profile from database
    const profileRecord = await prisma.profile.findUnique({
      where: { userId },
      select: { json: true },
    });

    if (!profileRecord) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const profile = profileRecord.json as any;

    // Ensure the profile is a child profile
    if (!profile.isChild || profile.assessments?.kind !== "child") {
      return NextResponse.json(
        { error: "This profile is not configured for child assessments" },
        { status: 400 }
      );
    }

    // Create new collateral response
    const newCollateral = {
      id: crypto.randomUUID(),
      informantName,
      informantRelation,
      submittedAt: new Date().toISOString(),
      responses,
    };

    // Get existing snapCollateral array or initialize empty array
    const existingCollateral = profile.assessments?.data?.snapCollateral || [];

    // Append to snapCollateral array
    const updatedProfile = {
      ...profile,
      assessments: {
        ...profile.assessments,
        data: {
          ...profile.assessments.data,
          snapCollateral: [...existingCollateral, newCollateral],
        },
      },
    };

    // Save back to database
    await prisma.profile.update({
      where: { userId },
      data: { json: updatedProfile },
    });

    return NextResponse.json({
      ok: true,
      message: "Collateral SNAP response saved successfully",
      collateralId: newCollateral.id,
    });
  } catch (error: any) {
    console.error("[/api/external/snap] Error saving collateral:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save collateral response" },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch existing collateral responses (optional, for review)
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const profileRecord = await prisma.profile.findUnique({
      where: { userId },
      select: { json: true },
    });

    if (!profileRecord) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const profile = profileRecord.json as any;
    const collateral = profile?.assessments?.data?.snapCollateral || [];

    return NextResponse.json({
      ok: true,
      collateral,
      count: collateral.length,
    });
  } catch (error: any) {
    console.error("[/api/external/snap] Error fetching collateral:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch collateral responses" },
      { status: 500 }
    );
  }
}
