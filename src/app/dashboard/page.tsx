"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import {
  Leaf,
  TrendingDown,
  TrendingUp,
  ArrowRight,
  Zap,
  Moon,
  Sun,
  Target,
  Trophy,
  Star,
  ClipboardList,
} from "lucide-react";
import { intPsychTheme } from "../components/theme";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";
import Link from "next/link";

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
const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

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

  const firstName = session?.user?.name?.split(" ")[0] || "Friend";

  if (loading) {
    return (
      <PortalLayout>
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-[#15803d]/30 border-t-[#15803d] rounded-full animate-spin"></div>
            <div className="font-medium text-stone-500 animate-pulse">
              Gathering your data...
            </div>
          </div>
        </div>
      </PortalLayout>
    );
  }

  const getWeatherGreeting = (
    weather: { condition: string; icon: string } | null
  ): string => {
    if (!weather) return "";
    const icon = weather.icon;
    const hour = new Date().getHours();
    const isNight = hour >= 17 || hour < 6;

    if (icon === "sun" || weather.condition.toLowerCase() === "clear") {
      return isNight ? ", clear skies tonight" : ", nice and sunny";
    } else if (icon === "cloud-rain") {
      return ", bring an umbrella";
    }
    return "";
  };

  const weatherGreeting = getWeatherGreeting(weather);

  return (
    <PortalLayout>
      <div className={`min-h-screen p-6 md:p-8 ${dm_sans.className}`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Area */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1
                className={`${dm_serif.className} text-4xl md:text-5xl mb-2 text-[#1c1917]`}
              >
                Hi,{" "}
                <span style={{ color: intPsychTheme.accent }}>{firstName}</span>
                !
              </h1>
              <p className="text-stone-500 text-lg font-medium flex items-center gap-2">
                {weatherGreeting
                  ? `It's ${weatherGreeting.replace(", ", "").toLowerCase()} today.`
                  : "Ready to continue your journey?"}
              </p>
            </div>
            <WeatherWidget weather={weather} />
          </div>

          {/* Main Action Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Card: Current Mission / Psychoeducation */}
            <div
              style={{ borderColor: intPsychTheme.accent }}
              className="lg:col-span-2 bg-white rounded-2xl border-b-4 border-2 p-1 shadow-sm group hover:border-[#15803d]/40 transition-all duration-300"
            >
              <div
                style={{ backgroundColor: intPsychTheme.accentLight }}
                className="bg-gradient-to-br from-[#0072ce] to-[#004684] rounded-[12px] p-8 h-full text-white relative overflow-hidden"
              >
                {/* Background Pattern - Organic Shapes */}
                <div
                  style={{ backgroundColor: intPsychTheme.accent }}
                  className="absolute top-0 right-0 w-64 h-64 bg-[#0072ce] opacity-10 rounded-full -mr-16 -mt-16 blur-3xl mix-blend-overlay"
                ></div>
                <div
                  style={{ backgroundColor: intPsychTheme.accent }}
                  className="absolute bottom-0 left-0 w-48 h-48 bg-[#0072ce] opacity-10 rounded-full -ml-10 -mb-10 blur-2xl mix-blend-overlay"
                ></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold mb-4 border border-white/10 text-[#dcfce7]">
                      <Leaf className="w-4 h-4" />
                      DAILY GROWTH
                    </div>
                    <h2 className={`${dm_serif.className} text-3xl mb-2`}>
                      Behavioral Activation
                    </h2>
                    <p className="text-[#dcfce7] text-lg max-w-xl leading-relaxed font-normal">
                      Schedule enjoyable, meaningful activities to boost your
                      mood. Let's plant one simple activity for this week.
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        <div
                          style={{ backgroundColor: intPsychTheme.accent }}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        ></div>
                        <div
                          style={{ backgroundColor: intPsychTheme.secondary }}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        ></div>
                        <div
                          style={{ backgroundColor: intPsychTheme.accent }}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-[#dcfce7]">
                        124 others started today
                      </span>
                    </div>
                    <button
                      className="px-6 py-3 bg-white rounded-xl font-bold border-b-4 border-blue-100 hover:bg-blue-50 active:border-b-0 active:translate-y-[4px] transition-all flex items-center gap-2 uppercase tracking-wide text-sm"
                      style={{ color: intPsychTheme.accent }}
                    >
                      Begin
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Garden Mini-Card */}
            <div className="lg:col-span-1 bg-white rounded-2xl border-b-4 border-[#84cc16]/30 p-6 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:border-[#84cc16]/50 transition-all cursor-pointer group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-[#f7fee7]/50 to-transparent pointer-events-none" />

              <div className="bg-[#ecfccb] p-4 rounded-full mb-2 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                <img
                  src="/assets/garden/flower_orange.png"
                  alt="Flower"
                  className="w-16 h-16 object-contain drop-shadow-sm"
                />
              </div>

              <div className="relative z-10">
                <h3
                  className={`${dm_serif.className} text-2xl text-[#3f6212] mb-1`}
                >
                  Your Garden
                </h3>
                <p className="text-[#65a30d] font-medium mb-4">
                  Everything is blooming.
                </p>
                <Link href="/garden">
                  <button className="w-full bg-[#84cc16] text-white px-6 py-2 rounded-xl font-bold border-b-4 border-[#65a30d] hover:bg-[#65a30d] active:border-b-0 active:translate-y-[4px] transition-all shadow-sm">
                    Visit Garden
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div>
            <h2
              className={`${dm_serif.className} text-2xl text-[#1c1917] mb-6 flex items-center gap-3`}
            >
              <Leaf className="w-5 h-5 text-[#15803d]" />
              Your Growth
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Assessments Progress */}
              <div className="bg-white rounded-2xl border border-[#e7e5e4] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#f3e8ff] p-2 rounded-lg">
                    <Target className="w-5 h-5 text-[#7e22ce]" />
                  </div>
                  <span className="text-xs font-bold bg-[#fafaf9] text-stone-500 px-2 py-1 rounded-md uppercase tracking-wide border border-[#e7e5e4]">
                    Weekly
                  </span>
                </div>
                <h3 className="text-stone-500 font-bold text-xs uppercase tracking-wider mb-1">
                  Assessments
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-[#1c1917]">
                    {dashboardData?.assessments.completed || 0}
                  </span>
                  <span className="text-stone-400 font-medium">
                    / {dashboardData?.assessments.total || 0}
                  </span>
                </div>
                <div className="w-full bg-[#f3e8ff] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#a855f7] h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${((dashboardData?.assessments.completed || 0) / (dashboardData?.assessments.total || 1)) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Current Mood */}
              <div className="bg-white rounded-2xl border border-[#e7e5e4] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#ffedd5] p-2 rounded-lg">
                    <Sun className="w-5 h-5 text-[#ea580c]" />
                  </div>
                  <span className="text-xs font-bold bg-[#fafaf9] text-stone-500 px-2 py-1 rounded-md uppercase tracking-wide border border-[#e7e5e4]">
                    Today
                  </span>
                </div>
                <h3 className="text-stone-500 font-bold text-xs uppercase tracking-wider mb-1">
                  Current Mood
                </h3>
                <div className="text-2xl font-bold text-[#1c1917] mb-1 truncate">
                  {dashboardData?.mood.current || "Not set"}
                </div>
                <p className="text-xs font-medium text-stone-400">
                  Last:{" "}
                  {dashboardData?.mood.lastUpdated
                    ? new Date(
                        dashboardData.mood.lastUpdated
                      ).toLocaleDateString()
                    : "Never"}
                </p>
              </div>

              {/* Symptom Severity */}
              <div className="bg-white rounded-2xl border border-[#e7e5e4] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#ffe4e6] p-2 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-[#e11d48]" />
                  </div>
                  <span className="text-xs font-bold bg-[#fafaf9] text-stone-500 px-2 py-1 rounded-md uppercase tracking-wide border border-[#e7e5e4]">
                    Status
                  </span>
                </div>
                <h3 className="text-stone-500 font-bold text-xs uppercase tracking-wider mb-1">
                  Symptom Level
                </h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold text-[#1c1917]">
                    {dashboardData?.severity.level || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#e11d48]">
                  {dashboardData?.severity.percentage || 0}% Severity
                </div>
              </div>

              {/* Streak / Generic */}
              <div className="bg-white rounded-2xl border border-[#e7e5e4] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#fef9c3] p-2 rounded-lg">
                    <Star className="w-5 h-5 text-[#ca8a04]" />
                  </div>
                </div>
                <h3 className="text-stone-500 font-bold text-xs uppercase tracking-wider mb-1">
                  Current Streak
                </h3>
                <div className="text-3xl font-bold text-[#1c1917] mb-1">
                  3 Days
                </div>
                <p className="text-xs font-medium text-stone-400">
                  Keep nurturing!
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity Section - styled as "Journal Log" */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`${dm_serif.className} text-2xl text-[#1c1917] flex items-center gap-3`}
              >
                <Target className="w-5 h-5 text-[#0369a1]" />
                Recent Milestones
              </h2>
              <Link
                href="/assessments"
                className="text-[#0369a1] font-bold uppercase text-xs hover:underline tracking-wide"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {dashboardData?.assessments.recent?.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-[#e7e5e4]">
                  <p className="text-stone-400 font-medium">
                    No milestones recorded yet.
                  </p>
                </div>
              ) : (
                dashboardData?.assessments.recent
                  ?.slice(0, 3)
                  .map((assessment, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-[#e7e5e4] border-b-2 p-4 flex items-center justify-between hover:border-[#0369a1]/30 transition-colors group shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#e0f2fe] flex items-center justify-center text-[#0369a1] group-hover:bg-[#bae6fd] transition-colors">
                          <ClipboardList className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#1c1917]">
                            {assessment.name}
                          </h3>
                          <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">
                            Score: {assessment.score} • {assessment.severity}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div
                          className={`flex items-center gap-1 font-bold text-sm ${assessment.change < 0 ? "text-[#15803d]" : "text-[#ea580c]"}`}
                        >
                          {assessment.change < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <TrendingUp className="w-4 h-4" />
                          )}
                          <span>{Math.abs(assessment.change)} pts</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#fafaf9] flex items-center justify-center text-stone-300 group-hover:text-[#0369a1] transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
