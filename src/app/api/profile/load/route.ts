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
  return Response.json({
    profile: row?.json ?? null,
    version: row?.version ?? null,
  });
}
