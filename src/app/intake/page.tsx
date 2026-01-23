"use client";

import React, { useEffect, useState } from "react";
import type { Profile } from "../lib/types/types";
import { motion } from "framer-motion";
import {
  User,
  Baby,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { theme, ease, intPsychTheme } from "../components/theme";
import { DM_Sans, DM_Serif_Text } from "next/font/google";
import Link from "next/link";
import { sigmundTheme } from "../components/theme";
import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { CLINICIANS } from "../lib/text";
import { createPortal } from "react-dom";
import { useRef } from "react";
import { Check, ChevronDown } from "lucide-react";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

// ---- Default Profile Factories (exported for use by [type]/page.tsx) ----

// --- DISC Teen Depression Scale (DTDS) blank responses helper ---
const dtdsKeys = [
  "dtds01",
  "dtds02",
  "dtds03",
  "dtds04",
  "dtds05",
  "dtds06",
  "dtds07",
  "dtds08",
  "dtds09",
  "dtds10",
  "dtds11",
  "dtds12",
  "dtds13",
  "dtds14",
  "dtds15",
  "dtds16",
  "dtds17",
  "dtds18",
  "dtds19",
  "dtds20",
  "dtds21",
  "dtds22",
] as const;
function blankDiscResponses(): Record<(typeof dtdsKeys)[number], string> {
  return dtdsKeys.reduce((acc, k) => {
    (acc as any)[k] = "";
    return acc;
  }, {} as any);
}

export function makeDefaultAdultProfile(): Profile {
  return {
    maxVisited: 0,
    isChild: null,
    firstName: "",
    lastName: "",
    age: "",
    pronouns: [],
    email: "",
    contactNumber: "",
    dob: "",
    assessments: {
      kind: "adult",
      data: {
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
        crafft: {
          partA: { daysAlcohol: "", daysMarijuana: "", daysOther: "" },
          partB: {
            car: "",
            relax: "",
            alone: "",
            forget: "",
            familyFriends: "",
            trouble: "",
          },
        },
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
    hasFirearm: false,
    dailyMobileScreenTime: null,
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
    followupQuestions: {
      question1: { question: "", answer: { text: "" } },
      question2: { question: "", answer: { text: "" } },
      question3: { question: "", answer: { text: "" } },
    },
  };
}

// --- SNAP‑IV (26) blank responses helper ---
const snapKeys = [
  "snap01",
  "snap02",
  "snap03",
  "snap04",
  "snap05",
  "snap06",
  "snap07",
  "snap08",
  "snap09",
  "snap10",
  "snap11",
  "snap12",
  "snap13",
  "snap14",
  "snap15",
  "snap16",
  "snap17",
  "snap18",
  "snap19",
  "snap20",
  "snap21",
  "snap22",
  "snap23",
  "snap24",
  "snap25",
  "snap26",
] as const;
function blankSnapResponses(): Record<(typeof snapKeys)[number], string> {
  return snapKeys.reduce((acc, k) => {
    (acc as any)[k] = "";
    return acc;
  }, {} as any);
}

// --- SCARED (41) blank responses helper ---
const scaredKeys = Array.from(
  { length: 41 },
  (_, i) => `scared${String(i + 1).padStart(2, "0")}`
);
function blankScaredResponses(): Record<(typeof scaredKeys)[number], string> {
  return scaredKeys.reduce((acc, k) => {
    (acc as any)[k] = "";
    return acc;
  }, {} as any);
}

export function makeDefaultChildProfile(): Profile {
  return {
    maxVisited: 0,
    isChild: null,
    firstName: "",
    lastName: "",
    age: "",
    pronouns: [],
    email: "",
    contactNumber: "",
    dob: "",
    assessments: {
      kind: "child",
      data: {
        discTeen: {
          self: { form: "self", responses: blankDiscResponses() },
          parent: { form: "parent", responses: blankDiscResponses() },
        },
        snap: { ...(blankSnapResponses() as any) },
        snapCollateral: [],
        scared: {
          self: { form: "self", responses: blankScaredResponses() as any },
          parent: { form: "parent", responses: blankScaredResponses() as any },
        },
        cssrs: {
          wishDead: "",
          thoughts: "",
          methodHow: "",
          intention: "",
          plan: "",
          behavior: "",
          behavior3mo: "",
        },
      },
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
    hasFirearm: false,
    dailyMobileScreenTime: null,
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
    relationships: [],
    storyNarrative: { text: "" },
    goals: { text: "" },
    livingSituation: { text: "" },
    cultureContext: { text: "" },
    prevTreatmentSummary: { text: "" },
    familyHistoryElaboration: { text: "" },
    upbringingEnvironments: { text: "" },
    upbringingWhoWith: { text: "" },
    parent1FirstName: undefined,
    parent1LastName: undefined,
    parent2FirstName: undefined,
    parent2LastName: undefined,
    parentOccupation: undefined,
    parentEmployer: undefined,
    parentEducation: undefined,
    schoolInfo: {
      schoolName: "",
      schoolPhoneNumber: "",
      yearsAtSchool: 0,
      grade: "",
      hasRepeatedGrade: false,
      repeatedGradeDetail: "",
      hasSpecialClasses: false,
      specialClassesDetail: "",
      hasSpecialServices: false,
      specialServicesDetail: "",
      academicGrades: "",
    },
    relationshipsAbilities: {
      teachersPeersRelationship: "",
      childAbilityWorkIndependently: "",
      childAbilityOrganizeSelf: "",
      childAttendance: "",
      hadTruancyProceedings: false,
      truancyProceedingsDetail: "",
      receivedSchoolCounseling: false,
      schoolCounselingDetail: "",
      activitiesInterestsStrengths: "",
      otherConcerns: "",
    },
    fatherSideMedicalIssues: "",
    motherSideMedicalIssues: "",
    childMedicalHistory: {
      hasNeuropsychTesting: false,
      neuropsychEvalDate: "",
      neuropsychEvalReason: "",
      neuropsychEvaluationsPerformed: "",
      psychiatricHospitalized: false,
      psychiatricHospitalizationDetails: "",
      suicideThoughtsEver: false,
      suicideThoughtsLastTimePlan: "",
      suicideAttemptEver: false,
      suicideAttemptDetails: "",
      selfHarmEver: false,
      selfHarmStill: false,
      selfHarmFrequencyDetails: "",
      substanceUseEver: false,
      substanceUseDetails: "",
      medicalConditions: [],
      medicalConditionsOther: "",
      immunizationsUpToDate: true,
      recentPhysicalExam: "",
      physicalExamDetails: "",
    },
    // --- Child: Prenatal & Birth History ---
    childPrenatalHistory: {
      pregnancyHealthy: false,
      fullTerm: false,
      laborType: "",
      birthWeight: "",
      hasComplications: false,
      complicationsDetails: "",
      hadMedsDuringPregnancy: false,
      medsDuringPregnancyDetails: "",
      hadAlcoholDuringPregnancy: false,
      alcoholDuringPregnancyDetails: "",
      hadDrugsDuringPregnancy: false,
      drugsDuringPregnancyDetails: "",
      motherSmokedDuringPregnancy: false,
      motherSmokedDuringPregnancyDetails: "",
      deliveryNormal: true,
      deliveryProblems: "",
      presentationAtBirth: "",
      troubleStartingToBreathe: false,
      jaundiced: false,
      jaundiceTreatmentRequired: false,
      jaundiceTreatmentDetails: "",
      feedingMethod: "",
      breastFeedingDuration: "",
      hadFeedingProblems: false,
      feedingProblemsDetails: "",
      gainedWeightWell: true,
      hadEarlyProblems: false,
      earlyProblemsDetails: "",
      totalPregnancies: 0,
      liveBirths: 0,
      birthOrder: 0,
    },
    childPsychiatricHistory: {
      treatmentKinds: [],
      firstTreatmentDate: "",
      individualDetails: "",
      groupDetails: "",
      familyCouplesDetails: "",
      otherDetails: "",
    },
    childDevelopmentalHistory: {
      activityLevel: "",
      activityLevelOther: "",
      earlyAffectiveStyle: "",
      earlyAffectiveStyleOther: "",
      cryingPattern: "",
      cryingPatternOther: "",
      soothingWhenUpset: "",
      soothingWhenUpsetOther: "",
      responseToBeingHeld: "",
      reactionToStrangers: "",
      eatingHabitsNotes: "",
      sleepingHabitsNotes: "",
    },
    childDevelopmentalMilestones: {
      motor: [],
      language: [],
      adaptive: [],
      notes: "",
    },
    followupQuestions: {
      question1: { question: "", answer: { text: "" } },
      question2: { question: "", answer: { text: "" } },
      question3: { question: "", answer: { text: "" } },
    },
  };
}

export default function IntakeSelectionPage() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  // States for the flow
  // loading: checking profile/session
  // check-legacy: "Did you take Qualtrics?"
  // confirm-yes: "Are you sure you took it?"
  // confirm-no: "Are you sure you didn't?"
  // select-clinician: "Who is your clinician?"
  // select: Adult vs Child (original flow)
  type FlowStep =
    | "loading"
    | "check-legacy"
    | "confirm-yes"
    | "confirm-no"
    | "select-clinician"
    | "select";
  const [step, setStep] = useState<FlowStep>("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clinician Selection State
  const [clinicianName, setClinicianName] = useState<string>("");
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px = mt-2
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  // Check if user has an existing profile and redirect to appropriate type
  useEffect(() => {
    if (status === "loading") return;

    // If not authenticated, let middleware handle it, or show loading
    if (status === "unauthenticated") return;

    const checkExistingProfile = async () => {
      try {
        const res = await fetch("/api/profile/load");
        if (res.ok) {
          const data = await res.json();
          const profile = data?.profile;

          // If user has existing profile with isChild set, redirect to that type
          if (profile && typeof profile.isChild === "boolean") {
            const targetPath = profile.isChild
              ? "/intake/child"
              : "/intake/adult";
            router.replace(targetPath);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to check existing profile:", err);
      }

      // No existing profile -> Start the legacy check flow
      setStep("check-legacy");
    };

    checkExistingProfile();
  }, [status, router]);

  const handleMarkComplete = async () => {
    try {
      setIsSubmitting(true);

      // First, save the clinician if we have one
      if (clinicianName) {
        const saveRes = await fetch("/api/profile/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "updateClinician",
            clinician: clinicianName,
          }),
        });
        if (!saveRes.ok) {
          console.error("Failed to save clinician");
          // We continue anyway? Or stop?
          // Probably better to continue so they don't get stuck, but log it.
        }
      }

      const res = await fetch("/api/user/complete", { method: "POST" });
      if (res.ok) {
        // Update session so middleware sees the new intakeFinished state
        await update();
        // Force reload/redirect to dashboard
        // We use window.location to ensure a full refresh/middleware re-check
        window.location.href = "/dashboard";
      } else {
        console.error("Failed to update status");
        setIsSubmitting(false);
      }
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  };

  // --- Render Helpers ---

  // Common wrapper for the card
  const CardWrapper = ({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: React.ReactNode;
  }) => (
    <div
      className={`fixed inset-0 h-dvh overflow-y-auto overflow-x-hidden ${dm_sans.className}`}
      style={{
        color: theme.text,
        WebkitTapHighlightColor: "transparent",
        backgroundColor: sigmundTheme.background,
      }}
    >
      <div
        className="relative z-10 mx-auto max-w-3xl px-4 min-h-full flex items-center justify-center p-4"
        style={{ scrollbarGutter: "stable both-edges" }}
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="w-full rounded-4xl border border-[#e7e5e4] border-b-4 bg-white px-6 py-10 md:px-10 shadow-sm"
        >
          <div className="text-center mb-8 md:mb-10">{title}</div>
          {children}
        </motion.div>
      </div>
    </div>
  );

  // Loading State
  if (status === "loading" || step === "loading" || isSubmitting) {
    return (
      <div
        className="fixed inset-0 min-h-[100svh] h-dvh flex items-center justify-center"
        style={{ background: sigmundTheme.background, color: theme.text }}
      >
        <div className="animate-pulse text-center flex flex-col items-center gap-4">
          <div
            style={{
              borderColor: sigmundTheme.border,
              borderTopColor: sigmundTheme.secondary,
            }}
            className="rounded-full h-12 w-12 border-4 animate-spin"
          />
          <p className="text-slate-600 font-medium">
            {isSubmitting ? "Updating your profile..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  // --- Step 1: Check Legacy ---
  if (step === "check-legacy") {
    return (
      <CardWrapper
        title={
          <>
            <h1
              className={`text-2xl md:text-4xl ${dm_serif.className} font-bold mb-4`}
            >
              Start Intake
            </h1>
            <p className="text-lg text-slate-600 max-w-xl mx-auto">
              Before we begin, are you an <b>existing patient</b> who's already
              completed the previous intake assessment on Qualtrics?
            </p>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <button
            onClick={() => setStep("confirm-yes")}
            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-b-4 p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
            style={{
              borderColor: sigmundTheme.border,
              backgroundColor: "white",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-colors group-hover:bg-emerald-50"
              style={{ backgroundColor: sigmundTheme.hover }}
            >
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <span className="text-xl font-bold text-slate-800 group-hover:text-emerald-700">
              Yes, I have
            </span>
          </button>

          <button
            onClick={() => setStep("confirm-no")}
            className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-b-4 p-8 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-500/20"
            style={{
              borderColor: sigmundTheme.border,
              backgroundColor: "white",
            }}
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center transition-colors group-hover:bg-slate-200">
              <XCircle className="w-8 h-8 text-slate-600" />
            </div>
            <span className="text-xl font-bold text-slate-800 group-hover:text-slate-900">
              No, not yet
            </span>
          </button>
        </div>
      </CardWrapper>
    );
  }

  // --- Step 2a: Confirm YES ---
  if (step === "confirm-yes") {
    return (
      <CardWrapper
        title={
          <>
            <div className="mx-auto w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h1
              className={`text-2xl md:text-3xl ${dm_serif.className} font-bold mb-3 text-slate-900`}
            >
              Are you sure?
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              If you indicate you've already completed the Qualtrics assessment,
              you will <strong>skip</strong> our new intake and go directly to
              your dashboard.
            </p>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setStep("check-legacy")}
            className="order-2 md:order-1 w-full py-4 px-6 rounded-xl border-2 border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>

          <button
            onClick={() => setStep("select-clinician")}
            className="order-1 md:order-2 w-full py-4 px-6 rounded-xl border-b-4 font-bold text-white shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: sigmundTheme.accent,
              borderColor: sigmundTheme.secondaryDark,
            }}
          >
            Yes, I'm sure
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </CardWrapper>
    );
  }

  // --- Step 2c: Select Clinician (For Legacy Users) ---
  if (step === "select-clinician") {
    const hasSelectedClinician = clinicianName !== "";

    return (
      <CardWrapper
        title={
          <>
            <h1
              className={`text-2xl md:text-3xl ${dm_serif.className} font-bold mb-3 text-slate-900`}
            >
              Select Your Clinician
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              Please select who you are seeing at Integrative Psych.
            </p>
          </>
        }
      >
        <div className="max-w-md mx-auto w-full mb-8 text-left">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Assigned Clinician <span className="text-red-500">*</span>
            </label>
            <Field>
              <Listbox
                value={clinicianName || ""}
                onChange={(val: string) => {
                  setClinicianName(val);
                  setDropdownPosition(null);
                }}
              >
                {({ open }) => {
                  // Update position when dropdown opens
                  useEffect(() => {
                    if (open) {
                      requestAnimationFrame(() => updateDropdownPosition());
                    } else {
                      setDropdownPosition(null);
                    }
                  }, [open]);

                  return (
                    <div className="relative">
                      <ListboxButton
                        ref={buttonRef}
                        className={`w-full relative block rounded-xl bg-white border-2 px-4 py-3 text-left text-slate-900 transition-all ${
                          hasSelectedClinician
                            ? "border-emerald-500 ring-1 ring-emerald-500"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {clinicianName ? (
                          <span className="block truncate text-slate-900 font-medium">
                            {clinicianName}
                          </span>
                        ) : (
                          <span className="block truncate text-slate-400">
                            Select...
                          </span>
                        )}
                        <ChevronDown
                          className="pointer-events-none absolute top-3.5 right-3 size-5 text-slate-400"
                          aria-hidden="true"
                        />
                      </ListboxButton>

                      {open && dropdownPosition && typeof window !== "undefined"
                        ? createPortal(
                            <ListboxOptions
                              static
                              className="fixed z-[9999] mt-2 max-h-60 overflow-auto rounded-xl bg-white py-1 shadow-xl border border-slate-200 focus:outline-none list-none ring-1 ring-black/5"
                              style={{
                                top: `${dropdownPosition.top}px`,
                                left: `${dropdownPosition.left}px`,
                                width: `${dropdownPosition.width}px`,
                              }}
                            >
                              {CLINICIANS.map((clinician) => (
                                <ListboxOption
                                  key={clinician.name}
                                  value={clinician.name}
                                  as={React.Fragment}
                                >
                                  {({ active, selected }) => (
                                    <li
                                      className={`${
                                        active
                                          ? "bg-emerald-50 text-emerald-900"
                                          : "bg-white text-slate-900"
                                      } relative cursor-pointer select-none py-3 pl-4 pr-10 border-b border-slate-50 last:border-0`}
                                    >
                                      <span
                                        className={`${
                                          selected
                                            ? "font-semibold"
                                            : "font-normal"
                                        } block truncate`}
                                      >
                                        {clinician.name}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-3 flex items-center text-emerald-600">
                                          <Check className="w-5 h-5" />
                                        </span>
                                      )}
                                    </li>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>,
                            document.body
                          )
                        : null}
                    </div>
                  );
                }}
              </Listbox>
            </Field>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setStep("confirm-yes")}
            disabled={isSubmitting}
            className="order-2 md:order-1 w-full py-4 px-6 rounded-xl border-2 border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>

          <button
            onClick={handleMarkComplete}
            disabled={!hasSelectedClinician || isSubmitting}
            className={`order-1 md:order-2 w-full py-4 px-6 rounded-xl border-b-4 font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
              !hasSelectedClinician || isSubmitting
                ? "bg-slate-300 border-slate-400 cursor-not-allowed opacity-70"
                : "hover:brightness-110 active:scale-[0.98]"
            }`}
            style={
              !hasSelectedClinician || isSubmitting
                ? {}
                : {
                    backgroundColor: sigmundTheme.primary,
                    borderColor: sigmundTheme.accent,
                  }
            }
          >
            {isSubmitting ? "Setting up..." : "Complete Setup"}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </CardWrapper>
    );
  }

  // --- Step 2b: Confirm NO ---
  if (step === "confirm-no") {
    return (
      <CardWrapper
        title={
          <>
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-8 h-8 text-blue-500" />
            </div>
            <h1
              className={`text-2xl md:text-3xl ${dm_serif.className} font-bold mb-3 text-slate-900`}
            >
              Just to confirm
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              You will now be asked to complete the full intake assessment to
              begin your treatment. This typically takes 30-45 minutes.
            </p>
          </>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setStep("check-legacy")}
            className="order-2 md:order-1 w-full py-4 px-6 rounded-xl border-2 border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>

          <button
            onClick={() => setStep("select")}
            className="order-1 md:order-2 w-full py-4 px-6 rounded-xl border-b-4 font-bold text-white shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: sigmundTheme.accent,
              borderColor: sigmundTheme.secondaryDark,
            }}
          >
            I'm Ready
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </CardWrapper>
    );
  }

  // --- Step 3: Select Adult/Child (Original UI) ---
  if (step === "select") {
    // This is the original UI, wrapped in our CardWrapper (or similar structure)
    // We can reuse CardWrapper for consistency, or stick to the exact original layout.
    // The original had a slightly different top text.
    return (
      <CardWrapper
        title={
          <>
            <h1
              className={`text-2xl md:text-4xl ${dm_serif.className} font-bold text-slate-900 mb-2`}
              style={{ color: intPsychTheme.primary }}
            >
              Welcome
              {session?.user?.name
                ? `, ${session.user.name.split(" ")[0]}`
                : ""}
              !
            </h1>
            <p className="text-slate-600">
              Please select who this assessment is for to get started.
            </p>
          </>
        }
      >
        <div className="grid gap-4">
          <Link
            href="/intake/adult"
            className="group block w-full text-left rounded-2xl border-2 border-b-4 p-5 md:p-6 transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50/50 border-slate-200 bg-white/80 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200 transition-colors">
                <User className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    Adult Assessment (18+)
                  </h2>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  I am completing this for my own treatment.
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/intake/child"
            className="group block w-full text-left rounded-2xl border-2 border-b-4 p-5 md:p-6 transition-all duration-200 hover:border-sky-500 hover:bg-sky-50/50 border-slate-200 bg-white/80 hover:shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-200 transition-colors">
                <Baby className="w-6 h-6 text-sky-700" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                    Child Assessment (Under 18)
                  </h2>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all" />
                </div>
                <p className="mt-1 text-sm text-slate-600">
                  I am a parent or guardian filling this out for my child.
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500 text-center">
            If you're unsure which to select, please contact our administrative
            staff.
          </p>
        </div>
      </CardWrapper>
    );
  }

  return null;
}
