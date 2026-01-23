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
  Pencil,
  BookOpen,
  Clock,
  Calendar,
  ClipboardList,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import { intPsychTheme, sigmundTheme } from "../components/theme";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";
import Link from "next/link";
import sigmund_chair from "public/Sigmund Chair.png";

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
    value: number;
  };
  severity: {
    percentage: number;
    level: string;
  };
  journal: {
    recent: Array<{
      id: string;
      content: string;
      contentSnippet: string;
      mood: number;
      createdAt: string;
    }>;
    total: number;
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
        <div className="flex items-center justify-center h-full min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <span
                style={{
                  borderTopColor: intPsychTheme.accent,
                  borderRightColor: intPsychTheme.accentLight,
                  borderBottomColor: intPsychTheme.accentLight,
                  borderLeftColor: intPsychTheme.accentLight,
                }}
                className="absolute inset-0 border-4 rounded-full animate-spin"
              />
              <span
                className={`absolute inset-2 bg-[${intPsychTheme.accent}] rounded-full opacity-0`}
              />
            </div>
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
                <span style={{ color: sigmundTheme.accent }}>
                  {firstName + "!"}
                </span>
              </h1>
              <p className="text-stone-500 text-lg font-medium flex items-center gap-2">
                {weatherGreeting
                  ? `It's ${weatherGreeting.replace(", ", "").toLowerCase()}.`
                  : "Ready to continue your journey?"}
              </p>
            </div>
            <WeatherWidget weather={weather} />
          </div>

          {/* Main Action Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hero Card: New Journal Entry */}
            <div
              style={{ borderColor: sigmundTheme.border }}
              className="lg:col-span-2 bg-white rounded-2xl border-b-4 border-2 p-1 shadow-sm group hover:border-[#1c1917]/20 transition-all duration-300"
            >
              <div
                style={{ backgroundColor: sigmundTheme.background }}
                className={`rounded-[12px] p-6 h-full relative overflow-hidden flex flex-col sm:flex-row items-center gap-8`}
              >
                {/* Sigmund Image */}
                <div className="w-80 h-80 relative flex-shrink-0">
                  <div className="absolute inset-0 bg-[#e7e5e4] rounded-full blur-2xl opacity-50 transform translate-y-4" />
                  <Image
                    src={sigmund_chair}
                    alt="Sigmund"
                    fill
                    className="object-contain drop-shadow-md"
                  />
                </div>
                <div className="flex-1 relative z-10 w-full flex flex-col items-end text-right">
                  <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm font-bold mb-4 border border-[#e7e5e4] text-[#1c1917]">
                    <Pencil className="w-4 h-4 text-[#1c1917]" />
                    DAILY REFLECTION
                  </div>
                  <h2
                    className={`${dm_serif.className} text-3xl mb-3 text-[#1c1917]`}
                  >
                    How are you feeling?
                  </h2>
                  <p className="text-[#44403c] text-lg leading-relaxed mb-8 max-w-md">
                    Take a moment to check in with yourself. I'm here to listen
                    and help you find clarity.
                  </p>

                  <div className="flex justify-end w-full">
                    <Link href="/journal">
                      <button
                        className={`cursor-pointer px-8 py-3 bg-[${sigmundTheme.accent}] text-white rounded-xl font-bold hover:bg-[${sigmundTheme.secondaryDark}] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-stone-900/10`}
                      >
                        New Entry
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Past Entries Mini-Card */}
            <div
              className={`lg:col-span-1 bg-white rounded-2xl border-b-4 border-[${sigmundTheme.border}] p-6 shadow-sm flex flex-col items-center justify-center text-center gap-4 hover:border-[${sigmundTheme.accent}]/30 transition-all cursor-pointer group relative overflow-hidden`}
            >
              <div
                className={`bg-[${sigmundTheme.background}] p-5 rounded-2xl mb-2 group-hover:scale-110 transition-transform duration-300 shadow-inner`}
              >
                <BookOpen className="w-10 h-10 text-[#57534e]" />
              </div>

              <div className="relative z-10">
                <h3
                  className={`${dm_serif.className} text-2xl text-[#1c1917] mb-1`}
                >
                  Past Entries
                </h3>
                <p className="text-stone-500 font-medium mb-6">
                  Review your journey and insights.
                </p>
                <Link href="/journal">
                  <button
                    className={`w-full bg-white text-[${sigmundTheme.accent}] px-6 py-2 rounded-xl font-bold border-2 border-[${sigmundTheme.accent}] hover:bg-[${sigmundTheme.background}] hover:text-[${sigmundTheme.secondary}] hover:border-[${sigmundTheme.secondary}] transition-all`}
                  >
                    View History
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          {/*           
          <div>
            <h2
              className={`${dm_serif.className} text-2xl text-[#1c1917] mb-6 flex items-center gap-3`}
            >
              <Leaf className={`w-5 h-5 text-[${sigmundTheme.accent}]`} />
              Your Growth
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div
                className={`bg-white rounded-2xl border border-[${sigmundTheme.border}] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#e7e5e4] p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-[#57534e]" />
                  </div>
                  <span
                    className={`text-xs font-bold bg-[${sigmundTheme.background}] text-stone-500 px-2 py-1 rounded-md uppercase tracking-wide border border-[${sigmundTheme.border}]`}
                  >
                    Total
                  </span>
                </div>
                <h3 className="text-stone-500 font-bold text-xs uppercase tracking-wider mb-1">
                  Journal Entries
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-3xl font-bold text-[#1c1917]">
                    {dashboardData?.journal?.total || 0}
                  </span>
                </div>
                <div className="w-full bg-[#e7e5e4] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#57534e] h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: "100%", // Always full for now or calculate based on goal
                    }}
                  />
                </div>
              </div>

              
              <div
                className={`bg-white rounded-2xl border border-[${sigmundTheme.border}] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#ffedd5] p-2 rounded-lg">
                    <Sun className="w-5 h-5 text-[#ea580c]" />
                  </div>
                  <span
                    className={`text-xs font-bold bg-[${sigmundTheme.background}] text-stone-500 px-2 py-1 rounded-md uppercase tracking-wide border border-[${sigmundTheme.border}]`}
                  >
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

              
              <div
                className={`bg-white rounded-2xl border border-[${sigmundTheme.border}] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-[#ffe4e6] p-2 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-[#e11d48]" />
                  </div>
                  <span
                    className={`text-xs font-bold bg-[${sigmundTheme.background}] text-stone-500 px-2 py-1 rounded-md uppercase tracking-wide border border-[${sigmundTheme.border}]`}
                  >
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

              
              <div
                className={`bg-white rounded-2xl border border-[${sigmundTheme.border}] border-b-4 p-6 hover:-translate-y-1 transition-transform duration-300 shadow-sm`}
              >
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
          </div> */}

          {/* Recent Journal Entries Section */}
          {/* <div>
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`${dm_serif.className} text-2xl text-[#1c1917] flex items-center gap-3`}
              >
                <BookOpen className="w-5 h-5 text-[#1c1917]" />
                Recent entries
              </h2>
              <Link
                href="/journal"
                className="text-[#57534e] font-bold uppercase text-xs hover:underline tracking-wide"
              >
                View All
              </Link>
            </div>

            <div className="space-y-4">
              {!dashboardData?.journal?.recent ||
              dashboardData.journal.recent.length === 0 ? (
                <div
                  className={`bg-white rounded-2xl p-8 text-center border-2 border-dashed border-[${sigmundTheme.border}]`}
                >
                  <p className="text-stone-400 font-medium">
                    No entries yet. Why not write your first one?
                  </p>
                </div>
              ) : (
                dashboardData.journal.recent.map((entry) => (
                  <Link key={entry.id} href="/journal">
                    <div
                      className={`bg-white rounded-xl border border-[${sigmundTheme.border}] border-b-2 p-4 flex items-center justify-between hover:border-stone-400 transition-colors group shadow-sm mb-4 cursor-pointer`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[#f5f5f4] flex items-center justify-center text-[#57534e] group-hover:bg-[#e7e5e4] transition-colors">
                          <Leaf className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-500 uppercase tracking-wide flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {new Date(entry.createdAt).toLocaleDateString()}
                          </p>
                          <p className="font-medium text-[#1c1917] line-clamp-1 mt-1">
                            {entry.contentSnippet}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-[#fafaf9] flex items-center justify-center text-stone-300 group-hover:text-[#1c1917] transition-colors">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div> */}

          {/* Coming Soon Section */}
          <div className="pt-8 border-t border-stone-100">
            <h2
              className={`${dm_serif.className} text-xl text-stone-400 mb-6 flex items-center gap-3`}
            >
              <Star className="w-5 h-5 text-stone-300" />
              Coming Soon
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 grayscale-[0.5] pointer-events-none select-none">
              {/* Feature 1: Clinical Scales */}
              <div
                className={`bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 p-6 flex flex-col items-center text-center gap-4`}
              >
                <div className="bg-white p-4 rounded-full shadow-sm">
                  <ClipboardList className="w-6 h-6 text-stone-400" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-600 mb-1">
                    Clinical Scales
                  </h3>
                  <p className="text-sm text-stone-400">
                    Track your progress with standard psychiatric measures.
                  </p>
                </div>
              </div>

              {/* Feature 2: Psychoeducation */}
              <div
                className={`bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 p-6 flex flex-col items-center text-center gap-4`}
              >
                <div className="bg-white p-4 rounded-full shadow-sm">
                  <GraduationCap className="w-6 h-6 text-stone-400" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-600 mb-1">
                    Psychoeducation
                  </h3>
                  <p className="text-sm text-stone-400">
                    Learn evidence-based strategies for mental wellness.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
