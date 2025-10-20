"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Separator from "../primitives/Separator"; // <- ensure this path/casing matches your file
import type { Profile } from "../../lib/types/types";
import { Option } from "../../lib/types/types";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";

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

  const degreeOptions: Option[] = [
    { label: "Didn't complete high school", value: "no_high_school" },
    { label: "High school graduate", value: "high_school" },
    { label: "Some college, but no degree", value: "some_college" },
    { label: "Certificate (career and technical)", value: "certificate" },
    { label: "Associate's degree", value: "associates" },
    { label: "Bachelor's degree", value: "bachelors" },
    { label: "Master's degree", value: "masters" },
    { label: "Professional/doctorate degree", value: "doctorate" },
  ];

  const degreeLabel = (v: string) =>
    degreeOptions.find((o) => o.value === v)?.label ?? "Choose…";

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

        <Field title={profile.isChild ? "Parent Email" : "Email"} required>
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

        <Field
          title={profile.isChild ? "Parent Contact Number" : "Contact Number"}
          required
        >
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
                placeholder="e.g., John"
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
                placeholder="e.g., NYC Public Schools"
                value={profile.parentEmployer ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    parentEmployer: e.target.value,
                  }))
                }
              />
            </Field>

            <Field title="Parent Education" required>
              <Listbox
                value={profile.parentEducation}
                onChange={(val: string) =>
                  setProfile((p) => ({ ...p, parentEducation: val }))
                }
              >
                <div className="relative">
                  <ListboxButton className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                    {profile.parentEducation ? (
                      <span className="text-slate-900">
                        {degreeLabel(profile.parentEducation)}
                      </span>
                    ) : (
                      <span className="text-slate-400">Choose…</span>
                    )}
                    <ChevronDown
                      className="group pointer-events-none absolute top-3 right-2.5 size-4"
                      aria-hidden="true"
                    />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                    {degreeOptions.map((option) => (
                      <ListboxOption
                        key={option.value}
                        value={option.value}
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
                              {option.label}
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
        </>
      )}
    </div>
  );
}
