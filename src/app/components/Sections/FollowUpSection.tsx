"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Profile } from "../../lib/types/types";
import Field from "../primitives/Field";
import StepTitle from "../StepTitle";
import TextAreaWithEncouragement from "../primitives/TextAreawithEncouragement";
import VoiceRecorder, { VoiceRecorderHandle } from "../VoiceRecorder";
import { intPsychTheme, sigmundTheme } from "../theme";
import VoicePreferredField from "../primitives/VoicePreferredField";
import { DM_Sans, DM_Serif_Text } from "next/font/google";
import Image from "next/image";
import sigmund_chair from "public/Sigmund Chair.png";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });
const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

type Props = {
  title: string;
  step: number;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  voiceRecorderRefs?: React.MutableRefObject<{
    [key: string]: VoiceRecorderHandle | null;
  }>;
};

export default function FollowUpSection({
  title,
  step,
  profile,
  setProfile,
  voiceRecorderRefs,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [questionsGenerated, setQuestionsGenerated] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const loadingPhrases = [
    "Hmm, let me think about that for a second...",
    "I'm reviewing your responses to tailor our next steps...",
    "Just a moment while I gather some additional thoughts...",
    "Reflecting on your journey so far...",
  ];

  // Rotate loading phrases every 2.5 seconds with fade animation
  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setLoadingPhrase((prev) => (prev + 1) % loadingPhrases.length);
        setFadeIn(true);
      }, 300); // Wait for fade out before changing text
    }, 2500);

    return () => clearInterval(interval);
  }, [loading]);

  // Function to save follow-up questions to SQL using field-level update
  // This avoids optimistic locking conflicts that can occur with full-profile updates
  const saveFollowupQuestionsToSQL = async (
    followupQuestions: Profile["followupQuestions"]
  ) => {
    try {
      console.log("[FollowUpSection] Saving follow-up questions to SQL...");
      const response = await fetch("/api/profile/update-field", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fieldName: "followupQuestions",
          fieldValue: followupQuestions,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `Failed to save: ${response.statusText} - ${JSON.stringify(errorData)}`
        );
      }
      const resData = await response.json();
      console.log(
        "[FollowUpSection] Follow-up questions saved to SQL successfully"
      );
      return resData;
    } catch (err) {
      console.error(
        "[FollowUpSection] Failed to save follow-up questions to SQL:",
        err
      );
      throw err;
    }
  };

  // Generate follow-up questions when component mounts if not already generated
  useEffect(() => {
    const generateQuestions = async () => {
      // FOR TESTING: Always generate new questions on mount
      // Comment out the check below to force API call every time
      if (
        profile.followupQuestions?.question1?.question &&
        profile.followupQuestions?.question2?.question &&
        profile.followupQuestions?.question3?.question
      ) {
        setQuestionsGenerated(true);
        return;
      }

      setLoading(true);
      try {
        console.log("profile [FollowUpSection]", profile);
        const response = await fetch("/api/followup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile }),
        });

        if (!response.ok) {
          throw new Error("Failed to generate follow-up questions");
        }

        const data = await response.json();

        if (data.ok && data.questions) {
          // Create the follow-up questions structure
          const followupQuestions = {
            question1: {
              question: data.questions.question1,
              answer: { text: "" },
            },
            question2: {
              question: data.questions.question2,
              answer: { text: "" },
            },
            question3: {
              question: data.questions.question3,
              answer: { text: "" },
            },
          };

          // Save to SQL first using field-level update (avoids optimistic locking conflicts)
          const resData = await saveFollowupQuestionsToSQL(followupQuestions);

          // Update local state with the new questions AND the updated timestamp
          setProfile((p) => ({
            ...p,
            followupQuestions,
            ...(resData?.profile?.updatedAt && {
              updatedAt: resData.profile.updatedAt,
            }),
          }));
          setQuestionsGenerated(true);
        }
      } catch (err) {
        console.error("[FollowUpSection] Error generating questions:", err);
        // Set fallback questions
        setProfile((p) => ({
          ...p,
          followupQuestions: {
            question1: {
              question: "Can you tell me more about your current symptoms?",
              answer: { text: "" },
            },
            question2: {
              question: "How has this been affecting your daily life?",
              answer: { text: "" },
            },
            question3: {
              question: "What are your goals for treatment?",
              answer: { text: "" },
            },
          },
        }));
        setQuestionsGenerated(true);
      } finally {
        setLoading(false);
      }
    };

    generateQuestions();
  }, []);

  if (loading) {
    return (
      <div className={`space-y-6 ${dm_sans.className}`}>
        <StepTitle n={step + 1} title={title} />
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="relative w-full max-w-lg flex flex-col items-center">
            {/* Sigmund Scene */}
            <div className="relative w-48 h-48 mb-6">
              <Image
                src={sigmund_chair}
                alt="Sigmund reflecting"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Speech Bubble */}
            <div
              className={`relative bg-white border-2 border-stone-200 border-b-4 p-6 rounded-3xl transition-all duration-300 ease-in-out ${
                fadeIn ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              {/* Bubble Tail */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-t-2 border-l-2 border-stone-200 rotate-45" />

              <div className="flex flex-col items-center gap-4">
                <p
                  className={`${dm_serif.className} text-xl text-[#1c1917] text-center leading-relaxed`}
                >
                  {loadingPhrases[loadingPhrase]}
                </p>
                <div className="flex gap-1.5">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-stone-300 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-stone-300 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-stone-300 rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!questionsGenerated || !profile.followupQuestions) {
    return (
      <div className={`space-y-6 ${dm_sans.className}`}>
        <StepTitle n={step + 1} title={title} />
        <div className="text-center py-8">
          <p className="text-lg text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`space-y-6 ${dm_sans.className}`}
    >
      <StepTitle n={step + 1} title={title} />

      <div
        className={`flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-[${sigmundTheme.background}] p-8 rounded-3xl border-2 border-stone-200 border-b-6 mb-8`}
      >
        <div className="flex-shrink-0 relative w-32 h-32">
          <Image
            src={sigmund_chair}
            alt="Sigmund's Thoughts"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex-1 relative">
          <h3 className={`${dm_serif.className} text-2xl text-[#1c1917] mb-3`}>
            A few follow-up thoughts...
          </h3>
          <p className="text-[#44403c] text-lg leading-relaxed">
            Based on your responses, I've put together a few follow-up questions
            to help us better understand your situation. Take your time—you can
            record your answer or type it below.
          </p>
        </div>
      </div>

      {/* Question 1 */}
      <Field title={profile.followupQuestions.question1.question} required>
        <VoicePreferredField
          hasTextValue={!!profile.followupQuestions.question1.answer.text}
          voiceRecorder={
            <VoiceRecorder
              ref={(el) => {
                if (voiceRecorderRefs) {
                  voiceRecorderRefs.current["followupQuestion1"] = el;
                }
              }}
              fieldName="followupQuestions.question1.answer"
              label="Record your answer"
              audioState={
                profile.followupQuestions.question1.answer.audio?.url || null
              }
              fileName={
                profile.followupQuestions.question1.answer.audio?.fileName ||
                null
              }
              onAttach={async (data) => {
                console.log(
                  "[FollowUpSection] question1 onAttach called with data:",
                  data
                );

                // ✅ Update local state immediately
                setProfile((p) => {
                  const updatedProfile = {
                    ...p,
                    followupQuestions: {
                      ...p.followupQuestions!,
                      question1: {
                        ...p.followupQuestions!.question1,
                        answer: {
                          text:
                            p.followupQuestions!.question1.answer.text || "",
                          ...(data && {
                            audio: {
                              url: data.url,
                              fileName: data.fileName,
                              uploadedAt: data.uploadedAt,
                              ...(p.followupQuestions!.question1.answer.audio
                                ?.transcription && {
                                transcription:
                                  p.followupQuestions!.question1.answer.audio
                                    .transcription,
                                chunks:
                                  p.followupQuestions!.question1.answer.audio
                                    .chunks,
                                transcribedAt:
                                  p.followupQuestions!.question1.answer.audio
                                    .transcribedAt,
                              }),
                            },
                          }),
                        },
                      },
                    },
                  };

                  // ✅ Save ONLY this field to DB using field-level update
                  // Use the UPDATED profile data, not the stale closure
                  fetch("/api/profile/update-field", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fieldName: "followupQuestions.question1.answer",
                      fieldValue: {
                        text: p.followupQuestions!.question1.answer.text || "",
                        ...(data && {
                          audio: {
                            url: data.url,
                            fileName: data.fileName,
                            uploadedAt: data.uploadedAt,
                          },
                        }),
                      },
                    }),
                  })
                    .then(async (response) => {
                      if (!response.ok) {
                        console.error(
                          "[FollowUpSection] Failed to save question1 to DB"
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
                          "[FollowUpSection] Successfully saved question1 to DB"
                        );
                      }
                    })
                    .catch((err) => {
                      console.error(
                        "[FollowUpSection] Error saving question1 to DB:",
                        err
                      );
                    });

                  return updatedProfile;
                });
              }}
            />
          }
          textArea={
            <TextAreaWithEncouragement
              rows={4}
              placeholder="Or type here in your own words…"
              value={profile.followupQuestions.question1.answer.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  followupQuestions: {
                    ...p.followupQuestions!,
                    question1: {
                      ...p.followupQuestions!.question1,
                      answer: {
                        ...p.followupQuestions!.question1.answer,
                        text: next,
                      },
                    },
                  },
                }))
              }
              recommendedWords={50}
            />
          }
        />
      </Field>

      {/* Question 2 */}
      <Field title={profile.followupQuestions.question2.question} required>
        <VoicePreferredField
          hasTextValue={!!profile.followupQuestions.question2.answer.text}
          voiceRecorder={
            <VoiceRecorder
              ref={(el) => {
                if (voiceRecorderRefs) {
                  voiceRecorderRefs.current["followupQuestion2"] = el;
                }
              }}
              fieldName="followupQuestions.question2.answer"
              label="Record your answer"
              audioState={
                profile.followupQuestions.question2.answer.audio?.url || null
              }
              fileName={
                profile.followupQuestions.question2.answer.audio?.fileName ||
                null
              }
              onAttach={async (data) => {
                console.log(
                  "[FollowUpSection] question2 onAttach called with data:",
                  data
                );

                // ✅ Update local state immediately
                setProfile((p) => {
                  const updatedProfile = {
                    ...p,
                    followupQuestions: {
                      ...p.followupQuestions!,
                      question2: {
                        ...p.followupQuestions!.question2,
                        answer: {
                          text:
                            p.followupQuestions!.question2.answer.text || "",
                          ...(data && {
                            audio: {
                              url: data.url,
                              fileName: data.fileName,
                              uploadedAt: data.uploadedAt,
                              ...(p.followupQuestions!.question2.answer.audio
                                ?.transcription && {
                                transcription:
                                  p.followupQuestions!.question2.answer.audio
                                    .transcription,
                                chunks:
                                  p.followupQuestions!.question2.answer.audio
                                    .chunks,
                                transcribedAt:
                                  p.followupQuestions!.question2.answer.audio
                                    .transcribedAt,
                              }),
                            },
                          }),
                        },
                      },
                    },
                  };

                  // ✅ Save ONLY this field to DB
                  fetch("/api/profile/update-field", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fieldName: "followupQuestions.question2.answer",
                      fieldValue: {
                        text: p.followupQuestions!.question2.answer.text || "",
                        ...(data && {
                          audio: {
                            url: data.url,
                            fileName: data.fileName,
                            uploadedAt: data.uploadedAt,
                          },
                        }),
                      },
                    }),
                  })
                    .then(async (response) => {
                      if (!response.ok) {
                        console.error(
                          "[FollowUpSection] Failed to save question2 to DB"
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
                          "[FollowUpSection] Successfully saved question2 to DB"
                        );
                      }
                    })
                    .catch((err) => {
                      console.error(
                        "[FollowUpSection] Error saving question2 to DB:",
                        err
                      );
                    });

                  return updatedProfile;
                });
              }}
            />
          }
          textArea={
            <TextAreaWithEncouragement
              rows={4}
              placeholder="Or type here in your own words…"
              value={profile.followupQuestions.question2.answer.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  followupQuestions: {
                    ...p.followupQuestions!,
                    question2: {
                      ...p.followupQuestions!.question2,
                      answer: {
                        ...p.followupQuestions!.question2.answer,
                        text: next,
                      },
                    },
                  },
                }))
              }
              recommendedWords={50}
            />
          }
        />
      </Field>

      {/* Question 3 */}
      <Field title={profile.followupQuestions.question3.question} required>
        <VoicePreferredField
          hasTextValue={!!profile.followupQuestions.question3.answer.text}
          voiceRecorder={
            <VoiceRecorder
              ref={(el) => {
                if (voiceRecorderRefs) {
                  voiceRecorderRefs.current["followupQuestion3"] = el;
                }
              }}
              fieldName="followupQuestions.question3.answer"
              label="Record your answer"
              audioState={
                profile.followupQuestions.question3.answer.audio?.url || null
              }
              fileName={
                profile.followupQuestions.question3.answer.audio?.fileName ||
                null
              }
              onAttach={async (data) => {
                console.log(
                  "[FollowUpSection] question3 onAttach called with data:",
                  data
                );

                // ✅ Update local state immediately
                setProfile((p) => {
                  const updatedProfile = {
                    ...p,
                    followupQuestions: {
                      ...p.followupQuestions!,
                      question3: {
                        ...p.followupQuestions!.question3,
                        answer: {
                          text:
                            p.followupQuestions!.question3.answer.text || "",
                          ...(data && {
                            audio: {
                              url: data.url,
                              fileName: data.fileName,
                              uploadedAt: data.uploadedAt,
                              ...(p.followupQuestions!.question3.answer.audio
                                ?.transcription && {
                                transcription:
                                  p.followupQuestions!.question3.answer.audio
                                    .transcription,
                                chunks:
                                  p.followupQuestions!.question3.answer.audio
                                    .chunks,
                                transcribedAt:
                                  p.followupQuestions!.question3.answer.audio
                                    .transcribedAt,
                              }),
                            },
                          }),
                        },
                      },
                    },
                  };

                  // ✅ Save ONLY this field to DB
                  fetch("/api/profile/update-field", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      fieldName: "followupQuestions.question3.answer",
                      fieldValue: {
                        text: p.followupQuestions!.question3.answer.text || "",
                        ...(data && {
                          audio: {
                            url: data.url,
                            fileName: data.fileName,
                            uploadedAt: data.uploadedAt,
                          },
                        }),
                      },
                    }),
                  })
                    .then(async (response) => {
                      if (!response.ok) {
                        console.error(
                          "[FollowUpSection] Failed to save question3 to DB"
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
                          "[FollowUpSection] Successfully saved question3 to DB"
                        );
                      }
                    })
                    .catch((err) => {
                      console.error(
                        "[FollowUpSection] Error saving question3 to DB:",
                        err
                      );
                    });

                  return updatedProfile;
                });
              }}
            />
          }
          textArea={
            <TextAreaWithEncouragement
              rows={4}
              placeholder="Or type here in your own words…"
              value={profile.followupQuestions.question3.answer.text || ""}
              onChangeText={(next) =>
                setProfile((p) => ({
                  ...p,
                  followupQuestions: {
                    ...p.followupQuestions!,
                    question3: {
                      ...p.followupQuestions!.question3,
                      answer: {
                        ...p.followupQuestions!.question3.answer,
                        text: next,
                      },
                    },
                  },
                }))
              }
              recommendedWords={50}
            />
          }
        />
      </Field>
    </motion.div>
  );
}
