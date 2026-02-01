"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ChevronRight,
  AlertCircle,
  Clock,
  Trophy,
  ClipboardClock,
} from "lucide-react";
import { intPsychTheme, sigmundTheme } from "../components/theme";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";
import Drawer from "../components/Drawer";
import ScaleDetailDrawer from "../components/ScaleDetailDrawer";
import { getMDQSeverity } from "../../lib/utils";

const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });
const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface Assessment {
  id: string;
  assessmentType: string;
  totalScore: number;
  severity: string;
  completedAt: string;
  dueDate: string | null;
  responses: Record<string, any>;
}

interface AssignedAssessment {
  id: string;
  assessmentType: string;
  requestedBy: string;
  dueDate: string | null;
  completedAt: string;
}

export default function AssessmentsPage() {
  const router = useRouter();
  const [history, setHistory] = useState<Assessment[]>([]);
  const [assignedAssessments, setAssignedAssessments] = useState<
    AssignedAssessment[]
  >([]);
  const [loading, setLoading] = useState(true);
  const { weather } = useWeather();

  // Filtering & Selection
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedScale, setSelectedScale] = useState<Assessment | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [currIndex, setCurrIndex] = useState(0);

  const assignedScrollRef = React.useRef<HTMLDivElement>(null);
  const [assignedCurrIndex, setAssignedCurrIndex] = useState(0);

  const handleAssignedScroll = () => {
    if (assignedScrollRef.current) {
      const { scrollLeft, scrollWidth } = assignedScrollRef.current;
      const itemWidth = scrollWidth / assignedAssessmentsList.length;
      if (itemWidth > 0) {
        const index = Math.round(scrollLeft / itemWidth);
        setAssignedCurrIndex(
          Math.min(Math.max(0, index), assignedAssessmentsList.length - 1),
        );
      }
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      // Calculate active index based on scroll position
      // approximate item width is scrollWidth / items.length
      const itemWidth = scrollWidth / availableAssessments.length;
      if (itemWidth > 0) {
        const index = Math.round(scrollLeft / itemWidth);
        setCurrIndex(
          Math.min(Math.max(0, index), availableAssessments.length - 1),
        );
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/portal/assessments");
        if (response.ok) {
          const data = await response.json();
          setHistory(data.history || []);
          setAssignedAssessments(data.assignedAssessments || []);
        }
      } catch (error) {
        console.error("Failed to load assessments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDueDate = (dateStr: string | null) => {
    if (!dateStr) return "No due date";
    const dateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!dateMatch) {
      const date = new Date(dateStr);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `Due ${formattedDate}`;
    }

    const year = parseInt(dateMatch[1], 10);
    const month = parseInt(dateMatch[2], 10) - 1;
    const day = parseInt(dateMatch[3], 10);

    const dueDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const formattedDate = dueDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    if (dueDate < today) {
      return `Overdue (${formattedDate})`;
    } else if (dueDate.getTime() === today.getTime()) {
      return "Due today";
    } else {
      return `Due ${formattedDate}`;
    }
  };

  const allAssessments = [
    {
      name: "Depression Screening",
      fullName: "Patient Health Questionnaire (PHQ-9)",
      description: "Measures depression severity over the last 2 weeks",
      frequency: "Weekly",
      type: "phq9",
      color: "blue", // Will map to theme
    },
    {
      name: "Anxiety Screening",
      fullName: "Generalized Anxiety Disorder Scale (GAD-7)",
      description: "Measures anxiety severity over the last 2 weeks",
      frequency: "Weekly",
      type: "gad7",
      color: "indigo",
    },
    {
      name: "Stress Assessment",
      fullName: "Perceived Stress Scale (PSS-4)",
      description: "Assesses stress levels over the last month",
      frequency: "Monthly",
      type: "pss4",
      color: "purple",
    },
    {
      name: "Trauma Screening",
      fullName: "Post-Traumatic Stress Disorder Screen",
      description: "Screens for PTSD symptoms over the past month",
      frequency: "As needed",
      type: "ptsd",
      color: "rose",
    },
    {
      name: "Substance Use",
      fullName: "Substance Use Screening (CRAFFT)",
      description: "Screens for substance use risk in the past 12 months",
      frequency: "As needed",
      type: "crafft",
      color: "orange",
    },
    {
      name: "ADHD Screening",
      fullName: "Adult ADHD Self-Report Scale (ASRS-5)",
      description: "Screens for ADHD symptoms",
      frequency: "As needed",
      type: "asrs5",
      color: "teal",
    },
    {
      name: "Resilience Check",
      fullName: "ACE Resilience Scale",
      description: "Measures protective factors and resilience",
      frequency: "One-time",
      type: "aceresilience",
      color: "emerald",
    },
    {
      name: "Safety Check",
      fullName: "Self-Harm Screening",
      description: "Screens for recent and lifetime self-harm",
      frequency: "As needed",
      type: "selfharm",
      color: "rose",
    },
    {
      name: "Neurodiversity",
      fullName: "Autism Spectrum Quotient-10 (AQ-10)",
      description: "Screens for autism spectrum traits",
      frequency: "One-time",
      type: "aq10",
      color: "purple",
    },
    {
      name: "Mood Patterns",
      fullName: "Mood Disorder Questionnaire (MDQ)",
      description: "Screens for mood patterns and bipolar disorder",
      frequency: "One-time",
      type: "mdq",
      color: "orange",
    },
  ];

  const completedTypes = new Set(
    history.map((h) => h.assessmentType.toLowerCase()),
  );

  const assignedTypes = new Set(
    assignedAssessments.map((a) => a.assessmentType.toLowerCase()),
  );

  const assignedAssessmentsList = allAssessments
    .filter((assessment) => assignedTypes.has(assessment.type.toLowerCase()))
    .map((assessment) => {
      const assigned = assignedAssessments.find(
        (a) => a.assessmentType.toLowerCase() === assessment.type.toLowerCase(),
      );
      return {
        ...assessment,
        assignedData: assigned,
        status: assigned?.dueDate
          ? new Date(assigned.dueDate) < new Date()
            ? "Overdue"
            : "Assigned"
          : "Assigned",
      };
    });

  const availableAssessments = allAssessments.filter(
    (assessment) => !assignedTypes.has(assessment.type.toLowerCase()),
  );

  const getLastTaken = (type: string) => {
    const lastCompleted = history
      .filter((h) => h.assessmentType.toLowerCase() === type.toLowerCase())
      .sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime(),
      )[0];
    return lastCompleted ? formatDate(lastCompleted.completedAt) : "Never";
  };

  const filteredHistory = history.filter((scale) => {
    const scaleDate = new Date(scale.completedAt);
    const matchesType =
      filterType === "all" ||
      scale.assessmentType.toLowerCase() === filterType.toLowerCase();
    const matchesStartDate =
      !startDate || (scaleDate && scaleDate >= new Date(startDate));
    const matchesEndDate =
      !endDate || (scaleDate && scaleDate <= new Date(endDate));

    return matchesType && matchesStartDate && matchesEndDate;
  });

  const getAssessmentName = (type: string) => {
    return (
      allAssessments.find((a) => a.type === type)?.name || type.toUpperCase()
    );
  };

  return (
    <div className={`min-h-screen p-6 md:p-8 ${dm_sans.className}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1
              className={`${dm_serif.className} text-4xl mb-2`}
              style={{ color: sigmundTheme.accent }}
            >
              Clinical Scales
            </h1>
            <p className="text-stone-500 text-lg font-medium">
              Track your journey with standard psychiatric measures.
            </p>
          </div>
          <div className="hidden sm:block">
            <WeatherWidget weather={weather} />
          </div>
        </div>

        {/* Assigned Assessments */}
        {assignedAssessmentsList.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="w-6 h-6 text-amber-400" />
              <h2
                className={`${dm_serif.className} text-2xl`}
                style={{ color: sigmundTheme.accent }}
              >
                Assigned Scales
              </h2>
            </div>

            <div
              ref={assignedScrollRef}
              onScroll={handleAssignedScroll}
              className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 scrollbar-hide"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {assignedAssessmentsList.map((assessment) => (
                <div
                  key={assessment.name}
                  className={`min-w-[85%] sm:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1rem)] snap-center bg-white rounded-2xl flex flex-col justify-between  border-b-4 border-[${sigmundTheme.border}] hover:border-[${intPsychTheme.secondary}]/30 p-6 transition-all group relative overflow-hidden shadow-sm`}
                >
                  {assessment.status === "Overdue" && (
                    <div
                      className="absolute top-0 right-0 text-white text-xs font-bold uppercase px-4 py-1 rounded-bl-xl shadow-sm"
                      style={{ backgroundColor: intPsychTheme.alternate }}
                    >
                      Overdue
                    </div>
                  )}

                  <div className="mb-6">
                    <div
                      style={{
                        backgroundColor: sigmundTheme.primary,
                      }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-stone-200`}
                    >
                      <span
                        className="text-2xl font-bold"
                        style={{ color: sigmundTheme.accent }}
                      >
                        {assessment.name[0]}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-4"
                      style={{ color: sigmundTheme.accent }}
                    >
                      {assessment.name}
                    </h3>
                    <p
                      className={`text-stone-600 bg-[${intPsychTheme.background}] p-3 rounded-lg bg-stone-50 text-sm leading-relaxed border-l-4 border-[${sigmundTheme.border}]`}
                    >
                      {assessment.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm font-bold text-stone-400 uppercase tracking-wide">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {assessment.assignedData?.dueDate
                          ? formatDueDate(assessment.assignedData.dueDate)
                          : "No due date"}
                      </div>
                    </div>

                    <button
                      onClick={() => router.push(`/scales/${assessment.type}`)}
                      style={{
                        backgroundColor: sigmundTheme.secondary,
                        borderColor: sigmundTheme.secondaryDark,
                      }}
                      className="w-full cursor-pointer text-white py-3.5 rounded-xl font-bold border-b-4 hover:translate-y-[-1px] hover:brightness-105 active:brightness-95 active:translate-y-[1px] active:border-b-0 transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
                    >
                      Complete
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-2">
              {assignedAssessmentsList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (assignedScrollRef.current) {
                      const width =
                        assignedScrollRef.current.scrollWidth /
                        assignedAssessmentsList.length;
                      assignedScrollRef.current.scrollTo({
                        left: width * i,
                        behavior: "smooth",
                      });
                    }
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === assignedCurrIndex
                      ? `w-6 bg-[${sigmundTheme.secondary}]`
                      : "w-2 bg-stone-200 hover:bg-stone-300"
                  }`}
                  style={
                    i === assignedCurrIndex
                      ? { backgroundColor: sigmundTheme.secondary }
                      : {}
                  }
                />
              ))}
            </div>
          </section>
        )}

        {/* Available Scales */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Trophy
              className="w-6 h-6"
              style={{ color: sigmundTheme.secondary }}
            />
            <h2
              className={`${dm_serif.className} text-2xl`}
              style={{ color: sigmundTheme.accent }}
            >
              Available Scales
            </h2>
          </div>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-6 px-6 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {availableAssessments.map((assessment) => (
              <div
                key={assessment.name}
                className={`min-w-[85%] sm:min-w-[calc(50%-1.5rem)] lg:min-w-[calc(33.333%-1rem)] snap-center bg-white border border-stone-200 rounded-2xl border-b-4 p-6 transition-all group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div
                      style={{
                        backgroundColor: sigmundTheme.primary,
                      }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-stone-200`}
                    >
                      <span
                        className="text-2xl font-bold"
                        style={{ color: sigmundTheme.accent }}
                      >
                        {assessment.name[0]}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: sigmundTheme.accent }}
                  >
                    {assessment.name}
                  </h3>

                  <p
                    className={`text-stone-600 bg-[${intPsychTheme.background}] p-3 rounded-lg bg-stone-50 text-sm leading-relaxed border-l-4 border-[${sigmundTheme.border}] mb-6`}
                  >
                    {assessment.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wide mb-6">
                    <Calendar className="w-4 h-4" />
                    Last: {getLastTaken(assessment.type)}
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/scales/${assessment.type}`)}
                  className={`w-full bg-white border border-[${sigmundTheme.border}] border-b-2 text-stone-600 py-3 rounded-xl font-bold cursor-pointer hover:bg-[#b2bfa233] hover:border-[${sigmundTheme.secondary}]/30 hover:text-[${sigmundTheme.secondary}] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs`}
                >
                  Start
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-2">
            {availableAssessments.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (scrollRef.current) {
                    const width =
                      scrollRef.current.scrollWidth /
                      availableAssessments.length;
                    scrollRef.current.scrollTo({
                      left: width * i,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`h-2 rounded-full transition-all ${
                  i === currIndex
                    ? `w-6 bg-[${sigmundTheme.secondary}]`
                    : "w-2 bg-stone-200 hover:bg-stone-300"
                }`}
                style={
                  i === currIndex
                    ? { backgroundColor: sigmundTheme.secondary }
                    : {}
                }
              />
            ))}
          </div>
        </section>

        {/* History Log */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <ClipboardClock
              className="w-6 h-6"
              style={{ color: sigmundTheme.secondary }}
            />
            <h2
              className={`${dm_serif.className} text-2xl`}
              style={{ color: sigmundTheme.accent }}
            >
              Scale History
            </h2>
          </div>

          <style jsx>{`
            .scrollbar-custom::-webkit-scrollbar {
              width: 8px;
            }
            .scrollbar-custom::-webkit-scrollbar-track {
              margin-top: 6px;
              margin-bottom: 12px;
            }
            .scrollbar-custom::-webkit-scrollbar-thumb {
              background: ${sigmundTheme.primary};
              border-radius: 4px;
            }
          `}</style>

          <div
            className={`bg-white rounded-2xl border border-[${sigmundTheme.border}] overflow-hidden`}
          >
            {/* Filter Bar */}
            <div className="p-4 bg-stone-50/30 border-b border-stone-100 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Scale:
                </span>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="text-xs font-medium bg-white border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-stone-300"
                >
                  <option value="all">All Scales</option>
                  {allAssessments.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  From:
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="text-xs font-medium bg-white border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-stone-300"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  To:
                </span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-xs font-medium bg-white border border-stone-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-stone-300"
                />
              </div>

              <div className="ml-auto flex items-center gap-2">
                {(filterType !== "all" || startDate || endDate) && (
                  <button
                    onClick={() => {
                      setFilterType("all");
                      setStartDate("");
                      setEndDate("");
                    }}
                    className="text-xs border border-red-200 bg-red-50 hover:bg-red-100 cursor-pointer px-2 py-1 rounded-full text-rose-500 tracking-wider hover:text-rose-600"
                  >
                    Clear Filters
                  </button>
                )}
                <span className="text-sm font-medium text-stone-500 bg-white px-3 py-1 rounded-full border border-stone-200">
                  {filteredHistory.length}{" "}
                  {filteredHistory.length === 1 ? "Scale" : "Scales"}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto max-h-[600px] overflow-y-auto scrollbar-custom">
              <table className="w-full">
                <thead
                  className={`bg-[${intPsychTheme.background}] border-b border-[${sigmundTheme.border}]`}
                >
                  <tr>
                    <th className="text-left p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Assessment
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="text-left p-4 text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y divide-stone-200`}>
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-stone-400 font-medium"
                      >
                        No matching scales found.
                      </td>
                    </tr>
                  ) : (
                    filteredHistory.map((record, index) => {
                      const isLate =
                        record.dueDate &&
                        new Date(record.completedAt) > new Date(record.dueDate);
                      return (
                        <tr
                          key={record.id}
                          onClick={() =>
                            setSelectedScale({
                              ...record,
                              severity:
                                record.severity ||
                                (record.assessmentType.toLowerCase() === "mdq"
                                  ? getMDQSeverity(record.responses)
                                  : record.severity),
                            })
                          }
                          className={`hover:bg-stone-50 transition-colors cursor-pointer`}
                        >
                          <td className="p-4 font-medium text-stone-600">
                            {formatDate(record.completedAt)}
                          </td>
                          <td
                            className="p-4 font-bold"
                            style={{ color: sigmundTheme.accent }}
                          >
                            {getAssessmentName(record.assessmentType)}
                          </td>
                          <td className="p-4 font-medium text-stone-600">
                            <span className="bg-[#f1f5f9] px-2 py-1 rounded-md border border-[#e2e8f0]">
                              {record.assessmentType.toLowerCase() === "mdq"
                                ? record.severity ||
                                  getMDQSeverity(record.responses) ||
                                  "—"
                                : record.totalScore !== null &&
                                    record.totalScore !== undefined
                                  ? record.totalScore
                                  : "—"}
                            </span>
                          </td>
                          <td className="p-4">
                            {isLate ? (
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-[#ffe4e6] text-[#be123c] border-[#fda4af]">
                                Late
                              </span>
                            ) : (
                              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border bg-[#dcfce7] text-[#166534] border-[#bbf7d0]">
                                On Time
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Drawer isOpen={!!selectedScale} onClose={() => setSelectedScale(null)}>
          {selectedScale && <ScaleDetailDrawer scale={selectedScale} />}
        </Drawer>
      </div>
    </div>
  );
}
