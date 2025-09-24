"use client";

import React, { Fragment, useMemo, useState, useEffect } from "react";
import type { Profile } from "../lib/types/types";
import { motion, progress } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Save } from "lucide-react";
import ProgressHeader from "../components/ProgressHeader";
import ConfettiBurst from "../components/ConfettiBurst";
import StepTitle from "../components/StepTitle";
import { signOut, useSession } from "next-auth/react";
import { praises, welcomeMessages } from "../components/messages";
import { theme, ease, intPsychTheme } from "../components/theme";
import GardenFrame from "../components/Garden/Garden";
import ContactSection from "../components/Sections/ContactSection";
import ProfileSection from "../components/Sections/ProfileSection";
import CheckInSection from "../components/Sections/CheckInSection";
import MedicalSection from "../components/Sections/MedicalSection";
import RelationshipSection from "../components/Sections/RelationshipSection";
import StorySection from "../components/Sections/StorySection";
import AssessmentsSection from "../components/Sections/AssessmentsSection";
import ReviewSection from "../components/Sections/ReviewSection";

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
    maxVisited: 0,
    firstName: "",
    lastName: "",
    age: "",
    pronouns: [],
    email: "",
    contactNumber: "",
    dob: "",
    assessments: {
      suicide: {
        wishDead: "",
        thoughts: "",
        methodHow: "",
        intention: "",
        plan: "",
        behavior: "",
        behavior3mo: "",
      },
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
      gad7: {
        gad1: "",
        gad2: "",
        gad3: "",
        gad4: "",
        gad5: "",
        gad6: "",
        gad7: "",
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
      aceResilience: {
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
  const { data: session, status } = useSession();

  const [step, setStep] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [burst, setBurst] = useState(false);
  const [profile, setProfile] = useState<Profile>(makeDefaultProfile());
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  // Prevent re-loading state on tab focus/session refetch
  const hasBootstrapped = React.useRef(false);

  const progressPct = useMemo(() => {
    // Percent of furthest reached step over last index
    return Math.min(100, (profile.maxVisited / steps.length) * 100);
  }, [profile.maxVisited]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    if (status === "loading" || hasBootstrapped.current) return;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileResp = await fetch("api/profile/load", { method: "GET" });
        const data = await profileResp.json();
        const incoming = data?.profile ?? null;
        if (incoming) {
          const merged = mergeWithDefaults(makeDefaultProfile(), incoming);
          setProfile(merged);
          console.log("Loaded profile (merged)", merged);
        } else {
          setProfile((p) => ({
            ...p,
            firstName: session?.user?.name?.split(" ")[0] ?? "",
            lastName: session?.user?.name?.split(" ").slice(1).join(" ") ?? "",
            email: session?.user?.role !== "guest" ? session?.user?.email : "",
          }));
          console.log("No saved profile found, filling in session info");
        }
      } catch (err) {
        console.error("Failed loading profile", err);
      } finally {
        setLoading(false);
        hasBootstrapped.current = true; // mark as finished so focus refetches won't re-run bootstrap
      }
    };
    fetchProfile();
    // Only depend on `status` so we don't re-run when `session` object changes identity on refetch
  }, [status]);

  const canNext = useMemo(() => {
    const key = steps[step].key;

    // Contact: strict required fields
    if (key === "contact") {
      return Boolean(
        profile.firstName &&
          profile.lastName &&
          profile.age &&
          profile.email.includes("@") &&
          profile.dob &&
          profile.contactNumber
      );
    }

    // Profile: required demographics + basic anthropometrics
    if (key === "profile") {
      return Boolean(
        profile.genderIdentity &&
          profile.sexualOrientation.length > 0 &&
          profile.ethnicity.length > 0 &&
          profile.religion.length > 0 &&
          profile.pronouns.length > 0 &&
          profile.height.feet !== null &&
          profile.height.inches !== null &&
          profile.weightLbs !== null &&
          profile.highestDegree &&
          profile.dietType.length > 0 &&
          profile.alcoholFrequency &&
          profile.substancesUsed.length > 0 &&
          profile.jobDetails &&
          profile.hobbies
      );
    }

    // Quick Check-In: require minimal triage + suicide screener (now lives here)
    if (key === "screen") {
      const hasMood =
        Array.isArray(profile.moodChanges) && profile.moodChanges.length > 0;
      const hasBehavior =
        Array.isArray(profile.behaviorChanges) &&
        profile.behaviorChanges.length > 0;
      const hasThought =
        Array.isArray(profile.thoughtChanges) &&
        profile.thoughtChanges.length > 0;

      const s = profile.assessments.suicide;

      // Base required suicide items
      const baseSuicideAnswered = s.wishDead !== "" && s.thoughts !== "";

      // Conditional follow-ups only if there are suicidal thoughts
      let suicideOk = baseSuicideAnswered;
      if (s.thoughts === "yes") {
        suicideOk =
          suicideOk &&
          s.methodHow !== "" &&
          s.intention !== "" &&
          s.plan !== "" &&
          s.behavior !== "";

        // If behavior is yes, require timing follow-up
        if (s.behavior === "yes") {
          suicideOk = suicideOk && s.behavior3mo !== "";
        }
      }

      return hasMood && hasBehavior && hasThought && suicideOk;
    }

    // Story: require minimal narrative + goals (either text or audio counts)
    if (key === "story") {
      const hasStory = Boolean(
        (profile.storyNarrative?.text &&
          profile.storyNarrative.text.trim().length > 0) ||
          profile.storyNarrative?.audio?.url
      );
      const hasGoals = Boolean(
        (profile.goals?.text && profile.goals.text.trim().length > 0) ||
          profile.goals?.audio?.url
      );
      const hasLiving = Boolean(
        (profile.livingSituation?.text &&
          profile.livingSituation.text.trim().length > 0) ||
          profile.livingSituation?.audio?.url
      );
      const hasEnvironments = Boolean(
        (profile.upbringingEnvironments?.text &&
          profile.upbringingEnvironments.text.trim().length > 0) ||
          profile.upbringingEnvironments?.audio?.url
      );

      const hasUpbringingWhoWith = Boolean(
        (profile.upbringingWhoWith?.text &&
          profile.upbringingWhoWith.text.trim().length > 0) ||
          profile.upbringingWhoWith?.audio?.url
      );

      return (
        hasStory &&
        hasGoals &&
        hasLiving &&
        hasEnvironments &&
        hasUpbringingWhoWith
      );
    }

    // Relationships: require at least one mapped relationship
    if (key === "relationships") {
      return (
        Array.isArray(profile.relationships) && profile.relationships.length > 0
      );
    }

    // Medical: require that at least one medical data point is provided
    // (any of: current meds, previous meds, allergies, hospitalizations, or injuries)

    // Assessments: require the minimal baseline (PHQ-9 complete)
    if (key === "assessments") {
      const pss4 = profile.assessments.stress.pss4;
      return Boolean(pss4 !== "");
    }

    // All other steps: allow Next (internal components handle their own gating/UI)
    return true;
  }, [step, profile]);

  const progressTitles = steps.map((s) => s.title);

  const goNext = async () => {
    const next = Math.min(step + 1, steps.length - 1);
    if (next !== step) {
      // celebratory UI
      setPraise(praises[Math.floor(Math.random() * praises.length)]);
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
      setTimeout(() => setPraise(null), 2000);

      // compute new profile FIRST to avoid stale closure
      const newMaxVisited = Math.max(profile.maxVisited, next);
      const nextProfile: Profile = { ...profile, maxVisited: newMaxVisited };

      // update UI state
      setStep(next);
      setProfile(nextProfile);

      // helpful logs (old vs new)
      console.log(
        "[goNext] prev maxVisited:",
        profile.maxVisited,
        "next:",
        next,
        "new maxVisited:",
        newMaxVisited
      );

      // save using the freshly computed snapshot (do not rely on async state)
      await saveProgress(nextProfile);
    }
  };
  const goToStep = (index: number) => {
    if (index <= profile.maxVisited) {
      setStep(index);
    }
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const bloom = Math.max(0.05, progressPct / 100);

  async function saveProgress(override?: Profile) {
    try {
      const payload = override ?? profile;
      console.log(
        "[saveProgress] storing profile with maxVisited=",
        payload.maxVisited
      );
      const r = await fetch("/api/profile/create", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const msg = await r.text();
        throw new Error(`${r.status} ${msg}`);
      }
      const data = await r.json();
      console.log("[saveProgress] updated profile response", data);
    } catch (error) {
      console.error("Failed to store profile", error);
    }
  }

  if (!hasBootstrapped.current && (status === "loading" || loading)) {
    return (
      <div
        className="fixed inset-0 min-h-[100svh] h-dvh flex items-center justify-center"
        style={{ background: intPsychTheme.card, color: theme.text }}
      >
        <div className="animate-pulse text-center">
          <div
            style={{ borderTopColor: intPsychTheme.secondary }}
            className="rounded-full h-12 w-12 mx-auto mb-4 border-4 border-gray-300 border-t-4 border-t-transparent animate-spin"
          />
          <p className="text-gray-700">Preparing your intake…</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 min-h-[100svh] h-dvh overflow-hidden"
      style={{
        background: intPsychTheme.card,
        color: theme.text,
        paddingBottom: "env(safe-area-inset-bottom)",
        WebkitTapHighlightColor: "transparent",
        overflowX: "hidden",
        overscrollBehaviorX: "none",
        touchAction: "pan-y",
      }}
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
        maxVisited={profile.maxVisited}
        progressPct={progressPct}
      />

      <div
        className="relative z-10 mx-auto max-w-4xl px-4 py-8"
        style={{ scrollbarGutter: "stable both-edges" }}
      >
        <motion.div
          ref={scrollContainerRef}
          key={steps[step].key}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="w-full rounded-4xl border border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-6 md:px-6 md:py-8 shadow-md max-h-[70vh] scrollable-div overflow-y-auto overflow-x-hidden box-border overscroll-y-contain"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarGutter: "stable both-edges",
            overscrollBehaviorX: "none",
            touchAction: "pan-y",
          }}
        >
          {steps[step].key === "welcome" && (
            <div className="space-y-6">
              <StepTitle
                n={step + 1}
                title={`${(() => {
                  if (profile.maxVisited === 0) return welcomeMessages[0];
                  if (profile.maxVisited >= 1 && profile.maxVisited <= 4)
                    return welcomeMessages[1];
                  if (profile.maxVisited === 5) return welcomeMessages[2];
                  if (profile.maxVisited >= 6 && profile.maxVisited <= 8)
                    return welcomeMessages[3];
                  return welcomeMessages[4];
                })()} ${session?.user?.name?.split(" ")[0] ?? ""}!`}
              />

              {/* At-a-glance cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="text-sm text-slate-500">Estimated time</div>
                  <div className="text-lg font-semibold text-slate-900">
                    30–60 minutes
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    You can move between sections and come back to edit answers.
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <div className="text-sm text-slate-500">Format</div>
                  <div className="text-lg font-semibold text-slate-900">
                    Multiple‑choice + Free‑response
                  </div>
                  <div className="mt-2 text-sm text-slate-600">
                    Type your responses or select from options.
                  </div>
                </div>
              </div>

              {/* What to expect */}
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
                <h3 className="font-semibold text-slate-900">What to expect</h3>
                <ul className="mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 flex-none text-emerald-600" />
                    <span className="text-slate-700">
                      This intake helps your clinician{" "}
                      <b>jumpstart treatment</b> by gathering context that might
                      otherwise take a full session.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 flex-none text-emerald-600" />
                    <span className="text-slate-700">
                      Progress is shown above. You’ll unlock later sections as
                      you complete earlier ones.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 flex-none text-emerald-600" />
                    <span className="text-slate-700">
                      The more <b>detail</b> you provide, the better we can
                      tailor your care.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Saving behavior */}
              <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
                <h3 className="font-semibold text-slate-900">
                  Saving &amp; returning
                </h3>
                {session?.user?.role === "guest" ? (
                  <p className="mt-2 text-slate-700">
                    You’re using a <b>guest session</b>. If you close this tab,
                    your progress won’t save. To save and return later, please
                    create an account or sign in with Google.
                  </p>
                ) : (
                  <div className="mt-2 space-y-2 text-slate-700">
                    <p>
                      Your progress saves each time you click <b>Next</b>. You
                      can return later and pick up where you left off.
                    </p>
                    <p className="text-sm text-slate-600">
                      Note: If you leave a page mid‑way without clicking Next,
                      answers on that page may not be saved.
                    </p>
                  </div>
                )}
              </div>
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
                .
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

          {steps[step].key === "review" && (
            <ReviewSection title="You're all set 🎉" step={step} />
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex cursor-pointer disabled:cursor-not-allowed bg-white items-center gap-2 rounded-xl px-3 py-2 font-medium border border-gray-300 text-gray-700 disabled:opacity-40 transition duration-150 hover:brightness-95 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <div>
              {step < 1 && (
                <button
                  onClick={() =>
                    profile.maxVisited === 0
                      ? goNext()
                      : setStep(profile.maxVisited)
                  }
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-semibold text-white transition duration-150 hover:brightness-90 active:scale-95"
                  style={{ background: intPsychTheme.secondary }}
                >
                  {profile.maxVisited === 0 ? "Start" : "Resume"}
                  <ChevronRight className="h-4 w-4" />
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
                    className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition duration-150 hover:brightness-90 active:scale-95"
                    style={{ background: intPsychTheme.secondary }}
                  >
                    {steps[step].key === "assessments" ? "Finish" : "Next"}{" "}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {step === steps.length - 1 && (
              <button
                onClick={() => {
                  setStep(0);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white transition duration-150 hover:brightness-90 active:scale-95"
                style={{ background: theme.primary }}
              >
                Back to Beginning
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
