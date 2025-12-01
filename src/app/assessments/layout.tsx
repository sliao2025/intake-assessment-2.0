"use client";

import React from "react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface AssessmentLayoutProps {
  children: React.ReactNode;
}

export default function AssessmentLayout({ children }: AssessmentLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Only show back button on dynamic route pages (not on /assessments itself)
  const isDynamicRoute = pathname !== "/assessments";
  // Use wider max-width for main list page, narrower for individual assessment pages
  const maxWidth = isDynamicRoute ? "max-w-4xl" : "max-w-7xl";

  return (
    <PortalLayout>
      <div className="min-h-screen isDynamicRoute ? 'p-8' : 'p-0'">
        <div className={`${maxWidth} mx-auto`}>
          {/* Back button - only on dynamic routes */}
          {isDynamicRoute && (
            <button
              onClick={() => router.push("/assessments")}
              className="cursor-pointer flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Assessments</span>
            </button>
          )}

          {/* Content */}
          {children}
        </div>
      </div>
    </PortalLayout>
  );
}
