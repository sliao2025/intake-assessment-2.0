import { NextRequest } from "next/server";
import { storeData } from "../../lib/storage";

export async function POST(req: NextRequest) {
  const profile = await req.json();
  await storeData(profile);
  return Response.json({ ok: true });
}
