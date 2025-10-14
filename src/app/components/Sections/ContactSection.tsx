"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Separator from "../primitives/Separator"; // <- ensure this path/casing matches your file
import type { Profile } from "../../lib/types/types";

export default function ContactSection({
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
  const [dobAgeError, setDobAgeError] = React.useState<string | null>(null);

  const computeAge = (dobStr: string): number | null => {
    if (!dobStr) return null;
    const d = new Date(dobStr);
    if (isNaN(d.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - d.getFullYear();
    const m = today.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--;
    return age;
  };

  React.useEffect(() => {
    if (!profile?.dob || !profile?.age) {
      setDobAgeError(null);
      return;
    }
    const enteredAge = parseInt(String(profile.age), 10);
    const dobAge = computeAge(profile.dob);
    if (Number.isNaN(enteredAge) || dobAge === null) {
      setDobAgeError(null);
      return;
    }
    if (enteredAge !== dobAge) {
      setDobAgeError("Date of birth does not match the entered age.");
    } else {
      setDobAgeError(null);
    }
  }, [profile.dob, profile.age]);

  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title} />

      {/* Patient contact info */}
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
            className={`w-full rounded-xl bg-white border px-3 py-2 text-slate-900 ${dobAgeError ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300"} `}
            placeholder="e.g., 20"
            value={profile.age}
            onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
            aria-invalid={dobAgeError ? true : undefined}
            aria-describedby={dobAgeError ? "dob-age-mismatch" : undefined}
          />
          {dobAgeError && (
            <p id="dob-age-mismatch" className="mt-1 text-xs text-red-600">
              {dobAgeError}
            </p>
          )}
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
            className={`w-full rounded-xl bg-white border px-3 py-2 text-slate-900 ${dobAgeError ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-slate-300"}`}
            value={profile.dob}
            onChange={(e) => setProfile((p) => ({ ...p, dob: e.target.value }))}
            aria-invalid={dobAgeError ? true : undefined}
            aria-describedby={dobAgeError ? "dob-age-mismatch" : undefined}
          />
        </Field>
      </div>

      {/* Parent/Guardian block only when Child intake */}
      {profile.isChild === true && (
        <>
          <Separator label="Parent / Guardian Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Field title="Parent/Guardian 1 First Name" required>
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., Jane"
                value={profile.parent1FirstName ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    parent1FirstName: e.target.value,
                  }))
                }
              />
            </Field>

            <Field title="Parent/Guardian 1 Last Name" required>
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., Doe"
                value={profile.parent1LastName ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, parent1LastName: e.target.value }))
                }
              />
            </Field>
            <Field title="Parent/Guardian 2 First Name" required>
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., Jane"
                value={profile.parent2FirstName ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    parent2FirstName: e.target.value,
                  }))
                }
              />
            </Field>

            <Field title="Parent/Guardian 2 Last Name" required>
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., Doe"
                value={profile.parent2LastName ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, parent2LastName: e.target.value }))
                }
              />
            </Field>

            <Field title="Parent/Guardian Contact Number" required>
              <input
                type="tel"
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="123-456-7890"
                value={profile.parentContactNumber ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    parentContactNumber: e.target.value,
                  }))
                }
              />
            </Field>

            <Field title="Parent/Guardian Email" required>
              <input
                type="email"
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="parent@example.com"
                value={profile.parentEmail ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, parentEmail: e.target.value }))
                }
              />
            </Field>

            <Field title="Parent/Guardian Occupation" required>
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., Teacher"
                value={profile.parentOccupation ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    parentOccupation: e.target.value,
                  }))
                }
              />
            </Field>

            <Field title="Parent/Guardian Employer" required>
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., NYC DOE"
                value={profile.parentEmployer ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    parentEmployer: e.target.value,
                  }))
                }
              />
            </Field>

            <Field title="Parent/Guardian Education" required>
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., Bachelor's"
                value={profile.parentEducation ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    parentEducation: e.target.value,
                  }))
                }
              />
            </Field>
          </div>
        </>
      )}
    </div>
  );
}
