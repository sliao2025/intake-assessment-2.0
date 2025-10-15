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
import { Check } from "lucide-react";

// ---- Hoisted UI atoms to maintain stable component identity across renders ----
const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-2xl border border-slate-300 p-4 bg-white/80">
    {children}
  </div>
);

const Input = (
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
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
          <Separator label="Child Medical History" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q2 */}
            <div className="md:col-span-2">
              <Field>
                <Likert
                  label="Has your child ever undergone Neuro Psychological Testing?"
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
          {/* Inserted after child medical history grid */}
          <Separator label="Past Mental Health and Psychiatric History" />
          {/* Child treatment kind options */}
          {/*
            Option values:
              - individual_psychotherapy
              - group_psychotherapy
              - family_couples_therapy
              - other
              - none
          */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Q14: What kind of treatment has your child had? (multi-select) */}
            <div className="md:col-span-2">
              <Field title="What kind of treatment has your child had? (Select all that apply)">
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
            {profile.childPsychiatricHistory?.treatmentKinds[0]?.value ===
              "none" && (
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
