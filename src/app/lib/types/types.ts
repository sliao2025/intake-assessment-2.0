export type EngineNextRequest = {
  scaleCode?: string;
  theta?: number | null;
  responses: { itemId: string; value: number }[];
  items: {
    id: string;
    scaleId?: string | null;
    params: { a: number; b: number; c?: number; d?: number };
  }[];
};
export type EngineNextResponse = {
  nextItemId?: string | null;
  stop: boolean;
  theta?: number;
  se?: number;
};

export type Option = { label: string; value: string };

export type StateSetter<T> = (value: T | ((prev: T) => T)) => void;

export type Medication = {
  name: string;
  dosage: string;
  frequency: string;
  purpose: string;
  prescriber: string;
  comments: string;
};

export type Allergy = {
  name: string;
  reaction: string;
};

export type Hospitalization = {
  hospitalName: string;
  location: string;
  date: string;
  reason: string;
};

export type InjuryDetails = {
  injuryList: string;
  explanation: string;
};

// ---- New explicit content types for text-or-audio fields ----
export type AudioAttachment = {
  /** public URL or local blob URL returned by the recorder */
  url: string;
  /** optional metadata from recorder */
  durationSec?: number;
  mimeType?: string;
  sizeBytes?: number;
};

/** Rich input that can hold written text, an audio recording, or both */
export type RichResponse = {
  text?: string;
  audio?: AudioAttachment;
};
// -------------------------------------------------------------

export type Assessments = {
  suicide: {
    wishDead: string;
    thoughts: string;
    methodHow: string;
    intention: string;
    plan: string;
    behavior: string;
    behavior3mo: string;
  };
  phq9: {
    phq1: string;
    phq2: string;
    phq3: string;
    phq4: string;
    phq5: string;
    phq6: string;
    phq7: string;
    phq8: string;
    phq9: string;
  };
  gad7: {
    gad1: string;
    gad2: string;
    gad3: string;
    gad4: string;
    gad5: string;
    gad6: string;
    gad7: string;
  };
  selfHarm: { pastMonth: string; lifetime: string };
  crafft: {
    partA: {
      daysAlcohol: string;
      daysMarijuana: string;
      daysOther: string;
    };
    partB: {
      car: string;
      relax: string;
      alone: string;
      forget: string;
      familyFriends: string;
      trouble: string;
    };
  };
  asrs5: {
    asrs1: string;
    asrs2: string;
    asrs3: string;
    asrs4: string;
    asrs5: string;
    asrs6: string;
  };
  ptsd: {
    ptsd1: string;
    ptsd2: string;
    ptsd3: string;
    ptsd4: string;
    ptsd5: string;
  };
  aceResilience: {
    r01: string;
    r02: string;
    r03: string;
    r04: string;
    r05: string;
    r06: string;
    r07: string;
    r08: string;
    r09: string;
    r10: string;
    r11: string;
    r12: string;
    r13: string;
  };
  stress: { pss1: string; pss2: string; pss3: string; pss4: string };
};

// ---- Report output (patient-facing) ----
export type ReportInterpretations = {
  gad7: string;
  phq9: string;
  pss4: string;
  asrs5: string;
  ptsd: string;
  crafft: string;
  ace: string;
};
export type SummaryPair = {
  reason_for_eval: string;
  background: string;
};

export type PatientReport = {
  summary: SummaryPair;
  interpretations: ReportInterpretations;
};
// ---------------------------------------

// ---- Social graph ----
export type Relationship = {
  id: string;
  name: string; // e.g., "Alex"
  role: string; // e.g., "Friend", "Mom"
  strength: "really_bad" | "not_great" | "pretty_good" | "really_good";
  happy: boolean;
};

export type Profile = {
  maxVisited: number;
  isChild: boolean | null;

  // Contact Section
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  contactNumber: string;
  dob: string;

  // Child Contact Section
  parent1FirstName?: string;
  parent1LastName?: string;
  parent2FirstName?: string;
  parent2LastName?: string;
  parentContactNumber?: string;
  parentEmail?: string;
  parentOccupation?: string;
  parentEmployer?: string;
  parentEducation?: string;

  // Profile Section
  pronouns: Option[];
  height: { feet: number | null; inches: number | null };
  weightLbs: number | null;
  genderIdentity: string;
  sexualOrientation: Option[];
  ethnicity: Option[];
  religion: Option[];
  highestDegree: string;
  isMarried: boolean;
  timesMarried?: number;
  isSexuallyActive: boolean;
  sexualPartners: string;
  dietType: Option[];
  alcoholFrequency: string;
  drinksPerOccasion?: string;
  substancesUsed: Option[];
  isEmployed: boolean;
  jobDetails?: string;
  hobbies: string;

  // Screen Section
  moodChanges: string[];
  behaviorChanges: string[];
  thoughtChanges: string[];

  // Story Section
  storyNarrative: RichResponse;
  goals: RichResponse;
  livingSituation: RichResponse;
  cultureContext?: RichResponse;
  hasReceivedMentalHealthTreatment: boolean;
  therapyDuration: string;
  previousDiagnosis: string;
  prevTreatmentSummary?: RichResponse;
  familyHistoryElaboration?: RichResponse;
  upbringingEnvironments: RichResponse;
  upbringingWhoWith: RichResponse;
  childhoodNegativeReason?: RichResponse;
  familyHistory: string[];
  likedChildhood: boolean;

  // Relationship Section
  relationships: Relationship[];

  // Medical Section
  currentMedications: Medication[];
  previousMedications: Medication[];
  medicalAllergies: Allergy[];
  previousHospitalizations: Hospitalization[];
  previousInjuries?: InjuryDetails | null;

  // Assessments Section
  assessments: Assessments;

  // Generated patient-facing report (optional; filled after submit)
  report?: PatientReport;
};
