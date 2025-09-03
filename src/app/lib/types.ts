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

export type Assessments = {
  suicide: {
    ideation: string;
    intent: string;
    plan: string;
    protective: string;
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

export type Profile = {
  firstName: string;
  lastName: string;
  age: string;
  pronouns: Option[];
  email: string;
  contactNumber: string;
  dob: string;
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
  hasReceivedMentalHealthTreatment: boolean;
  therapyDuration: string;
  previousDiagnosis: string;
  moodChanges: string[];
  behaviorChanges: string[];
  thoughtChanges: string[];
  dietType: Option[];
  alcoholFrequency: string;
  drinksPerOccasion: string;
  substancesUsed: Option[];
  currentMedications: Medication[];
  previousMedications: Medication[];
  medicalAllergies: Allergy[];
  previousHospitalizations: Hospitalization[];
  previousInjuries?: InjuryDetails | null;
  isEmployed: boolean;
  jobDetails: string;
  hobbies: string;
  familyHistory: string[];
  likedChildhood: boolean;
  assessments: Assessments;
};
