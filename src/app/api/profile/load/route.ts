import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;

  const row = await prisma.profile.findUnique({
    where: { userId },
    select: {
      userId: true,
      json: true,
      version: true,
      updatedAt: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      clinician: true,
    },
  });

  const profileJson = (row?.json as any) ?? null;
  if (profileJson && row?.updatedAt) {
    profileJson.updatedAt = row.updatedAt;
  }

  return Response.json({
    profile: profileJson,
    version: row?.version ?? null,
    clinician: user?.clinician ?? null,
  });
}
