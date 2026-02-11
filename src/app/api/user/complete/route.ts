import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

// Default clinic ID for Integrative Psych (can be overridden by env var)
const DEFAULT_CLINIC_ID =
  process.env.DEFAULT_CLINIC_ID || "cmh9hy3kf000038epofp8cutx";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get the user from the database to ensure we have the correct ID
    // We use the same lookup logic as in the auth options if possible,
    // or just findUnique by email + clinicId if we have it in session.
    // The session.user.id *should* be the database ID based on the auth callback.

    if (!session.user.id) {
      return NextResponse.json({ error: "User ID missing" }, { status: 400 });
    }

    const userId = session.user.id;

    // Update user to mark intake as finished
    await prisma.user.update({
      where: { id: userId },
      data: {
        intakeFinished: true,
      },
    });

    // Also create a minimal profile record if one doesn't exist
    // This ensures existing patients (who bypassed intake via Qualtrics) show up in clinician search
    const existingProfile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      // Parse name from session
      const nameParts = session.user.name?.split(" ") || [];
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      await prisma.profile.create({
        data: {
          userId,
          clinicId: DEFAULT_CLINIC_ID,
          json: {
            maxVisited: 0,
            isChild: null,
            firstName,
            lastName,
            email: session.user.email || "",
            // Minimal profile indicating this is a legacy patient
            _legacyQualtrics: true,
          },
          firstName: firstName || null,
          lastName: lastName || null,
          email: session.user.email || null,
          // Note: firstSubmittedAt will be null for legacy patients
          // The clinician search should handle this gracefully
          firstSubmittedAt: null,
        },
      });

      console.log(
        `[/api/user/complete] Created minimal profile for legacy Qualtrics patient: ${userId}`,
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user intake status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
