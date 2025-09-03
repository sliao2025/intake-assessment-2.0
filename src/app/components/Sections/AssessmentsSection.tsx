"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Separator from "../primitives/Separator";
import Likert from "../primitives/Likert";
import type { Profile } from "../../lib/types";
import { ChevronDown } from "lucide-react";

/** Simple collapsible with gating */
function Collapsible({
  title,
  children,
  open,
  setOpen,
  enabled,
  subtitle,
}: {
  title: string;
  subtitle?: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  enabled: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 bg-white ${
        enabled ? "border-slate-300" : "border-slate-200 opacity-60"
      }`}
    >
      <button
        type="button"
        disabled={!enabled}
        onClick={() => enabled && setOpen(!open)}
        className={`w-full flex items-center justify-between text-left ${
          enabled ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div>
          <div className="font-semibold text-slate-900">{title}</div>
          {subtitle && <div className="text-slate-500 text-sm">{subtitle}</div>}
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {open && <div className="pt-3">{children}</div>}
    </div>
  );
}

/** Scales (Likert options) */
const yesNo = [
  { key: "yes", label: "Yes" },
  { key: "no", label: "No" },
];

const protective = [
  { key: "strong", label: "Strong" },
  { key: "some", label: "Some" },
  { key: "limited", label: "Limited" },
  { key: "none", label: "None" },
];

const freq0to3 = [
  { key: "0", label: "Not at all" },
  { key: "1", label: "Several days" },
  { key: "2", label: "More than half the days" },
  { key: "3", label: "Nearly every day" },
];

const asrs0to4 = [
  { key: "0", label: "Never" },
  { key: "1", label: "Rarely" },
  { key: "2", label: "Sometimes" },
  { key: "3", label: "Often" },
  { key: "4", label: "Very often" },
];

const pcl0to4 = [
  { key: "0", label: "Not at all" },
  { key: "1", label: "A little bit" },
  { key: "2", label: "Moderately" },
  { key: "3", label: "Quite a bit" },
  { key: "4", label: "Extremely" },
];

const pss0to4 = [
  { key: "0", label: "Never" },
  { key: "1", label: "Almost never" },
  { key: "2", label: "Sometimes" },
  { key: "3", label: "Fairly often" },
  { key: "4", label: "Very often" },
];

export default function AssessmentsSection({
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
  const a = profile.assessments;

  // Collapsible open state
  const [open1, setOpen1] = React.useState(true); // Suicide
  const [open2, setOpen2] = React.useState(false); // PHQ-9
  const [open3, setOpen3] = React.useState(false); // Self-harm
  const [open4, setOpen4] = React.useState(false); // ASRS-5
  const [open5, setOpen5] = React.useState(false); // PTSD
  const [open6, setOpen6] = React.useState(false); // ACE
  const [open7, setOpen7] = React.useState(false); // Stress

  const phqKeys = [
    "phq1",
    "phq2",
    "phq3",
    "phq4",
    "phq5",
    "phq6",
    "phq7",
    "phq8",
    "phq9",
  ] as const;
  const asrsKeys = [
    "asrs1",
    "asrs2",
    "asrs3",
    "asrs4",
    "asrs5",
    "asrs6",
  ] as const;
  const ptsdKeys = ["ptsd1", "ptsd2", "ptsd3", "ptsd4", "ptsd5"] as const;
  const aceKeys = [
    "ace1",
    "ace2",
    "ace3",
    "ace4",
    "ace5",
    "ace6",
    "ace7",
    "ace8",
    "ace9",
    "ace10",
  ] as const;
  const pssKeys = ["pss1", "pss2", "pss3", "pss4"] as const;

  // Completion gates
  const complete1 =
    a.suicide.ideation !== "" &&
    a.suicide.intent !== "" &&
    a.suicide.plan !== "" &&
    a.suicide.protective !== "";
  const complete2 = phqKeys.every((k) => a.phq9[k] !== "");
  const complete3 = a.selfHarm.pastMonth !== "" && a.selfHarm.lifetime !== "";
  const complete4 = asrsKeys.every((k) => a.asrs5[k] !== "");
  const complete5 = ptsdKeys.every((k) => a.ptsd[k] !== "");
  const complete6 = aceKeys.every((k) => a.ace[k] !== "");
  const complete7 = pssKeys.every((k) => a.stress[k] !== "");

  // Auto-open subsequent when previous completes
  React.useEffect(() => {
    if (complete1 && !open2) setOpen2(true);
  }, [complete1, open2]);
  React.useEffect(() => {
    if (complete2 && !open3) setOpen3(true);
  }, [complete2, open3]);
  React.useEffect(() => {
    if (complete3 && !open4) setOpen4(true);
  }, [complete3, open4]);
  React.useEffect(() => {
    if (complete4 && !open5) setOpen5(true);
  }, [complete4, open5]);
  React.useEffect(() => {
    if (complete5 && !open6) setOpen6(true);
  }, [complete5, open6]);
  React.useEffect(() => {
    if (complete6 && !open7) setOpen7(true);
  }, [complete6, open7]);

  // Helpers to set nested values
  const setA = (path: (p: Profile) => void) =>
    setProfile((p) => {
      const next = { ...p, assessments: { ...p.assessments } } as Profile;
      // deep copy shallow sub-objects we touch:
      next.assessments.suicide = { ...p.assessments.suicide };
      next.assessments.phq9 = { ...p.assessments.phq9 };
      next.assessments.selfHarm = { ...p.assessments.selfHarm };
      next.assessments.asrs5 = { ...p.assessments.asrs5 };
      next.assessments.ptsd = { ...p.assessments.ptsd };
      next.assessments.ace = { ...p.assessments.ace };
      next.assessments.stress = { ...p.assessments.stress };
      path(next);
      return next;
    });

  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title} />

      {/* 1) Suicide */}
      <Collapsible
        title="Suicide Risk (screen)"
        subtitle="Brief safety screen"
        open={open1}
        setOpen={setOpen1}
        enabled={true}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Field title="Thoughts about death or killing yourself?">
            <Likert
              value={a.suicide.ideation}
              onChange={(v) =>
                setA((n) => (n.assessments.suicide.ideation = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Current intent to act on these thoughts?">
            <Likert
              value={a.suicide.intent}
              onChange={(v) =>
                setA((n) => (n.assessments.suicide.intent = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Do you have a plan?">
            <Likert
              value={a.suicide.plan}
              onChange={(v) =>
                setA((n) => (n.assessments.suicide.plan = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Protective factors/supports">
            <Likert
              value={a.suicide.protective}
              onChange={(v) =>
                setA((n) => (n.assessments.suicide.protective = String(v)))
              }
              options={protective}
            />
          </Field>
        </div>
      </Collapsible>

      {/* 2) PHQ-9 */}
      <Collapsible
        title="PHQ-9 (depression)"
        subtitle="Over the last 2 weeks"
        open={open2}
        setOpen={setOpen2}
        enabled={complete1}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {([1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map((i) => (
            <Field key={`phq${i}`} title={`PHQ-${i}`}>
              <Likert
                value={(a.phq9 as any)[`phq${i}`]}
                onChange={(v) =>
                  setA((n) => ((n.assessments.phq9 as any)[`phq${i}`] = v))
                }
                options={freq0to3}
              />
            </Field>
          ))}
        </div>
      </Collapsible>

      {/* 3) Self-Harm */}
      <Collapsible
        title="Self-Harm"
        subtitle="History and recent behavior"
        open={open3}
        setOpen={setOpen3}
        enabled={complete2}
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Field title="Self-harm in the past month?">
            <Likert
              value={a.selfHarm.pastMonth}
              onChange={(v) =>
                setA((n) => (n.assessments.selfHarm.pastMonth = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Self-harm at any point in your life?">
            <Likert
              value={a.selfHarm.lifetime}
              onChange={(v) =>
                setA((n) => (n.assessments.selfHarm.lifetime = String(v)))
              }
              options={yesNo}
            />
          </Field>
        </div>
      </Collapsible>

      {/* 4) ASRS-5 (Adult ADHD Screener - 6 items) */}
      <Collapsible
        title="ASRS-5 (ADHD)"
        subtitle="Over the last 6 months"
        open={open4}
        setOpen={setOpen4}
        enabled={complete3}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {([1, 2, 3, 4, 5, 6] as const).map((i) => (
            <Field key={`asrs${i}`} title={`ASRS-${i}`}>
              <Likert
                value={(a.asrs5 as any)[`asrs${i}`]}
                onChange={(v) =>
                  setA((n) => ((n.assessments.asrs5 as any)[`asrs${i}`] = v))
                }
                options={asrs0to4}
              />
            </Field>
          ))}
        </div>
      </Collapsible>

      {/* 5) PTSD (PCL-5 short, 5 items) */}
      <Collapsible
        title="PTSD (symptoms)"
        subtitle="Past month"
        open={open5}
        setOpen={setOpen5}
        enabled={complete4}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {([1, 2, 3, 4, 5] as const).map((i) => (
            <Field key={`ptsd${i}`} title={`PTSD-${i}`}>
              <Likert
                value={(a.ptsd as any)[`ptsd${i}`]}
                onChange={(v) =>
                  setA((n) => ((n.assessments.ptsd as any)[`ptsd${i}`] = v))
                }
                options={pcl0to4}
              />
            </Field>
          ))}
        </div>
      </Collapsible>

      {/* 6) ACE (10 items, Yes/No) */}
      <Collapsible
        title="ACE (Adverse Childhood Experiences)"
        open={open6}
        setOpen={setOpen6}
        enabled={complete5}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const).map((i) => (
            <Field key={`ace${i}`} title={`ACE-${i}`}>
              <Likert
                value={(a.ace as any)[`ace${i}`]}
                onChange={(v) =>
                  setA((n) => ((n.assessments.ace as any)[`ace${i}`] = v))
                }
                options={yesNo}
              />
            </Field>
          ))}
        </div>
      </Collapsible>

      {/* 7) Stress (PSS-4) */}
      <Collapsible
        title="Perceived Stress (PSS-4)"
        open={open7}
        setOpen={setOpen7}
        enabled={complete6}
      >
        <div className="grid md:grid-cols-2 gap-4">
          {([1, 2, 3, 4] as const).map((i) => (
            <Field key={`pss${i}`} title={`PSS-${i}`}>
              <Likert
                value={(a.stress as any)[`pss${i}`]}
                onChange={(v) =>
                  setA((n) => ((n.assessments.stress as any)[`pss${i}`] = v))
                }
                options={pss0to4}
              />
            </Field>
          ))}
        </div>
      </Collapsible>

      {/* Minor affordance: hint if next is locked */}
      {!complete1 && (
        <div className="text-xs text-slate-500">
          Complete the Suicide screen to unlock PHQ-9.
        </div>
      )}
      {complete1 && !complete2 && (
        <div className="text-xs text-slate-500">
          Complete PHQ-9 to unlock Self-Harm.
        </div>
      )}
      {complete2 && !complete3 && (
        <div className="text-xs text-slate-500">
          Complete Self-Harm to unlock ASRS-5.
        </div>
      )}
      {complete3 && !complete4 && (
        <div className="text-xs text-slate-500">
          Complete ASRS-5 to unlock PTSD.
        </div>
      )}
      {complete4 && !complete5 && (
        <div className="text-xs text-slate-500">
          Complete PTSD to unlock ACE.
        </div>
      )}
      {complete5 && !complete6 && (
        <div className="text-xs text-slate-500">
          Complete ACE to unlock PSS-4.
        </div>
      )}
    </div>
  );
}
