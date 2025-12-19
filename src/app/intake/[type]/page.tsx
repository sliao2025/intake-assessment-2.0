"use client";

import React, { useMemo, useState, useEffect } from "react";
import type { Clinician, Profile } from "../../lib/types/types";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, User } from "lucide-react";
import ProgressHeader from "../../components/ProgressHeader";
import ConfettiBurst from "../../components/ConfettiBurst";
import { useSession } from "next-auth/react";
import { praises } from "../../components/messages";
import { theme, ease, intPsychTheme } from "../../components/theme";
import GardenFrame from "../../components/Garden/Garden";
import ContactSection from "../../components/Sections/ContactSection";
import ProfileSection from "../../components/Sections/ProfileSection";
import CheckInSection from "../../components/Sections/CheckInSection";
import MedicalSection from "../../components/Sections/MedicalSection";
import RelationshipSection from "../../components/Sections/RelationshipSection";
import StorySection from "../../components/Sections/StorySection";
import { VoiceRecorderHandle } from "../../components/VoiceRecorder";
import AssessmentsSection from "../../components/Sections/AssessmentsSection";
import FollowUpSection from "../../components/Sections/FollowUpSection";
import ReviewSection from "../../components/Sections/ReviewSection";
import HIPAASection from "../../components/Sections/HIPAASection";
import WelcomeSection from "../../components/Sections/WelcomeSection";
import ReportSection from "../../components/Sections/ReportSection";
import { useParams, useRouter } from "next/navigation";
import { makeDefaultAdultProfile, makeDefaultChildProfile } from "../page";
import { CLINICIANS } from "@/app/lib/text";

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

export default function IntakeTypePage() {
  const params = useParams();
  const router = useRouter();
  const assessmentType = params.type as string;

  // Validate the type parameter - must be "adult" or "child"
  const isValidType = assessmentType === "adult" || assessmentType === "child";
  const isChild = assessmentType === "child";

  const { data: session, status } = useSession();
  const [step, setStep] = useState(0);
  const [praise, setPraise] = useState<string | null>(null);
  const [burst, setBurst] = useState(false);
  const [clinicianSelected, setClinicianSelected] = useState(false);

  // Initialize profile based on URL type
  const [profile, setProfile] = useState<Profile>(() => {
    const baseProfile = isChild
      ? makeDefaultChildProfile()
      : makeDefaultAdultProfile();
    return { ...baseProfile, isChild };
  });
  const [clinicianEmail, setClinicianEmail] = useState<string>("");

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

  // Redirect if invalid type
  useEffect(() => {
    if (!isValidType) {
      router.replace("/intake");
    }
  }, [isValidType, router]);

  // Helper to look up clinician email by name
  const getClinicianEmail = (clinicianName: string): string => {
    return CLINICIANS.find((c) => c.name === clinicianName)?.email ?? "";
  };

  //setting default clinician from saved profile
  useEffect(() => {
    if (status === "loading" || hasBootstrapped.current || !isValidType) return;
    const fetchClinician = async () => {
      try {
        const resp = await fetch("/api/profile/load", { method: "GET" });
        if (resp.ok) {
          const data = await resp.json();
          if (data?.clinician) {
            const email = getClinicianEmail(data.clinician);
            setClinicianEmail(email);
            setClinicianSelected(data.clinician !== "");
            console.log(
              "[Clinician] Loaded from DB:",
              data.clinician,
              "Email:",
              email
            );
          }
        }
      } catch (err) {
        console.error("[Clinician] Failed to load:", err);
      }
    };
    fetchClinician();
  }, [status, isValidType]);

  //setting default profile
  useEffect(() => {
    if (status === "loading" || hasBootstrapped.current || !isValidType) return;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileResp = await fetch("/api/profile/load", { method: "GET" });
        const data = await profileResp.json();
        const incoming = data?.profile ?? null;

        if (incoming) {
          // Check if saved profile has isChild set (user has already started an assessment)
          const savedIsChild = incoming.isChild;
          const hasSavedType = typeof savedIsChild === "boolean";

          if (hasSavedType && savedIsChild !== isChild) {
            // User has existing profile with different type - redirect to their correct type
            // This prevents accidentally overwriting their data with the wrong assessment
            console.log(
              `User has existing ${savedIsChild ? "child" : "adult"} profile, but URL is for ${isChild ? "child" : "adult"}. Redirecting to correct type.`
            );
            const correctPath = savedIsChild
              ? "/intake/child"
              : "/intake/adult";
            router.replace(correctPath);
            return; // Don't continue loading - we're redirecting
          }

          // Use saved profile merged with defaults (type matches or not set yet)
          const baseDefaults = isChild
            ? makeDefaultChildProfile()
            : makeDefaultAdultProfile();
          const merged = mergeWithDefaults(baseDefaults, incoming);
          // Set isChild from URL (either matches saved or saved was null)
          merged.isChild = isChild;
          setProfile(merged);
          console.log("Loaded profile (merged)", merged);
        } else {
          // No saved profile - use URL-based default and fill in session info
          const freshProfile = isChild
            ? makeDefaultChildProfile()
            : makeDefaultAdultProfile();
          setProfile({
            ...freshProfile,
            isChild,
            firstName: session?.user?.name?.split(" ")[0] ?? "",
            lastName: session?.user?.name?.split(" ").slice(1).join(" ") ?? "",
            email: session?.user?.role !== "guest" ? session?.user?.email : "",
          });
          console.log(
            "No saved profile found, using URL-based type and session info"
          );
        }
      } catch (err) {
        console.error("Failed loading profile", err);
      } finally {
        setLoading(false);
        hasBootstrapped.current = true;
      }
    };
    fetchProfile();
  }, [status, isChild, isValidType, session]);

  const canNext = useMemo(() => {
    const key = steps[step]?.key;
    if (!key) {
      return false;
    }
    // Welcome: require clinician selection before proceeding
    if (key === "welcome") {
      return clinicianSelected;
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
          profile.weightLbs !== null &&
          profile.dailyMobileScreenTime !== null
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
          profile.jobDetails &&
          profile.hasFirearm !== null
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
  }, [step, profile, clinicianSelected]);

  const progressTitles = steps.map((s) => s.title);
  const lastIndex = steps.length - 1;

  useEffect(() => {
    if (step > lastIndex) setStep(lastIndex);
    console.log(session?.user?.id);
  }, [step, lastIndex, session]);

  async function notifyAssessmentComplete(p: Profile) {
    try {
      console.log("[NotifyAssessmentComplete] isChild:", p.isChild);
      console.log("[NotifyAssessmentComplete] clinicianEmail:", clinicianEmail);

      const payload = {
        firstName: p.firstName || "",
        lastName: p.lastName || "",
        email: p.email || "",
        isChild: p.isChild ?? null,
        submittedAtEpoch: Date.now(),
        submittedAtISO: new Date().toISOString(),
        clinician: clinicianEmail || "",
      };

      console.log(
        "[NotifyAssessmentComplete] Full payload:",
        JSON.stringify(payload, null, 2)
      );

      await fetch("/api/notify/assessment-complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      console.error("Notification failed", e);
      // Do not block the UX if email fails
    }
  }

  async function alertSuicideRisk(p: Profile) {
    try {
      const assessments = p.assessments;
      const isNewSchema =
        assessments?.kind === "adult" || assessments?.kind === "child";
      const isChildProfile = p.isChild || assessments?.kind === "child";

      let hasWarning = false;
      const concernQuestions: string[] = [];

      if (isChildProfile) {
        // Child CSSRS logic
        const cssrs = isNewSchema
          ? (assessments as any)?.data?.cssrs
          : (assessments as any)?.cssrs;

        if (cssrs) {
          if (cssrs.wishDead === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "Have you wished you were dead or wished you could go to sleep and not wake up?"
            );
          }
          if (cssrs.thoughts === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "In the past month have you had any actual thoughts of killing yourself?"
            );
          }
          if (cssrs.methodHow === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "Have you been thinking about how you might do this?"
            );
          }
          if (cssrs.intention === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "Have you had these thoughts and had some intention of acting on them?"
            );
          }
          if (cssrs.plan === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "Have you started to work out or worked out the details of how to kill yourself? Do you intend to carry out this plan?"
            );
          }
          if (cssrs.behavior === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "Have you ever done anything, started to do anything, or prepared to do anything to end your life?"
            );
          }
          if (cssrs.behavior3mo === "yes") {
            hasWarning = true;
            concernQuestions.push("Was this within the past three months?");
          }
        }
      } else {
        // Adult suicide logic
        const s = isNewSchema
          ? (assessments as any)?.data?.suicide
          : (assessments as any)?.suicide;
        const selfHarm = isNewSchema
          ? (assessments as any)?.data?.selfHarm
          : (assessments as any)?.selfHarm;

        if (s) {
          if (s.wishDead === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "In the past month, have you wished you were dead, or wished you could go to sleep and not wake up?"
            );
          }
          if (s.thoughts === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "In the past month, have you had any actual thoughts about killing yourself?"
            );
          }
          if (s.methodHow === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "In the past month, have you been thinking about how you might end your life?"
            );
          }
          if (s.intention === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "In the past month, have you had these suicidal thoughts and some intention of acting on them?"
            );
          }
          if (s.plan === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "In the past month, have you started to work out the details of how to kill yourself? Do you intend to carry out this plan?"
            );
          }
          if (s.behavior === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "Have you done anything, started to do anything, or prepared to do anything, to end your life? Such as: collected pills, obtained a gun, wrote a will or suicide note"
            );
          }
          if (s.behavior3mo === "yes") {
            hasWarning = true;
            concernQuestions.push("Was this within the past 3 months?");
          }
        }

        if (selfHarm) {
          if (selfHarm.pastMonth === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "In the past month, have you intentionally hurt yourself (e.g., cut, burned, scratched) without wanting to die?"
            );
          }
          if (selfHarm.lifetime === "yes") {
            hasWarning = true;
            concernQuestions.push(
              "Have you ever intentionally hurt yourself without wanting to die?"
            );
          }
        }
      }

      if (hasWarning) {
        console.log("[AlertSuicideRisk] Risk detected, sending notification");
        console.log("[AlertSuicideRisk] clinicianEmail:", clinicianEmail);
        await fetch("/api/notify/suicide-risk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: p.firstName || "",
            lastName: p.lastName || "",
            email: p.email || "",
            isChild: p.isChild ?? null,
            concernQuestions,
            submittedAtEpoch: Date.now(),
            submittedAtISO: new Date().toISOString(),
            clinician: clinicianEmail || "",
          }),
        });
      }
    } catch (e) {
      console.error("Suicide risk notification failed", e);
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
    let currentPayload = override ?? profile;
    const MAX_RETRIES = 3;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          console.log(`[saveProgress] Retry attempt ${attempt + 1}...`);
        }

        const r = await fetch("/api/profile/create", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentPayload),
        });

        if (!r.ok) {
          // Handle 409 Conflict (Optimistic Locking)
          if (r.status === 409) {
            console.warn(
              "[saveProgress] Optimistic concurrency conflict detected."
            );

            // Fetch latest profile from DB
            const loadRes = await fetch("/api/profile/load");
            if (loadRes.ok) {
              const loadData = await loadRes.json();
              const serverProfile = loadData.profile;

              if (serverProfile) {
                console.log(
                  "[saveProgress] Merging server changes into local state..."
                );
                // Merge server (as base) with local (as overrides).
                // mergeWithDefaults will preserve server fields if local fields are undefined/null/missing.
                // This ensures we pick up background updates (like transcriptions) while keeping user edits.
                const merged = mergeWithDefaults(serverProfile, currentPayload);

                // Update metadata to match server, so next save uses correct version/timestamp
                merged.updatedAt = serverProfile.updatedAt;
                merged.version = serverProfile.version;

                // Update payload and retry
                currentPayload = merged;

                // Update React state so validation/UI reflects merged state
                setProfile(merged);

                await new Promise((resolve) => setTimeout(resolve, 500)); // Brief backoff
                continue; // Retry loop with merged payload
              }
            }
          }

          const msg = await r.text();
          throw new Error(`${r.status} ${msg}`);
        }

        const saved = await r.json();
        console.log("[saveProgress] Profile saved successfully");

        // Update local updatedAt from successful save response
        if (saved.updatedAt) {
          setProfile((prev) => ({ ...prev, updatedAt: saved.updatedAt }));
        }
        return; // Success
      } catch (error) {
        console.error("Failed to store profile", error);
        if (attempt === MAX_RETRIES - 1) {
          // On final failure, maybe show a toast?
          // For now, just log and keep console error
        }
      }
    }
  }

  // Show loading or redirect for invalid type
  if (!isValidType) {
    return (
      <div
        className="fixed inset-0 min-h-[100svh] h-dvh flex items-center justify-center"
        style={{ background: intPsychTheme.card, color: theme.text }}
      >
        <div className="animate-pulse text-center">
          <p className="text-gray-700">Redirecting...</p>
        </div>
      </div>
    );
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

      // 2) Check for suicide risk and notify if detected (before other notifications)
      await alertSuicideRisk(finalized);

      // 3) Fire-and-forget notification email
      await notifyAssessmentComplete(finalized);

      // 4) Run insights generation (sentiment + summarization) in background
      runInsights();

      // 5) Persist denormalized scalars to Profile (firstName, etc.) and stamp firstSubmittedAt once
      try {
        console.log("[Finalize Submit]", finalized.isChild);
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
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ConfettiBurst show={burst} />
      <div className="hidden md:block">
        <GardenFrame bloom={bloom} />
      </div>
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
        className="relative z-10 mx-auto max-w-4xl px-4 py-4 md:py-8 pb-8"
        style={{ scrollbarGutter: "stable both-edges" }}
      >
        <motion.div
          ref={scrollContainerRef}
          key={steps[step].key}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="w-full rounded-4xl border border-[#e7e5e4] border-b-4 bg-white/70 backdrop-blur-sm px-6 py-6 md:py-8 shadow-sm md:max-h-[70vh] md:overflow-y-auto md:overflow-x-hidden md:overscroll-y-contain scrollable-div box-border"
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
                  assessmentType={assessmentType as "adult" | "child"}
                  onClinicianChange={(name) => {
                    setClinicianSelected(name !== "");
                    const email = getClinicianEmail(name);
                    setClinicianEmail(email);
                    console.log("[Clinician] Selected:", name, "Email:", email);
                  }}
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
                className="inline-flex cursor-pointer disabled:cursor-not-allowed bg-white items-center gap-2 rounded-xl px-3 py-2 font-medium border border-gray-300 border-b-4 text-gray-700 disabled:opacity-40 transition duration-150 hover:brightness-95 active:scale-95"
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
                    className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 font-semibold text-white transition duration-150 hover:brightness-90 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed border-b-4 border-black/20"
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
                        className="inline-flex cursor-pointer mr-2 items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white transition duration-150 hover:brightness-90 active:scale-95 border-b-4 border-black/20"
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
                        className="inline-flex cursor-pointer mr-2 items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white transition duration-150 hover:brightness-90 active:scale-95 border-b-4 border-black/20"
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
                        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition duration-150 hover:brightness-90 active:scale-95 border-b-4 border-black/20 ${
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
                        className={`inline-flex ml-2 items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed transition duration-150 hover:brightness-90 active:scale-95 border-b-4 border-black/20`}
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
