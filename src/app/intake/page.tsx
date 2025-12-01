"use client";

import React, { useEffect, useState } from "react";
import type { Profile } from "../lib/types/types";
import { motion } from "framer-motion";
import { User, Baby, ArrowRight } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { theme, ease, intPsychTheme } from "../components/theme";
import GardenFrame from "../components/Garden/Garden";
import { DM_Sans, DM_Serif_Text } from "next/font/google";
import Link from "next/link";

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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [checkingProfile, setCheckingProfile] = useState(true);

  // Check if user has an existing profile and redirect to appropriate type
  useEffect(() => {
    if (status === "loading") return;

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

      // No existing profile or couldn't determine - show selection page
      setCheckingProfile(false);
    };

    checkExistingProfile();
  }, [status, router]);

  // Show loading while checking session or profile
  if (status === "loading" || checkingProfile) {
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
          <p className="text-gray-700">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 h-dvh overflow-y-auto overflow-x-hidden ${dm_sans.className}`}
      style={{
        color: theme.text,
        WebkitTapHighlightColor: "transparent",
        overflowX: "hidden",
        overscrollBehaviorX: "none",
        touchAction: "pan-y",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="hidden md:block">
        <GardenFrame bloom={0.3} />
      </div>

      <div
        className="relative z-10 mx-auto max-w-2xl px-4 min-h-full flex items-center justify-center"
        style={{ scrollbarGutter: "stable both-edges" }}
      >
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          className="w-full rounded-4xl border border-[#e7e5e4] border-b-4 bg-white px-6 py-8 md:py-10 shadow-sm"
        >
          <div className="text-center mb-8">
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
          </div>

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
              If you're unsure which to select, please contact our
              administrative staff.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
