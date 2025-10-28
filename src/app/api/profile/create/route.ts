import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import { storeData } from "../../../lib/storage";

// Default clinic ID for Integrative Psych (can be overridden by env var)
const DEFAULT_CLINIC_ID = process.env.DEFAULT_CLINIC_ID || "uvfoatdxzh7c1s395kc61u7i";

export async function POST(req: NextRequest) {
  const profile = await req.json();
  await storeData(profile);
  return Response.json({ ok: true });
}

const ProfileSchema = z.object({}).loose(); // permissive while iterating; replaces deprecated .passthrough()

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }
  const parsed = ProfileSchema.safeParse(body);
  if (!parsed.success) {
    return new Response("Validation failed", { status: 422 });
  }

  const profile = parsed.data;
  const jsonProfile = JSON.parse(JSON.stringify(profile)) as any;

  // Your Prisma model stores JSON in Profile.json with userId as the PK
  const saved = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      json: jsonProfile,
      version: { increment: 1 },
    },
    create: {
      userId: session.user.id,
      json: jsonProfile,
      firstSubmittedAt: new Date(),
      clinicId: DEFAULT_CLINIC_ID
    },
    select: { userId: true, updatedAt: true, version: true },
  });

  return Response.json(saved);
}
