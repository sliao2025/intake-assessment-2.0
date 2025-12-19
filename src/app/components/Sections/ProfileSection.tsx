"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import { Profile } from "../../lib/types/types";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { Option } from "../../lib/types/types";
import Separator from "../primitives/Separator";
import Likert from "../primitives/Likert";
import TextAreaWithEncouragement from "../primitives/TextAreawithEncouragement";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

const sexualOrientations: Option[] = [
  { label: "Asexual", value: "asexual" },
  { label: "Bisexual", value: "bisexual" },
  { label: "Homosexual or Gay", value: "homosexual" },
  { label: "Heterosexual or Straight", value: "heterosexual" },
  { label: "Queer", value: "queer" },
  { label: "Prefer not to disclose", value: "n/a" },
];

const pronounOptions: Option[] = [
  { label: "He/Him/His", value: "he_him_his" },
  { label: "She/Her/Hers", value: "she_her_hers" },
  { label: "They/Their/Theirs", value: "they_their_theirs" },
  { label: "Ze/Zir/Zirs", value: "ze_zir_zirs" },
  { label: "Pronoun is not listed", value: "other" },
];

const ethnicityOptions: Option[] = [
  { label: "African-American or Black", value: "black" },
  { label: "Asian or Pacific Islander", value: "asian_pacific_islander" },
  { label: "Hispanic, Latino or Spanish", value: "hispanic_latino_spanish" },
  { label: "Middle Eastern or North African", value: "mena" },
  {
    label: "Native American or Alaskan Native",
    value: "native_american_alaskan",
  },
  { label: "White or Caucasian", value: "white" },
  { label: "Prefer not to disclose", value: "na" },
  { label: "A race, ethnicity, or origin that is not listed", value: "other" },
];

const religionOptions: Option[] = [
  { label: "Buddhist", value: "buddhism" },
  { label: "Christian", value: "christian" },
  { label: "Hindu", value: "hindu" },
  { label: "Jewish", value: "jewish" },
  { label: "Muslim", value: "muslim" },
  { label: "Non-religious", value: "non_religious" },
  { label: "Non-religious, but spiritual", value: "spiritual_not_religious" },
  { label: "Prefer not to disclose", value: "na" },
  { label: "Religion that is not listed", value: "other" },
];

const genderOptions: Option[] = [
  { label: "CIS/Male", value: "cis_male" },
  { label: "CIS/Female", value: "cis_female" },
  { label: "Trans Male", value: "trans_male" },
  { label: "Trans Female", value: "trans_female" },
  { label: "Gender Fluid", value: "gender_fluid" },
  { label: "Prefer not to disclose", value: "na" },
];

const genderLabel = (v: string) =>
  genderOptions.find((o) => o.value === v)?.label ?? "Choose…";

const dietOptions: Option[] = [
  { label: "I generally try to eat healthy", value: "healthy" },
  { label: "I don't pay attention to my diet", value: "anything" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Pescatarian", value: "pescatarian" },
  { label: "Keto", value: "keto" },
  { label: "Paleo", value: "paleo" },
  { label: "DASH", value: "dash" },
  { label: "Mediterranean", value: "mediterranean" },
  { label: "Atkins", value: "atkins" },
];

const alcoholFrequencyOptions: Option[] = [
  { label: "Daily", value: "daily" },
  { label: "Multiple times a week", value: "multi_week" },
  { label: "Once a week", value: "once_week" },
  { label: "Once every few weeks", value: "few_weeks" },
  { label: "Several times a year, on occasion", value: "several_year" },
  { label: "I don't drink", value: "none" },
];

const drinksPerOccasionOptions: Option[] = [
  { label: "Less than 1", value: "lt1" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5 or more", value: "5plus" },
];

const substanceOptions: Option[] = [
  { label: "Nicotine", value: "nicotine" },
  { label: "Ecstasy/Molly/MDMA", value: "mdma" },
  { label: "Non-prescribed Xanax/other sedatives", value: "sedatives" },
  { label: "Cocaine", value: "cocaine" },
  { label: "Non-prescribed opioids/pain pills", value: "opioids" },
  { label: "LSD/other psychedelics", value: "psychedelics" },
  { label: "Meth", value: "meth" },
  { label: "Non-prescribed marijuana", value: "marijuana" },
  { label: "Heroin", value: "heroin" },
  { label: "Non-prescribed adderall", value: "adderall" },
  { label: "None of the above", value: "none_of_above" },
  { label: "Other", value: "other" },
];

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

const alcoholFrequencyLabel = (v: string) =>
  alcoholFrequencyOptions.find((o) => o.value === v)?.label ?? "Choose…";

const drinksPerOccasionLabel = (v: string) =>
  drinksPerOccasionOptions.find((o) => o.value === v)?.label ?? "Choose…";

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
    <div className={`space-y-6 ${dm_sans.className}`}>
      <StepTitle n={step + 1} title={title} />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            title={profile.isChild === true ? "Your Child’s Height" : "Height"}
            required
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={8}
                    step={1}
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 pr-8 text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., 5"
                    value={profile.height?.feet ?? ""}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        height: {
                          feet:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                          inches: p.height?.inches ?? null,
                        },
                      }))
                    }
                  />
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    ft
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={11}
                    step={1}
                    className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 pr-8 text-slate-900 placeholder:text-slate-400"
                    placeholder="e.g., 8"
                    value={profile.height?.inches ?? ""}
                    onChange={(e) =>
                      setProfile((p) => ({
                        ...p,
                        height: {
                          feet: p.height?.feet ?? null,
                          inches:
                            e.target.value === ""
                              ? null
                              : Number(e.target.value),
                        },
                      }))
                    }
                  />
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    in
                  </div>
                </div>
              </div>
            </div>
          </Field>

          <Field
            title={profile.isChild === true ? "Your Child’s Weight" : "Weight"}
            required
          >
            <div className="relative">
              <input
                type="number"
                min={0}
                step={1}
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 pr-12 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., 150"
                value={profile.weightLbs ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    weightLbs:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
              />
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                lbs
              </div>
            </div>
          </Field>
          <Field
            title={
              profile.isChild === true
                ? "Your Child’s Gender Identity"
                : "Gender Identity"
            }
            required
          >
            <Listbox
              value={profile.genderIdentity}
              onChange={(val: string) =>
                setProfile((p) => ({ ...p, genderIdentity: val }))
              }
            >
              <div className="relative">
                <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                  {profile.genderIdentity ? (
                    <span className="text-slate-900">
                      {genderLabel(profile.genderIdentity)}
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
                  {genderOptions.map((option) => (
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

          <Field
            title={
              profile.isChild === true
                ? "Your Child’s Sexual Identity/Orientation"
                : "Sexual Identity/Orientation"
            }
            required
          >
            <Listbox
              value={profile.sexualOrientation}
              onChange={(vals: Option[]) =>
                setProfile((p) => ({ ...p, sexualOrientation: vals }))
              }
              multiple
            >
              <div className="relative">
                <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                  {profile.sexualOrientation.length === 0 ? (
                    <span className="text-slate-400">Select one or more…</span>
                  ) : (
                    <span className="flex flex-wrap gap-1">
                      {profile.sexualOrientation.map((o) => (
                        <span
                          key={o.value}
                          className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                        >
                          {o.label}
                        </span>
                      ))}
                    </span>
                  )}
                  <ChevronDown
                    className="group pointer-events-none absolute top-3 right-2.5 size-4 fill-white/60"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                  {sexualOrientations.map((orientation) => (
                    <ListboxOption
                      key={orientation.value}
                      value={orientation}
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
                            {orientation.label}
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

          <Field
            required
            title={
              profile.isChild === true
                ? "What ethnic category best describes your child?"
                : "What ethnic category best describes you?"
            }
          >
            <Listbox
              value={profile.ethnicity}
              onChange={(vals: Option[]) =>
                setProfile((p) => ({ ...p, ethnicity: vals }))
              }
              multiple
            >
              <div className="relative">
                <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                  {profile.ethnicity.length === 0 ? (
                    <span className="text-slate-400">
                      Select all that apply…
                    </span>
                  ) : (
                    <span className="flex flex-wrap gap-1">
                      {profile.ethnicity.map((o) => (
                        <span
                          key={o.value}
                          className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                        >
                          {o.label}
                        </span>
                      ))}
                    </span>
                  )}
                  <ChevronDown
                    className="group pointer-events-none absolute top-3 right-2.5 size-4"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                  {ethnicityOptions.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option}
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

          <Field
            title={
              profile.isChild === true
                ? "Does your child practice a religion?"
                : "Do you practice a religion?"
            }
            required
          >
            <Listbox
              value={profile.religion}
              onChange={(vals: Option[]) =>
                setProfile((p) => ({ ...p, religion: vals }))
              }
              multiple
            >
              <div className="relative">
                <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                  {profile.religion.length === 0 ? (
                    <span className="text-slate-400">
                      Select all that apply…
                    </span>
                  ) : (
                    <span className="flex flex-wrap gap-1">
                      {profile.religion.map((o) => (
                        <span
                          key={o.value}
                          className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                        >
                          {o.label}
                        </span>
                      ))}
                    </span>
                  )}
                  <ChevronDown
                    className="group pointer-events-none absolute top-3 right-2.5 size-4"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                  {religionOptions.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option}
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

          <Field
            required
            title={
              profile.isChild === true
                ? "Your Child’s Preferred Pronouns"
                : "Preferred Pronouns"
            }
          >
            <Listbox
              value={profile.pronouns}
              onChange={(vals: Option[]) =>
                setProfile((p) => ({ ...p, pronouns: vals }))
              }
              multiple
            >
              <div className="relative">
                <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                  {profile.pronouns.length === 0 ? (
                    <span className="text-slate-400">
                      Select all that apply…
                    </span>
                  ) : (
                    <span className="flex flex-wrap gap-1">
                      {profile.pronouns.map((o) => (
                        <span
                          key={o.value}
                          className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                        >
                          {o.label}
                        </span>
                      ))}
                    </span>
                  )}
                  <ChevronDown
                    className="group pointer-events-none absolute top-3 right-2.5 size-4"
                    aria-hidden="true"
                  />
                </ListboxButton>

                <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                  {pronounOptions.map((option) => (
                    <ListboxOption
                      key={option.value}
                      value={option}
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
          <Field required title="Daily Screen Time">
            <div className="relative">
              <input
                type="number"
                min={0}
                max={8}
                step={1}
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 pr-16 text-slate-900 placeholder:text-slate-400"
                placeholder="e.g., 5"
                value={profile.dailyScreenTime ?? ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    dailyScreenTime:
                      e.target.value === "" ? null : Number(e.target.value),
                  }))
                }
              />
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                hours
              </div>
            </div>
          </Field>
          {!profile.isChild && (
            <>
              <Field title="Highest Degree" required>
                <Listbox
                  value={profile.highestDegree}
                  onChange={(val: string) =>
                    setProfile((p) => ({ ...p, highestDegree: val }))
                  }
                >
                  <div className="relative">
                    <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                      {profile.highestDegree ? (
                        <span className="text-slate-900">
                          {degreeLabel(profile.highestDegree)}
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
            </>
          )}
        </div>
        {!profile.isChild && (
          <div>
            <Field title={"Marital Status"} className="mt-6" required>
              <Likert
                label="Are you married?"
                value={profile.isMarried.toString()}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    isMarried: v === "true",
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>
            {profile.isMarried && (
              <Field className="mt-6">
                <Likert
                  label="How many times have you been married?"
                  value={profile.timesMarried.toString()}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      timesMarried: Number(v),
                    }))
                  }
                  options={[
                    { key: "1", label: "1" },
                    { key: "2", label: "2" },
                    { key: "3", label: "3" },
                    { key: "4", label: "4" },
                  ]}
                />
              </Field>
            )}
          </div>
        )}
        {!profile.isChild && (
          <>
            <Separator
              label={"Dietary/Substance Use"}
              className="md:col-span-2"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Field
                title="How often do you consume alcoholic beverages?"
                required
              >
                <Listbox
                  value={profile.alcoholFrequency}
                  onChange={(val: string) =>
                    setProfile((p) => ({ ...p, alcoholFrequency: val }))
                  }
                >
                  <div className="relative">
                    <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                      {profile.alcoholFrequency ? (
                        <span className="text-slate-900">
                          {alcoholFrequencyLabel(profile.alcoholFrequency)}
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
                      {alcoholFrequencyOptions.map((option) => (
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
              {profile.alcoholFrequency !== "none" && (
                <Field
                  title="When you do drink, how many drinks do you have?"
                  required
                >
                  <Listbox
                    value={profile.drinksPerOccasion}
                    onChange={(val: string) =>
                      setProfile((p) => ({ ...p, drinksPerOccasion: val }))
                    }
                  >
                    <div className="relative">
                      <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                        {profile.drinksPerOccasion ? (
                          <span className="text-slate-900">
                            {drinksPerOccasionLabel(profile.drinksPerOccasion)}
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
                        {drinksPerOccasionOptions.map((option) => (
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
              )}

              <Field
                required
                title="Which of these substances do you use frequently?"
              >
                <Listbox
                  value={profile.substancesUsed}
                  onChange={(vals: Option[]) =>
                    setProfile((p) => ({ ...p, substancesUsed: vals }))
                  }
                  multiple
                >
                  <div className="relative">
                    <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                      {profile.substancesUsed.length === 0 ? (
                        <span className="text-slate-400">
                          Select all that apply…
                        </span>
                      ) : (
                        <span className="flex flex-wrap gap-1">
                          {profile.substancesUsed.map((o) => (
                            <span
                              key={o.value}
                              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                            >
                              {o.label}
                            </span>
                          ))}
                        </span>
                      )}
                      <ChevronDown
                        className="group pointer-events-none absolute top-3 right-2.5 size-4"
                        aria-hidden="true"
                      />
                    </ListboxButton>

                    <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                      {substanceOptions.map((option) => (
                        <ListboxOption
                          key={option.value}
                          value={option}
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

              <Field title="Diet Type" required>
                <Listbox
                  value={profile.dietType}
                  onChange={(vals: Option[]) =>
                    setProfile((p) => ({ ...p, dietType: vals }))
                  }
                  multiple
                >
                  <div className="relative">
                    <ListboxButton className="w-full min-h-[42px] relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900">
                      {profile.dietType.length === 0 ? (
                        <span className="text-slate-400">
                          Select all that apply…
                        </span>
                      ) : (
                        <span className="flex flex-wrap gap-1">
                          {profile.dietType.map((o) => (
                            <span
                              key={o.value}
                              className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-700"
                            >
                              {o.label}
                            </span>
                          ))}
                        </span>
                      )}
                      <ChevronDown
                        className="group pointer-events-none absolute top-3 right-2.5 size-4"
                        aria-hidden="true"
                      />
                    </ListboxButton>

                    <ListboxOptions className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none">
                      {dietOptions.map((option) => (
                        <ListboxOption
                          key={option.value}
                          value={option}
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
        {!profile.isChild && (
          <>
            <Separator label={"Current Life"} className="md:col-span-2" />
            <Field title={"Employment Status"} required className="mb-6">
              <Likert
                label="Are you currently employed?"
                value={profile.isEmployed.toString()}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    isEmployed: v === "true",
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              ></Likert>
            </Field>
            {profile.isEmployed && (
              <>
                <Field
                  title="Tell us about your current employment, how long you've been there etc."
                  required
                >
                  <TextAreaWithEncouragement
                    rows={2}
                    placeholder="Share here in your own words…"
                    value={profile.jobDetails}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        jobDetails: next,
                      }))
                    }
                    recommendedWords={40}
                  />
                </Field>
              </>
            )}
            {!profile.isEmployed && !profile.isChild && (
              <>
                <Field title="Why are you currently unemployed?" required>
                  <TextAreaWithEncouragement
                    rows={2}
                    placeholder="Share here in your own words…"
                    value={profile.jobDetails}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        jobDetails: next,
                      }))
                    }
                    recommendedWords={15}
                  />
                </Field>
              </>
            )}
            <Field
              title="What are your hobbies and interests?"
              required
              className="mt-6"
            >
              <TextAreaWithEncouragement
                rows={2}
                placeholder="Share here in your own words"
                value={profile.hobbies || ""}
                onChangeText={(next) =>
                  setProfile((p) => ({
                    ...p,
                    hobbies: next,
                  }))
                }
                recommendedWords={15}
              />
            </Field>
            <Field title={"Sexual Activity"} className="mt-6" required>
              <Likert
                label="Are you currently sexually active, or will be soon?"
                value={profile.isSexuallyActive.toString()}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    isSexuallyActive: v === "true",
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>
            {profile.isSexuallyActive && (
              <Field className="mt-6">
                <Likert
                  label={
                    <>
                      <b>In the past year</b>, how many different sexual
                      partners have you had?
                    </>
                  }
                  value={profile.sexualPartners.toString()}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      sexualPartners: String(v),
                    }))
                  }
                  options={[
                    { key: "1", label: "1" },
                    { key: "2-4", label: "2 to 4" },
                    { key: "5-9", label: "5 to 9" },
                    { key: "10+", label: "10+" },
                  ]}
                />
              </Field>
            )}
            <Field required title="Access to a firearm" className="mt-6">
              <Likert
                label="Do you have access to a firearm?"
                value={profile.hasFirearm.toString()}
                onChange={(v) =>
                  setProfile((p) => ({
                    ...p,
                    hasFirearm: v === "true",
                  }))
                }
                options={[
                  { key: "true", label: "Yes" },
                  { key: "false", label: "No" },
                ]}
              />
            </Field>
          </>
        )}

        {/* School Info (Child only) */}
        {profile.isChild === true && (
          <>
            <Separator label="School Info" className="md:col-span-2 mt-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Field title="Your Child’s School Name" required>
                <input
                  className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                  placeholder="P.S. 321 William Penn"
                  value={profile.schoolInfo?.schoolName ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        schoolName: e.target.value,
                      },
                    }))
                  }
                />
              </Field>

              <Field title="School Phone Number" required>
                <input
                  className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                  placeholder="e.g., 123-456-7890"
                  value={profile.schoolInfo?.schoolPhoneNumber ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        schoolPhoneNumber: e.target.value,
                      },
                    }))
                  }
                />
              </Field>

              <Field title="Years at Current School" required>
                <input
                  type="number"
                  min={0}
                  className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                  placeholder="e.g., 3"
                  value={profile.schoolInfo?.yearsAtSchool ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        yearsAtSchool:
                          e.target.value === "" ? null : Number(e.target.value),
                      },
                    }))
                  }
                />
              </Field>
              <Field title="Current Grade" required>
                <input
                  className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                  placeholder="e.g., 6th grade"
                  value={profile.schoolInfo?.grade ?? ""}
                  onChange={(e) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        grade: e.target.value,
                      },
                    }))
                  }
                />
              </Field>
            </div>
            <div className="mt-4 space-y-4">
              <Field title="Has your child ever repeated a grade?" required>
                <Likert
                  label=""
                  value={(
                    profile.schoolInfo?.hasRepeatedGrade ?? false
                  ).toString()}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        hasRepeatedGrade: v === "true",
                        repeatedGradeDetail:
                          v === "true"
                            ? (p.schoolInfo?.repeatedGradeDetail ?? "")
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
              {profile.schoolInfo?.hasRepeatedGrade === true && (
                <Field
                  title="Please share details (grade, reason, timing)"
                  required
                >
                  <TextAreaWithEncouragement
                    rows={2}
                    placeholder="Share here in your own words…"
                    value={profile.schoolInfo?.repeatedGradeDetail ?? ""}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        schoolInfo: {
                          ...(p.schoolInfo ?? {}),
                          repeatedGradeDetail: next,
                        },
                      }))
                    }
                    recommendedWords={15}
                  />
                </Field>
              )}
              <Field title="Is your child in any special classes?" required>
                <Likert
                  label=""
                  value={(
                    profile.schoolInfo?.hasSpecialClasses ?? false
                  ).toString()}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        hasSpecialClasses: v === "true",
                        specialClassesDetail:
                          v === "true"
                            ? (p.schoolInfo?.specialClassesDetail ?? "")
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
              {profile.schoolInfo?.hasSpecialClasses === true && (
                <Field
                  title="Which special or resource classes does your child attend?"
                  required
                >
                  <TextAreaWithEncouragement
                    rows={2}
                    placeholder="Share here in your own words…"
                    value={profile.schoolInfo?.specialClassesDetail ?? ""}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        schoolInfo: {
                          ...(p.schoolInfo ?? {}),
                          specialClassesDetail: next,
                        },
                      }))
                    }
                    recommendedWords={15}
                  />
                </Field>
              )}
              <Field title="Does your child receive special services?" required>
                <Likert
                  label=""
                  value={(
                    profile.schoolInfo?.hasSpecialServices ?? false
                  ).toString()}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        hasSpecialServices: v === "true",
                        specialServicesDetail:
                          v === "true"
                            ? (p.schoolInfo?.specialServicesDetail ?? "")
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
              {profile.schoolInfo?.hasSpecialServices === true && (
                <Field
                  title="Please share more about the special services."
                  required
                >
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="Share here in your own words…"
                    value={profile.schoolInfo?.specialServicesDetail ?? ""}
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        schoolInfo: {
                          ...(p.schoolInfo ?? {}),
                          specialServicesDetail: next,
                        },
                      }))
                    }
                    recommendedWords={20}
                  />
                </Field>
              )}
              <Field
                required
                title="Can you tell us little bit about your child's academic grades?"
              >
                <TextAreaWithEncouragement
                  rows={2}
                  placeholder="e.g., Mostly A’s and B’s; recent decline in math"
                  value={profile.schoolInfo?.academicGrades ?? ""}
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      schoolInfo: {
                        ...(p.schoolInfo ?? {}),
                        academicGrades: next,
                      },
                    }))
                  }
                  recommendedWords={15}
                />
              </Field>
            </div>
          </>
        )}
        {/* Relationships & Abilities (Child only) */}
        {profile.isChild === true && (
          <>
            <Separator
              label="Relationships and Abilities"
              className="md:col-span-2 mt-8"
            />
            <div className="space-y-4 mt-4">
              {/* Q11 */}
              <Field
                title="What are your child's relationships like with teachers and peers?"
                required
              >
                <TextAreaWithEncouragement
                  rows={4}
                  placeholder="e.g., Gets along well with most classmates; a few conflicts at recess; positive relationship with homeroom teacher."
                  value={
                    profile.relationshipsAbilities?.teachersPeersRelationship ??
                    ""
                  }
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        teachersPeersRelationship: next,
                      },
                    }))
                  }
                  recommendedWords={40}
                />
              </Field>

              <Field
                required
                className="mt-4"
                title="How would you rate your child's ability to work independently?"
              >
                <Likert
                  value={
                    profile.relationshipsAbilities
                      ?.childAbilityWorkIndependently ?? ""
                  }
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        childAbilityWorkIndependently: v as
                          | "good"
                          | "average"
                          | "poor"
                          | "",
                      },
                    }))
                  }
                  options={[
                    { key: "good", label: "Good" },
                    { key: "average", label: "Average" },
                    { key: "poor", label: "Poor" },
                  ]}
                />
              </Field>

              <Field
                required
                className="mt-4"
                title="How would you rate your child's ability to organize themselves?"
              >
                <Likert
                  value={
                    profile.relationshipsAbilities?.childAbilityOrganizeSelf ??
                    ""
                  }
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        childAbilityOrganizeSelf: v as
                          | "good"
                          | "average"
                          | "poor"
                          | "",
                      },
                    }))
                  }
                  options={[
                    { key: "good", label: "Good" },
                    { key: "average", label: "Average" },
                    { key: "poor", label: "Poor" },
                  ]}
                />
              </Field>

              <Field
                required
                className="mt-4"
                title="How would you rate your child's school attendance?"
              >
                <Likert
                  value={profile.relationshipsAbilities?.childAttendance ?? ""}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        childAttendance: v as "good" | "average" | "poor" | "",
                      },
                    }))
                  }
                  options={[
                    { key: "good", label: "Good" },
                    { key: "average", label: "Average" },
                    { key: "poor", label: "Poor" },
                  ]}
                />
              </Field>

              {/* Q13 */}
              <Field
                title="Has your child ever had truancy proceedings? (gone to court for truancy)"
                required
              >
                <Likert
                  label=""
                  value={(
                    profile.relationshipsAbilities?.hadTruancyProceedings ??
                    false
                  ).toString()}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        hadTruancyProceedings: v === "true",
                        truancyProceedingsDetail:
                          v === "true"
                            ? (p.relationshipsAbilities
                                ?.truancyProceedingsDetail ?? "")
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

              {/* Q14 (conditional) */}
              {profile.relationshipsAbilities?.hadTruancyProceedings ===
                true && (
                <Field
                  title="Please share more about the truancy proceedings."
                  required
                >
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="e.g., Date, school, court outcome, attendance plan, etc."
                    value={
                      profile.relationshipsAbilities
                        ?.truancyProceedingsDetail ?? ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        relationshipsAbilities: {
                          ...(p.relationshipsAbilities ?? {}),
                          truancyProceedingsDetail: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              )}

              {/* Q15 */}
              <Field
                title="Has your child received counseling at school?"
                required
              >
                <Likert
                  label=""
                  value={(
                    profile.relationshipsAbilities?.receivedSchoolCounseling ??
                    false
                  ).toString()}
                  onChange={(v) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        receivedSchoolCounseling: v === "true",
                        schoolCounselingDetail:
                          v === "true"
                            ? (p.relationshipsAbilities
                                ?.schoolCounselingDetail ?? "")
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

              {/* Q16 (conditional) */}
              {profile.relationshipsAbilities?.receivedSchoolCounseling ===
                true && (
                <Field
                  title="Please share more about the counseling received at school."
                  required
                >
                  <TextAreaWithEncouragement
                    rows={3}
                    placeholder="e.g., Frequency, provider (school counselor, social worker), focus, outcomes."
                    value={
                      profile.relationshipsAbilities?.schoolCounselingDetail ??
                      ""
                    }
                    onChangeText={(next) =>
                      setProfile((p) => ({
                        ...p,
                        relationshipsAbilities: {
                          ...(p.relationshipsAbilities ?? {}),
                          schoolCounselingDetail: next,
                        },
                      }))
                    }
                    recommendedWords={30}
                  />
                </Field>
              )}

              {/* Q17 */}
              <Field
                title="Describe your child's activities, interests and strengths:"
                required
              >
                <TextAreaWithEncouragement
                  rows={3}
                  placeholder="e.g., Soccer, drawing, robotics; strong memory; leadership; persistence."
                  value={
                    profile.relationshipsAbilities
                      ?.activitiesInterestsStrengths ?? ""
                  }
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        activitiesInterestsStrengths: next,
                      },
                    }))
                  }
                  recommendedWords={30}
                />
              </Field>

              {/* Q18 */}
              <Field title="Please describe any other concerns you or your child has:">
                <TextAreaWithEncouragement
                  rows={3}
                  placeholder="Anything else you'd like us to know."
                  value={profile.relationshipsAbilities?.otherConcerns ?? ""}
                  onChangeText={(next) =>
                    setProfile((p) => ({
                      ...p,
                      relationshipsAbilities: {
                        ...(p.relationshipsAbilities ?? {}),
                        otherConcerns: next,
                      },
                    }))
                  }
                  recommendedWords={25}
                />
              </Field>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

{
}
