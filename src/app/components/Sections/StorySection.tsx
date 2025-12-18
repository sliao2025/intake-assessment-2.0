"use client";

import React, { useRef, useState } from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Likert from "../primitives/Likert";
import Separator from "../primitives/Separator";
import VoiceRecorder, { VoiceRecorderHandle } from "../VoiceRecorder";
import MultiSelectGroup from "../primitives/MultiSelectGroup";
import type { Profile } from "../../lib/types/types";
import TextAreaWithEncouragement from "../primitives/TextAreawithEncouragement";
import VoicePreferredField from "../primitives/VoicePreferredField";
import { Info } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

type Props = {
  title: string;
  step: number;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  voiceRecorderRefs?: React.MutableRefObject<{
    [key: string]: VoiceRecorderHandle | null;
  }>;
};

export default function StorySection({
  title,
  step,
  profile,
  setProfile,
  voiceRecorderRefs,
}: Props) {
  // Function to save a specific profile state to SQL
  const saveProfileToSQL = async (profileToSave: typeof profile) => {
    try {
      console.log("[StorySection] Saving profile to SQL...");
      const response = await fetch("/api/profile/create", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileToSave),
      });
      if (!response.ok) {
        throw new Error(`SQL save failed: ${response.status}`);
      }
      console.log("[StorySection] Profile saved to SQL successfully");
    } catch (err) {
      console.error("[StorySection] Failed to save profile to SQL:", err);
      throw err;
    }
  };

  return (
    <div className={`space-y-6 ${dm_sans.className}`}>
      <StepTitle n={step + 1} title={title} />
      <Field
        title={
          profile.isChild ? (
            <>
              <b>Tell us the story</b> of how your child got here, why are you
              seeking help for them today?
            </>
          ) : (
            <>
              <b>Tell us the story</b> of how you got here, why are you asking
              for help today?
            </>
          )
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
        <VoicePreferredField
          hasTextValue={!!profile.storyNarrative?.text}
          voiceRecorder={
            <VoiceRecorder
              ref={(el) => {
                if (voiceRecorderRefs) {
                  voiceRecorderRefs.current.storyNarrative = el;
                }
              }}
              fieldName="storyNarrative"
              label="Record your answer"
              audioState={profile.storyNarrative?.audio?.url || null}
              fileName={profile.storyNarrative?.audio?.fileName || null}
              onAttach={async (data) => {
                console.log(
                  "[StorySection] storyNarrative onAttach called with data:",
                  data
                );

                // ✅ Update local state immediately for UI responsiveness
                setProfile((p) => ({
                  ...p,
                  storyNarrative: {
                    text: p.storyNarrative?.text || "",
                    ...(data && {
                      audio: {
                        url: data.url,
                        fileName: data.fileName,
                        uploadedAt: data.uploadedAt,
                        // Preserve existing transcription fields if they exist
                        ...(p.storyNarrative?.audio?.transcription && {
                          transcription: p.storyNarrative.audio.transcription,
                          chunks: p.storyNarrative.audio.chunks,
                          transcribedAt: p.storyNarrative.audio.transcribedAt,
                        }),
                      },
                    }),
                  },
                }));

                // ✅ Save ONLY this field to DB using field-level update (prevents race conditions)
                try {
                  const response = await fetch("/api/profile/update-field", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fieldName: "storyNarrative",
                      fieldValue: {
                        text: profile.storyNarrative?.text || "",
                        ...(data && {
                          audio: {
                            url: data.url,
                            fileName: data.fileName,
                            uploadedAt: data.uploadedAt,
                          },
                        }),
                      },
                    }),
                  });

                  if (!response.ok) {
                    console.error(
                      "[StorySection] Failed to save storyNarrative to DB"
                    );
                  } else {
                    const resData = await response.json();
                    if (resData.profile?.updatedAt) {
                      setProfile((curr) => ({
                        ...curr,
                        updatedAt: resData.profile.updatedAt,
                      }));
                    }
                    console.log(
                      "[StorySection] Successfully saved storyNarrative to DB"
                    );
                  }
                } catch (err) {
                  console.error(
                    "[StorySection] Error saving storyNarrative to DB:",
                    err
                  );
                }
              }}
            />
          }
          textArea={
            <TextAreaWithEncouragement
              rows={6}
              placeholder="Or type here in your own words…"
              value={profile.storyNarrative?.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  storyNarrative: { ...p.storyNarrative, text: next },
                }))
              }
              recommendedWords={75}
            />
          }
        />
      </Field>

      <Separator label="Your Goals" />
      <Field
        title={
          profile.isChild ? (
            <>
              Please use this space to <b>elaborate</b> on your child's mental
              health treatment goals.
            </>
          ) : (
            <>
              Please use this space to <b>elaborate</b> on your mental health
              treatment goals.
            </>
          )
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
        <VoicePreferredField
          hasTextValue={!!profile.goals?.text}
          voiceRecorder={
            <VoiceRecorder
              ref={(el) => {
                if (voiceRecorderRefs) {
                  voiceRecorderRefs.current.goals = el;
                }
              }}
              fieldName="goals"
              label="Record your answer"
              audioState={profile.goals?.audio?.url || null}
              fileName={profile.goals?.audio?.fileName || null}
              onAttach={async (data) => {
                console.log(
                  "[StorySection] goals onAttach called with data:",
                  data
                );

                // ✅ Update local state immediately
                setProfile((p) => ({
                  ...p,
                  goals: {
                    text: p.goals?.text || "",
                    ...(data && {
                      audio: {
                        url: data.url,
                        fileName: data.fileName,
                        uploadedAt: data.uploadedAt,
                        ...(p.goals?.audio?.transcription && {
                          transcription: p.goals.audio.transcription,
                          chunks: p.goals.audio.chunks,
                          transcribedAt: p.goals.audio.transcribedAt,
                        }),
                      },
                    }),
                  },
                }));

                // ✅ Save ONLY this field to DB
                try {
                  const response = await fetch("/api/profile/update-field", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fieldName: "goals",
                      fieldValue: {
                        text: profile.goals?.text || "",
                        ...(data && {
                          audio: {
                            url: data.url,
                            fileName: data.fileName,
                            uploadedAt: data.uploadedAt,
                          },
                        }),
                      },
                    }),
                  });

                  if (!response.ok) {
                    console.error("[StorySection] Failed to save goals to DB");
                  } else {
                    const resData = await response.json();
                    if (resData.profile?.updatedAt) {
                      setProfile((curr) => ({
                        ...curr,
                        updatedAt: resData.profile.updatedAt,
                      }));
                    }
                    console.log(
                      "[StorySection] Successfully saved goals to DB"
                    );
                  }
                } catch (err) {
                  console.error(
                    "[StorySection] Error saving goals to DB:",
                    err
                  );
                }
              }}
            />
          }
          textArea={
            <TextAreaWithEncouragement
              rows={6}
              placeholder="Or type here in your own words…"
              value={profile.goals?.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  goals: { ...p.goals, text: next },
                }))
              }
              recommendedWords={40}
            />
          }
        />
      </Field>

      <Separator label="Living Situation" />
      <Field
        title={
          profile.isChild ? (
            <>Please describe your child's living situation.</>
          ) : (
            <>Please describe your living situation.</>
          )
        }
        label={
          <div>
            {profile.isChild ? (
              <i>
                Give the names, ages and relationships of the people living in
                your home(s)
              </i>
            ) : (
              <i>
                Include who you live with, neighborhood safety, access to
                resources, and environmental stressors
              </i>
            )}
          </div>
        }
        required
      >
        <VoicePreferredField
          hasTextValue={!!profile.livingSituation?.text}
          voiceRecorder={
            <VoiceRecorder
              ref={(el) => {
                if (voiceRecorderRefs) {
                  voiceRecorderRefs.current.livingSituation = el;
                }
              }}
              fieldName="livingSituation"
              label="Record your answer"
              audioState={profile.livingSituation?.audio?.url || null}
              fileName={profile.livingSituation?.audio?.fileName || null}
              onAttach={async (data) => {
                console.log(
                  "[StorySection] livingSituation onAttach called with data:",
                  data
                );

                // ✅ Update local state immediately
                setProfile((p) => ({
                  ...p,
                  livingSituation: {
                    text: p.livingSituation?.text || "",
                    ...(data && {
                      audio: {
                        url: data.url,
                        fileName: data.fileName,
                        uploadedAt: data.uploadedAt,
                        ...(p.livingSituation?.audio?.transcription && {
                          transcription: p.livingSituation.audio.transcription,
                          chunks: p.livingSituation.audio.chunks,
                          transcribedAt: p.livingSituation.audio.transcribedAt,
                        }),
                      },
                    }),
                  },
                }));

                // ✅ Save ONLY this field to DB
                try {
                  const response = await fetch("/api/profile/update-field", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fieldName: "livingSituation",
                      fieldValue: {
                        text: profile.livingSituation?.text || "",
                        ...(data && {
                          audio: {
                            url: data.url,
                            fileName: data.fileName,
                            uploadedAt: data.uploadedAt,
                          },
                        }),
                      },
                    }),
                  });

                  if (!response.ok) {
                    console.error(
                      "[StorySection] Failed to save livingSituation to DB"
                    );
                  } else {
                    const resData = await response.json();
                    if (resData.profile?.updatedAt) {
                      setProfile((curr) => ({
                        ...curr,
                        updatedAt: resData.profile.updatedAt,
                      }));
                    }
                    console.log(
                      "[StorySection] Successfully saved livingSituation to DB"
                    );
                  }
                } catch (err) {
                  console.error(
                    "[StorySection] Error saving livingSituation to DB:",
                    err
                  );
                }
              }}
            />
          }
          textArea={
            <TextAreaWithEncouragement
              rows={6}
              placeholder="Or type here in your own words…"
              value={profile.livingSituation?.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  livingSituation: { ...p.livingSituation, text: next },
                }))
              }
            />
          }
        />
      </Field>

      <Separator label="Culture & Context" />
      <Field
        title={
          !profile.isChild ? (
            <>
              What role does culture (religion, ethnicity, nationality,
              spirituality) play in your life? <i>(optional)</i>
            </>
          ) : (
            <>
              What role does culture (religion, ethnicity, nationality,
              spirituality) play in your child's life? <i>(optional)</i>
            </>
          )
        }
        required
      >
        <VoicePreferredField
          hasTextValue={!!profile.cultureContext?.text}
          voiceRecorder={
            <VoiceRecorder
              ref={(el) => {
                if (voiceRecorderRefs) {
                  voiceRecorderRefs.current.cultureContext = el;
                }
              }}
              fieldName="cultureContext"
              label="Record your answer"
              audioState={profile.cultureContext?.audio?.url || null}
              fileName={profile.cultureContext?.audio?.fileName || null}
              onAttach={async (data) => {
                console.log(
                  "[StorySection] cultureContext onAttach called with data:",
                  data
                );

                // ✅ Update local state immediately
                setProfile((p) => ({
                  ...p,
                  cultureContext: {
                    text: p.cultureContext?.text || "",
                    ...(data && {
                      audio: {
                        url: data.url,
                        fileName: data.fileName,
                        uploadedAt: data.uploadedAt,
                        ...(p.cultureContext?.audio?.transcription && {
                          transcription: p.cultureContext.audio.transcription,
                          chunks: p.cultureContext.audio.chunks,
                          transcribedAt: p.cultureContext.audio.transcribedAt,
                        }),
                      },
                    }),
                  },
                }));

                // ✅ Save ONLY this field to DB
                try {
                  const response = await fetch("/api/profile/update-field", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fieldName: "cultureContext",
                      fieldValue: {
                        text: profile.cultureContext?.text || "",
                        ...(data && {
                          audio: {
                            url: data.url,
                            fileName: data.fileName,
                            uploadedAt: data.uploadedAt,
                          },
                        }),
                      },
                    }),
                  });

                  if (!response.ok) {
                    console.error(
                      "[StorySection] Failed to save cultureContext to DB"
                    );
                  } else {
                    const resData = await response.json();
                    if (resData.profile?.updatedAt) {
                      setProfile((curr) => ({
                        ...curr,
                        updatedAt: resData.profile.updatedAt,
                      }));
                    }
                    console.log(
                      "[StorySection] Successfully saved cultureContext to DB"
                    );
                  }
                } catch (err) {
                  console.error(
                    "[StorySection] Error saving cultureContext to DB:",
                    err
                  );
                }
              }}
            />
          }
          textArea={
            <TextAreaWithEncouragement
              rows={6}
              placeholder="Or type here in your own words…"
              value={profile.cultureContext?.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  cultureContext: { ...p.cultureContext, text: next },
                }))
              }
              recommendedWords={40}
            />
          }
        />
      </Field>

      {!profile.isChild && (
        <>
          <Separator label="Previous Treatment" />
          <Field title={"Previous Mental Health Treatment"} required>
            <Likert
              label={
                profile.isChild
                  ? "Is your child currently or have they previously received mental health treatment?"
                  : "Are you currently or have you previously received mental health treatment?"
              }
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
        </>
      )}

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
                rows={2}
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
                recommendedWords={20}
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
      {profile.isChild && (
        <>
          <Field
            required
            title="Please provide information about significant medical issues on the FATHER's side."
          >
            <TextAreaWithEncouragement
              value={profile.fatherSideMedicalIssues}
              rows={2}
              recommendedWords={20}
              placeholder="Share here in your own words"
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  fatherSideMedicalIssues: next,
                }))
              }
            />
          </Field>
          <Field
            required
            title="Please provide information about significant medical issues on the MOTHER's side."
          >
            <TextAreaWithEncouragement
              value={profile.motherSideMedicalIssues}
              rows={2}
              recommendedWords={20}
              placeholder="Share here in your own words"
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  motherSideMedicalIssues: next,
                }))
              }
            />
          </Field>
        </>
      )}
      {!profile.isChild && (
        <>
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
                Please share as much information as you can about the people
                that you grew up around (include ages and relationship to you)
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
                    Please tell us why you did not experience your childhood in
                    a positive way
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
        </>
      )}
    </div>
  );
}
