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

// Generic state setter type to mirror React's setState without importing React types
export type StateSetter<T> = (value: T | ((prev: T) => T)) => void;

export type Profile = {
  firstName: string;
  lastName: string;
  age: string; // keep as string to accommodate inputs; parse/validate elsewhere
  pronouns: Option[];
  email: string;
  contactNumber: string;
  dob: string; // ISO date string from input
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
};
