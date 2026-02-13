"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortalLayout from "../components/portal/Layout/PortalLayout";

interface JournalLayoutProps {
  children: React.ReactNode;
}

export default function JournalLayout({ children }: JournalLayoutProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/portal/settings");
        if (res.ok) {
          const data = await res.json();
          if (!data.journalEnabled) {
            router.replace("/dashboard");
            return;
          }
          setAllowed(true);
        } else {
          setAllowed(true); // Fail open on error
        }
      } catch {
        setAllowed(true);
      }
    };
    checkAccess();
  }, [router]);

  return (
    <PortalLayout>
      {allowed === null ? (
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center gap-4">
            <div
              style={{ borderColor: "#e7e5e4", borderTopColor: "#b2bfa2" }}
              className="rounded-full w-10 h-10 border-4 animate-spin"
            />
            <span className="font-medium text-stone-500 animate-pulse">
              Loading Journal
            </span>
          </div>
        </div>
      ) : (
        children
      )}
    </PortalLayout>
  );
}
