"use client";

import React from "react";
import Separator from "../primitives/Separator";
import Field from "../primitives/Field";
import Likert from "../primitives/Likert";
import TextAreaWithEncouragement from "../primitives/TextAreawithEncouragement";
import { intPsychTheme } from "../theme";
import RemoveButton from "../primitives/Removebutton";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import MultiSelectGroup from "../primitives/MultiSelectGroup";
import type {
  Profile,
  StateSetter,
  Medication,
  Allergy,
  Hospitalization,
  InjuryDetails,
  Option,
} from "../../lib/types/types";
import StepTitle from "../StepTitle";
import { Check, ChevronDown } from "lucide-react";

// ---- Hoisted UI atoms to maintain stable component identity across renders ----
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl border border-slate-300 p-4 bg-white/80">
    {children}
  </div>
);

const Input = (
  props: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }
) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-slate-600">{props.label}</label>
    <input
      {...props}
      className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
    />
  </div>
);

const AddButton: React.FC<{ onClick: () => void; label: string }> = ({
  onClick,
  label,
}) => (
  <button
    onClick={onClick}
    className="inline-flex cursor-pointer items-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
    style={{ outlineColor: intPsychTheme.secondary }}
  >
    + {label}
  </button>
);
// -----------------------------------------------------------------------------

type Props = {
  title: string;
  profile: Profile;
  setProfile: StateSetter<Profile>;
  step: number;
};

const emptyMedication: Medication = {
  name: "",
  dosage: "",
  frequency: "",
  purpose: "",
  prescriber: "",
  comments: "",
};
const emptyAllergy: Allergy = { name: "", reaction: "" };
const emptyHosp: Hospitalization = {
  hospitalName: "",
  location: "",
  date: "",
  reason: "",
};

// Label helper functions for Developmental History Listboxes
function activityLevelLabel(value: string | null | undefined): string {
  if (!value) return "Select activity level";
  const map: Record<string, string> = {
    active: "Active",
    active_but_calm: "Active but calm",
    passive: "Passive",
    other: "Other",
  };
  return map[value] || value;
}

function affectiveStyleLabel(value: string | null | undefined): string {
  if (!value) return "Select affective style";
  const map: Record<string, string> = {
    cuddly: "Cuddly",
    irritable: "Irritable",
    withdrawn: "Withdrawn",
    other: "Other",
  };
  return map[value] || value;
}

function cryingPatternLabel(value: string | null | undefined): string {
  if (!value) return "Select crying pattern";
  const map: Record<string, string> = {
    easily_frequently: "Easily & Frequently",
    reasonable: "Reasonable Amount",
    seldom: "Seldom",
    other: "Other",
  };
  return map[value] || value;
}

function soothingLabel(value: string | null | undefined): string {
  if (!value) return "Select soothing behavior";
  const map: Record<string, string> = {
    soothed_easily: "Soothed Easily",
    difficult_to_soothe: "Difficult to Soothe",
    average: "Average",
    other: "Other",
  };
  return map[value] || value;
}

function reactionToStrangersLabel(value: string | null | undefined): string {
  if (!value) return "Select reaction";
  const map: Record<string, string> = {
    friendly: "Friendly",
    indifferent: "Indifferent",
    fearful: "Fearful",
  };
  return map[value] || value;
}

export default function MedicalSection({
  title,
  step,
  profile,
  setProfile,
}: Props) {
  /** Stable child treatment options for multi-select (prevent duplicate object identities across renders) */
  const childTreatmentOptions: Option[] = [
    { label: "Individual Psychotherapy", value: "individual_psychotherapy" },
    { label: "Group Psychotherapy", value: "group_psychotherapy" },
    { label: "Family or Couples Therapy", value: "family_couples_therapy" },
    { label: "Other", value: "other" },
    { label: "We've had no treatment or therapy before", value: "none" },
  ];

  // --- Developmental Milestones options (stabilized) ---
  const milestoneMotorOptions = [
    { key: "rolled_front_back_4mo", label: "Rolled front/back (4 mo)" },
    { key: "sit_with_support_6mo", label: "Sit with support (6 mo)" },
    { key: "sit_alone_9mo", label: "Sit alone (9 mo)" },
    { key: "pull_to_stand_10mo", label: "Pull to stand (10 mo)" },
    { key: "crawling_10_12mo", label: "Crawling (10–12 mo)" },
    { key: "walks_alone_10_18mo", label: "Walks alone (10–18 mo)" },
    { key: "running_15_24mo", label: "Running (15–24 mo)" },
    { key: "tricycle_3y", label: "Tricycle (3 yrs)" },
    { key: "bicycle_5_7y", label: "Bicycle (5–7 yrs)" },
  ];
  const milestoneLanguageOptions = [
    { key: "smiling_4_6w", label: "Smiling (4–6 wks)" },
    { key: "cooing_3mo", label: "Cooing (3 mo)" },
    { key: "babbling_6mo", label: "Babbling (6 mo)" },
    { key: "jargon_10_14mo", label: "Jargon (10–14 mo)" },
    { key: "first_word_12mo", label: "First word (12 mo)" },
    { key: "follows_1step_15mo", label: "Follows 1‑step commands (15 mo)" },
    { key: "two_word_combo_22mo", label: "2 word combo (22 mo)" },
    { key: "three_word_sentence_3y", label: "3 word sentence (3 years)" },
    { key: "speech_problems", label: "Speech Problems" },
  ];
  const milestoneAdaptiveOptions = [
    { key: "mouthing_3mo", label: "Mouthing (3 mo)" },
    { key: "transfers_objects_6mo", label: "Transfers objects (6 mo)" },
    { key: "picks_up_raisin_11_12mo", label: "Picks up raisin (11–12 mo)" },
    { key: "scribble_15mo", label: "Scribble (15 mo)" },
    { key: "drinks_from_cup_10mo", label: "Drinks from cup (10 mo)" },
    { key: "uses_spoon_12_15mo", label: "Uses spoon (12–15 mo)" },
    { key: "washes_hands", label: "Washes hands" },
    { key: "undresses", label: "Undresses" },
    { key: "bladder_trained", label: "Bladder trained" },
    { key: "bowel_trained", label: "Bowel trained" },
  ];

  // ------- helpers -------
  const addCurrentMed = () =>
    setProfile((p) => ({
      ...p,
      currentMedications: [...p.currentMedications, { ...emptyMedication }],
    }));
  const updateCurrentMed = (idx: number, key: keyof Medication, val: string) =>
    setProfile((p) => ({
      ...p,
      currentMedications: p.currentMedications.map((m, i) =>
        i === idx ? { ...m, [key]: val } : m
      ),
    }));
  const removeCurrentMed = (idx: number) =>
    setProfile((p) => ({
      ...p,
      currentMedications: p.currentMedications.filter((_, i) => i !== idx),
    }));

  const addPrevMed = () =>
    setProfile((p) => ({
      ...p,
      previousMedications: [...p.previousMedications, { ...emptyMedication }],
    }));
  const updatePrevMed = (idx: number, key: keyof Medication, val: string) =>
    setProfile((p) => ({
      ...p,
      previousMedications: p.previousMedications.map((m, i) =>
        i === idx ? { ...m, [key]: val } : m
      ),
    }));
  const removePrevMed = (idx: number) =>
    setProfile((p) => ({
      ...p,
      previousMedications: p.previousMedications.filter((_, i) => i !== idx),
    }));

  const addAllergy = () =>
    setProfile((p) => ({
      ...p,
      medicalAllergies: [...p.medicalAllergies, { ...emptyAllergy }],
    }));
  const updateAllergy = (idx: number, key: keyof Allergy, val: string) =>
    setProfile((p) => ({
      ...p,
      medicalAllergies: p.medicalAllergies.map((a, i) =>
        i === idx ? { ...a, [key]: val } : a
      ),
    }));
  const removeAllergy = (idx: number) =>
    setProfile((p) => ({
      ...p,
      medicalAllergies: p.medicalAllergies.filter((_, i) => i !== idx),
    }));

  const addHosp = () =>
    setProfile((p) => ({
      ...p,
      previousHospitalizations: [
        ...p.previousHospitalizations,
        { ...emptyHosp },
      ],
    }));
  const updateHosp = (idx: number, key: keyof Hospitalization, val: string) =>
    setProfile((p) => ({
      ...p,
      previousHospitalizations: p.previousHospitalizations.map((h, i) =>
        i === idx ? { ...h, [key]: val } : h
      ),
    }));
  const removeHosp = (idx: number) =>
    setProfile((p) => ({
      ...p,
      previousHospitalizations: p.previousHospitalizations.filter(
        (_, i) => i !== idx
      ),
    }));

  const showInjuries = Boolean(profile.previousInjuries);
  const ensureInjuries = () =>
    setProfile((p) => ({
      ...p,
      previousInjuries: p.previousInjuries ?? {
        injuryList: "",
        explanation: "",
      },
    }));
  const updateInjuries = (key: keyof InjuryDetails, val: string) =>
    setProfile((p) => ({
      ...p,
      previousInjuries: {
        ...(p.previousInjuries ?? { injuryList: "", explanation: "" }),
        [key]: val,
      },
    }));

  // ------- render -------
  return (
    <div className="space-y-8">
      <StepTitle n={step + 1} title={title} />
      {profile.isChild === true && (
        <>
          <Separator label="Previous NeuroPsych Evaluations" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q2 */}
            <div className="md:col-span-2">
              <Field
                required
                title="Has your child ever undergone Neuro Psychological Testing?"
              >
                <Likert
                  value={String(
                    Boolean(profile.childMedicalHistory?.hasNeuropsychTesting)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        hasNeuropsychTesting: v === "true",
                        neuropsychEvalDate:
                          v === "true"
                            ? (p.childMedicalHistory?.neuropsychEvalDate ?? "")
                            : "",
                        neuropsychEvalReason:
                          v === "true"
                            ? (p.childMedicalHistory?.neuropsychEvalReason ??
                              "")
                            : "",
                        neuropsychEvaluationsPerformed:
                          v === "true"
                            ? (p.childMedicalHistory
                                ?.neuropsychEvaluationsPerformed ?? "")
                            : "",
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>
            {profile.childMedicalHistory?.hasNeuropsychTesting === true && (
              <>
                <Field title="What was the date of the evaluation? (mm/dd/yyyy)">
                  <input
                    type="date" /* change to type="date" if you prefer a date picker */
                    placeholder="mm/dd/yyyy"
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                    value={
                      profile.childMedicalHistory?.neuropsychEvalDate ?? ""
                    }
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        childMedicalHistory: {
                          hasNeuropsychTesting: true,
                          neuropsychEvalDate: e.target.value,
                          neuropsychEvalReason:
                            p.childMedicalHistory?.neuropsychEvalReason ?? "",
                          neuropsychEvaluationsPerformed:
                            p.childMedicalHistory
                              ?.neuropsychEvaluationsPerformed ?? "",
                        },
                      }))
                    }
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field title="What was the reason for the evaluation?">
                    <TextAreaWithEncouragement
                      rows={3}
                      placeholder="Briefly describe the reason for testing…"
                      value={
                        profile.childMedicalHistory?.neuropsychEvalReason ?? ""
                      }
                      onChangeText={(next) =>
                        setProfile((p) => ({
                          ...p,
                          childMedicalHistory: {
                            hasNeuropsychTesting: true,
                            neuropsychEvalDate:
                              p.childMedicalHistory?.neuropsychEvalDate ?? "",
                            neuropsychEvalReason: next,
                            neuropsychEvaluationsPerformed:
                              p.childMedicalHistory
                                ?.neuropsychEvaluationsPerformed ?? "",
                          },
                        }))
                      }
                      recommendedWords={30}
                    />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field title="What evaluations were performed?">
                    <TextAreaWithEncouragement
                      rows={3}
                      placeholder="List any evaluations (e.g., WISC, WIAT, CPT)…"
                      value={
                        profile.childMedicalHistory
                          ?.neuropsychEvaluationsPerformed ?? ""
                      }
                      onChangeText={(next) =>
                        setProfile((p) => ({
                          ...p,
                          childMedicalHistory: {
                            hasNeuropsychTesting: true,
                            neuropsychEvalDate:
                              p.childMedicalHistory?.neuropsychEvalDate ?? "",
                            neuropsychEvalReason:
                              p.childMedicalHistory?.neuropsychEvalReason ?? "",
                            neuropsychEvaluationsPerformed: next,
                          },
                        }))
                      }
                      recommendedWords={20}
                    />
                  </Field>
                </div>
              </>
            )}
          </div>
          {/* --- Child: Past Mental Health & Psychiatric History --- */}

          <Separator label="Past Mental Health and Psychiatric History" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Field
                required
                title="What kind of treatment has your child had? (Select all that apply)"
              >
                <Listbox
                  value={profile.childPsychiatricHistory?.treatmentKinds ?? []}
                  onChange={(vals: Option[]) =>
                    setProfile((p) => {
                      const hasNone = vals.some((o) => o.value === "none");
                      const nextKinds = hasNone
                        ? vals.filter((o) => o.value === "none")
                        : vals.filter((o) => o.value !== "none");
                      const selectingNoneOnly = hasNone;
                      return {
                        ...p,
                        childPsychiatricHistory: {
                          ...(p.childPsychiatricHistory ?? {
                            treatmentKinds: [],
                            firstTreatmentDate: "",
                            individualDetails: "",
                            groupDetails: "",
                            familyCouplesDetails: "",
                            otherDetails: "",
                          }),
                          treatmentKinds: nextKinds,
                          ...(selectingNoneOnly
                            ? {
                                individualDetails: "",
                                groupDetails: "",
                                familyCouplesDetails: "",
                                otherDetails: "",
                              }
                            : {}),
                        },
                      };
                    })
                  }
                  multiple
                  by="value"
                >
                  <div className="relative">
                    <ListboxButton className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                      {(profile.childPsychiatricHistory?.treatmentKinds ?? [])
                        .length === 0 ? (
                        <span className="text-slate-400">
                          Select all that apply…
                        </span>
                      ) : (
                        <span className="flex flex-wrap gap-1">
                          {(
                            profile.childPsychiatricHistory?.treatmentKinds ??
                            []
                          ).map((o) => (
                            <span
                              key={o.value}
                              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                            >
                              {o.label}
                            </span>
                          ))}
                        </span>
                      )}
                    </ListboxButton>
                    <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                      {childTreatmentOptions.map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt}
                          as={React.Fragment}
                        >
                          {({ active, selected }) => (
                            <li
                              className={`${active ? "bg-slate-100" : "bg-white"} relative cursor-pointer select-none py-2 pl-4 pr-10`}
                            >
                              <span
                                className={`${selected ? "font-medium text-slate-900" : "font-normal text-slate-700"} block truncate`}
                              >
                                {opt.label}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 right-3 flex items-center text-slate-600">
                                  <Check />
                                </span>
                              )}
                            </li>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </Field>
            </div>
            {/* Q13: When was your child's first in treatment? */}
            {(profile.childPsychiatricHistory?.treatmentKinds ?? []).length >
              0 &&
              !(profile.childPsychiatricHistory?.treatmentKinds ?? []).some(
                (o) => o.value === "none"
              ) && (
                <Field title="When was your child's first in treatment?">
                  <input
                    type="date"
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                    value={
                      profile.childPsychiatricHistory?.firstTreatmentDate ?? ""
                    }
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        childPsychiatricHistory: {
                          ...(p.childPsychiatricHistory ?? {
                            treatmentKinds: [],
                          }),
                          firstTreatmentDate: e.target.value,
                        },
                      }))
                    }
                  />
                </Field>
              )}

            {/* Conditional detail prompts for each selected modality remain below */}
            {(profile.childPsychiatricHistory?.treatmentKinds ?? []).some(
              (o) => o.value === "individual_psychotherapy"
            ) && (
              <div className="md:col-span-2">
                <Field title="Please share more information on the individual psychotherapy (e.g., who attended, who treated, frequency, duration)">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Key details about individual psychotherapy…"
                    value={
                      profile.childPsychiatricHistory?.individualDetails ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPsychiatricHistory: {
                          ...(p.childPsychiatricHistory ?? {
                            treatmentKinds: [],
                          }),
                          individualDetails: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              </div>
            )}
            {(profile.childPsychiatricHistory?.treatmentKinds ?? []).some(
              (o) => o.value === "group_psychotherapy"
            ) && (
              <div className="md:col-span-2">
                <Field title="Please share more information on the group psychotherapy (e.g., who attended, who treated, focus of group, duration)">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Key details about group psychotherapy…"
                    value={profile.childPsychiatricHistory?.groupDetails ?? ""}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPsychiatricHistory: {
                          ...(p.childPsychiatricHistory ?? {
                            treatmentKinds: [],
                          }),
                          groupDetails: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              </div>
            )}
            {(profile.childPsychiatricHistory?.treatmentKinds ?? []).some(
              (o) => o.value === "family_couples_therapy"
            ) && (
              <div className="md:col-span-2">
                <Field title="Please share more information on the family or couples therapy (e.g., participants, provider, goals, duration)">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Key details about family/couples therapy…"
                    value={
                      profile.childPsychiatricHistory?.familyCouplesDetails ??
                      ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPsychiatricHistory: {
                          ...(p.childPsychiatricHistory ?? {
                            treatmentKinds: [],
                          }),
                          familyCouplesDetails: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              </div>
            )}
            {(profile.childPsychiatricHistory?.treatmentKinds ?? []).some(
              (o) => o.value === "other"
            ) && (
              <div className="md:col-span-2">
                <Field title="Please share more information on the other type of treatment your child has had (e.g., who attended, provider, type, duration)">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Key details about other treatment…"
                    value={profile.childPsychiatricHistory?.otherDetails ?? ""}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPsychiatricHistory: {
                          ...(p.childPsychiatricHistory ?? {
                            treatmentKinds: [],
                          }),
                          otherDetails: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              </div>
            )}
          </div>
          <Separator label="Medical History" />
          <div className="space-y-4">
            <div className="md:col-span-2">
              <Field
                required
                title="Has your child ever been psychiatrically hospitalized?"
              >
                <Likert
                  value={String(
                    Boolean(
                      profile.childMedicalHistory?.psychiatricHospitalized
                    )
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        ...(p.childMedicalHistory ?? {
                          hasNeuropsychTesting: false,
                          neuropsychEvalDate: "",
                          neuropsychEvalReason: "",
                          neuropsychEvaluationsPerformed: "",
                        }),
                        psychiatricHospitalized: v === "true",
                        psychiatricHospitalizationDetails:
                          v === "true"
                            ? (p.childMedicalHistory
                                ?.psychiatricHospitalizationDetails ?? "")
                            : "",
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>
            {profile.childMedicalHistory?.psychiatricHospitalized === true && (
              <div className="md:col-span-2">
                <Field title="Please share more information on the psychiatric hospitalization (e.g., when, length of stay, facility, reason).">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Add brief details…"
                    value={
                      profile.childMedicalHistory
                        ?.psychiatricHospitalizationDetails ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childMedicalHistory: {
                          ...(p.childMedicalHistory ?? {
                            hasNeuropsychTesting: false,
                            neuropsychEvalDate: "",
                            neuropsychEvalReason: "",
                            neuropsychEvaluationsPerformed: "",
                          }),
                          psychiatricHospitalized: true,
                          psychiatricHospitalizationDetails: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              </div>
            )}
            <div className="md:col-span-2">
              <Field
                required
                title="Has your child ever thought of committing suicide?"
              >
                <Likert
                  value={String(
                    Boolean(profile.childMedicalHistory?.suicideThoughtsEver)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        ...(p.childMedicalHistory ?? {
                          hasNeuropsychTesting: false,
                          neuropsychEvalDate: "",
                          neuropsychEvalReason: "",
                          neuropsychEvaluationsPerformed: "",
                        }),
                        suicideThoughtsEver: v === "true",
                        suicideThoughtsLastTimePlan:
                          v === "true"
                            ? (p.childMedicalHistory
                                ?.suicideThoughtsLastTimePlan ?? "")
                            : "",
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>
            {profile.childMedicalHistory?.suicideThoughtsEver === true && (
              <div className="md:col-span-2">
                <Field title="When was the last time and what was the thought? Did they have a plan?">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Add context about timing, content of thoughts, and any plan…"
                    value={
                      profile.childMedicalHistory
                        ?.suicideThoughtsLastTimePlan ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childMedicalHistory: {
                          ...(p.childMedicalHistory ?? {
                            hasNeuropsychTesting: false,
                            neuropsychEvalDate: "",
                            neuropsychEvalReason: "",
                            neuropsychEvaluationsPerformed: "",
                          }),
                          suicideThoughtsEver: true,
                          suicideThoughtsLastTimePlan: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              </div>
            )}
            <div className="md:col-span-2">
              <Field
                required
                title="Has your child ever attempted to commit suicide?"
              >
                <Likert
                  value={String(
                    Boolean(profile.childMedicalHistory?.suicideAttemptEver)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        ...(p.childMedicalHistory ?? {
                          hasNeuropsychTesting: false,
                          neuropsychEvalDate: "",
                          neuropsychEvalReason: "",
                          neuropsychEvaluationsPerformed: "",
                        }),
                        suicideAttemptEver: v === "true",
                        suicideAttemptDetails:
                          v === "true"
                            ? (p.childMedicalHistory?.suicideAttemptDetails ??
                              "")
                            : "",
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>

            {profile.childMedicalHistory?.suicideAttemptEver === true && (
              <div className="md:col-span-2">
                <Field title="How did your child attempt to commit suicide and what were the circumstances?">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Method, circumstances, medical care received…"
                    value={
                      profile.childMedicalHistory?.suicideAttemptDetails ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childMedicalHistory: {
                          ...(p.childMedicalHistory ?? {
                            hasNeuropsychTesting: false,
                            neuropsychEvalDate: "",
                            neuropsychEvalReason: "",
                            neuropsychEvaluationsPerformed: "",
                          }),
                          suicideAttemptEver: true,
                          suicideAttemptDetails: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              </div>
            )}

            <div className="md:col-span-2">
              <Field
                required
                title="Has your child ever hurt themselves in any way?"
              >
                <Likert
                  value={String(
                    Boolean(profile.childMedicalHistory?.selfHarmEver)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        ...(p.childMedicalHistory ?? {
                          hasNeuropsychTesting: false,
                          neuropsychEvalDate: "",
                          neuropsychEvalReason: "",
                          neuropsychEvaluationsPerformed: "",
                        }),
                        selfHarmEver: v === "true",
                        // reset downstream if toggled to No
                        selfHarmStill:
                          v === "true"
                            ? (p.childMedicalHistory?.selfHarmStill ?? false)
                            : false,
                        selfHarmFrequencyDetails:
                          v === "true"
                            ? (p.childMedicalHistory
                                ?.selfHarmFrequencyDetails ?? "")
                            : "",
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>

            {profile.childMedicalHistory?.selfHarmEver === true && (
              <div className="md:col-span-2">
                <Field title="Do they still hurt themselves?">
                  <Likert
                    value={String(
                      Boolean(profile.childMedicalHistory?.selfHarmStill)
                    )}
                    onChange={(v) =>
                      setProfile((p) => ({
                        ...p,
                        childMedicalHistory: {
                          ...(p.childMedicalHistory ?? {
                            hasNeuropsychTesting: false,
                            neuropsychEvalDate: "",
                            neuropsychEvalReason: "",
                            neuropsychEvaluationsPerformed: "",
                          }),
                          selfHarmEver: true,
                          selfHarmStill: v === "true",
                          selfHarmFrequencyDetails:
                            v === "true"
                              ? (p.childMedicalHistory
                                  ?.selfHarmFrequencyDetails ?? "")
                              : "",
                        },
                      }))
                    }
                    options={[
                      { key: "true", label: "Yes" },
                      { key: "false", label: "No" },
                    ]}
                  />
                </Field>
              </div>
            )}

            {profile.childMedicalHistory?.selfHarmStill === true && (
              <div className="md:col-span-2">
                <Field title="How often?">
                  <TextAreaWithEncouragement
                    rows={2}
                    placeholder="e.g., once per week; when stressed; last occurrence on…"
                    value={
                      profile.childMedicalHistory?.selfHarmFrequencyDetails ??
                      ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childMedicalHistory: {
                          ...(p.childMedicalHistory ?? {
                            hasNeuropsychTesting: false,
                            neuropsychEvalDate: "",
                            neuropsychEvalReason: "",
                            neuropsychEvaluationsPerformed: "",
                          }),
                          selfHarmEver: true,
                          selfHarmStill: true,
                          selfHarmFrequencyDetails: next,
                        },
                      }))
                    }
                    recommendedWords={20}
                  />
                </Field>
              </div>
            )}

            <div className="md:col-span-2">
              <Field
                required
                title="To the best of your knowledge, does your child now or have they in the past, used any alcohol or drugs?"
              >
                <Likert
                  value={String(
                    Boolean(profile.childMedicalHistory?.substanceUseEver)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        ...(p.childMedicalHistory ?? {
                          hasNeuropsychTesting: false,
                          neuropsychEvalDate: "",
                          neuropsychEvalReason: "",
                          neuropsychEvaluationsPerformed: "",
                        }),
                        substanceUseEver: v === "true",
                        substanceUseDetails:
                          v === "true"
                            ? (p.childMedicalHistory?.substanceUseDetails ?? "")
                            : "",
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>
          </div>
          {/* Q36: Substance use details (conditional) */}
          {profile.childMedicalHistory?.substanceUseEver === true && (
            <div className="md:col-span-2">
              <Field title="Please elaborate on your child's alcohol or drug use (e.g., substances used, frequency, last use, related concerns).">
                <TextAreaWithEncouragement
                  rows={3}
                  placeholder="What have they used? How often? Any related issues?"
                  value={profile.childMedicalHistory?.substanceUseDetails ?? ""}
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        ...(p.childMedicalHistory ?? {
                          hasNeuropsychTesting: false,
                          neuropsychEvalDate: "",
                          neuropsychEvalReason: "",
                          neuropsychEvaluationsPerformed: "",
                        }),
                        substanceUseEver: true,
                        substanceUseDetails: next,
                      },
                    }))
                  }
                  recommendedWords={30}
                />
              </Field>
            </div>
          )}

          {/* --- General Health Conditions checklist (Medical Conditions) --- */}
          <Field
            required
            title="Please check any that your child has had:"
            label={<i>(Select all that apply)</i>}
          >
            <MultiSelectGroup
              options={[
                {
                  key: "head_injury",
                  label: "Head injury / loss of consciousness",
                },
                { key: "seizures", label: "Seizures / convulsions" },
                {
                  key: "other_neuro",
                  label: "Other neurological problems",
                },
                { key: "ent", label: "Ear, nose or throat problems" },
                { key: "dental", label: "Dental problems" },
                { key: "asthma", label: "Asthma" },
                { key: "chest", label: "Chest problems" },
                { key: "gi", label: "Stomach or bowel problems / soiling" },
                { key: "urinary", label: "Urinary or bladder / wetting" },
                { key: "gyn_menses", label: "Gynecological / menstrual" },
                { key: "heart", label: "Heart problems" },
                { key: "liver_kidney", label: "Liver / kidney problems" },
                { key: "skin", label: "Skin problems" },
                { key: "joint_limb", label: "Joint / limb problems" },
                {
                  key: "rheumatic_strep",
                  label: "Rheumatic fever / strep infections",
                },
                {
                  key: "hearing_vision",
                  label: "Hearing / vision problems",
                },
                {
                  key: "endocrine_growth",
                  label: "Growth / endocrine problems",
                },
                {
                  key: "accidents_fractures",
                  label: "Serious accidents / fractures",
                },
                {
                  key: "measles_mumps",
                  label: "Childhood measles / mumps",
                },
                { key: "chicken_pox", label: "Chicken pox" },
                { key: "other", label: "Other" },
                { key: "none", label: "🚫 None of the above", none: true },
              ]}
              values={profile.childMedicalHistory?.medicalConditions ?? []}
              onChange={(next) =>
                setProfile((p) => ({
                  ...p,
                  childMedicalHistory: {
                    ...(p.childMedicalHistory ?? {
                      hasNeuropsychTesting: false,
                      neuropsychEvalDate: "",
                      neuropsychEvalReason: "",
                      neuropsychEvaluationsPerformed: "",
                    }),
                    medicalConditions: next,
                    // If "none" is chosen exclusively, clear the Other text
                    medicalConditionsOther: next.includes("none")
                      ? ""
                      : (p.childMedicalHistory?.medicalConditionsOther ?? ""),
                  },
                }))
              }
            />
          </Field>

          {/* Conditionally show Other text box */}
          {Array.isArray(profile.childMedicalHistory?.medicalConditions) &&
            profile.childMedicalHistory!.medicalConditions.includes(
              "other"
            ) && (
              <Field title="Other (please specify)">
                <input
                  className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                  placeholder="Describe other conditions…"
                  value={
                    profile.childMedicalHistory?.medicalConditionsOther ?? ""
                  }
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      childMedicalHistory: {
                        ...(p.childMedicalHistory ?? {
                          hasNeuropsychTesting: false,
                          neuropsychEvalDate: "",
                          neuropsychEvalReason: "",
                          neuropsychEvaluationsPerformed: "",
                        }),
                        medicalConditions:
                          p.childMedicalHistory?.medicalConditions ?? [],
                        medicalConditionsOther: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
            )}
          <Field required title="Are your child's immunizations up to date?">
            <Likert
              value={String(
                Boolean(profile.childMedicalHistory?.immunizationsUpToDate)
              )}
              onChange={(v) =>
                setProfile((p) => ({
                  ...p,
                  childMedicalHistory: {
                    ...(p.childMedicalHistory ?? {
                      hasNeuropsychTesting: false,
                      neuropsychEvalDate: "",
                      neuropsychEvalReason: "",
                      neuropsychEvaluationsPerformed: "",
                    }),
                    immunizationsUpToDate: v === "true",
                  },
                }))
              }
              options={[
                { key: "true", label: "Yes" },
                { key: "false", label: "No" },
              ]}
            />
          </Field>
          <Field
            required
            title="When was your child's most recent physical exam"
          >
            <Input
              type="date"
              value={profile.childMedicalHistory?.recentPhysicalExam}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  childMedicalHistory: {
                    ...(p.childMedicalHistory ?? {
                      hasNeuropsychTesting: false,
                      neuropsychEvalDate: "",
                      neuropsychEvalReason: "",
                      neuropsychEvaluationsPerformed: "",
                    }),
                    recentPhysicalExam: e.target.value,
                  },
                }))
              }
            />
          </Field>
          {profile.childMedicalHistory?.recentPhysicalExam && (
            <Field title="What were the results of your child's most recent physical exam">
              <TextAreaWithEncouragement
                rows={3}
                placeholder="Add brief details about any findings, concerns, or recommendations from the exam…"
                value={profile.childMedicalHistory?.physicalExamDetails ?? ""}
                onChangeText={(next) =>
                  setProfile((p) => ({
                    ...p,
                    childMedicalHistory: {
                      ...(p.childMedicalHistory ?? {
                        hasNeuropsychTesting: false,
                        neuropsychEvalDate: "",
                        neuropsychEvalReason: "",
                        neuropsychEvaluationsPerformed: "",
                      }),
                      recentPhysicalExam:
                        p.childMedicalHistory?.recentPhysicalExam ?? "",
                      physicalExamDetails: next,
                    },
                  }))
                }
                recommendedWords={15}
              />
            </Field>
          )}
          <Separator label="Prenatal &amp; Birth History" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q53 Healthy pregnancy? */}
            <Field required title="Was the pregnancy healthy?">
              <Likert
                value={String(
                  Boolean(profile.childPrenatalHistory?.pregnancyHealthy)
                )}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      pregnancyHealthy: v === "true",
                    },
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>

            {/* Q54 Full term? */}
            <Field required title="Was the pregnancy full term?">
              <Likert
                value={String(Boolean(profile.childPrenatalHistory?.fullTerm))}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      fullTerm: v === "true",
                    },
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>

            {/* Q55 Labor type */}
            <Field required title="Was the labor spontaneous or induced?">
              <Likert
                value={profile.childPrenatalHistory?.laborType ?? ""}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      laborType: v as "spontaneous" | "induced",
                    },
                  }))
                }
                options={[
                  { key: "spontaneous", label: "Spontaneous" },
                  { key: "induced", label: "Induced" },
                ]}
              />
            </Field>

            {/* Q56 Birth weight */}
            <Field required title="What was your child's birth weight?">
              <Input
                placeholder='e.g., "7 lb 8 oz" or "3400 g"'
                value={profile.childPrenatalHistory?.birthWeight ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      birthWeight: e.target.value,
                    },
                  }))
                }
              />
            </Field>

            <div className="md:col-span-2 space-y-4">
              {/* Q57 Complications */}
              <div>
                <Field
                  required
                  title="Were there any complications during pregnancy?"
                >
                  <Likert
                    value={String(
                      Boolean(profile.childPrenatalHistory?.hasComplications)
                    )}
                    onChange={(v) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          hasComplications: v === "true",
                          complicationsDetails:
                            v === "true"
                              ? (p.childPrenatalHistory?.complicationsDetails ??
                                "")
                              : "",
                        },
                      }))
                    }
                    options={[
                      { key: "true", label: "Yes" },
                      { key: "false", label: "No" },
                    ]}
                  />
                </Field>
              </div>
              {profile.childPrenatalHistory?.hasComplications === true && (
                <div>
                  <Field title="Please describe the complications">
                    <TextAreaWithEncouragement
                      rows={3}
                      placeholder="e.g., preeclampsia, bleeding, etc."
                      value={
                        profile.childPrenatalHistory?.complicationsDetails ?? ""
                      }
                      onChangeText={(next) =>
                        setProfile((p) => ({
                          ...p,
                          childPrenatalHistory: {
                            ...(p.childPrenatalHistory ?? {}),
                            hasComplications: true,
                            complicationsDetails: next,
                          },
                        }))
                      }
                      recommendedWords={24}
                    />
                  </Field>
                </div>
              )}

              {/* Q58 Medications during pregnancy */}
              <div>
                <Field required title="Were medications used during pregnancy?">
                  <Likert
                    value={String(
                      Boolean(
                        profile.childPrenatalHistory?.hadMedsDuringPregnancy
                      )
                    )}
                    onChange={(v) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          hadMedsDuringPregnancy: v === "true",
                          medsDuringPregnancyDetails:
                            v === "true"
                              ? (p.childPrenatalHistory
                                  ?.medsDuringPregnancyDetails ?? "")
                              : "",
                        },
                      }))
                    }
                    options={[
                      { key: "true", label: "Yes" },
                      { key: "false", label: "No" },
                    ]}
                  />
                </Field>
              </div>
              {profile.childPrenatalHistory?.hadMedsDuringPregnancy ===
                true && (
                <div>
                  <Field title="What kind and how often?">
                    <TextAreaWithEncouragement
                      rows={3}
                      placeholder="e.g., prenatal vitamins daily, antibiotics for infection, etc."
                      value={
                        profile.childPrenatalHistory
                          ?.medsDuringPregnancyDetails ?? ""
                      }
                      onChangeText={(next) =>
                        setProfile((p) => ({
                          ...p,
                          childPrenatalHistory: {
                            ...(p.childPrenatalHistory ?? {}),
                            hadMedsDuringPregnancy: true,
                            medsDuringPregnancyDetails: next,
                          },
                        }))
                      }
                      recommendedWords={24}
                    />
                  </Field>
                </div>
              )}

              {/* Q59 Alcohol */}
              <div>
                <Field required title="Was alcohol used during pregnancy?">
                  <Likert
                    value={String(
                      Boolean(
                        profile.childPrenatalHistory?.hadAlcoholDuringPregnancy
                      )
                    )}
                    onChange={(v) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          hadAlcoholDuringPregnancy: v === "true",
                          alcoholDuringPregnancyDetails:
                            v === "true"
                              ? (p.childPrenatalHistory
                                  ?.alcoholDuringPregnancyDetails ?? "")
                              : "",
                        },
                      }))
                    }
                    options={[
                      { key: "true", label: "Yes" },
                      { key: "false", label: "No" },
                    ]}
                  />
                </Field>
              </div>
              {profile.childPrenatalHistory?.hadAlcoholDuringPregnancy ===
                true && (
                <div>
                  <Field title="How much and how often?">
                    <TextAreaWithEncouragement
                      rows={3}
                      placeholder="e.g., 1-2 glasses of wine per week, occasional beer, etc."
                      value={
                        profile.childPrenatalHistory
                          ?.alcoholDuringPregnancyDetails ?? ""
                      }
                      onChangeText={(next) =>
                        setProfile((p) => ({
                          ...p,
                          childPrenatalHistory: {
                            ...(p.childPrenatalHistory ?? {}),
                            hadAlcoholDuringPregnancy: true,
                            alcoholDuringPregnancyDetails: next,
                          },
                        }))
                      }
                      recommendedWords={20}
                    />
                  </Field>
                </div>
              )}

              {/* Q60 Drugs */}
              <div>
                <Field required title="Were drugs used during pregnancy?">
                  <Likert
                    value={String(
                      Boolean(
                        profile.childPrenatalHistory?.hadDrugsDuringPregnancy
                      )
                    )}
                    onChange={(v) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          hadDrugsDuringPregnancy: v === "true",
                          drugsDuringPregnancyDetails:
                            v === "true"
                              ? (p.childPrenatalHistory
                                  ?.drugsDuringPregnancyDetails ?? "")
                              : "",
                        },
                      }))
                    }
                    options={[
                      { key: "true", label: "Yes" },
                      { key: "false", label: "No" },
                    ]}
                  />
                </Field>
              </div>
              {profile.childPrenatalHistory?.hadDrugsDuringPregnancy ===
                true && (
                <div>
                  <Field title="How much and how often?">
                    <TextAreaWithEncouragement
                      rows={3}
                      placeholder="e.g., marijuana occasionally, prescription opioids as needed, etc."
                      value={
                        profile.childPrenatalHistory
                          ?.drugsDuringPregnancyDetails ?? ""
                      }
                      onChangeText={(next) =>
                        setProfile((p) => ({
                          ...p,
                          childPrenatalHistory: {
                            ...(p.childPrenatalHistory ?? {}),
                            hadDrugsDuringPregnancy: true,
                            drugsDuringPregnancyDetails: next,
                          },
                        }))
                      }
                      recommendedWords={20}
                    />
                  </Field>
                </div>
              )}
              <Field required title="Did the mother smoke during pregnancy?">
                <Likert
                  value={String(
                    Boolean(
                      profile.childPrenatalHistory?.motherSmokedDuringPregnancy
                    )
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childPrenatalHistory: {
                        ...(p.childPrenatalHistory ?? {}),
                        motherSmokedDuringPregnancy: v === "true",
                        ...(v === "false"
                          ? { motherSmokedDuringPregnancyDetails: "" }
                          : {}),
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>

            {/* Q61 Smoking */}
            {profile.childPrenatalHistory?.motherSmokedDuringPregnancy ===
              true && (
              <div className="md:col-span-2">
                <Field title="How much?">
                  <TextAreaWithEncouragement
                    rows={2}
                    placeholder="e.g., packs per day…"
                    value={
                      profile.childPrenatalHistory
                        ?.motherSmokedDuringPregnancyDetails ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          motherSmokedDuringPregnancyDetails: next,
                        },
                      }))
                    }
                    recommendedWords={10}
                  />
                </Field>
              </div>
            )}

            {/* Q62 Delivery normal + problems */}
            <Field required title="Was delivery normal?">
              <Likert
                value={String(
                  Boolean(profile.childPrenatalHistory?.deliveryNormal)
                )}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      deliveryNormal: v === "true",
                      // clear problems if "Yes"
                      ...(v === "true" ? { deliveryProblems: "" } : {}),
                    },
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>

            {profile.childPrenatalHistory?.deliveryNormal === false && (
              <div className="md:col-span-2">
                <Field title='If not normal, what were the problems? (Type "none" if none)'>
                  <TextAreaWithEncouragement
                    rows={3}
                    value={profile.childPrenatalHistory?.deliveryProblems ?? ""}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          deliveryProblems: next,
                        },
                      }))
                    }
                    recommendedWords={24}
                  />
                </Field>
              </div>
            )}

            {/* Q63 Presentation */}
            <Field required title="Was your child born head or feet first?">
              <Likert
                value={profile.childPrenatalHistory?.presentationAtBirth ?? ""}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      presentationAtBirth: v as "head" | "feet",
                    },
                  }))
                }
                options={[
                  { key: "head", label: "Head first" },
                  { key: "feet", label: "Feet first" },
                ]}
              />
            </Field>

            {/* Q64 Trouble breathing */}
            <Field
              required
              title="Did the baby have trouble starting to breathe?"
            >
              <Likert
                value={String(
                  Boolean(
                    profile.childPrenatalHistory?.troubleStartingToBreathe
                  )
                )}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      troubleStartingToBreathe: v === "true",
                    },
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>

            {/* Q65 Jaundice + treatment */}
            <Field required title="Was your baby jaundiced?">
              <Likert
                value={String(Boolean(profile.childPrenatalHistory?.jaundiced))}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      jaundiced: v === "true",
                      ...(v === "false"
                        ? {
                            jaundiceTreatmentRequired: false,
                            jaundiceTreatmentDetails: "",
                          }
                        : {}),
                    },
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>

            {profile.childPrenatalHistory?.jaundiced === true && (
              <Field title="Did it require treatment?">
                <Likert
                  value={String(
                    Boolean(
                      profile.childPrenatalHistory?.jaundiceTreatmentRequired
                    )
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childPrenatalHistory: {
                        ...(p.childPrenatalHistory ?? {}),
                        jaundiceTreatmentRequired: v === "true",
                        ...(v === "false"
                          ? { jaundiceTreatmentDetails: "" }
                          : {}),
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            )}

            {profile.childPrenatalHistory?.jaundiceTreatmentRequired ===
              true && (
              <Field title="Please describe the treatment">
                <TextAreaWithEncouragement
                  rows={2}
                  placeholder="e.g., phototherapy…"
                  value={
                    profile.childPrenatalHistory?.jaundiceTreatmentDetails ?? ""
                  }
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      childPrenatalHistory: {
                        ...(p.childPrenatalHistory ?? {}),
                        jaundiceTreatmentDetails: next,
                      },
                    }))
                  }
                  recommendedWords={10}
                />
              </Field>
            )}

            <div className="md:col-span-2 space-y-4">
              {/* Q66 Feeding & duration */}

              <Field required title="Was the baby bottle or breast fed?">
                <Likert
                  value={profile.childPrenatalHistory?.feedingMethod ?? ""}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childPrenatalHistory: {
                        ...(p.childPrenatalHistory ?? {}),
                        feedingMethod: v as "bottle" | "breast" | "both",
                        // reset duration if not breast or both
                        ...(v !== "breast" && v !== "both"
                          ? { breastFeedingDuration: "" }
                          : {}),
                      },
                    }))
                  }
                  options={[
                    { key: "bottle", label: "Bottle" },
                    { key: "breast", label: "Breast" },
                    { key: "both", label: "Both" },
                  ]}
                />
              </Field>

              {(profile.childPrenatalHistory?.feedingMethod === "breast" ||
                profile.childPrenatalHistory?.feedingMethod === "both") && (
                <Field title="If breast fed, for how long?">
                  <Input
                    placeholder='e.g., "6 months"'
                    value={
                      profile.childPrenatalHistory?.breastFeedingDuration ?? ""
                    }
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          breastFeedingDuration: e.target.value,
                        },
                      }))
                    }
                  />
                </Field>
              )}
              {/* Q67 Feeding problems */}
              <Field required title="Were there any feeding problems?">
                <Likert
                  value={String(
                    Boolean(profile.childPrenatalHistory?.hadFeedingProblems)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childPrenatalHistory: {
                        ...(p.childPrenatalHistory ?? {}),
                        hadFeedingProblems: v === "true",
                        ...(v === "false"
                          ? { feedingProblemsDetails: "" }
                          : {}),
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>

            {profile.childPrenatalHistory?.hadFeedingProblems === true && (
              <div className="md:col-span-2">
                <Field title="Please describe the feeding problems">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Describe the feeding problems…"
                    value={
                      profile.childPrenatalHistory?.feedingProblemsDetails ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          feedingProblemsDetails: next,
                        },
                      }))
                    }
                    recommendedWords={20}
                  />
                </Field>
              </div>
            )}
            <div className="md:col-span-2">
              {/* Q68 Gain weight well? */}
              <Field required title="Did the baby gain weight well?">
                <Likert
                  value={String(
                    Boolean(profile.childPrenatalHistory?.gainedWeightWell)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childPrenatalHistory: {
                        ...(p.childPrenatalHistory ?? {}),
                        gainedWeightWell: v === "true",
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>
            {/* Q69 Early problems */}
            <div className="md:col-span-2">
              <Field
                required
                title="Any problems in the first week, first month, or first year?"
              >
                <Likert
                  value={String(
                    Boolean(profile.childPrenatalHistory?.hadEarlyProblems)
                  )}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      childPrenatalHistory: {
                        ...(p.childPrenatalHistory ?? {}),
                        hadEarlyProblems: v === "true",
                        ...(v === "false" ? { earlyProblemsDetails: "" } : {}),
                      },
                    }))
                  }
                  options={[
                    { key: "true", label: "Yes" },
                    { key: "false", label: "No" },
                  ]}
                />
              </Field>
            </div>

            {profile.childPrenatalHistory?.hadEarlyProblems === true && (
              <div className="md:col-span-2">
                <Field title="Please describe the problems">
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Describe any problems in the first week, month, or year…"
                    value={
                      profile.childPrenatalHistory?.earlyProblemsDetails ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        childPrenatalHistory: {
                          ...(p.childPrenatalHistory ?? {}),
                          earlyProblemsDetails: next,
                        },
                      }))
                    }
                    recommendedWords={28}
                  />
                </Field>
              </div>
            )}

            {/* Q70–Q72 Parity */}
            <Field required title="Total number of pregnancies">
              <Input
                type="number"
                min={0}
                value={
                  Number.isFinite(
                    profile.childPrenatalHistory?.totalPregnancies
                  )
                    ? String(profile.childPrenatalHistory?.totalPregnancies)
                    : ""
                }
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      totalPregnancies: Number(e.target.value || 0),
                    },
                  }))
                }
              />
            </Field>

            <Field required title="Live births">
              <Input
                type="number"
                min={0}
                value={
                  Number.isFinite(profile.childPrenatalHistory?.liveBirths)
                    ? String(profile.childPrenatalHistory?.liveBirths)
                    : ""
                }
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      liveBirths: Number(e.target.value || 0),
                    },
                  }))
                }
              />
            </Field>

            <Field required title="Birth order of this child">
              <Input
                type="number"
                min={0}
                value={
                  Number.isFinite(profile.childPrenatalHistory?.birthOrder)
                    ? String(profile.childPrenatalHistory?.birthOrder)
                    : ""
                }
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    childPrenatalHistory: {
                      ...(p.childPrenatalHistory ?? {}),
                      birthOrder: Number(e.target.value || 0),
                    },
                  }))
                }
              />
            </Field>
          </div>
          {/* --- Child: Developmental History --- */}
          <Separator label="Developmental History" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q74: My child was (activity level) */}
            <Field title="My child was (overall activity level)">
              <Listbox
                value={profile.childDevelopmentalHistory?.activityLevel ?? ""}
                onChange={(v: string) =>
                  setProfile((p) => ({
                    ...p,
                    childDevelopmentalHistory: {
                      ...(p.childDevelopmentalHistory ?? {}),
                      activityLevel: v as any,
                      activityLevelOther:
                        v === "other"
                          ? (p.childDevelopmentalHistory?.activityLevelOther ??
                            "")
                          : "",
                    },
                  }))
                }
              >
                <div className="relative">
                  <ListboxButton className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                    {activityLevelLabel(
                      profile.childDevelopmentalHistory?.activityLevel
                    )}
                    <ChevronDown
                      className="group pointer-events-none absolute top-3 right-2.5 size-4"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                  <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                    {[
                      { value: "active", label: "Active" },
                      { value: "active_but_calm", label: "Active but calm" },
                      { value: "passive", label: "Passive" },
                      { value: "other", label: "Other" },
                    ].map((opt) => (
                      <ListboxOption
                        key={opt.value}
                        value={opt.value}
                        as={React.Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active ? "bg-slate-100" : "bg-white"
                            } relative cursor-pointer select-none py-2 pl-4 pr-10`}
                          >
                            <span
                              className={`${
                                selected
                                  ? "font-medium text-slate-900"
                                  : "font-normal text-slate-700"
                              } block truncate`}
                            >
                              {opt.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-3 flex items-center text-slate-600">
                                <Check />
                              </span>
                            )}
                          </li>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              {profile.childDevelopmentalHistory?.activityLevel === "other" && (
                <div className="mt-2">
                  <Input
                    placeholder="Please specify…"
                    value={
                      profile.childDevelopmentalHistory?.activityLevelOther ??
                      ""
                    }
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        childDevelopmentalHistory: {
                          ...(p.childDevelopmentalHistory ?? {}),
                          activityLevel: "other",
                          activityLevelOther: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              )}
            </Field>

            {/* Q75: My child was (affective style) */}
            <Field title="My child was (early affective style)">
              <Listbox
                value={
                  profile.childDevelopmentalHistory?.earlyAffectiveStyle ?? ""
                }
                onChange={(v: string) =>
                  setProfile((p) => ({
                    ...p,
                    childDevelopmentalHistory: {
                      ...(p.childDevelopmentalHistory ?? {}),
                      earlyAffectiveStyle: v as any,
                      earlyAffectiveStyleOther:
                        v === "other"
                          ? (p.childDevelopmentalHistory
                              ?.earlyAffectiveStyleOther ?? "")
                          : "",
                    },
                  }))
                }
              >
                <div className="relative">
                  <ListboxButton className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                    {affectiveStyleLabel(
                      profile.childDevelopmentalHistory?.earlyAffectiveStyle
                    )}
                    <ChevronDown
                      className="group pointer-events-none absolute top-3 right-2.5 size-4"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                  <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                    {[
                      { value: "cuddly", label: "Cuddly" },
                      { value: "irritable", label: "Irritable" },
                      { value: "withdrawn", label: "Withdrawn" },
                      { value: "other", label: "Other" },
                    ].map((opt) => (
                      <ListboxOption
                        key={opt.value}
                        value={opt.value}
                        as={React.Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active ? "bg-slate-100" : "bg-white"
                            } relative cursor-pointer select-none py-2 pl-4 pr-10`}
                          >
                            <span
                              className={`${
                                selected
                                  ? "font-medium text-slate-900"
                                  : "font-normal text-slate-700"
                              } block truncate`}
                            >
                              {opt.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-3 flex items-center text-slate-600">
                                <Check />
                              </span>
                            )}
                          </li>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              {profile.childDevelopmentalHistory?.earlyAffectiveStyle ===
                "other" && (
                <div className="mt-2">
                  <Input
                    placeholder="Please specify…"
                    value={
                      profile.childDevelopmentalHistory
                        ?.earlyAffectiveStyleOther ?? ""
                    }
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        childDevelopmentalHistory: {
                          ...(p.childDevelopmentalHistory ?? {}),
                          earlyAffectiveStyle: "other",
                          earlyAffectiveStyleOther: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              )}
            </Field>

            {/* Q76: My child cried */}
            <Field title="My child cried">
              <Listbox
                value={profile.childDevelopmentalHistory?.cryingPattern ?? ""}
                onChange={(v: string) =>
                  setProfile((p) => ({
                    ...p,
                    childDevelopmentalHistory: {
                      ...(p.childDevelopmentalHistory ?? {}),
                      cryingPattern: v as any,
                      cryingPatternOther:
                        v === "other"
                          ? (p.childDevelopmentalHistory?.cryingPatternOther ??
                            "")
                          : "",
                    },
                  }))
                }
              >
                <div className="relative">
                  <ListboxButton className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                    {cryingPatternLabel(
                      profile.childDevelopmentalHistory?.cryingPattern
                    )}
                    <ChevronDown
                      className="group pointer-events-none absolute top-3 right-2.5 size-4"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                  <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                    {[
                      {
                        value: "easily_frequently",
                        label: "Easily & Frequently",
                      },
                      { value: "reasonable", label: "Reasonable Amount" },
                      { value: "seldom", label: "Seldom" },
                      { value: "other", label: "Other" },
                    ].map((opt) => (
                      <ListboxOption
                        key={opt.value}
                        value={opt.value}
                        as={React.Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active ? "bg-slate-100" : "bg-white"
                            } relative cursor-pointer select-none py-2 pl-4 pr-10`}
                          >
                            <span
                              className={`${
                                selected
                                  ? "font-medium text-slate-900"
                                  : "font-normal text-slate-700"
                              } block truncate`}
                            >
                              {opt.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-3 flex items-center text-slate-600">
                                <Check />
                              </span>
                            )}
                          </li>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              {profile.childDevelopmentalHistory?.cryingPattern === "other" && (
                <div className="mt-2">
                  <Input
                    placeholder="Please specify…"
                    value={
                      profile.childDevelopmentalHistory?.cryingPatternOther ??
                      ""
                    }
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        childDevelopmentalHistory: {
                          ...(p.childDevelopmentalHistory ?? {}),
                          cryingPattern: "other",
                          cryingPatternOther: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              )}
            </Field>

            {/* Q77: When upset, my child was */}
            <Field title="When upset, my child was">
              <Listbox
                value={
                  profile.childDevelopmentalHistory?.soothingWhenUpset ?? ""
                }
                onChange={(v: string) =>
                  setProfile((p) => ({
                    ...p,
                    childDevelopmentalHistory: {
                      ...(p.childDevelopmentalHistory ?? {}),
                      soothingWhenUpset: v as any,
                      soothingWhenUpsetOther:
                        v === "other"
                          ? (p.childDevelopmentalHistory
                              ?.soothingWhenUpsetOther ?? "")
                          : "",
                    },
                  }))
                }
              >
                <div className="relative">
                  <ListboxButton className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                    {soothingLabel(
                      profile.childDevelopmentalHistory?.soothingWhenUpset
                    )}
                    <ChevronDown
                      className="group pointer-events-none absolute top-3 right-2.5 size-4"
                      aria-hidden="true"
                    />
                  </ListboxButton>
                  <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                    {[
                      { value: "soothed_easily", label: "Soothed Easily" },
                      {
                        value: "difficult_to_soothe",
                        label: "Difficult to Soothe",
                      },
                      { value: "average", label: "Average" },
                      { value: "other", label: "Other" },
                    ].map((opt) => (
                      <ListboxOption
                        key={opt.value}
                        value={opt.value}
                        as={React.Fragment}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active ? "bg-slate-100" : "bg-white"
                            } relative cursor-pointer select-none py-2 pl-4 pr-10`}
                          >
                            <span
                              className={`${
                                selected
                                  ? "font-medium text-slate-900"
                                  : "font-normal text-slate-700"
                              } block truncate`}
                            >
                              {opt.label}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 right-3 flex items-center text-slate-600">
                                <Check />
                              </span>
                            )}
                          </li>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              {profile.childDevelopmentalHistory?.soothingWhenUpset ===
                "other" && (
                <div className="mt-2">
                  <Input
                    placeholder="Please specify…"
                    value={
                      profile.childDevelopmentalHistory
                        ?.soothingWhenUpsetOther ?? ""
                    }
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        childDevelopmentalHistory: {
                          ...(p.childDevelopmentalHistory ?? {}),
                          soothingWhenUpset: "other",
                          soothingWhenUpsetOther: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              )}
            </Field>

            {/* Q78: Response to being held */}
            <div className="md:col-span-2">
              <Field title="Describe your child's response to being held">
                <TextAreaWithEncouragement
                  rows={3}
                  placeholder="How did your child respond to being held?"
                  value={
                    profile.childDevelopmentalHistory?.responseToBeingHeld ?? ""
                  }
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      childDevelopmentalHistory: {
                        ...(p.childDevelopmentalHistory ?? {}),
                        responseToBeingHeld: next,
                      },
                    }))
                  }
                  recommendedWords={15}
                />
              </Field>
            </div>

            {/* Q79: Reaction to strangers */}
            <div className="md:col-span-2">
              <Field title="My child's reaction to strangers was">
                <Listbox
                  value={
                    profile.childDevelopmentalHistory?.reactionToStrangers ?? ""
                  }
                  onChange={(v: string) =>
                    setProfile((p) => ({
                      ...p,
                      childDevelopmentalHistory: {
                        ...(p.childDevelopmentalHistory ?? {}),
                        reactionToStrangers: v as any,
                      },
                    }))
                  }
                >
                  <div className="relative">
                    <ListboxButton className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                      {reactionToStrangersLabel(
                        profile.childDevelopmentalHistory?.reactionToStrangers
                      )}
                      <ChevronDown
                        className="group pointer-events-none absolute top-3 right-2.5 size-4"
                        aria-hidden="true"
                      />
                    </ListboxButton>
                    <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                      {[
                        { value: "friendly", label: "Friendly" },
                        { value: "indifferent", label: "Indifferent" },
                        { value: "fearful", label: "Fearful" },
                      ].map((opt) => (
                        <ListboxOption
                          key={opt.value}
                          value={opt.value}
                          as={React.Fragment}
                        >
                          {({ active, selected }) => (
                            <li
                              className={`${
                                active ? "bg-slate-100" : "bg-white"
                              } relative cursor-pointer select-none py-2 pl-4 pr-10`}
                            >
                              <span
                                className={`${
                                  selected
                                    ? "font-medium text-slate-900"
                                    : "font-normal text-slate-700"
                                } block truncate`}
                              >
                                {opt.label}
                              </span>
                              {selected && (
                                <span className="absolute inset-y-0 right-3 flex items-center text-slate-600">
                                  <Check />
                                </span>
                              )}
                            </li>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>
              </Field>
            </div>

            {/* Q80: Eating habits */}
            <div className="md:col-span-2">
              <Field title="Describe your child's eating habits, any problems?">
                <TextAreaWithEncouragement
                  rows={3}
                  placeholder="Any feeding concerns, selectivity, sensitivities…"
                  value={
                    profile.childDevelopmentalHistory?.eatingHabitsNotes ?? ""
                  }
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      childDevelopmentalHistory: {
                        ...(p.childDevelopmentalHistory ?? {}),
                        eatingHabitsNotes: next,
                      },
                    }))
                  }
                  recommendedWords={30}
                />
              </Field>
            </div>

            {/* Q81: Sleeping habits */}
            <div className="md:col-span-2">
              <Field title="Describe your child's sleeping habits, any problems?">
                <TextAreaWithEncouragement
                  rows={3}
                  placeholder="Bedtime routines, night waking, duration, concerns…"
                  value={
                    profile.childDevelopmentalHistory?.sleepingHabitsNotes ?? ""
                  }
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      childDevelopmentalHistory: {
                        ...(p.childDevelopmentalHistory ?? {}),
                        sleepingHabitsNotes: next,
                      },
                    }))
                  }
                  recommendedWords={30}
                />
              </Field>
            </div>
          </div>
          {/* --- Child: Developmental Milestones --- */}
          <Separator label="Developmental Milestones" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <p className="text-sm text-slate-600">
                Please mark any milestones that occurred later than the stated
                age.
              </p>
            </div>

            {/* Motor */}
            <div className="md:col-span-2">
              <Field
                required
                title="Motor (select all that were later than stated age)"
              >
                <MultiSelectGroup
                  values={profile.childDevelopmentalMilestones?.motor ?? []}
                  options={milestoneMotorOptions}
                  onChange={(next: string[]) =>
                    setProfile((p) => ({
                      ...p,
                      childDevelopmentalMilestones: {
                        ...(p.childDevelopmentalMilestones ?? {
                          motor: [],
                          language: [],
                          adaptive: [],
                          notes: "",
                        }),
                        motor: next,
                      },
                    }))
                  }
                />
              </Field>
            </div>

            {/* Language */}
            <div className="md:col-span-2">
              <Field
                required
                title="Language (select all that were later than stated age)"
              >
                <MultiSelectGroup
                  values={profile.childDevelopmentalMilestones?.language ?? []}
                  options={milestoneLanguageOptions}
                  onChange={(next: string[]) =>
                    setProfile((p) => ({
                      ...p,
                      childDevelopmentalMilestones: {
                        ...(p.childDevelopmentalMilestones ?? {
                          motor: [],
                          language: [],
                          adaptive: [],
                          notes: "",
                        }),
                        language: next,
                      },
                    }))
                  }
                />
              </Field>
            </div>

            {/* Adaptive */}
            <div className="md:col-span-2">
              <Field
                required
                title="Adaptive (select all that were later than stated age)"
              >
                <MultiSelectGroup
                  values={profile.childDevelopmentalMilestones?.adaptive ?? []}
                  options={milestoneAdaptiveOptions}
                  onChange={(next: string[]) =>
                    setProfile((p) => ({
                      ...p,
                      childDevelopmentalMilestones: {
                        ...(p.childDevelopmentalMilestones ?? {
                          motor: [],
                          language: [],
                          adaptive: [],
                          notes: "",
                        }),
                        adaptive: next,
                      },
                    }))
                  }
                />
              </Field>
            </div>
          </div>
        </>
      )}

      {/* Current Medications */}
      <Separator label="Current Medications" />
      {profile.currentMedications.length === 0 ? (
        <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 p-4 bg-white/60">
          <div className="text-sm text-slate-600">No medications added.</div>
          <AddButton onClick={addCurrentMed} label="Add Medication" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.currentMedications.map((m, idx) => (
            <Card key={idx}>
              <div className="flex justify-between mb-2 group">
                <div className="font-medium text-slate-700">
                  Medication #{idx + 1}
                </div>
                <RemoveButton onClick={() => removeCurrentMed(idx)} />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Input
                  label="Name"
                  value={m.name}
                  onChange={(e) =>
                    updateCurrentMed(idx, "name", e.target.value)
                  }
                />
                <Input
                  label="Dosage"
                  value={m.dosage}
                  onChange={(e) =>
                    updateCurrentMed(idx, "dosage", e.target.value)
                  }
                />
                <Input
                  label="Frequency"
                  value={m.frequency}
                  onChange={(e) =>
                    updateCurrentMed(idx, "frequency", e.target.value)
                  }
                />
                <Input
                  label="Purpose"
                  value={m.purpose}
                  onChange={(e) =>
                    updateCurrentMed(idx, "purpose", e.target.value)
                  }
                />
                <Input
                  label="Prescriber"
                  value={m.prescriber}
                  onChange={(e) =>
                    updateCurrentMed(idx, "prescriber", e.target.value)
                  }
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Comments</label>
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Optional notes about this medication…"
                    value={m.comments}
                    onChangeText={(next) =>
                      updateCurrentMed(idx, "comments", next)
                    }
                    recommendedWords={20}
                  />
                </div>
              </div>
            </Card>
          ))}
          <div className="md:col-span-2">
            <AddButton onClick={addCurrentMed} label="Add Another Medication" />
          </div>
        </div>
      )}

      {/* Previous Medications */}
      <Separator label="Previous Medications" />
      {profile.previousMedications.length === 0 ? (
        <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 p-4 bg-white/60">
          <div className="text-sm text-slate-600">
            No previous medications added.
          </div>
          <AddButton onClick={addPrevMed} label="Add Previous Medication" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.previousMedications.map((m, idx) => (
            <Card key={idx}>
              <div className="flex justify-between mb-2 group">
                <div className="font-medium text-slate-700">
                  Previous Medication #{idx + 1}
                </div>
                <RemoveButton onClick={() => removePrevMed(idx)} />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Input
                  label="Name"
                  value={m.name}
                  onChange={(e) => updatePrevMed(idx, "name", e.target.value)}
                />
                <Input
                  label="Dosage"
                  value={m.dosage}
                  onChange={(e) => updatePrevMed(idx, "dosage", e.target.value)}
                />
                <Input
                  label="Frequency"
                  value={m.frequency}
                  onChange={(e) =>
                    updatePrevMed(idx, "frequency", e.target.value)
                  }
                />
                <Input
                  label="Purpose"
                  value={m.purpose}
                  onChange={(e) =>
                    updatePrevMed(idx, "purpose", e.target.value)
                  }
                />
                <Input
                  label="Prescriber"
                  value={m.prescriber}
                  onChange={(e) =>
                    updatePrevMed(idx, "prescriber", e.target.value)
                  }
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Comments</label>
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Optional notes about this prior medication…"
                    value={m.comments}
                    onChangeText={(next) =>
                      updatePrevMed(idx, "comments", next)
                    }
                    recommendedWords={20}
                  />
                </div>
              </div>
            </Card>
          ))}
          <div className="md:col-span-2">
            <AddButton
              onClick={addPrevMed}
              label="Add Another Previous Medication"
            />
          </div>
        </div>
      )}

      {/* Medical Allergies */}
      <Separator label="Medical Allergies" />
      {profile.medicalAllergies.length === 0 ? (
        <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 p-4 bg-white/60">
          <div className="text-sm text-slate-600">No allergies recorded.</div>
          <AddButton onClick={addAllergy} label="Add Allergy" />
        </div>
      ) : (
        <div className="space-y-3">
          {profile.medicalAllergies.map((a, idx) => (
            <Card key={idx}>
              <div className="flex justify-between mb-2 group">
                <div className="font-medium text-slate-700">
                  Allergy #{idx + 1}
                </div>
                <RemoveButton onClick={() => removeAllergy(idx)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Medication Name"
                  value={a.name}
                  onChange={(e) => updateAllergy(idx, "name", e.target.value)}
                />
                <Input
                  label="Reaction"
                  value={a.reaction}
                  onChange={(e) =>
                    updateAllergy(idx, "reaction", e.target.value)
                  }
                />
              </div>
            </Card>
          ))}
          <AddButton onClick={addAllergy} label="Add Another Allergy" />
        </div>
      )}

      {/* Previous Hospitalization */}
      <Separator label="Previous Hospitalization" />
      {profile.previousHospitalizations.length === 0 ? (
        <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 p-4 bg-white/60">
          <div className="text-sm text-slate-600">
            No hospitalizations added.
          </div>
          <AddButton onClick={addHosp} label="Add Hospitalization" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.previousHospitalizations.map((h, idx) => (
            <Card key={idx}>
              <div className="flex justify-between mb-2 group">
                <div className="font-medium text-slate-700">
                  Hospitalization #{idx + 1}
                </div>
                <RemoveButton onClick={() => removeHosp(idx)} />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <Input
                  label="Name of Hospital"
                  value={h.hospitalName}
                  onChange={(e) =>
                    updateHosp(idx, "hospitalName", e.target.value)
                  }
                />
                <Input
                  label="Location"
                  value={h.location}
                  onChange={(e) => updateHosp(idx, "location", e.target.value)}
                />
                <Input
                  label="Date"
                  type="date"
                  value={h.date}
                  onChange={(e) => updateHosp(idx, "date", e.target.value)}
                />
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-slate-600">Reason</label>
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Briefly describe the reason for hospitalization…"
                    value={h.reason}
                    onChangeText={(next) => updateHosp(idx, "reason", next)}
                    recommendedWords={30}
                  />
                </div>
              </div>
            </Card>
          ))}
          <div className="md:col-span-2">
            <AddButton onClick={addHosp} label="Add Another Hospitalization" />
          </div>
        </div>
      )}

      {/* Previous Injuries */}
      <Separator label="Previous Injuries" />
      {!showInjuries ? (
        <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 p-4 bg-white/60">
          <div className="text-sm text-slate-600">No injuries recorded.</div>
          <AddButton onClick={ensureInjuries} label="Add Injury Details" />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-300 p-4 bg-white/80">
          <div className="grid grid-cols-1 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600">Injury List</label>
              <TextAreaWithEncouragement
                rows={2}
                placeholder="e.g., concussion (2019); wrist fracture (2021)…"
                value={profile.previousInjuries?.injuryList ?? ""}
                onChangeText={(next) => updateInjuries("injuryList", next)}
                recommendedWords={10}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm text-slate-600">Explanation</label>
              <TextAreaWithEncouragement
                rows={4}
                placeholder="Add brief context, treatments, lingering effects…"
                value={profile.previousInjuries?.explanation ?? ""}
                onChangeText={(next) => updateInjuries("explanation", next)}
                recommendedWords={30}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
