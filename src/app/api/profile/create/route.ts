import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";
import { storeData } from "../../../lib/storage";

// Default clinic ID for Integrative Psych (can be overridden by env var)
const DEFAULT_CLINIC_ID =
  process.env.DEFAULT_CLINIC_ID || "uvfoatdxzh7c1s395kc61u7i";

export async function POST(req: NextRequest) {
  const profile = await req.json();
  await storeData(profile);
  return Response.json({ ok: true });
}

const ProfileSchema = z.object({}).loose();

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

  const profile = parsed.data as any;
  const jsonProfile = JSON.parse(JSON.stringify(profile));

  // Extract updatedAt for optimistic locking
  // It might be in the root if typed, or passed separately
  const clientUpdatedAt = profile.updatedAt ?? (body as any).updatedAt;
  const userId = session.user.id;

  if (clientUpdatedAt) {
    // Attempt Atomic Update with Optimistic Locking
    const result = await prisma.profile.updateMany({
      where: {
        userId,
        updatedAt: new Date(clientUpdatedAt), // Must match exactly
      },
      data: {
        json: jsonProfile,
        version: { increment: 1 },
        updatedAt: new Date(), // updateMany doesn't trigger @updatedAt automatically
      },
    });

    if (result.count === 0) {
      // Update failed: either user not found OR stale data (race condition)
      const existing = await prisma.profile.findUnique({
        where: { userId },
        select: { updatedAt: true },
      });

      if (existing) {
        // Record exists but timestamp didn't match -> Conflict
        console.warn(
          `[Profile] Optimistic locking conflict for user ${userId}`
        );
        return new Response(
          JSON.stringify({
            error: "Profile has been updated elsewhere. Please refresh.",
            type: "CONCURRENCY_ERROR",
            serverUpdatedAt: existing.updatedAt,
          }),
          { status: 409, headers: { "Content-Type": "application/json" } }
        );
      } else {
        // Record completely missing -> Create it
        const saved = await prisma.profile.create({
          data: {
            userId,
            json: jsonProfile,
            clinicId: DEFAULT_CLINIC_ID,
            version: 1,
            // updatedAt auto-set on create
          },
          select: { userId: true, updatedAt: true, version: true },
        });
        return Response.json(saved);
      }
    }

    // Success -> Fetch and return the updated record
    const saved = await prisma.profile.findUnique({
      where: { userId },
      select: { userId: true, updatedAt: true, version: true },
    });
    return Response.json(saved);
  }

  // Fallback: Blind Overwrite (Legacy behavior)
  // Ensure we still strip updatedAt from jsonProfile if it shouldn't be in the blob?
  // But we kept it in the check above.

  const saved = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {
      json: jsonProfile,
      version: { increment: 1 },
    },
    create: {
      userId: session.user.id,
      json: jsonProfile,
      clinicId: DEFAULT_CLINIC_ID,
      // Do NOT set firstSubmittedAt here
    },
    select: { userId: true, updatedAt: true, version: true },
  });

  return Response.json(saved);
}
