import { NextRequest } from "next/server";
import { Sessions, Assessments } from "../../lib/store/memory";
import { ASSESSMENTS } from "../../seed/assessments";

export async function POST(req: NextRequest) {
  const { assessmentSlug, userId, scaleCode } = await req.json();
  const { id } = await Sessions.create(userId, assessmentSlug, scaleCode);
  return Response.json({ sessionId: id });
}

export async function PUT(req: NextRequest) {
  const { sessionId, itemId, value } = await req.json();
  const s = await Sessions.get(sessionId);
  if (!s) return new Response("Not found", { status: 404 });
  s.responses.push({ itemId, value });
  await Sessions.update(sessionId, s);
  return Response.json({ ok: true });
}
