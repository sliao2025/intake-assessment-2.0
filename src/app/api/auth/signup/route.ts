import { NextRequest } from "next/server";
import { prisma } from "../../../lib/prisma";
import argon2 from "argon2";

// Default clinic ID for Integrative Psych (can be overridden by env var)
const DEFAULT_CLINIC_ID = process.env.DEFAULT_CLINIC_ID || "uvfoatdxzh7c1s395kc61u7i";

// Email/password signup only. Guest users are created via NextAuth Credentials in [...nextauth]/route.ts.
export async function POST(req: NextRequest) {
  const { email, password, firstName, lastName } = await req.json();
  const e = (email || "").toLowerCase().trim();
  if (!e || !password) {
    return new Response("Email & password required", { status: 400 });
  }

  const existing = await prisma.user.findUnique({ 
    where: { 
      email_clinicId: {
        email: e,
        clinicId: DEFAULT_CLINIC_ID
      }
    } 
  });
  if (existing) {
    return new Response("Email already in use", { status: 409 });
  }

  const passwordHash = await argon2.hash(password);
  const name = [firstName, lastName].filter(Boolean).join(" ") || null;

  await prisma.user.create({
    data: { 
      email: e, 
      passwordHash, 
      name,
      clinicId: DEFAULT_CLINIC_ID
    },
  });

  return Response.json({ ok: true });
}
