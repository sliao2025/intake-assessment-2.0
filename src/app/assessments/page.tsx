"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PortalLayout from "../components/portal/Layout/PortalLayout";
import { Calendar, ChevronRight } from "lucide-react";
import { intPsychTheme } from "../components/theme";
import { DM_Serif_Text } from "next/font/google";
const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

interface Assessment {
  id: string;
  assessmentType: string;
  totalScore: number;
  severity: string;
  completedAt: string;
}

export default function AssessmentsPage() {
  const router = useRouter();
  const [history, setHistory] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/portal/assessments");
        if (response.ok) {
          const data = await response.json();
          setHistory(data.history || []);
        }
      } catch (error) {
        console.error("Failed to load assessment history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Available assessments with Figma data structure
  const availableAssessments = [
    {
      name: "PHQ-9",
      fullName: "Patient Health Questionnaire",
      description: "Measures depression severity",
      lastTaken: "2 days ago",
      nextDue: "5 days",
      frequency: "Weekly",
      status: "Up to date",
      type: "phq9",
    },
    {
      name: "GAD-7",
      fullName: "Generalized Anxiety Disorder",
      description: "Measures anxiety severity",
      lastTaken: "2 days ago",
      nextDue: "5 days",
      frequency: "Weekly",
      status: "Up to date",
      type: "gad7",
    },
    {
      name: "PSQ",
      fullName: "Pittsburgh Sleep Questionnaire",
      description: "Assesses sleep quality",
      lastTaken: "9 days ago",
      nextDue: "Overdue",
      frequency: "Weekly",
      status: "Overdue",
      type: "sleep",
    },
    {
      name: "WEMWBS",
      fullName: "Warwick-Edinburgh Mental Wellbeing Scale",
      description: "Measures mental wellbeing",
      lastTaken: "1 month ago",
      nextDue: "2 weeks",
      frequency: "Monthly",
      status: "Up to date",
      type: "wellbeing",
    },
  ];

  return (
    <PortalLayout>
      <div className="min-h-screen  p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header - Exact Figma */}
          <div className="mb-8">
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

          {/* Available Assessments Section */}
          <section className="mb-8">
            <h2
              style={{ color: intPsychTheme.primary }}
              className="font-serif text-xl text-gray-900 mb-4"
            >
              Available Assessments
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableAssessments.map((assessment, index) => (
                <div
                  key={assessment.name}
                  className="bg-[#FAF9F6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-gray-900">{assessment.name}</h3>
                      <p className="text-gray-500">{assessment.fullName}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        assessment.status === "Overdue"
                          ? "bg-red-100 text-red-700 border border-red-400"
                          : "bg-[#A8D5BA] text-gray-900 border border-[#7FB885]"
                      }`}
                    >
                      {assessment.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{assessment.description}</p>
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Last taken: {assessment.lastTaken}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Next due: {assessment.nextDue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>Frequency: {assessment.frequency}</span>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      router.push(`/assessments/${assessment.type}`)
                    }
                    style={{ backgroundColor: intPsychTheme.secondary }}
                    className="w-full hover:bg-[#FF7A2E] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2"
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
            <div className="bg-[#FAF9F6] shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl overflow-hidden">
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
                        <td
                          colSpan={5}
                          className="p-4 text-center text-gray-600"
                        >
                          Loading history...
                        </td>
                      </tr>
                    ) : history.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-4 text-center text-gray-600"
                        >
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
                          <td className="p-4 text-gray-900">
                            {record.totalScore}
                          </td>
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
        </div>
      </div>
    </PortalLayout>
  );
}
