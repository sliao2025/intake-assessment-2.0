import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";
import argon2 from "argon2";

// Email/password signup only. Guest users are created via NextAuth Credentials in [...nextauth]/route.ts.
export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();
  const e = (email || "").toLowerCase().trim();
  if (!e || !password) {
    return new Response("Email & password required", { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email: e } });
  if (existing) {
    return new Response("Email already in use", { status: 409 });
  }

  const passwordHash = await argon2.hash(password);
  const name = [firstName, lastName].filter(Boolean).join(" ") || null;

  await prisma.user.create({
    data: { email: e, passwordHash, name },
  });

  return Response.json({ ok: true });
}
