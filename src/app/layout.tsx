// src/app/layout.tsx (SERVER COMPONENT – default)
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "./providers";
import type { Metadata } from "next";
import IPLogo from "../assets/IP_Logo.png";

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
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
