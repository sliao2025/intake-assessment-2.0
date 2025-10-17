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
  ];

  const isChild = profile.assessments.kind === "child";
  const data =
    (profile.assessments.data as ChildAssessments) ?? ({} as ChildAssessments);
  const cssrs: CssrsScreen | undefined = isChild
    ? ((data.cssrs as CssrsScreen | undefined) ?? undefined)
    : undefined;

  // Simple conditionals
  const showMethodHow = cssrs?.thoughts === "yes";
  const showIntention = cssrs?.thoughts === "yes";
  const showPlan = cssrs?.thoughts === "yes";
  const showBehavior3mo = cssrs?.behavior === "yes";

  // Helper: ensure cssrs object exists
  function ensureCssrs(prev: Profile): CssrsScreen {
    const d = prev.assessments.data as ChildAssessments;
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
    return d.cssrs;
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

      {/* Q1 */}
      <Field
        required
        title="Have you wished you were dead or wished you could go to sleep and not wake up?"
      >
        <Likert
          value={cssrs?.wishDead ?? ""}
          onChange={(v) =>
            setProfile((prev) => {
              if (prev.assessments.kind !== "child") return prev;
              const next = { ...prev };
              const c = ensureCssrs(next);
              c.wishDead = String(v);
              return next;
            })
          }
          options={yesNo}
        />
      </Field>

      {/* Q2 */}
      <Field
        required
        title="In the past month have you had any actual thoughts of killing yourself?"
      >
        <Likert
          value={cssrs?.thoughts ?? ""}
          onChange={(v) =>
            setProfile((prev) => {
              if (prev.assessments.kind !== "child") return prev;
              const next = { ...prev };
              const c = ensureCssrs(next);
              const val = String(v);
              c.thoughts = val;
              if (val === "no") {
                c.methodHow = "";
                c.intention = "";
                c.plan = "";
              }
              return next;
            })
          }
          options={yesNo}
        />
      </Field>

      {/* Q3 */}
      {showMethodHow && (
        <Field
          required
          title="Have you been thinking about how you might do this?"
        >
          <Likert
            value={cssrs?.methodHow ?? ""}
            onChange={(v) =>
              setProfile((prev) => {
                if (prev.assessments.kind !== "child") return prev;
                const next = { ...prev };
                const c = ensureCssrs(next);
                c.methodHow = String(v);
                return next;
              })
            }
            options={yesNo}
          />
        </Field>
      )}

      {/* Q4 */}
      {showIntention && (
        <Field
          required
          title="Have you had these thoughts and had some intention of acting on them?"
        >
          <Likert
            value={cssrs?.intention ?? ""}
            onChange={(v) =>
              setProfile((prev) => {
                if (prev.assessments.kind !== "child") return prev;
                const next = { ...prev };
                const c = ensureCssrs(next);
                c.intention = String(v);
                return next;
              })
            }
            options={yesNo}
          />
        </Field>
      )}

      {/* Q5 */}
      {showPlan && (
        <Field
          required
          title="Have you started to work out or worked out the details of how to kill yourself? Do you intend to carry out this plan?"
        >
          <Likert
            value={cssrs?.plan ?? ""}
            onChange={(v) =>
              setProfile((prev) => {
                if (prev.assessments.kind !== "child") return prev;
                const next = { ...prev };
                const c = ensureCssrs(next);
                c.plan = String(v);
                return next;
              })
            }
            options={yesNo}
          />
        </Field>
      )}

      {/* Q6 */}
      <Field
        required
        title="Have you ever done anything, started to do anything, or prepared to do anything to end your life?"
      >
        <Likert
          value={cssrs?.behavior ?? ""}
          onChange={(v) =>
            setProfile((prev) => {
              if (prev.assessments.kind !== "child") return prev;
              const next = { ...prev };
              const c = ensureCssrs(next);
              const val = String(v);
              c.behavior = val;
              if (val !== "yes") c.behavior3mo = "";
              return next;
            })
          }
          options={yesNo}
        />
      </Field>

      {/* Q7 */}
      {showBehavior3mo && (
        <Field required title="Was this within the past three months?">
          <Likert
            value={cssrs?.behavior3mo ?? ""}
            onChange={(v) =>
              setProfile((prev) => {
                if (prev.assessments.kind !== "child") return prev;
                const next = { ...prev };
                const c = ensureCssrs(next);
                c.behavior3mo = String(v);
                return next;
              })
            }
            options={yesNo}
          />
        </Field>
      )}
    </div>
  );
}
