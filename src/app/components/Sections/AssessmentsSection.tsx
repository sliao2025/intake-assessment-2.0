"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Likert from "../primitives/Likert";
import type { Profile } from "../../lib/types";
import { ChevronDown, ArrowRight } from "lucide-react";
import { intPsychTheme } from "../theme";

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
  const [open1, setOpen1] = React.useState(false); // Suicide
  const [open2, setOpen2] = React.useState(true); // PHQ-9
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

  // Latching unlock flags so once a section is unlocked it stays interactive
  const [u2, setU2] = React.useState(complete1);
  const [u3, setU3] = React.useState(complete2);
  const [u4, setU4] = React.useState(complete3);
  const [u5, setU5] = React.useState(complete4);
  const [u6, setU6] = React.useState(complete5);
  const [u7, setU7] = React.useState(complete6);

  // One-time auto-open on first unlock (detect rising edge)
  const prevComplete1 = React.useRef(complete1);
  const prevComplete2 = React.useRef(complete2);
  const prevComplete3 = React.useRef(complete3);
  const prevComplete4 = React.useRef(complete4);
  const prevComplete5 = React.useRef(complete5);
  const prevComplete6 = React.useRef(complete6);

  React.useEffect(() => {
    if (!prevComplete1.current && complete1) {
      setU2(true);
      setOpen2(true);
    }
    prevComplete1.current = complete1;
  }, [complete1]);

  React.useEffect(() => {
    if (!prevComplete2.current && complete2) {
      setU3(true);
      setOpen3(true);
    }
    prevComplete2.current = complete2;
  }, [complete2]);

  React.useEffect(() => {
    if (!prevComplete3.current && complete3) {
      setU4(true);
      setOpen4(true);
    }
    prevComplete3.current = complete3;
  }, [complete3]);

  React.useEffect(() => {
    if (!prevComplete4.current && complete4) {
      setU5(true);
      setOpen5(true);
    }
    prevComplete4.current = complete4;
  }, [complete4]);

  React.useEffect(() => {
    if (!prevComplete5.current && complete5) {
      setU6(true);
      setOpen6(true);
    }
    prevComplete5.current = complete5;
  }, [complete5]);

  React.useEffect(() => {
    if (!prevComplete6.current && complete6) {
      setU7(true);
      setOpen7(true);
    }
    prevComplete6.current = complete6;
  }, [complete6]);

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
  function Phq9CAT() {
    const [sessionId, setSessionId] = React.useState<string | null>(null);
    const [item, setItem] = React.useState<any>(null);
    const [theta, setTheta] = React.useState<number | null>(null);
    const [se, setSe] = React.useState<number | null>(null);
    const [expected, setExpected] = React.useState<number | null>(null);
    const [done, setDone] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [answered, setAnswered] = React.useState<number>(0);
    const [selected, setSelected] = React.useState<string>(""); // Local selection state

    async function createSession() {
      setLoading(true);
      try {
        const r = await fetch("/api/sessions", {
          method: "POST",
          body: JSON.stringify({
            assessmentSlug: "phq9",
            userId: "anon",
            scaleCode: "PHQ9",
          }),
        });
        const data = await r.json();
        setSessionId(data.sessionId);
        return data.sessionId as string;
      } finally {
        setLoading(false);
      }
    }

    async function fetchNext(sessId: string) {
      setLoading(true);
      try {
        const r = await fetch("/api/cat/next-item", {
          method: "POST",
          body: JSON.stringify({ sessionId: sessId }),
        });
        const data = await r.json();
        setTheta(data.theta ?? null);
        setSe(data.se ?? null);
        setExpected(data.expectedTotal ?? null);

        if (data.stop || !data.nextItemId) {
          setDone(true);
          setItem(null);
          return;
        }
        const itm = await (
          await fetch(`/api/cat/next-item?lookup=${data.nextItemId}`)
        ).json();
        setItem(itm);
        setSelected(""); // Clear selection on new item
      } finally {
        setLoading(false);
      }
    }

    async function start() {
      const id = await createSession();
      setSelected(""); // Clear selection when starting new session
      await fetchNext(id);
    }

    async function answer(val: number) {
      if (!sessionId || !item) return;
      setLoading(true);
      try {
        await fetch("/api/sessions", {
          method: "PUT",
          body: JSON.stringify({ sessionId, itemId: item.id, value: val }),
        });
        setAnswered((n) => n + 1);
        await fetchNext(sessionId);
      } finally {
        setLoading(false);
      }
    }

    React.useEffect(() => {
      // auto-start on mount
      start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="space-y-3">
        {!done && !item && (
          <>{loading ? "Loading…" : "Preparing your first item…"}</>
        )}

        {item && (
          <div className="space-y-4">
            <Field title={item.stem}>
              {/* Build Likert options from the CAT item payload to match original PHQ-9 style */}
              {(() => {
                const opts =
                  item?.options?.labels?.map((lbl: string, i: number) => ({
                    key: String(item.options.values[i]),
                    label: lbl,
                  })) ?? [];
                return (
                  <Likert
                    value={selected}
                    onChange={(v) => setSelected(String(v))}
                    options={opts}
                  />
                );
              })()}
            </Field>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                disabled={!selected || loading}
                onClick={() => selected && answer(Number(selected))}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold cursor-pointer text-white disabled:opacity-50"
                style={{
                  background: selected ? intPsychTheme.accent : "#94a3b8",
                }}
              >
                {loading ? "Submitting…" : <ArrowRight className="h-6 w-6" />}
              </button>
            </div>
            <div className="text-sm text-gray-600">
              θ {theta?.toFixed(2)} • SE {se?.toFixed(2)}
              {typeof expected === "number" ? (
                <> • Expected {expected.toFixed(1)}</>
              ) : null}
              • Answered {answered}
            </div>
          </div>
        )}

        {done && (
          <div className="space-y-2">
            <div className="font-semibold">PHQ-9 Complete</div>
            <div className="text-sm text-gray-700">
              Final θ {theta?.toFixed(2)} • SE {se?.toFixed(2)}
              {typeof expected === "number" ? (
                <> • Expected {expected.toFixed(1)}</>
              ) : null}
            </div>
            <button
              onClick={start}
              className="inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold text-white"
              style={{ background: "#0ea5e9" }}
            >
              Restart PHQ-9
            </button>
          </div>
        )}
      </div>
    );
  }

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
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="In the past few weeks, have you wished you were dead or wished you could go to sleep and not wake up?">
            <Likert
              value={a.suicide.ideation}
              onChange={(v) =>
                setA((n) => (n.assessments.suicide.ideation = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Are you having thoughts of killing yourself right now?">
            <Likert
              value={a.suicide.intent}
              onChange={(v) =>
                setA((n) => (n.assessments.suicide.intent = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Have you been thinking about how you might kill yourself?">
            <Likert
              value={a.suicide.plan}
              onChange={(v) =>
                setA((n) => (n.assessments.suicide.plan = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Do you have reasons for living or protective factors that keep you safe?">
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
        title="PHQ-9 (Adaptive)"
        subtitle="Over the last 2 weeks — delivered adaptively"
        open={open2}
        setOpen={setOpen2}
        enabled={true}
      >
        <Phq9CAT />
      </Collapsible>
      {/* <Collapsible
        title="PHQ-9"
        subtitle="Over the last 2 weeks"
        open={open2}
        setOpen={setOpen2}
        enabled={u2}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="Little interest or pleasure in doing things">
            <Likert
              value={a.phq9.phq1}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq1 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Feeling down, depressed, or hopeless">
            <Likert
              value={a.phq9.phq2}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq2 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Trouble falling or staying asleep, or sleeping too much">
            <Likert
              value={a.phq9.phq3}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq3 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Feeling tired or having little energy">
            <Likert
              value={a.phq9.phq4}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq4 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Poor appetite or overeating">
            <Likert
              value={a.phq9.phq5}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq5 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Feeling bad about yourself — or that you are a failure or have let yourself or your family down">
            <Likert
              value={a.phq9.phq6}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq6 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Trouble concentrating on things, such as reading the newspaper or watching television">
            <Likert
              value={a.phq9.phq7}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq7 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual">
            <Likert
              value={a.phq9.phq8}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq8 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Thoughts that you would be better off dead, or of hurting yourself in some way">
            <Likert
              value={a.phq9.phq9}
              onChange={(v) =>
                setA((n) => (n.assessments.phq9.phq9 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
        </div>
      </Collapsible> */}

      {/* 3) Self-Harm */}
      <Collapsible
        title="Self-Harm"
        subtitle="History and recent behavior"
        open={open3}
        setOpen={setOpen3}
        enabled={u3}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="In the past month, have you intentionally hurt yourself (e.g., cut, burned, scratched) without wanting to die?">
            <Likert
              value={a.selfHarm.pastMonth}
              onChange={(v) =>
                setA((n) => (n.assessments.selfHarm.pastMonth = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Have you ever intentionally hurt yourself without wanting to die?">
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
        title="ASRS-5"
        subtitle="Over the last 6 months"
        open={open4}
        setOpen={setOpen4}
        enabled={u4}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?">
            <Likert
              value={a.asrs5.asrs1}
              onChange={(v) =>
                setA((n) => (n.assessments.asrs5.asrs1 = String(v)))
              }
              options={asrs0to4}
            />
          </Field>
          <Field title="How often do you have difficulty getting things in order when you have to do a task that requires organization?">
            <Likert
              value={a.asrs5.asrs2}
              onChange={(v) =>
                setA((n) => (n.assessments.asrs5.asrs2 = String(v)))
              }
              options={asrs0to4}
            />
          </Field>
          <Field title="How often do you have problems remembering appointments or obligations?">
            <Likert
              value={a.asrs5.asrs3}
              onChange={(v) =>
                setA((n) => (n.assessments.asrs5.asrs3 = String(v)))
              }
              options={asrs0to4}
            />
          </Field>
          <Field title="When you have a task that requires a lot of thought, how often do you avoid or delay getting started?">
            <Likert
              value={a.asrs5.asrs4}
              onChange={(v) =>
                setA((n) => (n.assessments.asrs5.asrs4 = String(v)))
              }
              options={asrs0to4}
            />
          </Field>
          <Field title="How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?">
            <Likert
              value={a.asrs5.asrs5}
              onChange={(v) =>
                setA((n) => (n.assessments.asrs5.asrs5 = String(v)))
              }
              options={asrs0to4}
            />
          </Field>
          <Field title="How often do you feel overly active and compelled to do things, like you were driven by a motor?">
            <Likert
              value={a.asrs5.asrs6}
              onChange={(v) =>
                setA((n) => (n.assessments.asrs5.asrs6 = String(v)))
              }
              options={asrs0to4}
            />
          </Field>
        </div>
      </Collapsible>

      {/* 5) PTSD (PCL-5 short, 5 items) */}
      <Collapsible
        title="PTSD"
        subtitle="Past month"
        open={open5}
        setOpen={setOpen5}
        enabled={u5}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="In the past month, how often have you had nightmares about a stressful experience or thought about it when you did not want to?">
            <Likert
              value={a.ptsd.ptsd1}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd1 = String(v)))
              }
              options={pcl0to4}
            />
          </Field>
          <Field title="In the past month, how often have you tried hard not to think about a stressful experience or avoided situations that reminded you of it?">
            <Likert
              value={a.ptsd.ptsd2}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd2 = String(v)))
              }
              options={pcl0to4}
            />
          </Field>
          <Field title="In the past month, how often have you been constantly on guard, watchful, or easily startled?">
            <Likert
              value={a.ptsd.ptsd3}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd3 = String(v)))
              }
              options={pcl0to4}
            />
          </Field>
          <Field title="In the past month, how often have you felt numb or detached from people, activities, or your surroundings?">
            <Likert
              value={a.ptsd.ptsd4}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd4 = String(v)))
              }
              options={pcl0to4}
            />
          </Field>
          <Field title="In the past month, how often have you felt guilty or unable to stop blaming yourself or others for the stressful experience?">
            <Likert
              value={a.ptsd.ptsd5}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd5 = String(v)))
              }
              options={pcl0to4}
            />
          </Field>
        </div>
      </Collapsible>

      {/* 6) ACE (10 items, Yes/No) */}
      <Collapsible
        title="ACE (Adverse Childhood Experiences)"
        open={open6}
        setOpen={setOpen6}
        enabled={u6}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="Did a parent or other adult in the household often or very often swear at you, insult you, put you down, or humiliate you?">
            <Likert
              value={a.ace.ace1}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace1 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Did a parent or other adult in the household often or very often push, grab, slap, or throw something at you?">
            <Likert
              value={a.ace.ace2}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace2 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Did an adult or person at least 5 years older than you ever touch or fondle you or have you touch their body in a sexual way?">
            <Likert
              value={a.ace.ace3}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace3 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Did you often or very often feel that no one in your family loved you or thought you were important or special?">
            <Likert
              value={a.ace.ace4}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace4 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Did you often or very often feel that you didn’t have enough to eat, had to wear dirty clothes, or had no one to protect you?">
            <Likert
              value={a.ace.ace5}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace5 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Was a biological parent ever lost to you through divorce, abandonment, or other reason?">
            <Likert
              value={a.ace.ace6}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace6 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Was your mother or stepmother often or very often pushed, grabbed, slapped, or had something thrown at her?">
            <Likert
              value={a.ace.ace7}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace7 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Did you live with anyone who was a problem drinker or alcoholic, or who used street drugs?">
            <Likert
              value={a.ace.ace8}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace8 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Was a household member depressed or mentally ill, or did a household member attempt suicide?">
            <Likert
              value={a.ace.ace9}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace9 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="Did a household member go to prison?">
            <Likert
              value={a.ace.ace10}
              onChange={(v) =>
                setA((n) => (n.assessments.ace.ace10 = String(v)))
              }
              options={yesNo}
            />
          </Field>
        </div>
      </Collapsible>

      {/* 7) Stress (PSS-4) */}
      <Collapsible
        title="Perceived Stress (PSS-4)"
        open={open7}
        setOpen={setOpen7}
        enabled={u7}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="In the last month, how often have you felt that you were unable to control the important things in your life?">
            <Likert
              value={a.stress.pss1}
              onChange={(v) =>
                setA((n) => (n.assessments.stress.pss1 = String(v)))
              }
              options={pss0to4}
            />
          </Field>
          <Field title="In the last month, how often have you felt confident about your ability to handle your personal problems?">
            <Likert
              value={a.stress.pss2}
              onChange={(v) =>
                setA((n) => (n.assessments.stress.pss2 = String(v)))
              }
              options={pss0to4}
            />
          </Field>
          <Field title="In the last month, how often have you felt that things were going your way?">
            <Likert
              value={a.stress.pss3}
              onChange={(v) =>
                setA((n) => (n.assessments.stress.pss3 = String(v)))
              }
              options={pss0to4}
            />
          </Field>
          <Field title="In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?">
            <Likert
              value={a.stress.pss4}
              onChange={(v) =>
                setA((n) => (n.assessments.stress.pss4 = String(v)))
              }
              options={pss0to4}
            />
          </Field>
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
