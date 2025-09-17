// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPrefixes = ["/intake", "/sessions"];

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Handle the root path explicitly
  if (pathname === "/") {
    const url = new URL(token ? "/intake" : "/auth/signin", req.url);
    if (!token) url.searchParams.set("callbackUrl", "/intake");
    return NextResponse.redirect(url);
  }

  // Guard protected areas
  const isProtected = protectedPrefixes.some((p) => pathname.startsWith(p));
  if (isProtected && !token) {
    const signInUrl = new URL("/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", `${pathname}${search || ""}`);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/intake/:path*", "/sessions/:path*"],
};
