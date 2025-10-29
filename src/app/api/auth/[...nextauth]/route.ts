import { randomUUID } from "crypto";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../lib/prisma";
import { CustomPrismaAdapter } from "../../../lib/prisma-adapter";
import argon2 from "argon2";

// Default clinic ID for Integrative Psych (can be overridden by env var)
const DEFAULT_CLINIC_ID =
  process.env.DEFAULT_CLINIC_ID || "uvfoatdxzh7c1s395kc61u7i";

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 days
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Guest or Email",
      credentials: {
        guest: { label: "Guest", type: "text" }, // "true" means guest flow
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        // --- Guest branch ---
        if (creds?.guest === "true") {
          const name =
            [creds.firstName, creds.lastName].filter(Boolean).join(" ") ||
            "Guest";
          const email = `guest-${randomUUID()}@guest.local`;
          const user = await prisma.user.create({
            data: {
              email,
              name,
              guest: true,
              clinicId: DEFAULT_CLINIC_ID,
            },
          });
          return {
            id: user.id,
            email: user.email ?? undefined,
            name: user.name ?? undefined,
            image: user.image ?? undefined,
            role: "guest", // or "user"
          } satisfies {
            id: string;
            email?: string;
            name?: string;
            image?: string;
            role: "guest" | "user";
          };
        }

        // --- Email/password branch ---
        const email = (creds?.email || "").toLowerCase().trim();
        const password = creds?.password || "";
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email_clinicId: {
              email,
              clinicId: DEFAULT_CLINIC_ID,
            },
          },
        });
        if (!user || !user.passwordHash) return null;

        const ok = await argon2.verify(user.passwordHash, password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
          role: "user",
        } satisfies {
          id: string;
          email?: string;
          name?: string;
          image?: string;
          role: "guest" | "user";
        };
      },
    }),
  ],
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id ?? token.id;
        token.role = (user as any).role ?? token.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
        session.user.role = (token.role as "guest" | "user") ?? "user";
      }
      return session;
    },
  },
  useSecureCookies: (process.env.NEXTAUTH_URL ?? "").startsWith("https://"),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
