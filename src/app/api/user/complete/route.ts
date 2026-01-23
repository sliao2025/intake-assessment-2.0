import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

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

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        intakeFinished: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating user intake status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
