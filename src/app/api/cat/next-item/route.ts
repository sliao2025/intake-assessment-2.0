import { NextRequest } from "next/server";
import { Sessions, Assessments } from "../../../lib/store/memory";
import { callEngineNext } from "../../../lib/engine";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.searchParams.get("lookup");
  for (const a of Object.values(await Assessments)) {
  }
  // naive item lookup from fixtures
  const all = Object.values(
    (await import("../../../seed/assessments")).ASSESSMENTS
  ).flatMap((a: any) => a.items);
  const item = all.find((i: any) => i.id === id);
  return Response.json(item || null);
}

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json();
  const s = await Sessions.get(sessionId);
  if (!s) return new Response("Not found", { status: 404 });
  const assessment = (await import("../../../seed/assessments")).ASSESSMENTS[
    s.assessmentSlug
  ];
  const payload = {
    scaleCode: s.scaleCode,
    theta: s.theta,
    responses: s.responses,
    items: assessment.items.map((it: any) => ({
      id: it.id,
      scaleId: it.scaleId,
      params: it.params,
    })),
  };
  const data = await callEngineNext(payload);
  await Sessions.update(sessionId, {
    theta: data.theta ?? s.theta,
    seTheta: data.se ?? s.seTheta,
    state: data.stop ? "COMPLETED" : "IN_PROGRESS",
  });
  return Response.json(data);
}
