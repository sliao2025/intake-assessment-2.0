"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, ChevronRight } from "lucide-react";
import { intPsychTheme } from "../components/theme";
import { DM_Serif_Text } from "next/font/google";
import { useWeather } from "../lib/hooks/useWeather";
import WeatherWidget from "../components/WeatherWidget";
const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

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
    // Parse the date string - extract date part to avoid timezone issues
    // Handle both ISO strings (2025-11-20T00:00:00.000Z) and date-only strings
    const dateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (!dateMatch) {
      // Fallback to regular date parsing
      const date = new Date(dateStr);
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `Due ${formattedDate}`;
    }

    // Extract year, month, day from the date string (UTC date, not local)
    const year = parseInt(dateMatch[1], 10);
    const month = parseInt(dateMatch[2], 10) - 1; // Month is 0-indexed
    const day = parseInt(dateMatch[3], 10);

    // Create date objects for comparison (in local timezone)
    const dueDate = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    // Format the date for display
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

  // All 7 adult assessments
  const allAssessments = [
    {
      name: "PHQ-9",
      fullName: "Patient Health Questionnaire",
      description: "Measures depression severity over the last 2 weeks",
      lastTaken: "Never",
      nextDue: "Due now",
      frequency: "Weekly",
      status: "Available",
      type: "phq9",
    },
    {
      name: "GAD-7",
      fullName: "Generalized Anxiety Disorder Scale",
      description: "Measures anxiety severity over the last 2 weeks",
      lastTaken: "Never",
      nextDue: "Due now",
      frequency: "Weekly",
      status: "Available",
      type: "gad7",
    },
    {
      name: "PSS-4",
      fullName: "Perceived Stress Scale",
      description: "Assesses stress levels over the last month",
      lastTaken: "Never",
      nextDue: "Due now",
      frequency: "Monthly",
      status: "Available",
      type: "pss4",
    },
    {
      name: "PTSD Screen",
      fullName: "Post-Traumatic Stress Disorder Screen",
      description: "Screens for PTSD symptoms over the past month",
      lastTaken: "Never",
      nextDue: "Due now",
      frequency: "As needed",
      status: "Available",
      type: "ptsd",
    },
    {
      name: "CRAFFT",
      fullName: "Substance Use Screening",
      description: "Screens for substance use risk in the past 12 months",
      lastTaken: "Never",
      nextDue: "Due now",
      frequency: "As needed",
      status: "Available",
      type: "crafft",
    },
    {
      name: "ASRS-5",
      fullName: "Adult ADHD Self-Report Scale",
      description: "Screens for ADHD symptoms",
      lastTaken: "Never",
      nextDue: "Due now",
      frequency: "As needed",
      status: "Available",
      type: "asrs5",
    },
  ];

  // Create a map of completed assessment types
  const completedTypes = new Set(
    history.map((h) => h.assessmentType.toLowerCase())
  );

  // Create a map of assigned assessment types (only if not completed)
  const assignedTypes = new Set(
    assignedAssessments
      .filter((a) => !completedTypes.has(a.assessmentType.toLowerCase()))
      .map((a) => a.assessmentType.toLowerCase())
  );

  // Split into assigned and available
  // Assigned: has assigned assessment AND not yet completed
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

  // Available: not assigned OR was assigned but has been completed
  const availableAssessments = allAssessments.filter(
    (assessment) => !assignedTypes.has(assessment.type.toLowerCase())
  );

  // Get last taken date for each assessment type from history
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
    <>
      {/* Header - Exact Figma */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1
            style={{ color: intPsychTheme.primary }}
            className={`${dm_serif.className} text-3xl text-gray-900 mb-2`}
          >
            Clinical Assessments
          </h1>
          <p className="text-gray-600">
            Track and complete your mental health assessments
          </p>
        </div>
        {/* Weather Widget - Upper Right */}
        <WeatherWidget weather={weather} />
      </div>

      {/* Assigned Assessments Section */}
      {assignedAssessmentsList.length > 0 && (
        <section className="mb-8">
          <h2
            style={{ color: intPsychTheme.primary }}
            className="font-serif text-xl text-gray-900 mb-4"
          >
            Assigned Assessments
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
            {assignedAssessmentsList.map((assessment) => (
              <div
                key={assessment.name}
                className="flex flex-col justify-between bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6"
              >
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl text-gray-700">
                        <b>{assessment.name}</b>
                      </h3>
                      <p className="text-gray-500">{assessment.fullName}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        assessment.status === "Overdue"
                          ? "bg-red-100 text-red-700 border border-red-400"
                          : "bg-blue-100 text-blue-700 border border-blue-400"
                      }`}
                    >
                      {assessment.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{assessment.description}</p>
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {assessment.assignedData?.dueDate
                          ? formatDueDate(assessment.assignedData.dueDate)
                          : "No due date"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Last taken: {getLastTaken(assessment.type)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Frequency: {assessment.frequency}</span>
                    </div>
                  </div>
                </>

                <button
                  onClick={() => router.push(`/assessments/${assessment.type}`)}
                  style={{
                    backgroundColor: intPsychTheme.secondary,
                    transition: "background-color 0.2s",
                  }}
                  className="cursor-pointer w-full text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ef8331";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      intPsychTheme.secondary;
                  }}
                >
                  Take Assessment
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Available Assessments Section */}
      <section className="mb-8">
        <h2
          style={{ color: intPsychTheme.primary }}
          className="font-serif text-xl text-gray-900 mb-4"
        >
          Available Assessments
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
          {availableAssessments.map((assessment) => (
            <div
              key={assessment.name}
              className="flex flex-col justify-between bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6"
            >
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl text-gray-700">
                      <b>{assessment.name}</b>
                    </h3>
                    <p className="text-gray-500">{assessment.fullName}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700 border border-blue-400">
                    Available
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{assessment.description}</p>
                <div className="space-y-2 mb-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Last taken: {getLastTaken(assessment.type)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Frequency: {assessment.frequency}</span>
                  </div>
                </div>
              </>

              <button
                onClick={() => router.push(`/assessments/${assessment.type}`)}
                style={{
                  backgroundColor: intPsychTheme.secondary,
                  transition: "background-color 0.2s",
                }}
                className="cursor-pointer w-full text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2"
                onMouseEnter={(e) => {
                  // Slightly darken the secondary color on hover for accessibility. Use a lighter darkening than before (e.g. #ef8331).
                  e.currentTarget.style.backgroundColor = "#ef8331";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    intPsychTheme.secondary;
                }}
              >
                Take Assessment
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Assessment History Section */}
      <section>
        <h2
          style={{ color: intPsychTheme.primary }}
          className="font-serif text-xl text-gray-900 mb-4"
        >
          Assessment History
        </h2>
        <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th
                    style={{ color: intPsychTheme.text }}
                    className="text-left p-4"
                  >
                    Date
                  </th>
                  <th
                    style={{ color: intPsychTheme.text }}
                    className="text-left p-4"
                  >
                    Assessment
                  </th>
                  <th
                    style={{ color: intPsychTheme.text }}
                    className="text-left p-4"
                  >
                    Score
                  </th>
                  <th
                    style={{ color: intPsychTheme.text }}
                    className="text-left p-4"
                  >
                    Severity
                  </th>
                  <th
                    style={{ color: intPsychTheme.text }}
                    className="text-left p-4"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-600">
                      Loading history...
                    </td>
                  </tr>
                ) : history.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-gray-600">
                      No assessment history yet. Take your first assessment
                      above.
                    </td>
                  </tr>
                ) : (
                  history.slice(0, 5).map((record, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="p-4 text-gray-600">
                        {formatDate(record.completedAt)}
                      </td>
                      <td className="p-4 text-gray-900">
                        {record.assessmentType.toUpperCase()}
                      </td>
                      <td className="p-4 text-gray-900">{record.totalScore}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            record.severity === "Mild"
                              ? "bg-[#A8D5BA] text-gray-900 border border-[#7FB885]"
                              : "bg-[#FFD9A6] text-gray-900 border border-[#FF8C42]"
                          }`}
                        >
                          {record.severity}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-gray-600 hover:text-gray-900">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
