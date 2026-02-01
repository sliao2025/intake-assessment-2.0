// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const guardSignIn = (req: NextRequest, callback: string) => {
  const url = new URL("/auth/signin", req.url);
  url.searchParams.set("callbackUrl", callback);
  return NextResponse.redirect(url);
};

const handleGuest = (req: NextRequest, resp: NextResponse) => {
  if (req.cookies.get("guest")) {
    resp.cookies.set("guest", "", { path: "/", maxAge: 0 });
    resp.cookies.delete("guest");
  }
  return resp;
};

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const guestMode = req.cookies.get("guest")?.value === "1";
  const hasToken = Boolean(token);
  const intakeFinished = token?.intakeFinished ?? false;
  console.log("[Middleware] token", token);

  if (pathname === "/") {
    if (!hasToken && !guestMode) {
      return guardSignIn(req, "/intake");
    }
    const target = intakeFinished ? "/dashboard" : "/intake";
    // const target = "/intake";
    const resp = NextResponse.redirect(new URL(target, req.url));
    return handleGuest(req, resp);
  }

  if (pathname.startsWith("/intake")) {
    if (!hasToken && !guestMode) {
      return guardSignIn(req, `${pathname}${search || ""}`);
    }
    if (intakeFinished && hasToken) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  if (pathname.startsWith("/dashboard")) {
    if (!hasToken && !guestMode) {
      return guardSignIn(req, `${pathname}${search || ""}`);
    }
    if (!intakeFinished && hasToken) {
      return NextResponse.redirect(new URL("/intake", req.url));
    }
  }

  if (pathname.startsWith("/sessions") && !hasToken) {
    return guardSignIn(req, `${pathname}${search || ""}`);
  }

  return handleGuest(req, NextResponse.next());
}

export const config = {
  matcher: ["/", "/intake/:path*", "/dashboard/:path*", "/sessions/:path*"],
};
