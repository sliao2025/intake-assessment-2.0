"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { intPsychTheme } from "./components/theme";

/**
 * Root page that routes users based on intake completion status
 * - Not authenticated → /auth/signin
 * - intakeFinished = false → /intake
 * - intakeFinished = true → /dashboard
 */
export default function RootPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("[RootPage] session", session);
    if (status === "loading") return;

    if (!session) {
      router.push("/auth/signin");
      return;
    }

    // Check if intake assessment is completed
    if (!session.user.intakeFinished) {
      router.push("/intake");
    } else {
      router.push("/dashboard");
    }
  }, [session, status, router]);

  // Show loading state while routing
  return (
    <div
      className="fixed inset-0 min-h-[100svh] h-dvh flex items-center justify-center"
      style={{ background: intPsychTheme.card }}
    >
      <div className="animate-pulse text-center">
        <div
          style={{ borderTopColor: intPsychTheme.secondary }}
          className="rounded-full h-12 w-12 mx-auto mb-4 border-4 border-gray-300 border-t-4 border-t-transparent animate-spin"
        />
        <p className="text-gray-700">Loading...</p>
      </div>
    </div>
  );
}
