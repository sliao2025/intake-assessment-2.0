// src/app/page.tsx
"use client";

import React, { useMemo, useState, useEffect } from "react";
import type { Profile } from "./lib/types";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

import ProgressHeader from "./components/ProgressHeader";
import ConfettiBurst from "./components/ConfettiBurst";
import StepTitle from "./components/StepTitle";
import ToggleRow from "./components/primitives/ToggleRow";
import ReviewItem from "./components/primitives/ReviewItem";

import { praises, theme, ease, intPsychTheme } from "./components/theme";
import GardenFrame from "./components/Garden/Garden";
import ContactSection from "./components/Sections/ContactSection";
import ProfileSection from "./components/Sections/ProfileSection";
import CheckInSection from "./components/Sections/CheckInSection";
import MedicalSection from "./components/Sections/MedicalSection";
import StorySection from "./components/Sections/StorySection";

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
  { key: "screen", title: "Quick Check-In", type: "quiz" },
  { key: "story", title: "Your Story", type: "open" },
  { key: "medical", title: "Medical History", type: "form" },
  { key: "lifestyle", title: "Sleep & Lifestyle", type: "form" },
  { key: "review", title: "Review", type: "review" },
];

export default function Page() {
  const [step, setStep] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [burst, setBurst] = useState(false);
  const [maxVisited, setMaxVisited] = useState(0);
  const [profile, setProfile] = useState<Profile>({
    firstName: "",
    lastName: "",
    age: "",
    pronouns: [],
    email: "",
    contactNumber: "",
    dob: "",
    genderIdentity: "",
    sexualOrientation: [],
    ethnicity: [],
    religion: [],
    hasReceivedMentalHealthTreatment: false,
    therapyDuration: "",
    previousDiagnosis: "",
    moodChanges: [],
    behaviorChanges: [],
    thoughtChanges: [],
    dietType: [],
    alcoholFrequency: "",
    drinksPerOccasion: "",
    substancesUsed: [],
    currentMedications: [],
    previousMedications: [],
    medicalAllergies: [],
    previousHospitalizations: [],
    previousInjuries: null,
    isEmployed: false,
    jobDetails: "",
    hobbies: "",
    familyHistory: [],
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

  const progressPct = useMemo(() => {
    if (steps.length <= 1) return 0;
    // Percent of furthest reached step over last index
    return Math.min(100, Math.round((maxVisited / (steps.length - 1)) * 100));
  }, [maxVisited, steps.length]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const canNext = useMemo(() => {
    // if (steps[step].key === "contact")
    //   return Boolean(
    //     profile.firstName &&
    //       profile.lastName &&
    //       profile.age &&
    //       profile.email.includes("@") &&
    //       profile.dob &&
    //       profile.contactNumber
    //   );
    // if (steps[step].key === "profile")
    //   return Boolean(
    //     profile.genderIdentity &&
    //       profile.sexualOrientation.length > 0 &&
    //       profile.ethnicity.length > 0 &&
    //       profile.religion.length > 0 &&
    //       profile.pronouns.length > 0
    //   );
    // if (steps[step].key === "story")
    //   return storyText.trim().length > 30 || Boolean(storyAudio);
    // if (steps[step].key === "screen")
    //   return (
    //     profile.moodChanges.length > 0 &&
    //     profile.behaviorChanges.length > 0 &&
    //     profile.thoughtChanges.length > 0
    //   );
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
      setMaxVisited((prev) => Math.max(prev, next));
    }
  };
  const goToStep = (index: number) => {
    if (index <= maxVisited) {
      setStep(index);
    }
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const bloom = Math.max(0.05, progressPct / 100);

  return (
    <div
      className="fixed inset-0 w-full h-dvh overflow-hidden"
      style={{ background: intPsychTheme.card, color: theme.text }}
    >
      <ConfettiBurst show={burst} />
      <GardenFrame bloom={bloom} />
      <ProgressHeader
        step={step}
        total={steps.length}
        praise={praise}
        onStepClick={goToStep}
        stepTitles={progressTitles}
        canNext={canNext}
        maxVisited={maxVisited}
        progressPct={progressPct}
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
                Insurance Portability and Accountability Act <b>(HIPAA)</b>.
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
            <ContactSection
              title={steps[step].title}
              profile={profile}
              setProfile={setProfile}
              step={step}
            />
          )}

          {steps[step].key === "profile" && (
            <ProfileSection
              title={steps[step].title}
              profile={profile}
              setProfile={setProfile}
              step={step}
            />
          )}

          {steps[step].key === "screen" && (
            <CheckInSection
              title={steps[step].title}
              profile={profile}
              setProfile={setProfile}
              step={step}
            />
          )}

          {steps[step].key === "story" && (
            <StorySection
              title={steps[step].title}
              step={step}
              profile={profile}
              setProfile={setProfile}
              storyText={storyText}
              setStoryText={setStoryText}
              storyAudio={storyAudio}
              setStoryAudio={setStoryAudio}
            />
          )}
          {steps[step].key === "medical" && (
            <MedicalSection
              title={steps[step].title}
              profile={profile}
              setProfile={setProfile}
              step={step}
            />
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
                  <ReviewItem label="Name" value={profile.firstName} />
                  <ReviewItem label="Name" value={profile.lastName} />
                  <ReviewItem label="Age" value={profile.age} />
                  <ReviewItem
                    label="Pronouns"
                    value={profile.pronouns[0]?.value || ""}
                  />
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
                  <ReviewItem
                    label="Mood changes"
                    value={
                      profile.moodChanges.length
                        ? profile.moodChanges.join(", ")
                        : "—"
                    }
                  />
                  <ReviewItem
                    label="Behavioral changes"
                    value={
                      profile.behaviorChanges.length
                        ? profile.behaviorChanges.join(", ")
                        : "—"
                    }
                  />
                  <ReviewItem
                    label="Thought changes"
                    value={
                      profile.thoughtChanges.length
                        ? profile.thoughtChanges.join(", ")
                        : "—"
                    }
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
      </div>
    </div>
  );
}
