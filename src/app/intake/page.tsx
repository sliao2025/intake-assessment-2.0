"use client";

import React, { Fragment, useMemo, useState, useEffect } from "react";
import type { Profile } from "../lib/types";
import { motion, progress } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Save } from "lucide-react";
import ProgressHeader from "../components/ProgressHeader";
import ConfettiBurst from "../components/ConfettiBurst";
import StepTitle from "../components/StepTitle";
import { signOut, useSession } from "next-auth/react";

import { praises, theme, ease, intPsychTheme } from "../components/theme";
import GardenFrame from "../components/Garden/Garden";
import ContactSection from "../components/Sections/ContactSection";
import ProfileSection from "../components/Sections/ProfileSection";
import CheckInSection from "../components/Sections/CheckInSection";
import MedicalSection from "../components/Sections/MedicalSection";
import RelationshipSection from "../components/Sections/RelationshipSection";
import StorySection from "../components/Sections/StorySection";
import AssessmentsSection from "../components/Sections/AssessmentsSection";

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
  { key: "relationships", title: "Relationships", type: "form" },
  { key: "medical", title: "Medical History", type: "form" },
  { key: "assessments", title: "Assessments", type: "form" },
  { key: "review", title: "Review", type: "review" },
];

// Build a fresh default profile each time to avoid stale/shared references
function makeDefaultProfile(): Profile {
  return {
    progress: 0,
    firstName: "",
    lastName: "",
    age: "",
    pronouns: [],
    email: "",
    contactNumber: "",
    dob: "",
    assessments: {
      suicide: { ideation: "", intent: "", plan: "", protective: "" },
      phq9: {
        phq1: "",
        phq2: "",
        phq3: "",
        phq4: "",
        phq5: "",
        phq6: "",
        phq7: "",
        phq8: "",
        phq9: "",
      },
      selfHarm: { pastMonth: "", lifetime: "" },
      asrs5: {
        asrs1: "",
        asrs2: "",
        asrs3: "",
        asrs4: "",
        asrs5: "",
        asrs6: "",
      },
      ptsd: { ptsd1: "", ptsd2: "", ptsd3: "", ptsd4: "", ptsd5: "" },
      ace: {
        ace1: "",
        ace2: "",
        ace3: "",
        ace4: "",
        ace5: "",
        ace6: "",
        ace7: "",
        ace8: "",
        ace9: "",
        ace10: "",
      },
      stress: { pss1: "", pss2: "", pss3: "", pss4: "" },
    },
    height: { feet: null, inches: null },
    weightLbs: null,
    genderIdentity: "",
    sexualOrientation: [],
    ethnicity: [],
    religion: [],
    highestDegree: "",
    isMarried: false,
    timesMarried: 0,
    isSexuallyActive: false,
    sexualPartners: "",
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
    likedChildhood: false,
    relationships: [],
    storyNarrative: { text: "" },
    goals: { text: "" },
    livingSituation: { text: "" },
    cultureContext: { text: "" },
    prevTreatmentSummary: { text: "" },
    familyHistoryElaboration: { text: "" },
    upbringingEnvironments: { text: "" },
    upbringingWhoWith: { text: "" },
    childhoodNegativeReason: { text: "" },
  };
}

// Deep merge incoming partial profile into defaults (arrays replaced, objects merged, primitives prefer incoming when defined)
function mergeWithDefaults<T extends Record<string, any>>(
  defaults: T,
  incoming: Partial<T>
): T {
  const output: any = Array.isArray(defaults) ? [] : { ...defaults };
  for (const key of Object.keys(defaults)) {
    const d = (defaults as any)[key];
    const i = (incoming as any)?.[key];

    if (i === undefined || i === null) {
      // keep default when incoming is missing/null
      (output as any)[key] = d;
      continue;
    }

    // Arrays: take incoming as-is
    if (Array.isArray(d)) {
      (output as any)[key] = Array.isArray(i) ? i : d;
      continue;
    }

    // Objects: recurse
    if (d && typeof d === "object" && !Array.isArray(d)) {
      (output as any)[key] = mergeWithDefaults(
        d,
        typeof i === "object" ? i : {}
      );
      continue;
    }

    // Primitives: prefer incoming
    (output as any)[key] = i;
  }

  // Also include any extra keys from incoming not present in defaults
  for (const key of Object.keys(incoming || {})) {
    if (!(key in output)) {
      (output as any)[key] = (incoming as any)[key];
    }
  }

  return output as T;
}

export default function Page() {
  const { data: session } = useSession();

  const [step, setStep] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [burst, setBurst] = useState(false);
  const [maxVisited, setMaxVisited] = useState(0);
  const [profile, setProfile] = useState<Profile>(makeDefaultProfile());
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  const progressPct = useMemo(() => {
    if (steps.length <= 1) return 0;
    // Percent of furthest reached step over last index
    return Math.min(100, Math.round((maxVisited / (steps.length - 1)) * 100));
  }, [maxVisited]);

  useEffect(() => {
    setProfile((p) => ({ ...p, progress: progressPct }));
    console.log(progressPct);
  }, [progressPct]);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      console.log(session);
      const profileResp = await fetch("api/profile/load", {
        method: "GET",
      });
      const data = await profileResp.json();
      const incoming = data?.profile ?? null;
      if (incoming) {
        const merged = mergeWithDefaults(makeDefaultProfile(), incoming);
        setProfile(merged);
        console.log("Loaded profile (merged)", merged);
      } else {
        // Ensure we always have a fresh default object
        setProfile(makeDefaultProfile());
        console.log("No saved profile found; using defaults");
      }
    };
    fetchProfile();
  }, [session]);

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
    //   return true; // updated logic removed storyText/storyAudio dependency
    // if (steps[step].key === "screen")
    //   return (
    //     profile.moodChanges.length > 0 &&
    //     profile.behaviorChanges.length > 0 &&
    //     profile.thoughtChanges.length > 0
    //   );
    return true;
  }, [step, profile]);

  const progressTitles = steps.map((s) => s.title);

  const goNext = async () => {
    const next = Math.min(step + 1, steps.length - 1);
    if (next !== step) {
      setPraise(praises[Math.floor(Math.random() * praises.length)]);
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
      setTimeout(() => setPraise(null), 2000);
      setStep(next);
      setMaxVisited((prev) => Math.max(prev, next)); //change this logic to change when all field are complete
      saveProgress();
    }
  };
  const goToStep = (index: number) => {
    if (index <= maxVisited) {
      setStep(index);
    }
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const bloom = Math.max(0.05, progressPct / 100);

  async function saveProgress() {
    try {
      const r = await fetch("/api/profile/create", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (!r.ok) {
        const msg = await r.text();
        throw new Error(`${r.status} ${msg}`);
      }
      const data = await r.json();
      console.log("Updated profile", data);
    } catch (error) {
      console.error("Failed to store profile", error);
    }
  }

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
          ref={scrollContainerRef}
          key={steps[step].key}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="rounded-4xl border border-gray-200 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-md max-h-[70vh] scrollable-div overflow-y-auto pr-2"
        >
          {steps[step].key === "welcome" && (
            <div className="space-y-5">
              <StepTitle
                n={step + 1}
                title={`Welcome, ${session?.user?.name.split(" ")[0] ?? ""}`}
              />
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
              <p>
                The whole process should take around 30 minutes to an hour, but
                you
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
            />
          )}

          {steps[step].key === "relationships" && (
            <RelationshipSection
              title={steps[step].title}
              step={step}
              profile={profile}
              setProfile={setProfile}
              scrollContainerRef={scrollContainerRef}
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

          {steps[step].key === "assessments" && (
            <AssessmentsSection
              title={steps[step].title}
              profile={profile}
              setProfile={setProfile}
              step={step}
            />
          )}

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex cursor-pointer disabled:cursor-not-allowed bg-white items-center gap-2 rounded-xl px-3 py-2 font-medium border border-gray-300 text-gray-700 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <div>
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
                <>
                  {/* <button
                    onClick={saveProgress}
                    className="inline-flex mr-2 items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    style={{ background: intPsychTheme.accent }}
                  >
                    Save <Save className="h-4 w-4" />
                  </button> */}
                  <button
                    onClick={goNext}
                    disabled={!canNext}
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                    style={{ background: intPsychTheme.secondary }}
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

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
