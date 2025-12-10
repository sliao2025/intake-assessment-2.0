// src/app/layout.tsx (SERVER COMPONENT – default)
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "./providers";
import type { Metadata } from "next";
import IPLogo from "../assets/IP_Logo.png";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Integrative Psych Intake",
  description: "Patient intake assessment platform",
  icons: {
    icon: [{ url: IPLogo.src, type: "image/png" }],
    shortcut: [{ url: IPLogo.src, type: "image/png" }],
    apple: [{ url: IPLogo.src }],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        style={{
          background:
            "linear-gradient(to top, rgba(188, 255, 196, 1), rgba(241, 255, 245, 1), rgba(255, 255, 255, 1))",
        }}
        className="min-h-[100dvh] h-full antialiased"
      >
        <div className="pb-[env(safe-area-inset-bottom)]">
          <Providers session={session}>
            {children}
            <Analytics />
          </Providers>
        </div>
      </body>
    </html>
  );
}
