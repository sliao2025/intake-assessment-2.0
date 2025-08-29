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

export type Profile = {
  firstName: string;
  lastName: string;
  age: string;
  pronouns: Option[];
  email: string;
  contactNumber: string;
  dob: string;
  genderIdentity: string;
  sexualOrientation: Option[];
  ethnicity: Option[];
  religion: Option[];
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
};
