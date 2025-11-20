"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trophy,
  Lock,
} from "lucide-react";
import { intPsychTheme } from "../components/theme";
import { DM_Serif_Text, DM_Sans } from "next/font/google";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";

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
      name: "PHQ-9",
      fullName: "Patient Health Questionnaire",
      description: "Measures depression severity over the last 2 weeks",
      frequency: "Weekly",
      type: "phq9",
      color: "blue", // Will map to theme
    },
    {
      name: "GAD-7",
      fullName: "Generalized Anxiety Disorder Scale",
      description: "Measures anxiety severity over the last 2 weeks",
      frequency: "Weekly",
      type: "gad7",
      color: "indigo",
    },
    {
      name: "PSS-4",
      fullName: "Perceived Stress Scale",
      description: "Assesses stress levels over the last month",
      frequency: "Monthly",
      type: "pss4",
      color: "purple",
    },
    {
      name: "PTSD Screen",
      fullName: "Post-Traumatic Stress Disorder Screen",
      description: "Screens for PTSD symptoms over the past month",
      frequency: "As needed",
      type: "ptsd",
      color: "rose",
    },
    {
      name: "CRAFFT",
      fullName: "Substance Use Screening",
      description: "Screens for substance use risk in the past 12 months",
      frequency: "As needed",
      type: "crafft",
      color: "orange",
    },
    {
      name: "ASRS-5",
      fullName: "Adult ADHD Self-Report Scale",
      description: "Screens for ADHD symptoms",
      frequency: "As needed",
      type: "asrs5",
      color: "teal",
    },
  ];

  const completedTypes = new Set(
    history.map((h) => h.assessmentType.toLowerCase())
  );

  const assignedTypes = new Set(
    assignedAssessments.map((a) => a.assessmentType.toLowerCase())
  );

  const assignedAssessmentsList = allAssessments
    .filter((assessment) => assignedTypes.has(assessment.type.toLowerCase()))
    .map((assessment) => {
      const assigned = assignedAssessments.find(
        (a) => a.assessmentType.toLowerCase() === assessment.type.toLowerCase()
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
    (assessment) => !assignedTypes.has(assessment.type.toLowerCase())
  );

  const getLastTaken = (type: string) => {
    const lastCompleted = history
      .filter((h) => h.assessmentType.toLowerCase() === type.toLowerCase())
      .sort(
        (a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      )[0];
    return lastCompleted ? formatDate(lastCompleted.completedAt) : "Never";
  };

  return (
    <div className={`min-h-screen p-6 md:p-8 ${dm_sans.className}`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1
              className={`${dm_serif.className} text-4xl mb-2`}
              style={{ color: intPsychTheme.primary }}
            >
              Clinical Assessments
            </h1>
            <p className="text-stone-500 text-lg font-medium">
              Track your progress with standard psychiatric measures.
            </p>
          </div>
          <WeatherWidget weather={weather} />
        </div>

        {/* Assigned Assessments */}
        {assignedAssessmentsList.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle
                className="w-6 h-6"
                style={{ color: intPsychTheme.secondary }}
              />
              <h2
                className={`${dm_serif.className} text-2xl`}
                style={{ color: intPsychTheme.primary }}
              >
                Priority Assessments
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {assignedAssessmentsList.map((assessment) => (
                <div
                  key={assessment.name}
                  className="bg-white rounded-2xl border-b-4 border-[#e7e5e4] hover:border-[#ffa440]/30 p-6 transition-all group relative overflow-hidden shadow-sm"
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
                    <div className="w-12 h-12 rounded-xl bg-[#0072ce]/10 flex items-center justify-center mb-4 border border-[#0072ce]/20">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: intPsychTheme.accent }}
                      >
                        {assessment.name[0]}
                      </span>
                    </div>
                    <h3
                      className="text-xl font-bold mb-1"
                      style={{ color: intPsychTheme.primary }}
                    >
                      {assessment.name}
                    </h3>
                    <p className="text-stone-500 font-medium text-sm mb-4">
                      {assessment.fullName}
                    </p>
                    <p className="text-stone-600 bg-[#f8fafc] p-3 rounded-lg text-sm leading-relaxed border-l-4 border-[#e2e8f0]">
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
                      onClick={() =>
                        router.push(`/assessments/${assessment.type}`)
                      }
                      style={{ backgroundColor: intPsychTheme.secondary }}
                      className="w-full text-white py-3.5 rounded-xl font-bold shadow-[0_2px_0_0_#c27b00] hover:bg-[#ffb366] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
                    >
                      Start Assessment
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Available Assessments */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Trophy
              className="w-6 h-6"
              style={{ color: intPsychTheme.accent }}
            />
            <h2
              className={`${dm_serif.className} text-2xl`}
              style={{ color: intPsychTheme.primary }}
            >
              Available Assessments
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {availableAssessments.map((assessment) => (
              <div
                key={assessment.name}
                className="bg-white rounded-2xl border-b-4 border-[#e7e5e4] hover:border-[#0072ce]/20 p-6 transition-all group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#0072ce]/10 flex items-center justify-center border border-[#0072ce]/20">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: intPsychTheme.accent }}
                      >
                        {assessment.name[0]}
                      </span>
                    </div>
                    {/* Removed "Completed" badge logic as requested */}
                  </div>

                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: intPsychTheme.primary }}
                  >
                    {assessment.name}
                  </h3>
                  <p className="text-stone-500 font-medium text-sm mb-4">
                    {assessment.fullName}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-stone-400 uppercase tracking-wide mb-6">
                    <Calendar className="w-4 h-4" />
                    Last: {getLastTaken(assessment.type)}
                  </div>
                </div>

                <button
                  onClick={() => router.push(`/assessments/${assessment.type}`)}
                  className="w-full bg-white border border-[#e7e5e4] border-b-2 text-stone-600 py-3 rounded-xl font-bold hover:bg-[#f0f9ff] hover:border-[#0072ce]/30 hover:text-[#0072ce] transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
                >
                  Start
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* History Log */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-stone-400" />
            <h2
              className={`${dm_serif.className} text-2xl`}
              style={{ color: intPsychTheme.primary }}
            >
              Assessment History
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f8fafc] border-b border-[#e7e5e4]">
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
                <tbody className="divide-y divide-[#e7e5e4]">
                  {history.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="p-8 text-center text-stone-400 font-medium"
                      >
                        No history recorded yet.
                      </td>
                    </tr>
                  ) : (
                    history.slice(0, 5).map((record, index) => (
                      <tr
                        key={index}
                        className="hover:bg-[#f8fafc] transition-colors"
                      >
                        <td className="p-4 font-medium text-stone-600">
                          {formatDate(record.completedAt)}
                        </td>
                        <td
                          className="p-4 font-bold"
                          style={{ color: intPsychTheme.primary }}
                        >
                          {record.assessmentType.toUpperCase()}
                        </td>
                        <td className="p-4 font-medium text-stone-600">
                          <span className="bg-[#f1f5f9] px-2 py-1 rounded-md border border-[#e2e8f0]">
                            {record.totalScore}
                          </span>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${
                              record.severity === "Mild" ||
                              record.severity === "Minimal" ||
                              record.severity === "None"
                                ? "bg-[#dcfce7] text-[#166534] border-[#bbf7d0]"
                                : record.severity === "Moderate"
                                  ? "bg-[#fef9c3] text-[#854d0e] border-[#fde047]"
                                  : "bg-[#ffe4e6] text-[#be123c] border-[#fda4af]"
                            }`}
                          >
                            {record.severity}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
