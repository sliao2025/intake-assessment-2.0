import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;

  const profile = await req.json(); // your TS Profile object
  const version = (profile?.version as number) ?? 1;

  await prisma.profile.upsert({
    where: { userId },
    update: { json: profile, version },
    create: { userId, json: profile, version },
  });

  return Response.json({ ok: true });
}
