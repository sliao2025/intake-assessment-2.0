import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import { z } from "zod";
import { storeData } from "../../lib/storage";

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
  console.log("PUT profile", body);
  const parsed = ProfileSchema.safeParse(body);
  if (!parsed.success) {
    return new Response("Validation failed", { status: 422 });
  }

  const profile = parsed.data;

  // Your Prisma model stores JSON in Profile.json with userId as the PK
  const saved = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      json: profile,
      version: { increment: 1 },
    },
    create: {
      userId: session.user.id,
      json: profile,
    },
    select: { userId: true, updatedAt: true, version: true },
  });

  return Response.json(saved);
}
