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
    wishDead: string; // "In the past month, have you wished you were dead, or wished you could go to sleep and not wake up?"
    thoughts: string; // "In the past month, have you had any actual thoughts about killing yourself?"
    methodHow: string; // "In the past month, have you been thinking about how you might end your life?"
    intention: string; // "In the past month, have you had these suicidal thoughts and some intention of acting on them?"
    plan: string; // "In the past month, have you started to work out the details of how to kill yourself? Do you intend to carry out this plan?"
    behavior: string; // "Have you done anything, started to do anything, or prepared to do anything, to end your life? ..."
    behavior3mo: string; // "Was this within the past 3 months?"
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
  ace: {
    ace1: string;
    ace2: string;
    ace3: string;
    ace4: string;
    ace5: string;
    ace6: string;
    ace7: string;
    ace8: string;
    ace9: string;
    ace10: string;
  };
  stress: { pss1: string; pss2: string; pss3: string; pss4: string };
};

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

  // Contact Section
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  contactNumber: string;
  dob: string;
  pronouns: Option[];

  // Profile Section
  height: { feet: number | null; inches: number | null };
  weightLbs: number | null;
  genderIdentity: string;
  sexualOrientation: Option[];
  ethnicity: Option[];
  religion: Option[];
  highestDegree: string;
  isMarried: boolean;
  timesMarried: number;
  isSexuallyActive: boolean;
  sexualPartners: string;
  dietType: Option[];
  alcoholFrequency: string;
  drinksPerOccasion: string;
  substancesUsed: Option[];
  isEmployed: boolean;
  jobDetails: string;
  hobbies: string;

  // Check-in Section
  moodChanges: string[];
  behaviorChanges: string[];
  thoughtChanges: string[];

  // Story Section
  storyNarrative: RichResponse; // “Tell us the story…”
  goals: RichResponse; // “Your Goals”
  livingSituation: RichResponse; // “Living Situation”
  cultureContext?: RichResponse; // optional
  prevTreatmentSummary?: RichResponse; // description of previous MH treatment
  hasReceivedMentalHealthTreatment: boolean;
  therapyDuration: string;
  previousDiagnosis: string;
  familyHistoryElaboration?: RichResponse; // elaboration when familyHistory is not "none"
  upbringingEnvironments: RichResponse; // “Describe the environment(s)…”
  upbringingWhoWith: RichResponse; // “Who did you grow up with?”
  childhoodNegativeReason?: RichResponse; // when likedChildhood === false
  familyHistory: string[];
  likedChildhood: boolean;
  // --------------------------------------------------------------------

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
};
