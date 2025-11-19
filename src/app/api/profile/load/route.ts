import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return new Response("Unauthorized", { status: 401 });
  const userId = (session.user as any).id as string;

  const [profileRow, userRow] = await Promise.all([
    prisma.profile.findUnique({
      where: { userId },
      select: {
        userId: true,
        json: true,
        version: true,
        updatedAt: true,
      },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        clinician: true,
      },
    }),
  ]);

  return Response.json({
    profile: profileRow?.json ?? null,
    version: profileRow?.version ?? null,
    clinician: userRow?.clinician ?? null,
  });
}
