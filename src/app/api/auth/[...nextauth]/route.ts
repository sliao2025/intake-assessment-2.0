import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/prisma";
import argon2 from "argon2";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt", maxAge: 60 * 60 * 24 * 7 }, // 7 days
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        const email = (creds?.email || "").toLowerCase().trim();
        const password = creds?.password || "";
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.passwordHash) return null;

        const ok = await argon2.verify(user.passwordHash, password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image ?? undefined,
        };
      },
    }),
  ],
  pages: { signIn: "/auth/signin" },
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, persist the user id onto the JWT
      if (user) token.id = (user as any).id;
      return token;
    },
    async session({ session, token }) {
      // Expose the id from the JWT onto the session object for the client
      if (session.user && token?.id)
        (session.user as any).id = token.id as string;
      return session;
    },
  },
  useSecureCookies: (process.env.NEXTAUTH_URL ?? "").startsWith("https://"),
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
