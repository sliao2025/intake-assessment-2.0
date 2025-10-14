"use client";

import React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Likert from "../primitives/Likert";
import Separator from "../primitives/Separator";
import VoiceRecorder from "../VoiceRecorder";
import MultiSelectGroup from "../primitives/MultiSelectGroup";
import type { Profile } from "../../lib/types/types";

function TextAreaWithEncouragement({
  value,
  onChangeText,
  placeholder,
  rows = 6,
  className = "",
  recommendedWords = 60,
  lowPct = 0.33,
  mediumPct = 0.66,
}: {
  value: string;
  onChangeText: (next: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  recommendedWords?: number;
  lowPct?: number;
  mediumPct?: number;
}) {
  const wordCount = (text: string) =>
    (text || "").trim().split(/\s+/).filter(Boolean).length;

  const words = wordCount(value);
  const pct = Math.min(100, Math.round((words / recommendedWords) * 100));
  const pctFrac = pct / 100;

  const isLow = pctFrac <= lowPct;
  const isMedium = pctFrac > lowPct && pctFrac <= mediumPct;

  const textColor = isLow
    ? "text-red-600"
    : isMedium
      ? "text-amber-600"
      : "text-slate-500";
  const barColor = isLow
    ? "bg-red-500"
    : isMedium
      ? "bg-amber-500"
      : "bg-emerald-600";

  return (
    <div>
      <textarea
        rows={rows}
        className={`w-full rounded-2xl bg-white border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <div className="mt-2">
        <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
          <div className={`h-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <div className={`mt-1 text-xs ${textColor}`}>
          {words === 0
            ? `We recommend about ${recommendedWords}+ words to give your clinician helpful context.`
            : `You're at ${words} word${words === 1 ? "" : "s"} (~${pct}% of the suggested detail). ${
                words < recommendedWords
                  ? "Adding a bit more can help us understand your story."
                  : "Great detail—thank you!"
              }`}
        </div>
      </div>
    </div>
  );
}

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
        <TextAreaWithEncouragement
          rows={6}
          placeholder="Share here in your own words…"
          value={profile.storyNarrative?.text || ""}
          onChangeText={(next) =>
            setProfile((p) => ({
              ...p,
              storyNarrative: { ...p.storyNarrative, text: next },
            }))
          }
          recommendedWords={75}
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
        <TextAreaWithEncouragement
          rows={6}
          placeholder="Share here in your own words…"
          value={profile.goals?.text || ""}
          onChangeText={(next) =>
            setProfile((p) => ({
              ...p,
              goals: { ...p.goals, text: next },
            }))
          }
          recommendedWords={40}
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
        <TextAreaWithEncouragement
          rows={6}
          placeholder="Share here in your own words…"
          value={profile.livingSituation?.text || ""}
          onChangeText={(next) =>
            setProfile((p) => ({
              ...p,
              livingSituation: { ...p.livingSituation, text: next },
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
        <TextAreaWithEncouragement
          rows={6}
          placeholder="Share here in your own words…"
          value={profile.cultureContext?.text || ""}
          onChangeText={(next) =>
            setProfile((p) => ({
              ...p,
              cultureContext: { ...p.cultureContext, text: next },
            }))
          }
          recommendedWords={40}
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
            <TextAreaWithEncouragement
              rows={4}
              placeholder="Share here in your own words…"
              value={profile.prevTreatmentSummary?.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  prevTreatmentSummary: {
                    ...p.prevTreatmentSummary,
                    text: next,
                  },
                }))
              }
              recommendedWords={50}
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
              <TextAreaWithEncouragement
                rows={4}
                placeholder="Share here in your own words…"
                value={profile.familyHistoryElaboration?.text || ""}
                onChangeText={(next) =>
                  setProfile((p) => ({
                    ...p,
                    familyHistoryElaboration: {
                      ...p.familyHistoryElaboration,
                      text: next,
                    },
                  }))
                }
                recommendedWords={40}
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
        <TextAreaWithEncouragement
          rows={4}
          placeholder="Share here in your own words…"
          value={profile.upbringingEnvironments?.text || ""}
          onChangeText={(next) =>
            setProfile((p) => ({
              ...p,
              upbringingEnvironments: {
                ...p.upbringingEnvironments,
                text: next,
              },
            }))
          }
          recommendedWords={50}
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
        <TextAreaWithEncouragement
          rows={4}
          placeholder="e.g. Mom, 60 years old | Dad, 61 years old | Fred, 12 years old, my cousin"
          value={profile.upbringingWhoWith?.text || ""}
          onChangeText={(next) =>
            setProfile((p) => ({
              ...p,
              upbringingWhoWith: {
                ...p.upbringingWhoWith,
                text: next,
              },
            }))
          }
          recommendedWords={10}
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
            <TextAreaWithEncouragement
              rows={4}
              placeholder="Share here in your own words…"
              value={profile.childhoodNegativeReason?.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  childhoodNegativeReason: {
                    ...p.childhoodNegativeReason,
                    text: next,
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
