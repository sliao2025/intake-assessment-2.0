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
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <svg className="w-12 h-12 animate-spin" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#e7e5e4"
                strokeWidth="5"
              />
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="#b2bfa2"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="80, 200"
                strokeDashoffset="0"
              />
            </svg>
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
