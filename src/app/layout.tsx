// src/app/layout.tsx (SERVER COMPONENT – default)
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Providers from "./providers";
import type { Metadata } from "next";
import sigmund_logo from "public/Sigmund Window.png";

export const metadata: Metadata = {
  title: "Sigmund",
  description: "Mental Health Platform",
  icons: {
    icon: [{ url: sigmund_logo.src, type: "image/png" }],
    shortcut: [{ url: sigmund_logo.src, type: "image/png" }],
    apple: [{ url: sigmund_logo.src }],
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
          <Providers session={session}>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
