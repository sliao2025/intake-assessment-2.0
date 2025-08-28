// src/app/components/Sections/ProfileSection.tsx
"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import { Option } from "../../lib/types";

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
};

export default function ProfileSection({
  title,
  profile,
  setProfile,
  step,
}: {
  title: string;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  step: number;
}) {
  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field title="First Name" required>
          <input
            className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="e.g., John"
            value={profile.firstName}
            onChange={(e) =>
              setProfile((p) => ({ ...p, firstName: e.target.value }))
            }
          />
        </Field>

        <Field title="Last Name" required>
          <input
            className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
            placeholder="e.g., Doe"
            value={profile.lastName}
            onChange={(e) =>
              setProfile((p) => ({ ...p, lastName: e.target.value }))
            }
          />
        </Field>

        <Field title="Age" required>
          <input
            type="number"
            min={1}
            className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
            placeholder="e.g., 28"
            value={profile.age}
            onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
          />
        </Field>

        <Field title="Email" required>
          <input
            type="email"
            className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
            placeholder="you@example.com"
            value={profile.email}
            onChange={(e) =>
              setProfile((p) => ({ ...p, email: e.target.value }))
            }
          />
        </Field>

        <Field title="Contact Number" required>
          <input
            type="tel"
            className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
            placeholder="123-456-7890"
            value={profile.contactNumber}
            onChange={(e) =>
              setProfile((p) => ({
                ...p,
                contactNumber: e.target.value,
              }))
            }
          />
        </Field>

        <Field title="Date of Birth" required>
          <input
            type="date"
            className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
            value={profile.dob}
            onChange={(e) => setProfile((p) => ({ ...p, dob: e.target.value }))}
          />
        </Field>
      </div>
    </div>
  );
}
