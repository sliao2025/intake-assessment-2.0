"use client";

import React, { useMemo, useState, useEffect } from "react";
import type { Profile } from "../lib/types/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import ProgressHeader from "../components/ProgressHeader";
import ConfettiBurst from "../components/ConfettiBurst";
import { useSession } from "next-auth/react";
import { praises } from "../components/messages";
import { theme, ease, intPsychTheme } from "../components/theme";
import GardenFrame from "../components/Garden/Garden";
import ContactSection from "../components/Sections/ContactSection";
import ProfileSection from "../components/Sections/ProfileSection";
import CheckInSection from "../components/Sections/CheckInSection";
import MedicalSection from "../components/Sections/MedicalSection";
import RelationshipSection from "../components/Sections/RelationshipSection";
import StorySection from "../components/Sections/StorySection";
import { VoiceRecorderHandle } from "../components/VoiceRecorder";
import AssessmentsSection from "../components/Sections/AssessmentsSection";
import FollowUpSection from "../components/Sections/FollowUpSection";
import ReviewSection from "../components/Sections/ReviewSection";
import HIPAASection from "../components/Sections/HIPAASection";
import WelcomeSection from "../components/Sections/WelcomeSection";
import ReportSection from "../components/Sections/ReportSection";

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
  { key: "follow up", title: "Follow-Up Questions", type: "form" },
  { key: "review", title: "Review", type: "review" },
  { key: "report", title: "Your Report", type: "review" },
];

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

// ---- Default Profile Factories ----
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
  const [profile, setProfile] = useState<Profile>(makeDefaultAdultProfile());
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [showSubmittedUI, setShowSubmittedUI] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);
  // Prevent re-loading state on tab focus/session refetch
  const hasBootstrapped = React.useRef(false);

  // Ref to store all VoiceRecorder component refs
  const voiceRecorderRefs = React.useRef<{
    [key: string]: VoiceRecorderHandle | null;
  }>({});

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
          // Use the correct default based on what's in the database
          const baseDefaults =
            incoming.isChild === true
              ? makeDefaultChildProfile()
              : makeDefaultAdultProfile();
          console.log(incoming, "incoming profile");
          console.log(incoming.isChild, "incoming isChild");
          console.log(baseDefaults, "base defaults");
          const merged = mergeWithDefaults(baseDefaults, incoming);
          setProfile(merged);
          console.log("Loaded profile (merged)", merged);
        } else {
          // No saved profile - use adult default and fill in session info
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
    const key = steps[step]?.key;
    if (!key) {
      return false;
    }
    // Welcome: require Adult/Child selection before proceeding
    if (key === "welcome") {
      return profile.isChild !== null;
    }

    // Contact: strict required fields (child adds parent/guardian requirements)
    if (key === "contact") {
      const patientOk = Boolean(
        profile.firstName &&
          profile.lastName &&
          profile.age &&
          profile.email &&
          profile.email.includes("@") &&
          profile.dob &&
          profile.contactNumber
      );

      if (profile.isChild === true) {
        const parentOk = Boolean(
          profile.parent1FirstName &&
            profile.parent1LastName &&
            profile.parent2FirstName &&
            profile.parent2LastName &&
            profile.parentOccupation &&
            profile.parentEmployer &&
            profile.parentEducation
        );
        return patientOk && parentOk;
      }

      return patientOk;
    }

    // Profile: required demographics + basic anthropometrics
    // Profile: required demographics + step-specific logic
    if (key === "profile") {
      // ---- Common required demographics shown to both adult & child ----
      // (sexualOrientation, ethnicity, religion are required in the UI for both)
      const baseCommonOk = Boolean(
        profile.genderIdentity &&
          profile.pronouns.length > 0 &&
          profile.sexualOrientation.length > 0 &&
          profile.ethnicity.length > 0 &&
          profile.religion.length > 0 &&
          profile.height.feet !== null &&
          profile.height.inches !== null &&
          profile.weightLbs !== null
      );

      // ---- CHILD PATH ----
      if (profile.isChild === true) {
        const si = profile.schoolInfo ?? {};
        const ra = profile.relationshipsAbilities ?? {};

        // School Info (all required except detail fields that depend on booleans)
        const schoolOk = Boolean(
          si.schoolName &&
            si.schoolPhoneNumber &&
            typeof si.yearsAtSchool === "number" &&
            si.yearsAtSchool >= 0 &&
            si.grade &&
            typeof si.hasRepeatedGrade === "boolean" &&
            (si.hasRepeatedGrade
              ? Boolean(
                  si.repeatedGradeDetail &&
                    si.repeatedGradeDetail.trim().length > 0
                )
              : true) &&
            typeof si.hasSpecialClasses === "boolean" &&
            (si.hasSpecialClasses
              ? Boolean(
                  si.specialClassesDetail &&
                    si.specialClassesDetail.trim().length > 0
                )
              : true) &&
            typeof si.hasSpecialServices === "boolean" &&
            (si.hasSpecialServices
              ? Boolean(
                  si.specialServicesDetail &&
                    si.specialServicesDetail.trim().length > 0
                )
              : true) &&
            Boolean(
              si.academicGrades && String(si.academicGrades).trim().length > 0
            )
        );

        // Relationships & Abilities (all required except boolean-gated details and otherConcerns)
        const relOk = Boolean(
          ra.teachersPeersRelationship &&
            ra.teachersPeersRelationship.trim().length > 0 &&
            typeof ra.hadTruancyProceedings === "boolean" &&
            (ra.hadTruancyProceedings
              ? Boolean(
                  ra.truancyProceedingsDetail &&
                    ra.truancyProceedingsDetail.trim().length > 0
                )
              : true) &&
            typeof ra.receivedSchoolCounseling === "boolean" &&
            (ra.receivedSchoolCounseling
              ? Boolean(
                  ra.schoolCounselingDetail &&
                    ra.schoolCounselingDetail.trim().length > 0
                )
              : true) &&
            ra.activitiesInterestsStrengths &&
            ra.activitiesInterestsStrengths.trim().length > 0 &&
            // NEW: require all three Likert ratings to be selected
            ra.childAbilityWorkIndependently &&
            ra.childAbilityOrganizeSelf &&
            ra.childAttendance
          // ra.otherConcerns is optional
        );

        return Boolean(baseCommonOk && schoolOk && relOk);
      }

      // ---- ADULT PATH ----
      // Adult-only extras shown in UI: highestDegree, diet/alcohol/substances, plus jobDetails always required
      const adultExtrasOk = Boolean(
        profile.highestDegree &&
          profile.dietType.length > 0 &&
          profile.alcoholFrequency &&
          profile.substancesUsed.length > 0 &&
          profile.hobbies &&
          profile.isMarried !== null &&
          profile.isSexuallyActive !== null &&
          profile.isEmployed !== null &&
          profile.jobDetails
      );

      return Boolean(baseCommonOk && adultExtrasOk);
    }

    if (key === "screen") {
      const hasMood =
        Array.isArray(profile.moodChanges) && profile.moodChanges.length > 0;
      const hasBehavior =
        Array.isArray(profile.behaviorChanges) &&
        profile.behaviorChanges.length > 0;
      const hasThought =
        Array.isArray(profile.thoughtChanges) &&
        profile.thoughtChanges.length > 0;

      if (profile.isChild !== true && profile.assessments.kind === "adult") {
        const s = profile.assessments.data.suicide;

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
      } else {
        //if child
        return hasMood && hasBehavior && hasThought;
      }
    }

    // Story: require minimal narrative + goals (either text or audio counts)
    if (key === "story") {
      // Common required fields for both adult & child
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

      // Previous treatment (required for both)
      const hasTreatmentAnswer =
        typeof profile.hasReceivedMentalHealthTreatment === "boolean";

      let treatmentDetailsOk = true;
      if (profile.hasReceivedMentalHealthTreatment) {
        const hasTreatmentSummary = Boolean(
          (profile.prevTreatmentSummary?.text &&
            profile.prevTreatmentSummary.text.trim().length > 0) ||
            profile.prevTreatmentSummary?.audio?.url
        );
        treatmentDetailsOk = Boolean(
          profile.therapyDuration &&
            profile.previousDiagnosis &&
            profile.previousDiagnosis.trim().length > 0 &&
            hasTreatmentSummary
        );
      }

      // Family history (required for both, but elaboration only if items selected)
      const hasFamilyHistory = Array.isArray(profile.familyHistory);
      let familyHistoryOk = hasFamilyHistory;
      if (
        hasFamilyHistory &&
        profile.familyHistory.length > 0 &&
        !profile.familyHistory.includes("none")
      ) {
        const hasElaboration = Boolean(
          (profile.familyHistoryElaboration?.text &&
            profile.familyHistoryElaboration.text.trim().length > 0) ||
            profile.familyHistoryElaboration?.audio?.url
        );
        familyHistoryOk = hasElaboration;
      }

      const commonOk =
        hasStory &&
        hasGoals &&
        hasLiving &&
        hasTreatmentAnswer &&
        treatmentDetailsOk &&
        familyHistoryOk;

      // Child-specific required fields
      if (profile.isChild === true) {
        const childOk = Boolean(
          profile.fatherSideMedicalIssues &&
            profile.fatherSideMedicalIssues.trim().length > 0 &&
            profile.motherSideMedicalIssues &&
            profile.motherSideMedicalIssues.trim().length > 0
        );
        return commonOk && childOk;
      }

      // Adult-specific required fields
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

      const hasChildhoodAnswer = typeof profile.likedChildhood === "boolean";

      let childhoodReasonOk = true;
      if (profile.likedChildhood === false) {
        childhoodReasonOk = Boolean(
          (profile.childhoodNegativeReason?.text &&
            profile.childhoodNegativeReason.text.trim().length > 0) ||
            profile.childhoodNegativeReason?.audio?.url
        );
      }

      const adultOk =
        hasEnvironments &&
        hasUpbringingWhoWith &&
        hasChildhoodAnswer &&
        childhoodReasonOk;

      return commonOk && adultOk;
    }

    // Relationships: require at least one mapped relationship
    if (key === "relationships") {
      return (
        Array.isArray(profile.relationships) && profile.relationships.length > 0
      );
    }

    // Assessments: require the minimal baseline (PSS-4 answered, per your latest)
    if (key === "assessments") {
      // Use the discriminant on assessments to ensure we only access adult-only fields
      if (profile.assessments.kind === "adult") {
        const pss4 = profile.assessments.data.stress.pss4;
        return Boolean(pss4 !== "");
      } else {
        const scaredParentLast =
          profile.assessments.data.scared.parent.responses.scared41;
        return Boolean(scaredParentLast !== "");
      }
    }

    // All other steps: allow Next
    return true;
  }, [step, profile]);

  const progressTitles = steps.map((s) => s.title);
  const lastIndex = steps.length - 1;

  useEffect(() => {
    if (step > lastIndex) setStep(lastIndex);
    console.log(session.user.id);
  }, [step, lastIndex]);

  async function notifyAssessmentComplete(p: Profile) {
    try {
      await fetch("/api/notify/assessment-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: p.firstName || "",
          lastName: p.lastName || "",
          email: p.email || "",
          isChild: p.isChild || "",
          submittedAtEpoch: Date.now(),
          submittedAtISO: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("Notification failed", e);
      // Do not block the UX if email fails
    }
  }

  async function runInsights() {
    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Insights generation failed: ${response.status}`);
      }

      const data = await response.json();
      console.log("Insights generation completed:", data);
      return data;
    } catch (e) {
      console.error("Insights generation failed", e);
      // Do not block the UX if insights generation fails
    }
  }

  const goNext = async () => {
    const next = Math.min(step + 1, lastIndex);
    if (next !== step) {
      // celebratory UI
      setPraise(praises[Math.floor(Math.random() * praises.length)]);
      setBurst(true);
      setTimeout(() => setBurst(false), 1200);
      setTimeout(() => setPraise(null), 2000);

      // compute new profile FIRST to avoid stale closure
      const newMaxVisited = Math.min(
        lastIndex,
        Math.max(profile.maxVisited, next)
      );
      const nextProfile: Profile = { ...profile, maxVisited: newMaxVisited };

      // update UI state
      setStep(next);
      setProfile(nextProfile);

      // save using the freshly computed snapshot (saveProgress will merge audio uploads)
      await saveProgress(nextProfile);
    }
  };

  const goToStep = (index: number) => {
    if (index <= profile.maxVisited) {
      setStep(Math.min(index, lastIndex));
    }
  };
  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const bloom = Math.max(0.05, progressPct / 100);

  async function saveProgress(override?: Profile) {
    try {
      console.log("[saveProgress] Saving profile (audio already uploaded)");

      // Audio is uploaded immediately after recording and SQL is updated in onAttach
      // This is just a final checkpoint save
      const payload = override ?? profile;

      const r = await fetch("/api/profile/create", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const msg = await r.text();
        throw new Error(`${r.status} ${msg}`);
      }
      const saved = await r.json();
      console.log("[saveProgress] Profile saved successfully:", saved);
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

  // A dedicated "finalize" handler for the Review step
  const finalizeSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 1) Persist any final state (keep maxVisited at last index to lock in completion)
      const finalized: Profile = { ...profile, maxVisited: steps.length - 1 };
      await saveProgress(finalized);

      // 2) Fire-and-forget notification email
      await notifyAssessmentComplete(finalized);

      // 3) Run insights generation (sentiment + summarization) in background
      runInsights();

      // 4) Persist denormalized scalars to Profile (firstName, etc.) and stamp firstSubmittedAt once
      try {
        const metaPayload = {
          action: "submitMeta",
          firstName: finalized.firstName || "",
          lastName: finalized.lastName || "",
          email: finalized.email || "",
          contactNumber: finalized.contactNumber || "",
          age: finalized.age || "",
          race: Array.isArray(finalized.ethnicity)
            ? finalized.ethnicity
                .map((x: any) =>
                  typeof x === "string" ? x : (x?.label ?? x?.value ?? "")
                )
                .filter(Boolean)
                .join(", ")
            : "",
          genderIdentity: finalized.genderIdentity || "",
          sexualOrientation: Array.isArray(finalized.sexualOrientation)
            ? finalized.sexualOrientation
                .map((x: any) =>
                  typeof x === "string" ? x : (x?.label ?? x?.value ?? "")
                )
                .filter(Boolean)
                .join(", ")
            : "",
          highestDegree: finalized.highestDegree || "",
          isEmployed:
            typeof finalized.isEmployed === "boolean"
              ? finalized.isEmployed
              : null,
          isChild:
            typeof finalized.isChild === "boolean" ? finalized.isChild : null,
          // pass JSON along in case row doesn't exist yet
          profile: finalized,
          version: (finalized as any).version ?? 1,
        };

        await fetch("/api/profile/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metaPayload),
        });
      } catch (e) {
        console.error("Failed to persist denormalized profile meta", e);
        // non-fatal for UX
      }

      // 5) UX: mark as submitted and celebrate
      setSubmitted(true);
      setSubmittedAt(
        new Date().toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setBurst(true);
      setPraise("All done!!!🎉");

      // Clear indicators after 3s
      setShowSubmittedUI(true);
      window.setTimeout(() => {
        setPraise(null);
        setShowSubmittedUI(false);
      }, 3000);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 h-dvh overflow-y-auto overflow-x-hidden"
      style={{
        color: theme.text,
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
          className="w-full rounded-4xl  border border-gray-200 bg-white/70 backdrop-blur-sm px-6 py-6  md:py-8 shadow-md max-h-[70vh] scrollable-div overflow-y-auto overflow-x-hidden box-border overscroll-y-contain"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarGutter: "stable both-edges",
            overscrollBehaviorX: "none",
            touchAction: "pan-y",
          }}
        >
          {submitted && showSubmittedUI && (
            <div
              role="status"
              className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50/90 px-4 py-3 text-emerald-800 text-sm shadow-sm"
            >
              <span className="font-semibold">{`Thank you ${session?.user?.name?.split(" ")[0] ?? ""}! `}</span>{" "}
              Your intake was submitted
              {submittedAt ? ` on ${submittedAt}.` : "."}
            </div>
          )}

          {/* Step content routing */}
          {(() => {
            const key = steps[step].key;

            if (key === "welcome") {
              return (
                <WelcomeSection
                  title={steps[step].title}
                  step={step}
                  profile={profile}
                  session={session}
                  setProfile={setProfile}
                />
              );
            }
            if (key === "hipaa") {
              return <HIPAASection title={steps[step].title} step={step} />;
            }
            if (key === "contact") {
              return (
                <ContactSection
                  title={steps[step].title}
                  profile={profile}
                  setProfile={setProfile}
                  step={step}
                />
              );
            }
            if (key === "profile") {
              return (
                <ProfileSection
                  title={steps[step].title}
                  profile={profile}
                  setProfile={setProfile}
                  step={step}
                />
              );
            }
            if (key === "screen") {
              return (
                <CheckInSection
                  title={steps[step].title}
                  profile={profile}
                  setProfile={setProfile}
                  step={step}
                />
              );
            }
            if (key === "story") {
              return (
                <StorySection
                  title={steps[step].title}
                  step={step}
                  profile={profile}
                  setProfile={setProfile}
                  voiceRecorderRefs={voiceRecorderRefs}
                />
              );
            }
            if (key === "relationships") {
              return (
                <RelationshipSection
                  title={steps[step].title}
                  step={step}
                  profile={profile}
                  setProfile={setProfile}
                  scrollContainerRef={scrollContainerRef}
                />
              );
            }
            if (key === "medical") {
              return (
                <MedicalSection
                  title={steps[step].title}
                  profile={profile}
                  setProfile={setProfile}
                  step={step}
                />
              );
            }
            if (key === "assessments") {
              return (
                <AssessmentsSection
                  title={steps[step].title}
                  profile={profile}
                  setProfile={setProfile}
                  step={step}
                />
              );
            }
            if (key === "follow up") {
              return (
                <FollowUpSection
                  title={steps[step].title}
                  profile={profile}
                  setProfile={setProfile}
                  step={step}
                  voiceRecorderRefs={voiceRecorderRefs}
                />
              );
            }
            if (key === "review") {
              return (
                <>
                  <ReviewSection
                    submitted={submitted}
                    title="You're all set 🎉"
                    step={step}
                  />
                </>
              );
            }
            if (key === "report") {
              return (
                <ReportSection
                  profile={profile}
                  setProfile={setProfile}
                  step={step}
                  title="Your Personalized Report"
                />
              );
            }
            return null;
          })()}

          {
            <div className="mt-8 flex items-center justify-between gap-3">
              <button
                onClick={goBack}
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
                        : setStep(Math.min(profile.maxVisited, lastIndex))
                    }
                    disabled={profile.maxVisited === 0 && !canNext}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-semibold text-white transition duration-150 hover:brightness-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: intPsychTheme.secondary }}
                  >
                    {profile.maxVisited === 0 ? "Start" : "Resume"}
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}

                {step > 0 && (
                  <>
                    {step === lastIndex - 1 && !submitted ? (
                      <button
                        onClick={() => {
                          setStep(0);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="inline-flex cursor-pointer mr-2 items-center gap-2 rounded-xl px-4 py-2 font-normal text-white transition duration-150 hover:brightness-90 active:scale-95"
                        style={{ background: intPsychTheme.primary }}
                      >
                        Back to Beginning
                      </button>
                    ) : null}
                    {/* {on the last two steps} */}
                    {step >= lastIndex - 1 && submitted && (
                      <a
                        href={"https://forms.gle/FNvs8LzwZfT2hWb27"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex cursor-pointer font-semibold mr-2 items-center gap-2 rounded-xl px-4 py-2 font-normal text-white transition duration-150 hover:brightness-90 active:scale-95"
                        style={{ background: intPsychTheme.primary }}
                        aria-label="Open feedback form (opens in a new tab)"
                      >
                        Give Feedback (2–3 min)
                      </a>
                    )}

                    {steps[step].key !== "report" && (
                      <button
                        onClick={
                          steps[step].key === "review" ? finalizeSubmit : goNext
                        }
                        disabled={
                          steps[step].key === "review"
                            ? isSubmitting || submitted
                            : !canNext
                        }
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition duration-150 hover:brightness-90 active:scale-95 ${
                          steps[step].key === "review"
                            ? "bg-gradient-to-r from-lime-400 to-green-600 shadow-md shadow-lime-300/50"
                            : ""
                        }`}
                        style={
                          steps[step].key !== "review"
                            ? { background: intPsychTheme.secondary }
                            : undefined
                        }
                        aria-live="polite"
                      >
                        {steps[step].key === "review"
                          ? isSubmitting
                            ? "Submitting…"
                            : submitted
                              ? "Submitted ✓"
                              : "Submit"
                          : "Next"}
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                    {submitted && steps[step].key === "review" && (
                      <button
                        className={`inline-flex ml-2 items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition duration-150 hover:brightness-90 active:scale-95`}
                        style={{ background: intPsychTheme.secondary }}
                        onClick={goNext}
                      >
                        See Report <ChevronRight className="h-4 w-4" />
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          }
        </motion.div>
      </div>
    </div>
  );
}
