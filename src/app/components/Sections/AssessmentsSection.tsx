"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Likert from "../primitives/Likert";
import type { Profile } from "../../lib/types/types";
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
  complete,
}: {
  title: string;
  subtitle?: React.ReactNode;
  open: boolean;
  setOpen: (v: boolean) => void;
  enabled: boolean;
  children: React.ReactNode;
  complete: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        complete ? "bg-green-50" : "bg-white"
      } ${
        enabled
          ? complete
            ? "border-green-500"
            : "border-slate-300"
          : "border-slate-200 opacity-60"
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
        </div>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {subtitle && (
        <div className="mt-1 text-slate-500 text-sm">{subtitle}</div>
      )}
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

const pss0to4 = [
  { key: "0", label: "Never" },
  { key: "1", label: "Almost never" },
  { key: "2", label: "Sometimes" },
  { key: "3", label: "Fairly often" },
  { key: "4", label: "Very often" },
];

const aceTrue5 = [
  { key: "0", label: "Definitely not true" },
  { key: "1", label: "Probably not true" },
  { key: "2", label: "Not sure" },
  { key: "3", label: "Probably true" },
  { key: "4", label: "Definitely true" },
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
  const [open2, setOpen2] = React.useState(false); // PHQ-9
  const [open3, setOpen3] = React.useState(false); // GAD-7
  const [openCRAFFT, setOpenCRAFFT] = React.useState(false); // CRAFFT
  const [open4, setOpen4] = React.useState(false); // Self-harm
  const [open5, setOpen5] = React.useState(false); // ASRS-5
  const [open6, setOpen6] = React.useState(false); // PTSD
  const [open7, setOpen7] = React.useState(false); // ACE
  const [open8, setOpen8] = React.useState(false); // Stress

  // Keys
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
  const gad7Keys = [
    "gad1",
    "gad2",
    "gad3",
    "gad4",
    "gad5",
    "gad6",
    "gad7",
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
  const aceRKeys = [
    "r01",
    "r02",
    "r03",
    "r04",
    "r05",
    "r06",
    "r07",
    "r08",
    "r09",
    "r10",
    "r11",
    "r12",
    "r13",
  ] as const;
  const pssKeys = ["pss1", "pss2", "pss3", "pss4"] as const;

  // Completion logic
  const complete1 = phqKeys.every((k) => a.phq9[k] !== "");
  const complete2 = gad7Keys.every((k) => a.gad7[k] !== "");

  // CRAFFT completion logic (2.1 rules)
  const crafftA = a.crafft?.partA ?? {
    daysAlcohol: "",
    daysMarijuana: "",
    daysOther: "",
  };
  const crafftB = a.crafft?.partB ?? {
    car: "",
    relax: "",
    alone: "",
    forget: "",
    familyFriends: "",
    trouble: "",
  };

  const partAAnswered =
    crafftA.daysAlcohol !== "" &&
    crafftA.daysMarijuana !== "" &&
    crafftA.daysOther !== "";

  const anyUse =
    Number(crafftA.daysAlcohol || "0") > 0 ||
    Number(crafftA.daysMarijuana || "0") > 0 ||
    Number(crafftA.daysOther || "0") > 0;

  // CAR is always visible; remaining five are required only if any use > 0
  const carAnswered = crafftB.car !== "";
  const remainingAnswered = anyUse
    ? crafftB.relax !== "" &&
      crafftB.alone !== "" &&
      crafftB.forget !== "" &&
      crafftB.familyFriends !== "" &&
      crafftB.trouble !== ""
    : true;

  const completeCRAFFT = partAAnswered && carAnswered && remainingAnswered;

  const complete3 = a.selfHarm.pastMonth !== "" && a.selfHarm.lifetime !== "";
  const complete4 = asrsKeys.every((k) => a.asrs5[k] !== "");
  const complete5 = ptsdKeys.every((k) => a.ptsd[k] !== "");
  const complete6 = aceRKeys.every((k) => a.aceResilience[k] !== "");
  const complete7 = pssKeys.every((k) => a.stress[k] !== "");

  // Gating (sequential):
  // PHQ-9 (always) -> GAD-7 -> CRAFFT -> Self-harm -> ASRS -> PTSD -> ACE -> PSS
  const [u2] = React.useState(true); // PHQ-9 always enabled
  const [u3, setU3] = React.useState(complete1); // GAD-7 after PHQ
  const [uCRAFFT, setUCRAFFT] = React.useState(complete2); // CRAFFT after GAD-7
  const [u4, setU4] = React.useState(completeCRAFFT); // Self-harm after CRAFFT
  const [u5, setU5] = React.useState(complete3); // ASRS
  const [u6, setU6] = React.useState(complete4); // PTSD
  const [u7, setU7] = React.useState(complete5); // ACE
  const [u8, setU8] = React.useState(complete6); // PSS

  // Rising-edge auto-open refs
  const prevComplete1 = React.useRef(complete1);
  const prevComplete2 = React.useRef(complete2);
  const prevCompleteCRAFFT = React.useRef(completeCRAFFT);
  const prevComplete3 = React.useRef(complete3);
  const prevComplete4 = React.useRef(complete4);
  const prevComplete5 = React.useRef(complete5);
  const prevComplete6 = React.useRef(complete6);

  React.useEffect(() => {
    if (!prevComplete1.current && complete1) {
      setU3(true);
      setOpen3(true);
    }
    prevComplete1.current = complete1;
  }, [complete1]);

  React.useEffect(() => {
    if (!prevComplete2.current && complete2) {
      setUCRAFFT(true);
      setOpenCRAFFT(true);
    }
    prevComplete2.current = complete2;
  }, [complete2]);

  React.useEffect(() => {
    if (!prevCompleteCRAFFT.current && completeCRAFFT) {
      setU4(true);
      setOpen4(true);
    }
    prevCompleteCRAFFT.current = completeCRAFFT;
  }, [completeCRAFFT]);

  React.useEffect(() => {
    if (!prevComplete3.current && complete3) {
      setU5(true);
      setOpen5(true);
    }
    prevComplete3.current = complete3;
  }, [complete3]);

  React.useEffect(() => {
    if (!prevComplete4.current && complete4) {
      setU6(true);
      setOpen6(true);
    }
    prevComplete4.current = complete4;
  }, [complete4]);

  React.useEffect(() => {
    if (!prevComplete5.current && complete5) {
      setU7(true);
      setOpen7(true);
    }
    prevComplete5.current = complete5;
  }, [complete5]);

  React.useEffect(() => {
    if (!prevComplete6.current && complete6) {
      setU8(true);
      setOpen8(true);
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
      next.assessments.gad7 = { ...p.assessments.gad7 };
      next.assessments.crafft = {
        partA: { ...(p.assessments as any).crafft?.partA },
        partB: { ...(p.assessments as any).crafft?.partB },
      };
      next.assessments.selfHarm = { ...p.assessments.selfHarm };
      next.assessments.asrs5 = { ...p.assessments.asrs5 };
      next.assessments.ptsd = { ...p.assessments.ptsd };
      next.assessments.aceResilience = { ...p.assessments.aceResilience };
      next.assessments.stress = { ...p.assessments.stress };
      path(next);
      return next;
    });

  /** ------- Optional: PHQ-9 CAT (kept intact) ------- */
  function Phq9CAT() {
    const [sessionId, setSessionId] = React.useState<string | null>(null);
    const [item, setItem] = React.useState<any>(null);
    const [theta, setTheta] = React.useState<number | null>(null);
    const [se, setSe] = React.useState<number | null>(null);
    const [expected, setExpected] = React.useState<number | null>(null);
    const [done, setDone] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [answered, setAnswered] = React.useState<number>(0);
    const [selected, setSelected] = React.useState<string>("");

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
        setSelected("");
      } finally {
        setLoading(false);
      }
    }

    async function start() {
      const id = await createSession();
      setSelected("");
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

  /** ------- CRAFFT Section ------- */
  function CRAFFTSection() {
    const pA = a.crafft.partA;
    const pB = a.crafft.partB;
    const showAllB =
      Number(pA.daysAlcohol || "0") > 0 ||
      Number(pA.daysMarijuana || "0") > 0 ||
      Number(pA.daysOther || "0") > 0;

    function DaysField({
      label,
      value,
      onChange,
    }: {
      label: string;
      value: string;
      onChange: (v: string) => void;
    }) {
      return (
        <div className="flex items-center gap-2">
          <label className="text-[15px] font-medium text-slate-800 w-56">
            {label}
          </label>
          <input
            type="number"
            inputMode="numeric"
            min={0}
            max={365}
            className="w-24 rounded-lg border border-slate-300 px-2 py-1 text-[15px] text-slate-800"
            value={value}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^\d]/g, "");
              if (raw === "") return onChange("");
              const n = Math.max(0, Math.min(365, parseInt(raw, 10)));
              onChange(String(n));
            }}
            placeholder="0"
          />
          <span className="text-slate-500 text-sm">days</span>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h1 className="italic text-slate-800">
          During the <b>past 12 months</b>:
        </h1>

        {/* Part A */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-2">
          <div className="text-sm font-semibold text-slate-900">Part A</div>
          <DaysField
            label="Alcohol (beer, wine, liquor)"
            value={pA.daysAlcohol}
            onChange={(v) =>
              setA((n) => (n.assessments.crafft.partA.daysAlcohol = v))
            }
          />
          <DaysField
            label="Marijuana / THC (incl. vapes/edibles)"
            value={pA.daysMarijuana}
            onChange={(v) =>
              setA((n) => (n.assessments.crafft.partA.daysMarijuana = v))
            }
          />
          <DaysField
            label="Other drugs to get high"
            value={pA.daysOther}
            onChange={(v) =>
              setA((n) => (n.assessments.crafft.partA.daysOther = v))
            }
          />
        </div>

        {/* Part B */}
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <div className="text-sm font-semibold text-slate-900 mb-2">
            Part B
          </div>

          {/* CAR is always present */}
          <Field title="Have you ever ridden in a CAR driven by someone (including yourself) who was high or had been using alcohol or drugs?">
            <Likert
              value={pB.car}
              onChange={(v) =>
                setA((n) => (n.assessments.crafft.partB.car = String(v)))
              }
              options={yesNo}
            />
          </Field>

          {showAllB && (
            <>
              <Field title="Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in?">
                <Likert
                  value={pB.relax}
                  onChange={(v) =>
                    setA((n) => (n.assessments.crafft.partB.relax = String(v)))
                  }
                  options={yesNo}
                />
              </Field>
              <Field title="Do you ever use alcohol or drugs while you are by yourself, or ALONE?">
                <Likert
                  value={pB.alone}
                  onChange={(v) =>
                    setA((n) => (n.assessments.crafft.partB.alone = String(v)))
                  }
                  options={yesNo}
                />
              </Field>
              <Field title="Do you ever FORGET things you did while using alcohol or drugs?">
                <Likert
                  value={pB.forget}
                  onChange={(v) =>
                    setA((n) => (n.assessments.crafft.partB.forget = String(v)))
                  }
                  options={yesNo}
                />
              </Field>
              <Field title="Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use?">
                <Likert
                  value={pB.familyFriends}
                  onChange={(v) =>
                    setA(
                      (n) =>
                        (n.assessments.crafft.partB.familyFriends = String(v))
                    )
                  }
                  options={yesNo}
                />
              </Field>
              <Field title="Have you ever gotten into TROUBLE while you were using alcohol or drugs?">
                <Likert
                  value={pB.trouble}
                  onChange={(v) =>
                    setA(
                      (n) => (n.assessments.crafft.partB.trouble = String(v))
                    )
                  }
                  options={yesNo}
                />
              </Field>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title} />

      {/* 2) PHQ-9 */}
      {/* <Collapsible
        title="PHQ-9 (Adaptive)"
        subtitle="Over the last 2 weeks — delivered adaptively"
        open={open2}
        setOpen={setOpen2}
        enabled={true}
      >
        <Phq9CAT />
      </Collapsible> */}

      <Collapsible
        title="PHQ-9"
        subtitle="Patient Health Questionaire-9"
        open={open2}
        setOpen={setOpen2}
        enabled={u2}
        complete={complete1}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <h1 className="italic text-slate-800">
            <b>Over the last 2 weeks</b>, how often have you been bothered by
            the following problems
          </h1>
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
      </Collapsible>

      {/* 3) GAD-7 */}
      <Collapsible
        title="GAD-7"
        subtitle="General Anxiety Disorder-7"
        open={open3}
        setOpen={setOpen3}
        enabled={u3}
        complete={complete2}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <h1 className="italic text-slate-800">
            <b>Over the last 2 weeks</b>, how often have you been bothered by
            the following problems
          </h1>
          <Field title="Feeling nervous, anxious, or on edge">
            <Likert
              value={a.gad7.gad1}
              onChange={(v) =>
                setA((n) => (n.assessments.gad7.gad1 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Not being able to stop or control worrying">
            <Likert
              value={a.gad7.gad2}
              onChange={(v) =>
                setA((n) => (n.assessments.gad7.gad2 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Worrying too much about different things">
            <Likert
              value={a.gad7.gad3}
              onChange={(v) =>
                setA((n) => (n.assessments.gad7.gad3 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Trouble relaxing">
            <Likert
              value={a.gad7.gad4}
              onChange={(v) =>
                setA((n) => (n.assessments.gad7.gad4 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Being so restless that it is hard to sit still">
            <Likert
              value={a.gad7.gad5}
              onChange={(v) =>
                setA((n) => (n.assessments.gad7.gad5 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Becoming easily annoyed or irritable">
            <Likert
              value={a.gad7.gad6}
              onChange={(v) =>
                setA((n) => (n.assessments.gad7.gad6 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
          <Field title="Feeling afraid as if something awful might happen">
            <Likert
              value={a.gad7.gad7}
              onChange={(v) =>
                setA((n) => (n.assessments.gad7.gad7 = String(v)))
              }
              options={freq0to3}
            />
          </Field>
        </div>
      </Collapsible>

      {/* CRAFFT (after GAD-7) */}
      <Collapsible
        title="CRAFFT 2.1"
        subtitle="Substance Use Screener"
        open={openCRAFFT}
        setOpen={setOpenCRAFFT}
        enabled={uCRAFFT}
        complete={completeCRAFFT}
      >
        <CRAFFTSection />
      </Collapsible>

      {/* 4) Self-Harm */}
      <Collapsible
        title="Self-Harm"
        subtitle="Non-suicidal self-injury"
        open={open4}
        setOpen={setOpen4}
        enabled={u4}
        complete={complete3}
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

      {/* 5) ASRS-5 */}
      <Collapsible
        title="ASRS-5"
        subtitle="Adult ADHD Self-Report Scale"
        open={open5}
        setOpen={setOpen5}
        enabled={u5}
        complete={complete4}
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

      {/* 6) PTSD */}
      <Collapsible
        title="PTSD"
        subtitle="PCL-5 Short"
        open={open6}
        setOpen={setOpen6}
        enabled={u6}
        complete={complete5}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="In the past month, have you had nightmares or thought about the traumatic event(s) when you did not want to? ">
            <Likert
              value={a.ptsd.ptsd1}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd1 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="In the past month, have you tried hard not to think about the traumatic event(s) or went out of your way to avoid situations that reminded you of these event(s)?">
            <Likert
              value={a.ptsd.ptsd2}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd2 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="In the past month, have you been constantly on guard, watchful, or easily startled?">
            <Likert
              value={a.ptsd.ptsd3}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd3 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="In the past month, have you felt numb or detached from people, activities, or your surroundings?">
            <Likert
              value={a.ptsd.ptsd4}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd4 = String(v)))
              }
              options={yesNo}
            />
          </Field>
          <Field title="In the past month, have you felt guilty or unable to stop blaming yourself or others for the traumatic event(s) or any problems these event(s) may have caused?">
            <Likert
              value={a.ptsd.ptsd5}
              onChange={(v) =>
                setA((n) => (n.assessments.ptsd.ptsd5 = String(v)))
              }
              options={yesNo}
            />
          </Field>
        </div>
      </Collapsible>

      {/* 7) ACE Resilience (13 items, 5-point truth scale) */}
      <Collapsible
        title="ACE"
        subtitle="Adverse Childhood Experiences"
        open={open7}
        setOpen={setOpen7}
        enabled={u7}
        complete={complete6}
      >
        <div className="grid md:grid-cols-1 gap-4">
          <Field title="I believe that my mother loved me when I was little.">
            <Likert
              value={a.aceResilience.r01}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r01 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="I believe that my father loved me when I was little.">
            <Likert
              value={a.aceResilience.r02}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r02 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="When I was little, other people helped my mother and father take care of me and they seemed to love me.">
            <Likert
              value={a.aceResilience.r03}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r03 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="I’ve heard that when I was an infant someone in my family enjoyed playing with me, and I enjoyed it too.">
            <Likert
              value={a.aceResilience.r04}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r04 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>

          <Field title="When I was a child, there were relatives who made me feel better if I was sad or worried.">
            <Likert
              value={a.aceResilience.r05}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r05 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="When I was a child, neighbors or my friends’ parents seemed to like me.">
            <Likert
              value={a.aceResilience.r06}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r06 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="When I was a child, teachers, coaches, youth leaders or ministers were there to help me.">
            <Likert
              value={a.aceResilience.r07}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r07 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>

          <Field title="My family, neighbors and friends talked often about making our lives better.">
            <Likert
              value={a.aceResilience.r08}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r08 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="We had rules in our house and were expected to keep them.">
            <Likert
              value={a.aceResilience.r09}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r09 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="When I felt really bad, I could almost always find someone I trusted to talk to.">
            <Likert
              value={a.aceResilience.r10}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r10 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>

          <Field title="As a youth, people noticed that I was capable and could get things done.">
            <Likert
              value={a.aceResilience.r11}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r11 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="I was independent and a go-getter.">
            <Likert
              value={a.aceResilience.r12}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r12 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
          <Field title="I believed that life is what you make it.">
            <Likert
              value={a.aceResilience.r13}
              onChange={(v) =>
                setA((n) => (n.assessments.aceResilience.r13 = String(v)))
              }
              options={aceTrue5}
            />
          </Field>
        </div>
      </Collapsible>

      {/* 8) Stress (PSS-4) */}
      <Collapsible
        title="Perceived Stress (PSS-4)"
        open={open8}
        subtitle="Stress Perception Assessment"
        setOpen={setOpen8}
        enabled={u8}
        complete={complete7}
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
    </div>
  );
}
