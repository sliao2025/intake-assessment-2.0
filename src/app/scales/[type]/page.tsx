"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { intPsychTheme, sigmundTheme } from "../../components/theme";
import { DM_Serif_Text } from "next/font/google";
import Phq9Form from "../../components/Scales/Adult/Phq9Form";
import Gad7Form from "../../components/Scales/Adult/Gad7Form";
import PSS4Form from "../../components/Scales/Adult/PSS4Form";
import PTSDForm from "../../components/Scales/Adult/PTSDForm";
import CRAFFTForm from "../../components/Scales/Adult/CRAFFTForm";
import ACEResilienceForm from "../../components/Scales/Adult/ACEResilienceForm";
import ASRS5Form from "../../components/Scales/Adult/ASRS5Form";

import SelfHarmForm from "../../components/Scales/Adult/SelfHarmForm";
import AQ10Form from "../../components/Scales/Adult/AQ10Form";
import MDQForm from "../../components/Scales/Adult/MDQForm";

import { SetAActions } from "../../lib/types/types";
import useSound from "use-sound";

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
  aceresilience: {
    name: "ACE Resilience",
    fullName: "Adverse Childhood Experiences Resilience Scale",
    description: "Measures protective factors and resilience",
  },
  asrs5: {
    name: "ASRS-5",
    fullName: "Adult ADHD Self-Report Scale",
    description: "Screens for ADHD symptoms",
  },
  selfharm: {
    name: "Self Harm",
    fullName: "Self-Harm Screening",

    description: "Screens for recent and lifetime self-harm",
  },
  aq10: {
    name: "AQ-10",
    fullName: "Autism Spectrum Quotient-10",
    description: "Screening tool for autism spectrum traits",
  },
  mdq: {
    name: "MDQ",
    fullName: "Mood Disorder Questionnaire",
    description: "Screening tool for bipolar disorder",
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
    case "aceresilience":
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
    case "selfharm":
      base.assessments.data.selfHarm = {
        pastMonth: "",
        lifetime: "",
      };
      break;
    case "aq10":
      base.assessments.data.aq10 = {
        aq01: "",
        aq02: "",
        aq03: "",
        aq04: "",
        aq05: "",
        aq06: "",
        aq07: "",
        aq08: "",
        aq09: "",
        aq10: "",
      };
      break;
    case "mdq":
      base.assessments.data.mdq = {
        mdq1: "",
        mdq2: "",
        mdq3: "",
        mdq4: "",
        mdq5: "",
        mdq6: "",
        mdq7: "",
        mdq8: "",
        mdq9: "",
        mdq10: "",
        mdq11: "",
        mdq12: "",
        mdq13: "",
        cooccurrence: "",
        impact: "",
      };
      break;
    case "ymrs":
      base.assessments.data.ymrs = {
        ymrs1: "",
        ymrs2: "",
        ymrs3: "",
        ymrs4: "",
        ymrs5: "",
        ymrs6: "",
        ymrs7: "",
        ymrs8: "",
        ymrs9: "",
        ymrs10: "",
        ymrs11: "",
      };
      break;
  }

  return base;
}

// Calculate scores
function calculateScore(
  type: string,
  data: any,
): { totalScore: number; severity: string } {
  switch (type) {
    case "phq9": {
      const phq9 = data.phq9 || {};
      const score: number = Object.values(phq9).reduce<number>(
        (sum: number, val: any) => {
          return sum + (parseInt(val) || 0);
        },
        0,
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
        0,
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
        (val: any) => val === "yes",
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
        (val: any) => val === "yes",
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

    case "aceresilience": {
      const ace = data.aceResilience || {};
      const score: number = Object.values(ace).reduce<number>(
        (sum: number, val: any) => {
          return sum + (parseInt(val) || 0);
        },
        0,
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
        0,
      );
      let severity = "Negative";
      if (score >= 14) severity = "Positive";
      return { totalScore: score, severity };
    }
    case "selfharm": {
      const dataHash = data.selfHarm || {};
      // Logic: If either answer is yes -> Positive/Warning
      const isPositive =
        dataHash.pastMonth === "yes" || dataHash.lifetime === "yes";
      // Let's count "yes" for score, though it's barely a score
      let score = 0;
      if (dataHash.pastMonth === "yes") score++;
      if (dataHash.lifetime === "yes") score++;

      let severity = "Negative";
      if (isPositive) severity = "Positive";
      return { totalScore: score, severity };
    }
    case "aq10": {
      const d = data.aq10 || {};
      // Scoring:
      // 1: Agree(2,3) -> 1
      // 2: Disagree(0,1) -> 1
      // 3: Disagree -> 1
      // 4: Disagree -> 1
      // 5: Disagree -> 1
      // 6: Disagree -> 1
      // 7: Agree -> 1
      // 8: Agree -> 1
      // 9: Disagree -> 1
      // 10: Agree -> 1

      let s = 0;
      const pt = (v: string, dir: "agree" | "disagree") => {
        const n = parseInt(v);
        if (isNaN(n)) return 0;
        if (dir === "agree" && (n === 2 || n === 3)) return 1;
        if (dir === "disagree" && (n === 0 || n === 1)) return 1;
        return 0;
      };

      s += pt(d.aq01, "agree");
      s += pt(d.aq02, "disagree");
      s += pt(d.aq03, "disagree");
      s += pt(d.aq04, "disagree");
      s += pt(d.aq05, "disagree");
      s += pt(d.aq06, "disagree");
      s += pt(d.aq07, "agree");
      s += pt(d.aq08, "agree");
      s += pt(d.aq09, "disagree");
      s += pt(d.aq10, "agree");

      let severity = "No significant traits";
      if (s >= 6) severity = "Consider referral";
      return { totalScore: s, severity };
    }
    case "mdq": {
      const d = data.mdq || {};
      let symptoms = 0;
      for (let i = 1; i <= 13; i++) {
        if (d[`mdq${i}`] === "yes") symptoms++;
      }
      const cooccurs = d.cooccurrence === "yes";
      const impact = parseInt(d.impact || "0"); // 2=Moderate, 3=Serious

      let severity = "Negative";
      if (symptoms >= 7 && cooccurs && impact >= 2) {
        severity = "Positive";
      }
      return { totalScore: symptoms, severity };
    }
    case "ymrs": {
      const d = data.ymrs || {};
      const score: number = Object.values(d).reduce<number>(
        (a: number, b: any) => a + (parseInt(b) || 0),
        0,
      );
      let severity = "Minimal";
      if (score >= 25)
        severity = "Severe Mania"; // Rough cutoffs
      else if (score >= 15) severity = "Moderate Mania";
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
    case "aceresilience": {
      const ace = data.aceResilience || {};
      return Object.values(ace).every((val: any) => val !== "");
    }
    case "asrs5": {
      const asrs5 = data.asrs5 || {};
      return Object.values(asrs5).every((val: any) => val !== "");
    }
    case "selfharm": {
      const sh = data.selfHarm || {};
      return sh.pastMonth !== "" && sh.lifetime !== "";
    }
    case "aq10": {
      const d = data.aq10 || {};
      return Object.values(d).every((val: any) => val !== "");
    }
    case "mdq": {
      const d = data.mdq || {};
      // 13 items + cooccurrence + impact
      // Actually check specifically the keys we use
      for (let i = 1; i <= 13; i++) if (!d[`mdq${i}`]) return false;
      if (!d.cooccurrence || !d.impact) return false;
      return true;
    }
    case "ymrs": {
      const d = data.ymrs || {};
      return Object.values(d).every((val: any) => val !== "");
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
    getInitialAssessmentData(type),
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assignedAssessment, setAssignedAssessment] = useState<{
    id: string;
    requestedBy: string | null;
  } | null>(null);

  const info = ASSESSMENT_INFO[type];
  const [playSound] = useSound("/sfx/neutral-positive-button-click.wav");
  const [playMistake] = useSound("/sfx/mistake-ui.wav");

  useEffect(() => {
    if (!info) {
      router.push("/scales");
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
            (a: any) => a.assessmentType.toLowerCase() === type.toLowerCase(),
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

      // Success - redirect to scales page
      router.push("/scales");
    } catch (err: any) {
      setError(err.message || "Failed to submit assessment");
      setSubmitting(false);
    }
  };

  const complete = isComplete(type, a);
  const { totalScore, severity } = calculateScore(type, a);

  return (
    <div className="space-y-6">
      <div>
        <h1
          style={{ color: sigmundTheme.accent }}
          className={`${dm_serif.className} text-3xl text-stone-900 mb-2`}
        >
          {info.name}
        </h1>
        <p className="text-stone-600">{info.fullName}</p>
        <p className="text-sm text-stone-500 mt-1">{info.description}</p>
      </div>

      {/* Form */}
      <div className="bg-white shadow-[0_1px_2px_rgba(15,23,42,0.08)] rounded-3xl p-6">
        {type === "phq9" && <Phq9Form a={a} setA={setA} freq0to3={freq0to3} />}
        {type === "gad7" && <Gad7Form a={a} setA={setA} freq0to3={freq0to3} />}
        {type === "pss4" && <PSS4Form a={a} setA={setA} pss0to4={pss0to4} />}
        {type === "ptsd" && <PTSDForm a={a} setA={setA} />}
        {type === "crafft" && <CRAFFTForm a={a} setA={setA} />}
        {type === "aceresilience" && (
          <ACEResilienceForm a={a} setA={setA} aceTrue5={aceTrue5} />
        )}
        {type === "asrs5" && (
          <ASRS5Form a={a} setA={setA} asrs0to4={asrs0to4} />
        )}
        {type === "selfharm" && <SelfHarmForm a={a} setA={setA} />}
        {type === "aq10" && <AQ10Form a={a} setA={setA} />}
        {type === "mdq" && <MDQForm a={a} setA={setA} />}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/scales")}
          className="flex-1 px-6 py-3 border border-stone-300 rounded-xl text-stone-700 hover:bg-stone-50 transition-all font-bold uppercase tracking-wider text-xs shadow-[0_4px_0_0_#e2e8f0] hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none bg-white"
        >
          Cancel
        </button>
        <button
          onClick={async () => {
            if (!complete || submitting) {
              playMistake();
              return;
            }
            await handleSubmit();
            playSound();
          }}
          aria-disabled={!complete || submitting}
          style={{
            backgroundColor: complete ? sigmundTheme.secondary : "#ccc",
            boxShadow: complete ? "0 4px 0 0 #744d3a" : "0 4px 0 0 #999",
          }}
          className={`flex-1 px-6 py-3 text-white rounded-xl hover:opacity-90 transition-all font-bold uppercase tracking-wider text-xs hover:translate-y-[-1px] active:translate-y-[1px] active:shadow-none ${
            !complete || submitting
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          {submitting ? "Submitting..." : "Submit Assessment"}
        </button>
      </div>
    </div>
  );
}
