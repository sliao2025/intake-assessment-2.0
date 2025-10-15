"use client";

import {
  Profile,
  ChildAssessments,
  CssrsScreen,
} from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";
import Separator from "../../primitives/Separator";

export default function CSSRSForm({
  profile,
  setProfile,
}: {
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
}) {
  const yesNo = [
    { key: "yes", label: "Yes" },
    { key: "no", label: "No" },
  ] as const;

  // Stable keys for C-SSRS Screen — map to types.CssrsScreen
  const keys = [
    "wishDead", // Q1
    "thoughts", // Q2
    "methodHow", // Q3
    "intention", // Q4
    "plan", // Q5
    "behavior", // Q6
  ] as const;

  const isChild = profile.assessments.kind === "child";
  const data =
    (profile.assessments.data as ChildAssessments) ?? ({} as ChildAssessments);
  const cssrs: CssrsScreen | undefined = isChild
    ? (data.cssrs as CssrsScreen | undefined)
    : undefined;

  const questions: string[] = [
    "Have you wished you were dead or wished you could go to sleep and not wake up?",
    "Have you actually had any thoughts of killing yourself?",
    "Have you been thinking about how you might do this?",
    "Have you had these thoughts and had some intention of acting on them?",
    "Have you started to work out or worked out the details of how to kill yourself? Do you intend to carry out this plan?",
    "Have you ever done anything, started to do anything, or prepared to do anything to end your life?",
  ];

  function updateCssrs<K extends keyof CssrsScreen>(key: K, value: string) {
    setProfile((prev) => {
      if (prev.assessments.kind !== "child") return prev; // ignore if not child
      const next = { ...prev } as Profile;
      const d = next.assessments.data as ChildAssessments;
      // ensure cssrs object exists
      if (!d.cssrs) {
        d.cssrs = {
          wishDead: "",
          thoughts: "",
          methodHow: "",
          intention: "",
          plan: "",
          behavior: "",
          behavior3mo: "",
        };
      }
      d.cssrs[key] = String(value);
      // If Q2 set to "no", clear Q3–Q5
      if (key === "thoughts" && String(value) === "no") {
        d.cssrs.methodHow = "";
        d.cssrs.intention = "";
        d.cssrs.plan = "";
      }
      // If behavior toggled to "no", clear timing follow-up
      if (key === "behavior" && String(value) !== "yes") {
        d.cssrs.behavior3mo = "";
      }
      return next;
    });
  }

  return (
    <div className="space-y-6">
      <Separator label="Suicide Screen" />
      <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 space-y-2">
        <p className="leading-relaxed">
          Since you had mentioned in the previous question that your child may
          be having thoughts of suicide or wanting to end their life, we’d like
          to explore this topic further with a few more questions.
        </p>
        <p>
          Please have <b>your child</b> complete this next questionnaire
          privately.
        </p>
        <p className="text-sm italic">
          These questions are important to help ensure your child’s safety and
          well-being. Please answer them as honestly as possible — there are no
          wrong answers.
        </p>
      </div>

      {questions.map((q, idx) => {
        const k = keys[idx] as (typeof keys)[number];
        const value = cssrs?.[k] ?? "";

        // If Q2 is NO, skip rendering Q3–Q5 entirely
        if (
          cssrs?.thoughts === "no" &&
          (k === "methodHow" || k === "intention" || k === "plan")
        ) {
          return null;
        }

        return (
          <Field key={String(k)} title={`${idx + 1}. ${q}`}>
            <Likert
              value={value}
              onChange={(v) => updateCssrs(k, String(v))}
              options={yesNo as any}
            />
          </Field>
        );
      })}

      {/* Q6 Timing follow-up */}
      {cssrs?.behavior === "yes" && (
        <Field title="7. Was this within the past three months?">
          <Likert
            value={cssrs?.behavior3mo ?? ""}
            onChange={(v) => updateCssrs("behavior3mo", String(v))}
            options={[
              { key: "yes", label: "Yes" },
              { key: "no", label: "No" },
            ]}
          />
        </Field>
      )}
    </div>
  );
}
