"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { Leaf, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import { intPsychTheme } from "../components/theme";
import { DM_Serif_Text, Roboto } from "next/font/google";

interface DashboardData {
  assessments: {
    completed: number;
    total: number;
    recent: Array<{
      name: string;
      score: string;
      severity: string;
      change: number;
      date: string;
    }>;
  };
  mood: {
    current: string;
    lastUpdated: string;
  };
  severity: {
    percentage: number;
    level: string;
  };
  trends: {
    phq9?: { current: number; change: number; direction: string };
    gad7?: { current: number; change: number; direction: string };
    sleep?: { current: number; change: number; direction: string };
  };
}
const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function DashboardPage() {
  const { data: session } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("/api/portal/dashboard");
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const firstName = session?.user?.name?.split(" ")[0] || "back";

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-gray-600">
            Loading dashboard...
          </div>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="min-h-screen bg-[#E8F5EE] p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Exact Figma */}
          <div className="mb-6">
            <h1
              style={{ color: intPsychTheme.primary }}
              className={`${dm_serif.className} text-3xl mb-2`}
            >
              Welcome, {firstName}
            </h1>
          </div>

          {/* Main Garden and Psychoeducation Section - Exact Figma layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Garden Illustration */}
            <div className="lg:col-span-2">
              <div className="bg-[#E8F0E6] rounded-3xl p-6 h-full shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
                <div className="bg-[#D4E9E7] rounded-2xl overflow-hidden h-[400px] shadow-[inset_0_0_0_1px_rgba(43,78,107,0.1)]">
                  {/* <GardenIllustration /> */}
                </div>
              </div>
            </div>

            {/* Psychoeducation Module - Exact Figma styling */}
            <div className="lg:col-span-1">
              <div className="bg-[#FAF9F6] rounded-3xl p-6 h-full shadow-[0_1px_2px_rgba(15,23,42,0.08)] flex flex-col">
                <div className="mb-4">
                  <div className={`${roboto.className} text-gray-500 mb-2`}>
                    PSYCHOEDUCATION
                  </div>
                  <h2 className="text-gray-900 mb-4">Behavioral Activation</h2>
                  <p className="text-gray-700 mb-6">
                    Behavioral activation—scheduling enjoyable, meaningful
                    activities—is a powerful tool against low mood. To start,
                    recall some past pleasant activities (such as hobbies or
                    socializing), then plan to try one in the next week.
                  </p>
                </div>
                <div className="mt-auto">
                  <button
                    style={{ backgroundColor: intPsychTheme.secondary }}
                    className="w-full hover:bg-[#FF7A2E] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2"
                  >
                    Try Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards - Updated to Figma styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Assessments Completed */}
            <div className="bg-[#FAF9F6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="text-gray-600 mb-2">Assessments Completed</h3>
              <div className="text-gray-900 mb-2">
                {dashboardData?.assessments.completed || 0}/
                {dashboardData?.assessments.total || 0}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-800 h-2 rounded-full transition-all"
                  style={{
                    width: `${
                      ((dashboardData?.assessments.completed || 0) /
                        (dashboardData?.assessments.total || 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Current Mood */}
            <div className="bg-[#FAF9F6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="text-gray-600 mb-2">Current Mood</h3>
              <div className="text-gray-900 mb-2">
                {dashboardData?.mood.current || "Not set"}
              </div>
              <div className="text-gray-500">
                Last updated: {dashboardData?.mood.lastUpdated || "Never"}
              </div>
            </div>

            {/* Symptom Severity */}
            <div className="bg-[#FAF9F6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="text-gray-600 mb-2">Symptom Severity</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#7FB885"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 50 * ((dashboardData?.severity.percentage || 0) / 100)} ${2 * Math.PI * 50}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-gray-900">
                    {dashboardData?.severity.percentage || 0}%
                  </div>
                  <div className="text-gray-500">
                    {dashboardData?.severity.level || "Minimal"}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-gray-600">
                <span>Minimal</span>
                <span>Severe</span>
              </div>
            </div>

            {/* Trends */}
            <div className="bg-[#FAF9F6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="text-gray-600 mb-2">Trends</h3>
              <div className="space-y-2">
                {dashboardData?.assessments.recent
                  ?.slice(0, 3)
                  .map((assessment, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-700">{assessment.name}</span>
                      {assessment.change < 0 ? (
                        <TrendingDown className="w-4 h-4 text-[#7FB885]" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-[#FF8C42]" />
                      )}
                    </div>
                  ))}
              </div>
              <button className="w-full mt-4 text-gray-600 py-2">
                See Care Path Suggestions
              </button>
            </div>
          </div>

          {/* Clinical Assessments - Updated to Figma styling */}
          <div className="mb-6">
            <h2 className="text-gray-900 mb-4">Recent Assessments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardData?.assessments.recent
                ?.slice(0, 3)
                .map((assessment, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF9F6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-gray-900">{assessment.name}</h3>
                        <p className="text-gray-500">
                          Depression/Anxiety Scale
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          assessment.severity === "Mild"
                            ? "bg-[#A8D5BA] text-gray-900 border border-[#7FB885]"
                            : "bg-[#FFD9A6] text-gray-900 border border-[#FF8C42]"
                        }`}
                      >
                        {assessment.severity}
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-end justify-between">
                        <div className="text-gray-900">{assessment.score}</div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-800 h-2 rounded-full"
                          style={{ width: "60%" }}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        {assessment.change < 0 ? (
                          <TrendingDown className="w-4 h-4 text-[#7FB885]" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-[#FF8C42]" />
                        )}
                        <span>
                          {Math.abs(assessment.change)} from last week
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
