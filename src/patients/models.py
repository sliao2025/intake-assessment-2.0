from pydantic import BaseModel, EmailStr
from typing import Optional, List, Literal

# ---- Shared primitives ----
class Option(BaseModel):
    label: str
    value: str

class AudioAttachment(BaseModel):
    url: str  # public URL or local blob URL
    durationSec: Optional[float] = None
    mimeType: Optional[str] = None
    sizeBytes: Optional[int] = None

class RichResponse(BaseModel):
    text: Optional[str] = None
    audio: Optional[AudioAttachment] = None

# ---- Medical types ----
class Medication(BaseModel):
    name: str
    dosage: str
    frequency: str
    purpose: str
    prescriber: str
    comments: str

class Allergy(BaseModel):
    name: str
    reaction: str

class Hospitalization(BaseModel):
    hospitalName: str
    location: str
    date: str
    reason: str

class InjuryDetails(BaseModel):
    injuryList: str
    explanation: str

# ---- Social graph ----
class Relationship(BaseModel):
    id: str
    name: str
    role: str
    strength: Literal["really_bad", "not_great", "pretty_good", "really_good"]
    happy: bool

# ---- Assessments ----
class SuicideAssessment(BaseModel):
    ideation: str
    intent: str
    plan: str
    protective: str

class PHQ9(BaseModel):
    phq1: str
    phq2: str
    phq3: str
    phq4: str
    phq5: str
    phq6: str
    phq7: str
    phq8: str
    phq9: str

class SelfHarm(BaseModel):
    pastMonth: str
    lifetime: str

class ASRS5(BaseModel):
    asrs1: str
    asrs2: str
    asrs3: str
    asrs4: str
    asrs5: str
    asrs6: str

class PTSD(BaseModel):
    ptsd1: str
    ptsd2: str
    ptsd3: str
    ptsd4: str
    ptsd5: str

class ACE(BaseModel):
    ace1: str
    ace2: str
    ace3: str
    ace4: str
    ace5: str
    ace6: str
    ace7: str
    ace8: str
    ace9: str
    ace10: str

class Stress(BaseModel):
    pss1: str
    pss2: str
    pss3: str
    pss4: str

class Assessments(BaseModel):
    suicide: SuicideAssessment
    phq9: PHQ9
    selfHarm: SelfHarm
    asrs5: ASRS5
    ptsd: PTSD
    ace: ACE
    stress: Stress

# ---- Profile sub-structures ----
class Height(BaseModel):
    feet: Optional[int] = None
    inches: Optional[int] = None

# ---- Profile ----
class Profile(BaseModel):
    # meta
    progress: float

    # Contact Section
    firstName: str
    lastName: str
    age: str
    email: str
    contactNumber: str
    dob: str
    pronouns: List[Option]

    # Profile Section
    height: Height
    weightLbs: Optional[float] = None
    genderIdentity: str
    sexualOrientation: List[Option]
    ethnicity: List[Option]
    religion: List[Option]
    highestDegree: str
    isMarried: bool
    timesMarried: int
    isSexuallyActive: bool
    sexualPartners: str
    dietType: List[Option]
    alcoholFrequency: str
    drinksPerOccasion: str
    substancesUsed: List[Option]
    isEmployed: bool
    jobDetails: str
    hobbies: str

    # Check-in Section
    moodChanges: List[str]
    behaviorChanges: List[str]
    thoughtChanges: List[str]

    # Story Section
    storyNarrative: RichResponse
    goals: RichResponse
    livingSituation: RichResponse
    cultureContext: Optional[RichResponse] = None
    prevTreatmentSummary: Optional[RichResponse] = None
    hasReceivedMentalHealthTreatment: bool
    therapyDuration: str
    previousDiagnosis: str
    familyHistoryElaboration: Optional[RichResponse] = None
    upbringingEnvironments: RichResponse
    upbringingWhoWith: RichResponse
    childhoodNegativeReason: Optional[RichResponse] = None
    familyHistory: List[str]
    likedChildhood: bool

    # Relationship Section
    relationships: List[Relationship]

    # Medical Section
    currentMedications: List[Medication]
    previousMedications: List[Medication]
    medicalAllergies: List[Allergy]
    previousHospitalizations: List[Hospitalization]
    previousInjuries: Optional[InjuryDetails] = None

    # Assessments Section
    assessments: Assessments
