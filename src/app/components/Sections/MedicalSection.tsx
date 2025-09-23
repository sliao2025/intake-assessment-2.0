"use client";

import React from "react";
import Separator from "../primitives/Separator";
import Field from "../primitives/Field";
import { intPsychTheme } from "../theme";
import RemoveButton from "../primitives/Removebutton";
import type {
  Profile,
  StateSetter,
  Medication,
  Allergy,
  Hospitalization,
  InjuryDetails,
} from "../../lib/types/types";
import StepTitle from "../StepTitle";

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

const TextArea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }
) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-slate-600">{props.label}</label>
    <textarea
      {...props}
      rows={props.rows ?? 3}
      className="w-full rounded-2xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
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
                <TextArea
                  label="Comments"
                  value={m.comments}
                  onChange={(e) =>
                    updateCurrentMed(idx, "comments", e.target.value)
                  }
                />
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
                <TextArea
                  label="Comments"
                  value={m.comments}
                  onChange={(e) =>
                    updatePrevMed(idx, "comments", e.target.value)
                  }
                />
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
                <TextArea
                  label="Reason"
                  value={h.reason}
                  onChange={(e) => updateHosp(idx, "reason", e.target.value)}
                />
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
            <TextArea
              label="Injury List"
              rows={2}
              value={profile.previousInjuries?.injuryList ?? ""}
              onChange={(e) => updateInjuries("injuryList", e.target.value)}
            />
            <TextArea
              label="Explanation"
              rows={4}
              value={profile.previousInjuries?.explanation ?? ""}
              onChange={(e) => updateInjuries("explanation", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
