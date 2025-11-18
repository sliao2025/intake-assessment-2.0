"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { Leaf, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";
import { intPsychTheme } from "../components/theme";
import { DM_Serif_Text, Roboto } from "next/font/google";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";

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
  const [clinician, setClinician] = useState<string | null>(null);
  const { weather } = useWeather();

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

    const fetchClinician = async () => {
      try {
        const response = await fetch("/api/profile/load");
        if (response.ok) {
          const data = await response.json();
          setClinician(data.clinician);
        }
      } catch (error) {
        console.error("Failed to load clinician:", error);
      }
    };

    fetchDashboardData();
    fetchClinician();
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

  const getWeatherGreeting = (
    weather: { condition: string; icon: string } | null
  ): string => {
    if (!weather) {
      return "";
    }

    const condition = weather.condition.toLowerCase();
    const icon = weather.icon;

    // Custom weather messages - direct and actionable (4 words max)
    if (icon === "sun" || condition === "clear") {
      return ", enjoy the sunshine";
    } else if (icon === "cloud-rain" || condition === "rain") {
      return ", don't forget an umbrella";
    } else if (icon === "snowflake" || condition === "snow") {
      return ", bundle up today";
    } else if (icon === "cloud-lightning" || condition === "thunderstorm") {
      return ", looks like a stormy day";
    } else if (
      icon === "cloud-drizzle" ||
      condition === "drizzle" ||
      condition === "foggy"
    ) {
      return ", enjoy the misty day";
    } else if (icon === "cloud" || condition === "cloudy") {
      return ", stay cozy today";
    }

    // Fallback
    return "";
  };

  const weatherGreeting = getWeatherGreeting(weather);

  return (
    <PortalLayout>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Exact Figma */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1
                style={{ color: intPsychTheme.primary }}
                className={`${dm_serif.className} text-3xl mb-0`}
              >
                Welcome {firstName}
                {weatherGreeting && `${weatherGreeting}.`}
              </h1>
              {clinician && (
                <p
                  style={{ color: intPsychTheme.textMuted }}
                  className=" text-sm"
                >
                  Your clinician:{" "}
                  <span className="font-medium">{clinician}</span>
                </p>
              )}
            </div>
            {/* Weather Widget - Upper Right */}
            <WeatherWidget weather={weather} />
          </div>

          {/* Main Garden and Psychoeducation Section - Exact Figma layout */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3 
          gap-6 mb-6"
          >
            {/* Garden Illustration */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-6 h-full shadow-[0_1px_2px_rgba(15,23,42,0.08)]">
                <div className="bg-emerald-50 rounded-2xl overflow-hidden h-[400px] shadow-[inset_0_0_0_1px_rgba(43,78,107,0.1)]"></div>
              </div>
            </div>

            {/* Psychoeducation Module - Exact Figma styling */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 h-full shadow-[0_1px_2px_rgba(15,23,42,0.08)] flex flex-col">
                <div className="mb-4">
                  <div
                    className={`${roboto.className} mb-2`}
                    style={{ color: intPsychTheme.textMuted }}
                  >
                    PSYCHOEDUCATION
                  </div>
                  <h2 className="mb-4" style={{ color: intPsychTheme.primary }}>
                    Behavioral Activation
                  </h2>
                  <p
                    className="mb-6"
                    style={{ color: intPsychTheme.textMuted }}
                  >
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
            <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="mb-2" style={{ color: intPsychTheme.primary }}>
                Assessments Completed
              </h3>
              <div className="mb-2" style={{ color: intPsychTheme.textMuted }}>
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
            <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="mb-2" style={{ color: intPsychTheme.primary }}>
                Current Mood
              </h3>
              <div className="mb-2" style={{ color: intPsychTheme.textMuted }}>
                {dashboardData?.mood.current || "Not set"}
              </div>
              <div style={{ color: intPsychTheme.textMuted }}>
                Last updated: {dashboardData?.mood.lastUpdated || "Never"}
              </div>
            </div>

            {/* Symptom Severity */}
            <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="mb-2" style={{ color: intPsychTheme.primary }}>
                Symptom Severity
              </h3>
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
                  <div style={{ color: intPsychTheme.textMuted }}>
                    {dashboardData?.severity.percentage || 0}%
                  </div>
                  <div style={{ color: intPsychTheme.textMuted }}>
                    {dashboardData?.severity.level || "Minimal"}
                  </div>
                </div>
              </div>
              <div
                className="flex items-center justify-between mt-4"
                style={{ color: intPsychTheme.textMuted }}
              >
                <span>Minimal</span>
                <span>Severe</span>
              </div>
            </div>

            {/* Trends */}
            <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
              <h3 className="mb-2" style={{ color: intPsychTheme.primary }}>
                Trends
              </h3>
              <div className="space-y-2">
                {dashboardData?.assessments.recent
                  ?.slice(0, 3)
                  .map((assessment, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between"
                    >
                      <span style={{ color: intPsychTheme.textMuted }}>
                        {assessment.name}
                      </span>
                      {assessment.change < 0 ? (
                        <TrendingDown className="w-4 h-4 text-[#7FB885]" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-[#FF8C42]" />
                      )}
                    </div>
                  ))}
              </div>
              <button
                className="w-full mt-4 py-2"
                style={{ color: intPsychTheme.textMuted }}
              >
                See Care Path Suggestions
              </button>
            </div>
          </div>

          {/* Clinical Assessments - Updated to Figma styling */}
          <div className="mb-6">
            <h2 className="mb-4" style={{ color: intPsychTheme.primary }}>
              Recent Assessments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {dashboardData?.assessments.recent
                ?.slice(0, 3)
                .map((assessment, idx) => (
                  <div
                    key={idx}
                    className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 style={{ color: intPsychTheme.primary }}>
                          {assessment.name}
                        </h3>
                        <p style={{ color: intPsychTheme.textMuted }}>
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
                        <div style={{ color: intPsychTheme.textMuted }}>
                          {assessment.score}
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-800 h-2 rounded-full"
                          style={{ width: "60%" }}
                        />
                      </div>
                      <div
                        className="flex items-center gap-2"
                        style={{ color: intPsychTheme.textMuted }}
                      >
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
