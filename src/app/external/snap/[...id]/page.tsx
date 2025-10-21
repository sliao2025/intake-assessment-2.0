"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Check } from "lucide-react";
import { DM_Serif_Text } from "next/font/google";
import Field from "../../../components/primitives/Field";
import Likert from "../../../components/primitives/Likert";
import { intPsychTheme } from "../../../components/theme";
import logo from "../../../../assets/IP_Logo.png";
import Image from "next/image";

const dmSerif = DM_Serif_Text({ weight: "400", subsets: ["latin"] });

// SNAP helper to generate blank responses
const snapKeys = Array.from(
  { length: 26 },
  (_, i) => `snap${String(i + 1).padStart(2, "0")}`
);

function blankSnapResponses(): Record<string, string> {
  return Object.fromEntries(snapKeys.map((k) => [k, ""]));
}

// SNAP questions (same as in SNAPForm.tsx)
const snapQuestions = [
  "Often fails to give close attention to details or makes careless mistakes",
  "Often has difficulty sustaining attention in tasks or play activities",
  "Often does not seem to listen when spoken to directly",
  "Often does not follow through on instructions and fails to finish tasks",
  "Often has difficulty organizing tasks and activities",
  "Often avoids or dislikes tasks requiring sustained mental effort",
  "Often loses things necessary for activities (e.g., assignments, pencils, books)",
  "Often is distracted by extraneous stimuli",
  "Often is forgetful in daily activities",
  "Often fidgets with hands or feet or squirms in seat",
  "Often leaves seat in situations where remaining seated is expected",
  "Often runs about or climbs excessively in inappropriate situations",
  "Often has difficulty playing or engaging in leisure activities quietly",
  "Often is 'on the go' or acts as if 'driven by a motor'",
  "Often talks excessively",
  "Often blurts out answers before questions have been completed",
  "Often has difficulty awaiting turn",
  "Often interrupts or intrudes on others (e.g., butts into conversations/games)",
  "Often loses temper",
  "Often argues with adults",
  "Often actively defies or refuses adult requests or rules",
  "Often deliberately does things that annoy other people",
  "Often blames others for his or her mistakes or misbehavior",
  "Often is touchy or easily annoyed by others",
  "Often is angry and resentful",
  "Often is spiteful or vindictive",
];

const snap0to3 = [
  { key: "0", label: "Not at all" },
  { key: "1", label: "Just a little" },
  { key: "2", label: "Quite a bit" },
  { key: "3", label: "Very much" },
];

export default function ExternalSnapPage() {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [informantName, setInformantName] = useState("");
  const [informantRelation, setInformantRelation] = useState("");
  const [otherRelation, setOtherRelation] = useState("");
  const [responses, setResponses] = useState(blankSnapResponses());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if all questions are answered
  const allAnswered = Object.values(responses).every((v) => v !== "");
  const answeredCount = Object.values(responses).filter((v) => v !== "").length;

  const handleSubmit = async () => {
    if (!informantName.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!informantRelation) {
      setError("Please select your relationship to the child");
      return;
    }

    if (informantRelation === "other" && !otherRelation.trim()) {
      setError("Please specify your relationship to the child");
      return;
    }

    if (!allAnswered) {
      setError(
        `Please answer all 26 questions (${answeredCount}/26 completed)`
      );
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const finalRelation =
        informantRelation === "other"
          ? otherRelation.trim()
          : informantRelation;

      const res = await fetch(`/api/external/snap/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          informantName: informantName.trim(),
          informantRelation: finalRelation,
          responses,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="text-center max-w-md">
          <div
            className="mb-6 mx-auto w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${intPsychTheme.secondary}20` }}
          >
            <Check
              className="w-10 h-10"
              style={{ color: intPsychTheme.secondary }}
            />
          </div>
          <h1
            className={`${dmSerif.className} text-3xl font-bold mb-4`}
            style={{ color: intPsychTheme.primary }}
          >
            Thank You!
          </h1>
          <p
            className="text-lg mb-6"
            style={{ color: intPsychTheme.textMuted }}
          >
            Your SNAP-IV assessment has been submitted successfully. Your
            responses will help provide valuable information for the child's
            care.
          </p>
          <p className="text-sm" style={{ color: intPsychTheme.textMuted }}>
            You may now close this window.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky header with progress */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Integrative Psych logo"
              className="h-12 w-12 object-contain"
            />
            <h1
              className={`${dmSerif.className} text-3xl font-bold`}
              style={{ color: intPsychTheme.primary }}
            >
              SNAP-IV Assessment
            </h1>
          </div>

          <p className="mb-4" style={{ color: intPsychTheme.textMuted }}>
            Collateral Information Form • Please answer all 26 questions about
            the child's behavior
          </p>

          {/* Progress bar */}
          <div>
            <div className="text-sm text-slate-600 mb-2">
              Progress: {answeredCount} of 26 questions answered
            </div>
            <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${(answeredCount / 26) * 100}%`,
                  background: `linear-gradient(90deg, ${intPsychTheme.accent}, ${intPsychTheme.primary})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-8">
        {/* Error message */}
        {error && (
          <div
            className="mb-6 p-4 rounded-lg border"
            style={{
              backgroundColor: "#fef2f2",
              borderColor: "#fecaca",
              color: "#991b1b",
            }}
          >
            {error}
          </div>
        )}

        {/* Informant details */}
        <div className="mb-8 bg-white rounded-2xl border border-slate-300 p-6">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: intPsychTheme.primary }}
          >
            Your Information
          </h2>
          <div className="space-y-4">
            <Field title="Your Name" required>
              <input
                type="text"
                placeholder="Enter your full name"
                value={informantName}
                onChange={(e) => setInformantName(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition bg-slate-50 focus:border-blue-500"
                disabled={isSubmitting}
              />
            </Field>

            <Field title="Your Relationship to the Child" required>
              <select
                value={informantRelation}
                onChange={(e) => {
                  setInformantRelation(e.target.value);
                  if (e.target.value !== "other") {
                    setOtherRelation("");
                  }
                }}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition bg-slate-50 focus:border-blue-500"
                disabled={isSubmitting}
              >
                <option value="">Select your relationship</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="coach">Coach</option>
                <option value="counselor">School Counselor</option>
                <option value="therapist">Therapist</option>
                <option value="guardian">Guardian</option>
                <option value="other">Other</option>
              </select>
            </Field>

            {informantRelation === "other" && (
              <Field title="Please Specify Your Relationship" required>
                <input
                  type="text"
                  placeholder="e.g., Grandparent, Tutor, Family Friend"
                  value={otherRelation}
                  onChange={(e) => setOtherRelation(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none transition bg-slate-50 focus:border-blue-500"
                  disabled={isSubmitting}
                />
              </Field>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-6 rounded-2xl border p-4 bg-slate-50 border-slate-300">
          <p className="text-slate-800 italic">
            For each item, select how much the statement describes the
            child/adolescent over the past 6 months.
          </p>
        </div>

        {/* SNAP Questions using Field and Likert components */}
        <div className="space-y-4">
          {snapQuestions.map((question, i) => {
            const key = snapKeys[i];
            const value = responses[key];

            return (
              <Field key={key} title={`${i + 1}. ${question}`}>
                <Likert
                  value={value}
                  onChange={(v) =>
                    setResponses((prev) => ({ ...prev, [key]: String(v) }))
                  }
                  options={snap0to3}
                />
              </Field>
            );
          })}
        </div>

        {/* Spacer for sticky button */}
        <div className="h-24" />
      </div>

      {/* Sticky submit button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-slate-200 p-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={
              isSubmitting ||
              !allAnswered ||
              !informantName.trim() ||
              !informantRelation ||
              (informantRelation === "other" && !otherRelation.trim())
            }
            className="w-full px-6 py-4 text-white text-lg font-medium rounded-xl cursor-pointer transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl"
            style={{
              background: `${intPsychTheme.secondary}`,
            }}
          >
            {isSubmitting
              ? "Submitting..."
              : allAnswered &&
                  informantName.trim() &&
                  informantRelation &&
                  (informantRelation !== "other" || otherRelation.trim())
                ? "Submit Assessment"
                : `Complete All Fields (${answeredCount}/26 questions)`}
          </button>
        </div>
      </div>
    </div>
  );
}
