// src/app/page.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

import ProgressHeader from "./components/ProgressHeader";
import ConfettiBurst from "./components/ConfettiBurst";
import StepTitle from "./components/StepTitle";
import VoiceRecorder from "./components/VoiceRecorder";
import Field from "./components/primitives/Field";
import Likert from "./components/primitives/Likert";
import ToggleRow from "./components/primitives/ToggleRow";
import ReviewItem from "./components/primitives/ReviewItem";
import { praises, theme, ease, intPsychTheme } from "./components/theme";

import GardenFrame from "./components/Garden/Garden";
import BambooForestFrame from "./components/Bamboo/BambooForest";

type Step = {
  key: string;
  title: string;
  type: "intro" | "form" | "open" | "quiz" | "review";
};

const steps: Step[] = [
  { key: "welcome", title: "Welcome", type: "intro" },
  { key: "hipaa", title: "HIPAA Statement", type: "intro" },
  { key: "contact", title: "Contact Info", type: "form" },
  { key: "profile", title: "About You", type: "form" },
  { key: "story", title: "Your Story", type: "open" },
  { key: "symptoms", title: "Quick Check-In", type: "quiz" },
  { key: "lifestyle", title: "Sleep & Lifestyle", type: "form" },
  { key: "review", title: "Review", type: "review" },
];

export default function Page() {
  const [step, setStep] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [burst, setBurst] = useState(false);
  const [progress, setProgress] = useState(0);
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    pronouns: "",
    email: "",
    contactNumber: "",
    dob: "",
    genderIdentity: "",
    sexualOrientation: "",
  });
  const [storyText, setStoryText] = useState("");
  const [storyAudio, setStoryAudio] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<{ [k: string]: string }>({
    phq1: "",
    phq2: "",
    gad1: "",
    gad2: "",
  });
  const [sleepEarly, setSleepEarly] = useState(false);
  const [sleepLate, setSleepLate] = useState(false);
  const [usesNicotine, setUsesNicotine] = useState(false);
  const [usesCannabis, setUsesCannabis] = useState(false);

  useEffect(() => {
    if ((step * 100) / steps.length > progress) {
      setProgress((p) => p + 100 / steps.length);
    }
  }, [step]);

  useEffect(() => {
    // console.log("Audio state:", storyAudio);
  }, [storyAudio]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const canNext = useMemo(() => {
    if (steps[step].key === "profile")
      return Boolean(
        profile.name &&
          profile.age &&
          profile.email.includes("@") &&
          profile.dob &&
          profile.contactNumber
      );
    if (steps[step].key === "story")
      return storyText.trim().length > 30 || Boolean(storyAudio);
    if (steps[step].key === "symptoms")
      return Boolean(
        symptoms.phq1 && symptoms.phq2 && symptoms.gad1 && symptoms.gad2
      );
    return true;
  }, [step, profile, storyText, storyAudio, symptoms]);

  const progressTitles = steps.map((s) => s.title);

  const goNext = () => {
    const next = Math.min(step + 1, steps.length - 1);
    if (next !== step) {
      setPraise(praises[Math.floor(Math.random() * praises.length)]);
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
      setTimeout(() => setPraise(null), 2000);
      setStep(next);
    }
  };

  const goBack = () => setStep((s) => Math.max(0, s - 1));

  return (
    <div
      className="fixed inset-0 w-full h-dvh overflow-hidden"
      style={{ background: intPsychTheme.card, color: theme.text }}
    >
      {/* Confetti + Decorative Garden */}
      <ConfettiBurst show={burst} />
      <GardenFrame />
      {/* <BambooForestFrame/> */}
      <ProgressHeader
        step={step}
        total={steps.length}
        praise={praise}
        onStepClick={setStep}
        stepTitles={progressTitles}
        canNext={canNext}
        progress={progress}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8">
        <motion.div
          key={steps[step].key}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="rounded-4xl border border-gray-200 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-md max-h-[70vh] scrollable-div overflow-y-auto pr-2"
        >
          {steps[step].key === "welcome" && (
            <div className="space-y-5">
              <StepTitle n={step + 1} title="Welcome" />
              <p className="text-gray-700 font-sans">
                This detailed survey will give your clinician much of the
                necessary context that could otherwise take a full session to
                gather. This will help them <b>jumpstart your treatment</b> and
                spend session time talking about the right things.
              </p>
              <p>
                There will be multiple choice, and free response style questions
                which you can choose to type or respond to with a voice note.
                The more <b>detail</b> you include, the better we can understand
                how to help.
              </p>
              <p>Let's start!</p>
            </div>
          )}

          {steps[step].key === "hipaa" && (
            <div className="space-y-5">
              <StepTitle n={step + 1} title={steps[step].title} />
              <p className="text-gray-700 font-sans">Before we start,</p>
              <p>
                We want to let you know that your responses will be kept{" "}
                <b>private</b> and <b>secure</b> compliant under the Health
                Insurance Portability and Accountability Act <b>(HIPPA)</b>.
              </p>
              <p>
                You may access a longer version of this statement{" "}
                <a
                  href="https://www.integrative-psych.org/legal/hipaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: intPsychTheme.accent,
                    textDecoration: "underline",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = intPsychTheme.primary)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = intPsychTheme.accent)
                  }
                >
                  here
                </a>
              </p>
            </div>
          )}

          {steps[step].key === "contact" && (
            <div className="space-y-6">
              <StepTitle n={step + 1} title={steps[step].title} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field title="Gender Identity" required>
                  <select
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    value={profile.genderIdentity}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        genderIdentity: e.target.value,
                      }))
                    }
                  >
                    <option value="">Choose…</option>
                    <option>CIS/Male</option>
                    <option>CIS/Female</option>
                    <option>Trans Male</option>
                    <option>Trans Female</option>
                    <option>Gender Fluid</option>
                    <option>Prefer not to disclose</option>
                  </select>
                </Field>
                <Field title="Sexual Identity/Orientation" required>
                  <select
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    value={profile.sexualOrientation}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        sexualOrientation: e.target.value,
                      }))
                    }
                    multiple={true}
                  >
                    <option value="">Choose…</option>
                    <option>CIS/Male</option>
                    <option>CIS/Female</option>
                    <option>Trans Male</option>
                    <option>Trans Female</option>
                    <option>Gender Fluid</option>
                    <option>Prefer not to disclose</option>
                  </select>
                </Field>

                <Field title="Ethnicity" required>
                  <input
                    type="email"
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="you@example.com"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </Field>
                <Field title="Religion" required>
                  <input
                    type="tel"
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="123-456-7890"
                    value={profile.contactNumber}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactNumber: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field title="Pronouns">
                  <select
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    value={profile.pronouns}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, pronouns: e.target.value }))
                    }
                  >
                    <option value="">Choose…</option>
                    <option>She/Her</option>
                    <option>He/Him</option>
                    <option>They/Them</option>
                    <option>Prefer to self-describe</option>
                  </select>
                </Field>
              </div>
            </div>
          )}

          {steps[step].key === "profile" && (
            <div className="space-y-6">
              <StepTitle n={step + 1} title={steps[step].title} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field title="Full name" required>
                  <input
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., Alex Rivera"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </Field>
                <Field title="Age" required>
                  <input
                    type="number"
                    min={1}
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="e.g., 28"
                    value={profile.age}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, age: e.target.value }))
                    }
                  />
                </Field>

                <Field title="Email" required>
                  <input
                    type="email"
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="you@example.com"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, email: e.target.value }))
                    }
                  />
                </Field>
                <Field title="Contact Number" required>
                  <input
                    type="tel"
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    placeholder="123-456-7890"
                    value={profile.contactNumber}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        contactNumber: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field title="Pronouns">
                  <select
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    value={profile.pronouns}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, pronouns: e.target.value }))
                    }
                  >
                    <option value="">Choose…</option>
                    <option>She/Her</option>
                    <option>He/Him</option>
                    <option>They/Them</option>
                    <option>Prefer to self-describe</option>
                  </select>
                </Field>
                <Field title="Date of Birth" required>
                  <input
                    type="date"
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
                    value={profile.dob}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, dob: e.target.value }))
                    }
                  />
                </Field>
              </div>
            </div>
          )}

          {steps[step].key === "story" && (
            <div className="space-y-6">
              <StepTitle n={step + 1} title="Your Story" />
              <Field
                title={
                  <>
                    <b>Tell us the story</b> of how you got here, why are you
                    asking for help today?
                  </>
                }
                label={
                  <>
                    <div>Please describe the following:</div>
                    <ul className="list-disc pl-5 mt-1">
                      <li>(A) Onset and precipitating events</li>
                      <li>(B) Periods when symptoms were better or worse</li>
                      <li>(C) How symptoms have changed over time</li>
                    </ul>
                  </>
                }
                required
              >
                <textarea
                  rows={6}
                  className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
                  placeholder="Share here in your own words…"
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                />
              </Field>
              <VoiceRecorder audioState={storyAudio} onAttach={setStoryAudio} />
              <Field
                title={
                  <>
                    Please use this space to <b>elaborate</b> on your mental
                    health treatment goals.
                  </>
                }
                label={
                  <>
                    <div>
                      For Example:
                      <ul className="list-disc pl-5 mt-1">
                        <li>Your primary reason for reaching out</li>
                        <li>Symptoms and/or issues you have identified</li>
                        <li>
                          How long you've experienced any symptoms and how they
                          may have changed over time
                        </li>
                      </ul>
                    </div>
                  </>
                }
                required
              >
                <textarea
                  rows={6}
                  className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
                  placeholder="Share here in your own words…"
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                />
              </Field>
              <VoiceRecorder audioState={storyAudio} onAttach={setStoryAudio} />
            </div>
          )}

          {steps[step].key === "symptoms" && (
            <div className="space-y-6">
              <StepTitle n={step + 1} title="Quick Check-In" />
              <p className="text-slate-700">
                A few quick items to help your clinician focus (PHQ-2 + GAD-2).
              </p>
              <div className="space-y-4">
                <Likert
                  id="phq1"
                  label="Little interest or pleasure in doing things"
                  value={symptoms.phq1}
                  onChange={(v) => setSymptoms((s) => ({ ...s, phq1: v }))}
                />
                <Likert
                  id="phq2"
                  label="Feeling down, depressed, or hopeless"
                  value={symptoms.phq2}
                  onChange={(v) => setSymptoms((s) => ({ ...s, phq2: v }))}
                />
                <Likert
                  id="gad1"
                  label="Feeling nervous, anxious, or on edge"
                  value={symptoms.gad1}
                  onChange={(v) => setSymptoms((s) => ({ ...s, gad1: v }))}
                />
                <Likert
                  id="gad2"
                  label="Not being able to stop or control worrying"
                  value={symptoms.gad2}
                  onChange={(v) => setSymptoms((s) => ({ ...s, gad2: v }))}
                />
              </div>
            </div>
          )}

          {steps[step].key === "lifestyle" && (
            <div className="space-y-6">
              <StepTitle n={step + 1} title="Sleep & Lifestyle" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ToggleRow
                  label="I fall asleep faster if I sleep earlier"
                  checked={sleepEarly}
                  onChange={setSleepEarly}
                />
                <ToggleRow
                  label="I sleep better going to bed late and waking late"
                  checked={sleepLate}
                  onChange={setSleepLate}
                />
                <ToggleRow
                  label="I use nicotine products"
                  checked={usesNicotine}
                  onChange={setUsesNicotine}
                />
                <ToggleRow
                  label="I use cannabis"
                  checked={usesCannabis}
                  onChange={setUsesCannabis}
                />
              </div>
            </div>
          )}

          {steps[step].key === "review" && (
            <div className="space-y-6">
              <StepTitle n={step + 1} title="Review & Finish" />
              <div className="rounded-2xl border border-slate-300 p-4 bg-slate-50 text-slate-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ReviewItem label="Name" value={profile.name} />
                  <ReviewItem label="Age" value={profile.age} />
                  <ReviewItem label="Pronouns" value={profile.pronouns} />
                  <ReviewItem label="Email" value={profile.email} />
                </div>
                <div className="mt-4">
                  <div className="text-slate-600 mb-1">Your Story</div>
                  <div className="whitespace-pre-wrap text-slate-900 min-h-6">
                    {storyText || "—"}
                  </div>
                  {storyAudio && (
                    <div className="mt-2">
                      <audio controls src={storyAudio} className="w-full" />
                    </div>
                  )}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ReviewItem label="PHQ1" value={symptoms.phq1} />
                  <ReviewItem label="PHQ2" value={symptoms.phq2} />
                  <ReviewItem label="GAD1" value={symptoms.gad1} />
                  <ReviewItem label="GAD2" value={symptoms.gad2} />
                  <ReviewItem
                    label="Sleep earlier helps"
                    value={sleepEarly ? "Yes" : "No"}
                  />
                  <ReviewItem
                    label="Sleep late helps"
                    value={sleepLate ? "Yes" : "No"}
                  />
                  <ReviewItem
                    label="Nicotine use"
                    value={usesNicotine ? "Yes" : "No"}
                  />
                  <ReviewItem
                    label="Cannabis use"
                    value={usesCannabis ? "Yes" : "No"}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <p className="text-slate-600 text-sm">
                  This is a mockup. Clicking Finish shows a friendly
                  confirmation—no data is stored.
                </p>
                <button
                  onClick={() =>
                    alert(
                      "Thanks! This is just a front-end mockup—no data was saved."
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white"
                  style={{ background: intPsychTheme.secondary }}
                >
                  <CheckCircle2 className="h-5 w-5" /> Finish
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex cursor-pointer disabled:cursor-not-allowed bg-white items-center gap-2 rounded-xl px-3 py-2 font-medium border border-gray-300 text-gray-700 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            {step < 1 && (
              <button
                onClick={goNext}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white"
                style={{ background: intPsychTheme.secondary }}
              >
                Start <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {step > 0 && step < steps.length - 1 && (
              <button
                onClick={goNext}
                disabled={!canNext}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                style={{ background: intPsychTheme.secondary }}
              >
                Next <ChevronRight className="h-4 w-4" />
              </button>
            )}

            {step === steps.length - 1 && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white"
                style={{ background: theme.primary }}
              >
                Back to Top
              </button>
            )}
          </div>
        </motion.div>

        {/* <div className="mt-6 flex items-center justify-center text-xs text-slate-500">
          <span>
            UI mockup • green nature palette • serif headings • voice notes •
            step guide
          </span>
        </div> */}
      </div>
    </div>
  );
}
