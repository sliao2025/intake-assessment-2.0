"use client";

import React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Likert from "../primitives/Likert";
import Separator from "../primitives/Separator";
import VoiceRecorder from "../VoiceRecorder";
import MultiSelectGroup from "../primitives/MultiSelectGroup";
import type { Profile } from "../../lib/types/types";

type Props = {
  title: string;
  step: number;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
};

export default function StorySection({
  title,
  step,
  profile,
  setProfile,
}: Props) {
  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title="Your Story" />
      <Field
        title={
          <>
            <b>Tell us the story</b> of how you got here, why are you asking for
            help today?
          </>
        }
        label={
          <>
            <div>
              <i>Please describe the following:</i>
            </div>
            <ul className="list-disc pl-5 mt-1">
              <i>
                <li>(A) Onset and precipitating events</li>
              </i>
              <i>
                <li>(B) Periods when symptoms were better or worse</li>
              </i>
              <i>
                <li>(C) How symptoms have changed over time</li>
              </i>
            </ul>
          </>
        }
        required
      >
        <textarea
          rows={6}
          className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
          placeholder="Share here in your own words…"
          value={profile.storyNarrative?.text || ""}
          onChange={(e) =>
            setProfile((p) => ({
              ...p,
              storyNarrative: { ...p.storyNarrative, text: e.target.value },
            }))
          }
        />
      </Field>

      {/* <VoiceRecorder
        audioState={profile.storyNarrative?.audio?.url || null}
        onAttach={(url) =>
          setProfile((p) => ({
            ...p,
            storyNarrative: {
              ...p.storyNarrative,
              audio: url ? { url } : undefined,
            },
          }))
        }
      /> */}

      <Separator label="Your Goals" />
      <Field
        title={
          <>
            Please use this space to <b>elaborate</b> on your mental health
            treatment goals.
          </>
        }
        label={
          <>
            <div>
              <i>For Example:</i>
              <ul className="list-disc pl-5 mt-1">
                <i>
                  <li>Your primary reason for reaching out</li>
                </i>
                <i>
                  <li>Symptoms and/or issues you have identified</li>
                </i>
                <i>
                  <li>
                    How long you've experienced any symptoms and how they may
                    have changed over time
                  </li>
                </i>
              </ul>
            </div>
          </>
        }
        required
      >
        <textarea
          rows={6}
          className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
          placeholder="Share here in your own words…"
          value={profile.goals?.text || ""}
          onChange={(e) =>
            setProfile((p) => ({
              ...p,
              goals: { ...p.goals, text: e.target.value },
            }))
          }
        />
      </Field>

      {/* <VoiceRecorder
        audioState={profile.goals?.audio?.url || null}
        onAttach={(url) =>
          setProfile((p) => ({
            ...p,
            goals: {
              ...p.goals,
              audio: url ? { url } : undefined,
            },
          }))
        }
      /> */}
      <Separator label="Living Situation" />
      <Field
        title={<>Please describe your living situation.</>}
        label={
          <div>
            <i>
              Include who you live with, neighborhood safety, access to
              resources, and environmental stressors
            </i>
          </div>
        }
        required
      >
        <textarea
          rows={6}
          className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
          placeholder="Share here in your own words…"
          value={profile.livingSituation?.text || ""}
          onChange={(e) =>
            setProfile((p) => ({
              ...p,
              livingSituation: { ...p.livingSituation, text: e.target.value },
            }))
          }
        />
      </Field>
      {/* <VoiceRecorder
        audioState={profile.livingSituation?.audio?.url || null}
        onAttach={(url) =>
          setProfile((p) => ({
            ...p,
            livingSituation: {
              ...p.livingSituation,
              audio: url ? { url } : undefined,
            },
          }))
        }
      /> */}
      <Separator label="Culture & Context (optional)" />
      <Field
        title={
          <>
            What role does culture (religion, ethnicity, nationality,
            spirituality) play in your life? <i>(optional)</i>
          </>
        }
      >
        <textarea
          rows={6}
          className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
          placeholder="Share here in your own words…"
          value={profile.cultureContext?.text || ""}
          onChange={(e) =>
            setProfile((p) => ({
              ...p,
              cultureContext: { ...p.cultureContext, text: e.target.value },
            }))
          }
        />
      </Field>

      {/* <VoiceRecorder
        audioState={profile.cultureContext?.audio?.url || null}
        onAttach={(url) =>
          setProfile((p) => ({
            ...p,
            cultureContext: {
              ...p.cultureContext,
              audio: url ? { url } : undefined,
            },
          }))
        }
      /> */}

      <Separator label="Previous Treatment" />
      <Field title={"Previous Mental Health Treatment"} required>
        <Likert
          label="Are you currently or have you previously received mental health treatment?"
          value={profile.hasReceivedMentalHealthTreatment.toString()}
          onChange={(v) =>
            setProfile((p) => ({
              ...p,
              hasReceivedMentalHealthTreatment: v === "true",
            }))
          }
          options={[
            { key: "true", label: "Yes" },
            { key: "false", label: "No" },
          ]}
        />
      </Field>

      {profile.hasReceivedMentalHealthTreatment && (
        <>
          <Field title={"How long are/were you in therapy?"} required>
            <Likert
              value={profile.therapyDuration}
              onChange={(v) =>
                setProfile((p) => ({ ...p, therapyDuration: String(v) }))
              }
              options={[
                { key: "Less than 6 months", label: "Less than 6 months" },
                { key: "6-12 months", label: "6-12 months" },
                { key: "1-2 years", label: "1-2 years" },
                { key: "2-3 years", label: "2-3 years" },
                { key: "4-5 years", label: "4-5 years" },
                { key: "5+ years", label: "5+ years" },
              ]}
            />
          </Field>

          <Field title={"What was the diagnosis?"} required>
            <input
              className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
              placeholder="e.g., Generalized Anxiety Disorder"
              value={profile.previousDiagnosis || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  previousDiagnosis: e.target.value,
                }))
              }
            />
          </Field>

          <Field
            title={
              <>
                Please briefly describe any previous mental health treatment,
                what you worked on, and how you felt it went.
              </>
            }
            required
          >
            <textarea
              rows={4}
              className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
              placeholder="Share here in your own words…"
              value={profile.prevTreatmentSummary?.text || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  prevTreatmentSummary: {
                    ...p.prevTreatmentSummary,
                    text: e.target.value,
                  },
                }))
              }
            />
          </Field>

          {/* <VoiceRecorder
            audioState={profile.prevTreatmentSummary?.audio?.url || null}
            onAttach={(url) =>
              setProfile((p) => ({
                ...p,
                prevTreatmentSummary: {
                  ...p.prevTreatmentSummary,
                  audio: url ? { url } : undefined,
                },
              }))
            }
          /> */}
        </>
      )}
      <Separator label="Growing Up & Family History" />

      <Field title="Have any family members experienced any of the following?">
        <MultiSelectGroup
          options={[
            { key: "depression", label: "Depression" },
            { key: "bipolar", label: "Mania / Bipolar Disorder" },
            {
              key: "suicidality",
              label: "Suicidal thoughts / urges / behaviors",
            },
            { key: "anxiety", label: "Anxiety" },
            { key: "panic", label: "Panic" },
            { key: "ocd", label: "Obsessions / Compulsions" },
            { key: "rituals", label: "Rituals" },
            { key: "movement_disorders", label: "Movement Disorders" },
            { key: "tics", label: "Tics" },
            {
              key: "unusual_noises",
              label: "Unusual noises / vocalizations",
            },
            { key: "eating_disorder", label: "Eating disorder" },
            { key: "learning_disability", label: "Learning disability" },
            { key: "adhd", label: "ADD / ADHD" },
            {
              key: "intellectual_disability",
              label: "Intellectual disability",
            },
            { key: "coordination_problems", label: "Coordination problems" },
            { key: "sleep_disorder", label: "Sleep disorder" },
            { key: "alcohol_use_disorder", label: "Alcohol use disorder" },
            { key: "psychosis", label: "Psychosis" },
            { key: "legal_problems", label: "Legal problems" },
            {
              key: "mh_hospitalization",
              label: "Mental health hospitalization",
            },
            {
              key: "autism_pdd",
              label:
                "Autism / Asperger's Disorder / Pervasive Developmental Disorder",
            },
            { key: "none", label: "🚫 None of the above", none: true },
          ]}
          values={profile.familyHistory ? profile.familyHistory : []}
          onChange={(next) =>
            setProfile((p) => ({ ...p, familyHistory: next }))
          }
        />
      </Field>
      {!profile.familyHistory.includes("none") &&
        profile.familyHistory.length > 0 && (
          <>
            <Field
              title={<>Please elaborate on this family history.</>}
              required
            >
              <textarea
                rows={4}
                className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
                placeholder="Share here in your own words…"
                value={profile.familyHistoryElaboration?.text || ""}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    familyHistoryElaboration: {
                      ...p.familyHistoryElaboration,
                      text: e.target.value,
                    },
                  }))
                }
              />
            </Field>
            {/* <VoiceRecorder
            audioState={profile.familyHistoryElaboration?.audio?.url || null}
            onAttach={(url) =>
              setProfile((p) => ({
                ...p,
                familyHistoryElaboration: {
                  ...p.familyHistoryElaboration,
                  audio: url ? { url } : undefined,
                },
              }))
            }
          /> */}
          </>
        )}
      <Field
        title={
          <>
            Describe the environment(s) in which you grew up (# of places,
            locations, etc.).
          </>
        }
        required
      >
        <textarea
          rows={4}
          className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
          placeholder="Share here in your own words…"
          value={profile.upbringingEnvironments?.text || ""}
          onChange={(e) =>
            setProfile((p) => ({
              ...p,
              upbringingEnvironments: {
                ...p.upbringingEnvironments,
                text: e.target.value,
              },
            }))
          }
        />
      </Field>
      {/* <VoiceRecorder
        audioState={profile.upbringingEnvironments?.audio?.url || null}
        onAttach={(url) =>
          setProfile((p) => ({
            ...p,
            upbringingEnvironments: {
              ...p.upbringingEnvironments,
              audio: url ? { url } : undefined,
            },
          }))
        }
      /> */}
      <Field
        title={<>Who did you grow up with?</>}
        label={
          <>
            Please share as much information as you can about the people that
            you grew up around (include ages and relationship to you)
          </>
        }
        required
      >
        <textarea
          rows={4}
          className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
          placeholder={
            "e.g. Mom, 60 years old | Dad, 61 years old | Fred, 12 years old, my cousin"
          }
          value={profile.upbringingWhoWith?.text || ""}
          onChange={(e) =>
            setProfile((p) => ({
              ...p,
              upbringingWhoWith: {
                ...p.upbringingWhoWith,
                text: e.target.value,
              },
            }))
          }
        />
      </Field>
      {/* <VoiceRecorder
        audioState={profile.upbringingWhoWith?.audio?.url || null}
        onAttach={(url) =>
          setProfile((p) => ({
            ...p,
            upbringingWhoWith: {
              ...p.upbringingWhoWith,
              audio: url ? { url } : undefined,
            },
          }))
        }
      /> */}
      <Field title={<>Childhood Questions</>} required>
        <Likert
          label="Do you think of your childhood in a positive way?"
          value={profile.likedChildhood.toString()}
          onChange={(v) =>
            setProfile((p) => ({
              ...p,
              likedChildhood: v === "true",
            }))
          }
          options={[
            { key: "true", label: "Yes" },
            { key: "false", label: "No" },
          ]}
        />
      </Field>
      {profile.likedChildhood === false && (
        <>
          <Field
            title={
              <>
                Please tell us why you did not experience your childhood in a
                positive way
              </>
            }
            required
          >
            <textarea
              rows={4}
              className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
              placeholder="Share here in your own words…"
              value={profile.childhoodNegativeReason?.text || ""}
              onChange={(e) =>
                setProfile((p) => ({
                  ...p,
                  childhoodNegativeReason: {
                    ...p.childhoodNegativeReason,
                    text: e.target.value,
                  },
                }))
              }
            />
          </Field>
          {/* <VoiceRecorder
            audioState={profile.childhoodNegativeReason?.audio?.url || null}
            onAttach={(url) =>
              setProfile((p) => ({
                ...p,
                childhoodNegativeReason: {
                  ...p.childhoodNegativeReason,
                  audio: url ? { url } : undefined,
                },
              }))
            }
          /> */}
        </>
      )}
    </div>
  );
}
