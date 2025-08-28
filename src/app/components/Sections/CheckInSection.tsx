// src/app/components/Sections/CheckIn.tsx
"use client";

import React from "react";
import Field from "../primitives/Field";
import StepTitle from "../StepTitle";
import type { Profile, StateSetter } from "../../lib/types";

// Local helper for pill-style multi-select with exclusive "None of the above"
function MultiSelectGroup({
  options,
  values,
  onChange,
}: {
  options: { key: string; label: string; none?: boolean }[];
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const toggle = (k: string, none?: boolean) => {
    if (none) {
      // "None" is exclusive
      onChange(values.includes(k) ? [] : [k]);
      return;
    }
    // remove any existing "none"
    const cleaned = values.filter((v) => v !== "none");
    if (cleaned.includes(k)) {
      onChange(cleaned.filter((v) => v !== k));
    } else {
      onChange([...cleaned, k]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => {
        const active = values.includes(opt.key);
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => toggle(opt.key, opt.none)}
            className={`w-full text-left rounded-xl border px-3 py-2 ${
              active ? "border-slate-900 bg-white" : "border-slate-300 bg-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                readOnly
                checked={active}
                className="h-4 w-4 rounded border-slate-400"
              />
              <span className="text-slate-800">{opt.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default function CheckInSection({
  title,
  profile,
  setProfile,
  step,
}: {
  title: string;
  profile: Profile;
  setProfile: StateSetter<Profile>;
  step: number;
}) {
  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title} />
      <p className="text-slate-700">
        In the <b>past two weeks</b>, have you experienced any of the following?
      </p>

      <Field title="Mood changes:" required>
        <MultiSelectGroup
          options={[
            { key: "sad", label: "Feeling significantly sad or down" },
            { key: "tired", label: "Significant tiredness" },
            { key: "mood_swings", label: "Drastic mood changes (high/low)" },
            { key: "low_self_esteem", label: "Low self esteem" },
            { key: "guilt", label: "Excessive guilt" },
            { key: "none", label: "🚫 None of the above", none: true },
          ]}
          values={profile.moodChanges}
          onChange={(next) => setProfile((p) => ({ ...p, moodChanges: next }))}
        />
      </Field>

      <Field title="Behavioral changes:" required>
        <MultiSelectGroup
          options={[
            { key: "withdrawal", label: "Withdrawal from friends/activities" },
            { key: "substances", label: "Problems with alcohol or drug use" },
            { key: "eating", label: "Significant changes in eating habits" },
            { key: "anger", label: "Excessive anger/violence" },
            {
              key: "daily_problems",
              label: "Unable to deal with daily problems",
            },
            { key: "none", label: "🚫 None of the above", none: true },
          ]}
          values={profile.behaviorChanges}
          onChange={(next) =>
            setProfile((p) => ({ ...p, behaviorChanges: next }))
          }
        />
      </Field>

      <Field title="Thought changes:" required>
        <MultiSelectGroup
          options={[
            { key: "concentration", label: "Inability to concentrate" },
            { key: "detachment", label: "Detachment from reality" },
            { key: "disconnected", label: "Feeling disconnected from others" },
            { key: "worry", label: "Excessive worry/fear" },
            { key: "suicidal", label: "Suicidal thinking" },
            { key: "none", label: "🚫 None of the above", none: true },
          ]}
          values={profile.thoughtChanges}
          onChange={(next) =>
            setProfile((p) => ({ ...p, thoughtChanges: next }))
          }
        />
      </Field>
    </div>
  );
}
