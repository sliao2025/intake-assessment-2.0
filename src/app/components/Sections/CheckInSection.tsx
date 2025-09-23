"use client";

import React, { useEffect } from "react";
import Field from "../primitives/Field";
import StepTitle from "../StepTitle";
import type { Profile, StateSetter } from "../../lib/types/types";
import MultiSelectGroup from "../primitives/MultiSelectGroup";
import Likert from "../primitives/Likert";
import { useRouter } from "next/navigation";
import Separator from "../primitives/Separator";

/** Scales reused from AssessmentsSection (yes/no) */
const yesNo = [
  { key: "yes", label: "Yes" },
  { key: "no", label: "No" },
];

// Local helper for pill-style multi-select with exclusive "None of the above"

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
  const router = useRouter();

  // Compute high-risk from profile.assessments.suicide
  const s = profile.assessments.suicide;
  const highRisk =
    (s.thoughts === "yes" && s.intention === "yes") || s.behavior === "yes";

  // If highRisk becomes true, redirect to the suicide-redirect page
  useEffect(() => {
    if (highRisk) {
      // push to the emergency page
      router.push("/redirect");
    }
  }, [highRisk, router]);

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

      {/* Suicide screening (moved from Assessments) */}
      <div className="mt-10">
        <Separator label="Safety & Suicide Screening" />
      </div>

      <div className="space-y-6">
        <p className="italic text-slate-600">
          These questions ask about any recent suicidal thinking or behavior. If
          you answer in a way that suggests immediate risk, you will be
          redirected to urgent resources.
        </p>

        <div className="space-y-5">
          <Field
            required
            title="In the past month, have you wished you were dead, or wished you could go to sleep and not wake up?"
          >
            <Likert
              value={profile.assessments.suicide.wishDead}
              onChange={(v) =>
                setProfile((p) => {
                  const next = { ...p };
                  next.assessments = {
                    ...p.assessments,
                    suicide: { ...p.assessments.suicide },
                  };
                  next.assessments.suicide.wishDead = String(v);
                  return next;
                })
              }
              options={yesNo}
            />
          </Field>

          <Field
            required
            title="In the past month, have you had any actual thoughts about killing yourself?"
          >
            <Likert
              value={profile.assessments.suicide.thoughts}
              onChange={(v) =>
                setProfile((p) => {
                  const next = { ...p };
                  next.assessments = {
                    ...p.assessments,
                    suicide: { ...p.assessments.suicide },
                  };
                  next.assessments.suicide.thoughts = String(v);
                  // clear downstream fields when toggling to 'no'
                  if (String(v) !== "yes") {
                    next.assessments.suicide.methodHow = "";
                    next.assessments.suicide.intention = "";
                    next.assessments.suicide.plan = "";
                    next.assessments.suicide.behavior = "";
                    next.assessments.suicide.behavior3mo = "";
                  }
                  return next;
                })
              }
              options={yesNo}
            />
          </Field>

          {profile.assessments.suicide.thoughts === "yes" && (
            <>
              <Field title="In the past month, have you been thinking about how you might end your life?">
                <Likert
                  value={profile.assessments.suicide.methodHow}
                  onChange={(v) =>
                    setProfile((p) => {
                      const next = { ...p };
                      next.assessments = {
                        ...p.assessments,
                        suicide: { ...p.assessments.suicide },
                      };
                      next.assessments.suicide.methodHow = String(v);
                      return next;
                    })
                  }
                  options={yesNo}
                />
              </Field>

              <Field title="In the past month, have you had these suicidal thoughts and some intention of acting on them?">
                <Likert
                  value={profile.assessments.suicide.intention}
                  onChange={(v) =>
                    setProfile((p) => {
                      const next = { ...p };
                      next.assessments = {
                        ...p.assessments,
                        suicide: { ...p.assessments.suicide },
                      };
                      next.assessments.suicide.intention = String(v);
                      return next;
                    })
                  }
                  options={yesNo}
                />
              </Field>

              <Field title="In the past month, have you started to work out the details of how to kill yourself? Do you intend to carry out this plan?">
                <Likert
                  value={profile.assessments.suicide.plan}
                  onChange={(v) =>
                    setProfile((p) => {
                      const next = { ...p };
                      next.assessments = {
                        ...p.assessments,
                        suicide: { ...p.assessments.suicide },
                      };
                      next.assessments.suicide.plan = String(v);
                      return next;
                    })
                  }
                  options={yesNo}
                />
              </Field>

              <Field title="Have you done anything, started to do anything, or prepared to do anything, to end your life? Such as: collected pills, obtained a gun, wrote a will or suicide note">
                <Likert
                  value={profile.assessments.suicide.behavior}
                  onChange={(v) =>
                    setProfile((p) => {
                      const next = { ...p };
                      next.assessments = {
                        ...p.assessments,
                        suicide: { ...p.assessments.suicide },
                      };
                      next.assessments.suicide.behavior = String(v);
                      if (String(v) !== "yes")
                        next.assessments.suicide.behavior3mo = "";
                      return next;
                    })
                  }
                  options={yesNo}
                />
              </Field>

              {profile.assessments.suicide.behavior === "yes" && (
                <Field title="Was this within the past 3 months?">
                  <Likert
                    value={profile.assessments.suicide.behavior3mo}
                    onChange={(v) =>
                      setProfile((p) => {
                        const next = { ...p };
                        next.assessments = {
                          ...p.assessments,
                          suicide: { ...p.assessments.suicide },
                        };
                        next.assessments.suicide.behavior3mo = String(v);
                        return next;
                      })
                    }
                    options={yesNo}
                  />
                </Field>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
