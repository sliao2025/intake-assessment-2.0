import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

// Default clinic ID for Integrative Psych (can be overridden by env var)
const DEFAULT_CLINIC_ID = process.env.DEFAULT_CLINIC_ID || "uvfoatdxzh7c1s395kc61u7i";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;

  const body = await req.json();

  // Mode A (default): save full JSON blob (existing behavior)
  if (!body?.action || body.action === "saveJson") {
    const profile = body?.profile ?? body; // accept old payload shape (back-compat)
    const version =
      (profile?.version as number) ?? (body?.version as number) ?? 1;

    await prisma.profile.upsert({
      where: { userId },
      update: { json: profile, version },
      create: { userId, json: profile, version, clinicId: DEFAULT_CLINIC_ID },
    });

    return Response.json({ ok: true, mode: "saveJson" });
  }

  // Mode B: submit denormalized metadata and stamp first submission time (idempotent)
  if (body.action === "submitMeta") {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      age,
      race,
      genderIdentity,
      sexualOrientation,
      highestDegree,
      isEmployed,
      version,
      // optionally allow passing the full JSON to create row if it doesn't exist
      profile: profileJson,
    } = body;

    // Build update payload WITHOUT selecting/reading any columns (avoids P2022 before migration)
    const updateData: any = {
      firstName: firstName ?? null,
      lastName: lastName ?? null,
      email: email ?? null,
      contactNumber: contactNumber ?? null,
      age: age ?? null,
      race: race ?? null,
      genderIdentity: genderIdentity ?? null,
      sexualOrientation: sexualOrientation ?? null,
      highestDegree: highestDegree ?? null,
      isEmployed: typeof isEmployed === "boolean" ? isEmployed : null,
    };

    // Upsert without pre-read. We only set firstSubmittedAt on CREATE.
    await prisma.profile.upsert({
      where: { userId },
      update: updateData,
      create: {
        userId,
        json: profileJson ?? {},
        version: typeof version === "number" ? version : 1,
        ...updateData,
        firstSubmittedAt: new Date(),
        clinicId: DEFAULT_CLINIC_ID,
      },
    });

    // Also flip the intakeFinished flag on the user for convenience
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { intakeFinished: true },
      });
    } catch {
      // ignore if user row missing or field mismatched
    }

    return Response.json({ ok: true, mode: "submitMeta" });
  }

  return new Response("Unsupported action", { status: 400 });
}
