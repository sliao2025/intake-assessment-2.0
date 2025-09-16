// src/middleware.ts
export { default } from "next-auth/middleware";

// Protect everything except /auth and Auth endpoints & static assets
export const config = {
  matcher: [
    // exclude: /auth, /api/auth, next assets, and files with extensions
    "/((?!auth|api/auth|_next|.*\\..*).*)",
  ],
};
