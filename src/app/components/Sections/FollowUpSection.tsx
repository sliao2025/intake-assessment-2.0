"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Profile } from "../../lib/types/types";
import Field from "../primitives/Field";
import StepTitle from "../StepTitle";
import TextAreaWithEncouragement from "../primitives/TextAreawithEncouragement";
import VoiceRecorder, { VoiceRecorderHandle } from "../VoiceRecorder";
import { intPsychTheme } from "../theme";
import { Info } from "lucide-react";

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
    "Creating your personalized questions...",
    "Analyzing your responses...",
    "Tailoring follow-up questions...",
    "Preparing your next steps...",
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

  // Function to save a specific profile state to SQL
  const saveProfileToSQL = async (profileToSave: typeof profile) => {
    try {
      console.log("[FollowUpSection] Saving profile to SQL...");
      const response = await fetch("/api/profile/create", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileToSave),
      });
      if (!response.ok) {
        throw new Error(`Failed to save: ${response.statusText}`);
      }
      console.log("[FollowUpSection] Profile saved to SQL successfully");
    } catch (err) {
      console.error("[FollowUpSection] Failed to save profile to SQL:", err);
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
          // Update profile with generated questions
          const updatedProfile = {
            ...profile,
            followupQuestions: {
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
            },
          };

          setProfile(updatedProfile);
          await saveProfileToSQL(updatedProfile);
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
      <div className="space-y-6">
        <StepTitle n={step + 1} title={title} />
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          {/* Spinning loader */}
          <div
            className="h-10 w-10 border-4 border-slate-200 rounded-full animate-spin"
            style={{ borderTopColor: intPsychTheme.accent }}
            aria-hidden
          />
          {/* Text below */}
          <p
            className={`text-lg font-medium text-slate-700 transition-all duration-300 ease-in-out ${
              fadeIn ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            {loadingPhrases[loadingPhrase]}
          </p>
        </div>
      </div>
    );
  }

  if (!questionsGenerated || !profile.followupQuestions) {
    return (
      <div className="space-y-6">
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
      className="space-y-6"
    >
      <StepTitle n={step + 1} title={title} />

      <p className="text-gray-700 italic mb-6">
        Based on your responses, we have a few follow-up questions to help us
        better understand your situation. You can record your answer or type it
        below.
      </p>

      {/* Question 1 */}
      <Field title={profile.followupQuestions.question1.question} required>
        <div className="space-y-3">
          <div className="flex items-start gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-xl">
            <Info className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-orange-900 font-medium">
              You can record your answer, type it below, or both – whatever you
              prefer
            </p>
          </div>
          <VoiceRecorder
            ref={(el) => {
              if (voiceRecorderRefs) {
                voiceRecorderRefs.current["followupQuestion1"] = el;
              }
            }}
            fieldName="followupQuestions.question1.question"
            label="Record your answer"
            audioState={
              profile.followupQuestions.question1.answer.audio?.url || null
            }
            fileName={
              profile.followupQuestions.question1.answer.audio?.fileName || null
            }
            onAttach={async (data) => {
              console.log(
                "[FollowUpSection] question1 onAttach called with data:",
                data
              );

              const updatedProfile: typeof profile = {
                ...profile,
                followupQuestions: {
                  ...profile.followupQuestions!,
                  question1: {
                    ...profile.followupQuestions!.question1,
                    answer: {
                      text:
                        profile.followupQuestions!.question1.answer.text || "",
                      ...(data && {
                        audio: {
                          url: data.url,
                          fileName: data.fileName,
                          uploadedAt: data.uploadedAt,
                        },
                      }),
                    },
                  },
                },
              };

              await saveProfileToSQL(updatedProfile);
              setProfile(updatedProfile);
            }}
          />

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
        </div>
      </Field>

      {/* Question 2 */}
      <Field title={profile.followupQuestions.question2.question} required>
        <div className="space-y-3">
          <div className="flex items-start gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-xl">
            <Info className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-orange-900 font-medium">
              You can record your answer, type it below, or both – whatever you
              prefer
            </p>
          </div>
          <VoiceRecorder
            ref={(el) => {
              if (voiceRecorderRefs) {
                voiceRecorderRefs.current["followupQuestion2"] = el;
              }
            }}
            fieldName="followupQuestions.question2.question"
            label="Record your answer"
            audioState={
              profile.followupQuestions.question2.answer.audio?.url || null
            }
            fileName={
              profile.followupQuestions.question2.answer.audio?.fileName || null
            }
            onAttach={async (data) => {
              console.log(
                "[FollowUpSection] question2 onAttach called with data:",
                data
              );

              const updatedProfile: typeof profile = {
                ...profile,
                followupQuestions: {
                  ...profile.followupQuestions!,
                  question2: {
                    ...profile.followupQuestions!.question2,
                    answer: {
                      text:
                        profile.followupQuestions!.question2.answer.text || "",
                      ...(data && {
                        audio: {
                          url: data.url,
                          fileName: data.fileName,
                          uploadedAt: data.uploadedAt,
                        },
                      }),
                    },
                  },
                },
              };

              await saveProfileToSQL(updatedProfile);
              setProfile(updatedProfile);
            }}
          />

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
        </div>
      </Field>

      {/* Question 3 */}
      <Field title={profile.followupQuestions.question3.question} required>
        <div className="space-y-3">
          <div className="flex items-start gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-xl">
            <Info className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-orange-900 font-medium">
              You can record your answer, type it below, or both – whatever you
              prefer
            </p>
          </div>
          <VoiceRecorder
            ref={(el) => {
              if (voiceRecorderRefs) {
                voiceRecorderRefs.current["followupQuestion3"] = el;
              }
            }}
            fieldName="followupQuestions.question3.question"
            label="Record your answer"
            audioState={
              profile.followupQuestions.question3.answer.audio?.url || null
            }
            fileName={
              profile.followupQuestions.question3.answer.audio?.fileName || null
            }
            onAttach={async (data) => {
              console.log(
                "[FollowUpSection] question3 onAttach called with data:",
                data
              );

              const updatedProfile: typeof profile = {
                ...profile,
                followupQuestions: {
                  ...profile.followupQuestions!,
                  question3: {
                    ...profile.followupQuestions!.question3,
                    answer: {
                      text:
                        profile.followupQuestions!.question3.answer.text || "",
                      ...(data && {
                        audio: {
                          url: data.url,
                          fileName: data.fileName,
                          uploadedAt: data.uploadedAt,
                        },
                      }),
                    },
                  },
                },
              };

              await saveProfileToSQL(updatedProfile);
              setProfile(updatedProfile);
            }}
          />

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
        </div>
      </Field>
    </motion.div>
  );
}
