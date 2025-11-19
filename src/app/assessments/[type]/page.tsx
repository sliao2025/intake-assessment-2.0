"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { intPsychTheme } from "../../components/theme";
import { DM_Serif_Text } from "next/font/google";
import Phq9Form from "../../components/Scales/Adult/Phq9Form";
import Gad7Form from "../../components/Scales/Adult/Gad7Form";
import PSS4Form from "../../components/Scales/Adult/PSS4Form";
import PTSDForm from "../../components/Scales/Adult/PTSDForm";
import CRAFFTForm from "../../components/Scales/Adult/CRAFFTForm";
import ACEResilienceForm from "../../components/Scales/Adult/ACEResilienceForm";
import ASRS5Form from "../../components/Scales/Adult/ASRS5Form";
import { SetAActions } from "../../lib/types/types";

const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

// Assessment metadata
const ASSESSMENT_INFO: Record<
  string,
  { name: string; fullName: string; description: string }
> = {
  phq9: {
    name: "PHQ-9",
    fullName: "Patient Health Questionnaire",
    description: "Measures depression severity over the last 2 weeks",
  },
  gad7: {
    name: "GAD-7",
    fullName: "Generalized Anxiety Disorder Scale",
    description: "Measures anxiety severity over the last 2 weeks",
  },
  pss4: {
    name: "PSS-4",
    fullName: "Perceived Stress Scale",
    description: "Assesses stress levels over the last month",
  },
  ptsd: {
    name: "PTSD Screen",
    fullName: "Post-Traumatic Stress Disorder Screen",
    description: "Screens for PTSD symptoms over the past month",
  },
  crafft: {
    name: "CRAFFT",
    fullName: "Substance Use Screening",
    description: "Screens for substance use risk in the past 12 months",
  },
  aceResilience: {
    name: "ACE Resilience",
    fullName: "Adverse Childhood Experiences Resilience Scale",
    description: "Measures protective factors and resilience",
  },
  asrs5: {
    name: "ASRS-5",
    fullName: "Adult ADHD Self-Report Scale",
    description: "Screens for ADHD symptoms",
  },
};

// Option arrays for forms
const freq0to3 = [
  { key: "0", label: "Not at all" },
  { key: "1", label: "Several days" },
  { key: "2", label: "More than half the days" },
  { key: "3", label: "Nearly every day" },
];

const pss0to4 = [
  { key: "0", label: "Never" },
  { key: "1", label: "Almost never" },
  { key: "2", label: "Sometimes" },
  { key: "3", label: "Fairly often" },
  { key: "4", label: "Very often" },
];

const aceTrue5 = [
  { key: "0", label: "Definitely not true" },
  { key: "1", label: "Probably not true" },
  { key: "2", label: "Not sure" },
  { key: "3", label: "Probably true" },
  { key: "4", label: "Definitely true" },
];

const asrs0to4 = [
  { key: "0", label: "Never" },
  { key: "1", label: "Rarely" },
  { key: "2", label: "Sometimes" },
  { key: "3", label: "Often" },
  { key: "4", label: "Very often" },
];

// Initialize empty assessment data
function getInitialAssessmentData(type: string): any {
  const base = {
    assessments: {
      kind: "adult" as const,
      data: {} as any,
    },
  };

  switch (type) {
    case "phq9":
      base.assessments.data.phq9 = {
        phq1: "",
        phq2: "",
        phq3: "",
        phq4: "",
        phq5: "",
        phq6: "",
        phq7: "",
        phq8: "",
        phq9: "",
      };
      break;
    case "gad7":
      base.assessments.data.gad7 = {
        gad1: "",
        gad2: "",
        gad3: "",
        gad4: "",
        gad5: "",
        gad6: "",
        gad7: "",
      };
      break;
    case "pss4":
      base.assessments.data.stress = {
        pss1: "",
        pss2: "",
        pss3: "",
        pss4: "",
      };
      break;
    case "ptsd":
      base.assessments.data.ptsd = {
        ptsd1: "",
        ptsd2: "",
        ptsd3: "",
        ptsd4: "",
        ptsd5: "",
      };
      break;
    case "crafft":
      base.assessments.data.crafft = {
        partA: {
          daysAlcohol: "",
          daysMarijuana: "",
          daysOther: "",
        },
        partB: {
          car: "",
          relax: "",
          alone: "",
          forget: "",
          familyFriends: "",
          trouble: "",
        },
      };
      break;
    case "aceResilience":
      base.assessments.data.aceResilience = {
        r01: "",
        r02: "",
        r03: "",
        r04: "",
        r05: "",
        r06: "",
        r07: "",
        r08: "",
        r09: "",
        r10: "",
        r11: "",
        r12: "",
        r13: "",
      };
      break;
    case "asrs5":
      base.assessments.data.asrs5 = {
        asrs1: "",
        asrs2: "",
        asrs3: "",
        asrs4: "",
        asrs5: "",
        asrs6: "",
      };
      break;
  }

  return base;
}

// Calculate scores
function calculateScore(
  type: string,
  data: any
): { totalScore: number; severity: string } {
  switch (type) {
    case "phq9": {
      const phq9 = data.phq9 || {};
      const score: number = Object.values(phq9).reduce<number>(
        (sum: number, val: any) => {
          return sum + (parseInt(val) || 0);
        },
        0
      );
      let severity = "Minimal";
      if (score >= 20) severity = "Severe";
      else if (score >= 15) severity = "Moderately Severe";
      else if (score >= 10) severity = "Moderate";
      else if (score >= 5) severity = "Mild";
      return { totalScore: score, severity };
    }
    case "gad7": {
      const gad7 = data.gad7 || {};
      const score: number = Object.values(gad7).reduce<number>(
        (sum: number, val: any) => {
          return sum + (parseInt(val) || 0);
        },
        0
      );
      let severity = "Minimal";
      if (score >= 15) severity = "Severe";
      else if (score >= 10) severity = "Moderate";
      else if (score >= 5) severity = "Mild";
      return { totalScore: score, severity };
    }
    case "pss4": {
      const stress = data.stress || {};
      // PSS-4: items 2 and 3 are reverse scored
      const pss1: number = parseInt(stress.pss1) || 0;
      const pss2: number = 4 - (parseInt(stress.pss2) || 0); // reverse
      const pss3: number = 4 - (parseInt(stress.pss3) || 0); // reverse
      const pss4: number = parseInt(stress.pss4) || 0;
      const score: number = pss1 + pss2 + pss3 + pss4;
      let severity = "Low";
      if (score >= 11) severity = "High";
      else if (score >= 7) severity = "Moderate";
      return { totalScore: score, severity };
    }
    case "ptsd": {
      const ptsd = data.ptsd || {};
      const score: number = Object.values(ptsd).filter(
        (val: any) => val === "yes"
      ).length;
      let severity = "Negative";
      if (score >= 3) severity = "Positive";
      return { totalScore: score, severity };
    }
    case "crafft": {
      const crafft = data.crafft || {};
      const partA = crafft.partA || {};
      const partB = crafft.partB || {};

      // Count positive responses in Part B
      const partBScore: number = Object.values(partB).filter(
        (val: any) => val === "yes"
      ).length;
      const hasSubstanceUse =
        (parseInt(partA.daysAlcohol) || 0) > 0 ||
        (parseInt(partA.daysMarijuana) || 0) > 0 ||
        (parseInt(partA.daysOther) || 0) > 0;

      let severity = "Low Risk";
      if (hasSubstanceUse && partBScore >= 2) severity = "High Risk";
      else if (hasSubstanceUse && partBScore >= 1) severity = "Moderate Risk";

      return { totalScore: partBScore, severity };
    }
    case "aceResilience": {
      const ace = data.aceResilience || {};
      const score: number = Object.values(ace).reduce<number>(
        (sum: number, val: any) => {
          return sum + (parseInt(val) || 0);
        },
        0
      );
      let severity = "High Resilience";
      if (score < 30) severity = "Moderate Resilience";
      if (score < 20) severity = "Low Resilience";
      return { totalScore: score, severity };
    }
    case "asrs5": {
      const asrs5 = data.asrs5 || {};
      const score: number = Object.values(asrs5).reduce<number>(
        (sum: number, val: any) => {
          return sum + (parseInt(val) || 0);
        },
        0
      );
      let severity = "Negative";
      if (score >= 14) severity = "Positive";
      return { totalScore: score, severity };
    }
    default:
      return { totalScore: 0, severity: "Unknown" };
  }
}

// Check if assessment is complete
function isComplete(type: string, data: any): boolean {
  switch (type) {
    case "phq9": {
      const phq9 = data.phq9 || {};
      return Object.values(phq9).every((val: any) => val !== "");
    }
    case "gad7": {
      const gad7 = data.gad7 || {};
      return Object.values(gad7).every((val: any) => val !== "");
    }
    case "pss4": {
      const stress = data.stress || {};
      return Object.values(stress).every((val: any) => val !== "");
    }
    case "ptsd": {
      const ptsd = data.ptsd || {};
      return Object.values(ptsd).every((val: any) => val !== "");
    }
    case "crafft": {
      const crafft = data.crafft || {};
      const partA = crafft.partA || {};
      const partB = crafft.partB || {};
      const hasSubstanceUse =
        (parseInt(partA.daysAlcohol) || 0) > 0 ||
        (parseInt(partA.daysMarijuana) || 0) > 0 ||
        (parseInt(partA.daysOther) || 0) > 0;

      // CAR is always required, others only if substance use
      if (!partB.car || partB.car === "") return false;
      if (hasSubstanceUse) {
        return Object.values(partB).every((val: any) => val !== "");
      }
      return true;
    }
    case "aceResilience": {
      const ace = data.aceResilience || {};
      return Object.values(ace).every((val: any) => val !== "");
    }
    case "asrs5": {
      const asrs5 = data.asrs5 || {};
      return Object.values(asrs5).every((val: any) => val !== "");
    }
    default:
      return false;
  }
}

export default function AssessmentPage() {
  const params = useParams();
  const router = useRouter();
  const type = (params.type as string)?.toLowerCase();

  const [assessmentData, setAssessmentData] = useState<any>(() =>
    getInitialAssessmentData(type)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assignedAssessment, setAssignedAssessment] = useState<{
    id: string;
    requestedBy: string | null;
  } | null>(null);

  const info = ASSESSMENT_INFO[type];

  useEffect(() => {
    if (!info) {
      router.push("/assessments");
    }
  }, [type, info, router]);

  // Fetch assigned assessment for this type
  useEffect(() => {
    const fetchAssigned = async () => {
      try {
        const response = await fetch("/api/portal/assessments");
        if (response.ok) {
          const data = await response.json();
          const assigned = data.assignedAssessments?.find(
            (a: any) => a.assessmentType.toLowerCase() === type.toLowerCase()
          );
          if (assigned) {
            setAssignedAssessment({
              id: assigned.id,
              requestedBy: assigned.requestedBy,
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch assigned assessment:", error);
      }
    };
    fetchAssigned();
  }, [type]);

  if (!info) {
    return null;
  }

  const a: any = assessmentData.assessments.data;

  // Create setA function
  const setA: SetAActions = (mutate: (draft: any) => void) => {
    setAssessmentData((prev: any) => {
      const next = JSON.parse(JSON.stringify(prev));
      mutate(next);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!isComplete(type, a)) {
      setError("Please complete all questions before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const { totalScore } = calculateScore(type, a);

      const response = await fetch("/api/portal/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessmentType: type,
          responses: a,
          totalScore,
          assessmentId: assignedAssessment?.id || null, // Pass the ID to update the specific assessment
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit assessment");
      }

      // Success - redirect to assessments page
      router.push("/assessments");
    } catch (err: any) {
      setError(err.message || "Failed to submit assessment");
      setSubmitting(false);
    }
  };

  const complete = isComplete(type, a);
  const { totalScore, severity } = calculateScore(type, a);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          style={{ color: intPsychTheme.primary }}
          className={`${dm_serif.className} text-3xl text-gray-900 mb-2`}
        >
          {info.name}
        </h1>
        <p className="text-gray-600">{info.fullName}</p>
        <p className="text-sm text-gray-500 mt-1">{info.description}</p>
      </div>

      {/* Form */}
      <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
        {type === "phq9" && <Phq9Form a={a} setA={setA} freq0to3={freq0to3} />}
        {type === "gad7" && <Gad7Form a={a} setA={setA} freq0to3={freq0to3} />}
        {type === "pss4" && <PSS4Form a={a} setA={setA} pss0to4={pss0to4} />}
        {type === "ptsd" && <PTSDForm a={a} setA={setA} />}
        {type === "crafft" && <CRAFFTForm a={a} setA={setA} />}
        {type === "aceResilience" && (
          <ACEResilienceForm a={a} setA={setA} aceTrue5={aceTrue5} />
        )}
        {type === "asrs5" && (
          <ASRS5Form a={a} setA={setA} asrs0to4={asrs0to4} />
        )}
      </div>

      {/* Score Preview (if complete) */}
      {complete && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Preliminary Score</p>
              <p className="text-2xl font-bold text-gray-900">{totalScore}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Severity</p>
              <p className="text-lg font-semibold text-gray-900">{severity}</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/assessments")}
          className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!complete || submitting}
          style={{
            backgroundColor: complete ? intPsychTheme.secondary : "#ccc",
          }}
          className="cursor-pointer flex-1 px-6 py-3 text-white rounded-xl hover:opacity-90 transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Assessment"}
        </button>
      </div>
    </div>
  );
}
