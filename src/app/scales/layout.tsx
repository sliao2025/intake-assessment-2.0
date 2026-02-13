"use client";

import React, { useEffect, useState } from "react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface AssessmentLayoutProps {
  children: React.ReactNode;
}

export default function AssessmentLayout({ children }: AssessmentLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("/api/portal/settings");
        if (res.ok) {
          const data = await res.json();
          if (!data.scalesEnabled) {
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

  // Only show back button on dynamic route pages (not on /assessments itself)
  const isDynamicRoute = pathname !== "/scales";
  // Use wider max-width for main list page, narrower for individual assessment pages
  const maxWidth = isDynamicRoute ? "max-w-4xl" : "max-w-7xl";

  if (allowed === null) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="flex flex-col items-center gap-4">
            <div
              style={{ borderColor: "#e7e5e4", borderTopColor: "#b2bfa2" }}
              className="rounded-full w-10 h-10 border-4 animate-spin"
            />
            <span className="font-medium text-stone-500 animate-pulse">
              Loading Scales
            </span>
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div
        className={`min-h-screen ${isDynamicRoute ? "p-6 md:p-8 pb-16" : ""}`}
      >
        <div className={`${maxWidth} mx-auto`}>
          {/* Back button - only on dynamic routes */}
          {isDynamicRoute && (
            <button
              onClick={() => router.push("/scales")}
              className="cursor-pointer flex items-center gap-2 text-stone-600 hover:text-stone-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Scales</span>
            </button>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </PortalLayout>
  );
}
