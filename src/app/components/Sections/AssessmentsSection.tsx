"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import Field from "../primitives/Field";
import Likert from "../primitives/Likert";
import type { Profile, SetAActions } from "../../lib/types/types";
import { ArrowRight } from "lucide-react";
import { intPsychTheme } from "../theme";
import Collapsible from "../primitives/Collapsible";
import DiscTeenForm from "../Scales/Child/DiscTeenForm";
import SNAPForm from "../Scales/Child/SNAPForm";
import SCAREDForm from "../Scales/Child/SCAREDForm";
import Phq9Form from "../Scales/Adult/Phq9Form";
import GAD7Form from "../Scales/Adult/Gad7Form";
import CRAFFTForm from "../Scales/Adult/CRAFFTForm";
import ASRS5Form from "../Scales/Adult/ASRS5Form";
import PTSDForm from "../Scales/Adult/PTSDForm";
import SelfHarmForm from "../Scales/Adult/SelfHarmForm";
import ACEResilienceForm from "../Scales/Adult/ACEResilienceForm";
import PSS4Form from "../Scales/Adult/PSS4Form";

/** Scales (Likert options) */
const yesNo = [
  { key: "yes", label: "Yes" },
  { key: "no", label: "No" },
];

const snap0to3 = [
  { key: "0", label: "Not at all" },
  { key: "1", label: "Just a little" },
  { key: "2", label: "Quite a bit" },
  { key: "3", label: "Very much" },
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
  // === NEW: union-aware handles ===
  const kind = profile.assessments.kind;
  const a: any = profile.assessments.data;

  // Ensure child/adult payload matches toggle
  const dtdsKeys = [
    "dtds01",
    "dtds02",
    "dtds03",
    "dtds04",
    "dtds05",
    "dtds06",
    "dtds07",
    "dtds08",
    "dtds09",
    "dtds10",
    "dtds11",
    "dtds12",
    "dtds13",
    "dtds14",
    "dtds15",
    "dtds16",
    "dtds17",
    "dtds18",
    "dtds19",
    "dtds20",
    "dtds21",
    "dtds22",
  ] as const;

  // Collapsible open state
  const [open2, setOpen2] = React.useState(false); // First depression block (PHQ-9 or DISC)
  const [open2Parent, setOpen2Parent] = React.useState(false);
  const [openSnap, setOpenSnap] = React.useState(false); // SNAP-IV
  const [openScaredSelf, setOpenScaredSelf] = React.useState(false); // SCARED — self
  const [openScaredParent, setOpenScaredParent] = React.useState(false); // SCARED — parent
  const [openGAD, setOpenGAD] = React.useState(false); // GAD-7
  const [openCRAFFT, setOpenCRAFFT] = React.useState(false); // CRAFFT
  const [open4, setOpen4] = React.useState(false); // Self-harm
  const [open5, setOpen5] = React.useState(false); // ASRS-5
  const [open6, setOpen6] = React.useState(false); // PTSD
  const [open7, setOpen7] = React.useState(false); // ACE
  const [open8, setOpen8] = React.useState(false); // Stress

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
  // SNAP-IV keys helper (26 items: snap01, ..., snap26)
  const snapKeys: string[] = Array.from(
    { length: 26 },
    (_, i) => `snap${String(i + 1).padStart(2, "0")}`
  );

  // SCARED keys helper (41 items: scared01, ..., scared41)
  const scaredKeys: string[] = Array.from(
    { length: 41 },
    (_, i) => `scared${String(i + 1).padStart(2, "0")}`
  );

  // Helper to strictly check all keys present and non-empty
  const allAnswered = (
    resp: Record<string, string> | undefined | null,
    keys: readonly string[] | string[]
  ) =>
    !!resp &&
    keys.every(
      (k) => Object.prototype.hasOwnProperty.call(resp, k) && resp[k] !== ""
    );

  // Completion logic — first section differs by age (PHQ vs DISC), plus SNAP for children

  // Union-aware setter: clones `.assessments.data` and only the touched subtrees
  const setA = (mutate: (draft: Profile) => void) =>
    setProfile((p) => {
      const next: Profile = {
        ...p,
        assessments: {
          ...p.assessments,
          data: { ...(p.assessments as any).data } as any,
        } as any,
      };
      const data: any = (next.assessments as any).data;
      data.suicide = { ...data.suicide };
      if (data.phq9) data.phq9 = { ...data.phq9 };
      if (data.discTeen) {
        data.discTeen = {
          ...data.discTeen,
          self: {
            ...data.discTeen.self,
            responses: { ...(data.discTeen.self?.responses ?? {}) },
          },
        };
        if (data.discTeen.parent) {
          data.discTeen.parent = {
            ...data.discTeen.parent,
            responses: { ...(data.discTeen.parent.responses ?? {}) },
          };
        }
      }
      if (data.snap) {
        data.snap = { ...(data.snap ?? {}) };
      }
      if (data.scared) {
        data.scared = {
          ...data.scared,
          self: {
            ...data.scared.self,
            responses: { ...(data.scared.self?.responses ?? {}) },
          },
        };
        if (data.scared.parent) {
          data.scared.parent = {
            ...data.scared.parent,
            responses: { ...(data.scared.parent.responses ?? {}) },
          };
        }
      }
      data.gad7 = { ...data.gad7 };
      data.crafft = {
        partA: { ...(data.crafft?.partA ?? {}) },
        partB: { ...(data.crafft?.partB ?? {}) },
      };
      data.selfHarm = { ...data.selfHarm };
      data.asrs5 = { ...data.asrs5 };
      data.ptsd = { ...data.ptsd };
      data.aceResilience = { ...data.aceResilience };
      data.stress = { ...data.stress };
      mutate(next);
      return next;
    });

  /** ------- PHQ-9 Adaptive (kept intact but commented out) ------- */
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

  // Completion logic — first section differs by age (PHQ vs DISC), plus SNAP for children
  const phqDone = a?.phq9
    ? (phqKeys as readonly string[]).every((k) => a.phq9[k] !== "")
    : false;
  const discSelfDone = a?.discTeen?.self?.responses
    ? (dtdsKeys as readonly string[]).every(
        (k) => a.discTeen.self.responses[k] !== ""
      )
    : false;
  const discParentDone = a?.discTeen?.parent?.responses
    ? (dtdsKeys as readonly string[]).every(
        (k) => a.discTeen.parent.responses[k] !== ""
      )
    : false;
  const discDone = discSelfDone && discParentDone;
  const snapDone = allAnswered(a?.snap, snapKeys as readonly string[]);
  const scaredSelfDone = allAnswered(
    a?.scared?.self?.responses,
    scaredKeys as readonly string[]
  );
  const scaredParentDone = allAnswered(
    a?.scared?.parent?.responses,
    scaredKeys as readonly string[]
  );
  const complete1 = profile.isChild === true ? discSelfDone : phqDone;
  const gateAfterDepression =
    profile.isChild === true
      ? discDone && snapDone && scaredSelfDone && scaredParentDone
      : complete1;
  const complete1Parent = discParentDone;

  const gad7KeysArr = gad7Keys as readonly string[];
  const complete2 = gad7KeysArr.every((k) => a.gad7[k] !== "");

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
  const complete4 = (asrsKeys as readonly string[]).every(
    (k) => a.asrs5[k] !== ""
  );
  const complete5 = (ptsdKeys as readonly string[]).every(
    (k) => a.ptsd[k] !== ""
  );
  const complete6 = (aceRKeys as readonly string[]).every(
    (k) => a.aceResilience[k] !== ""
  );
  const complete7 = (pssKeys as readonly string[]).every(
    (k) => a.stress[k] !== ""
  );

  // Gating (sequential):
  // First depression block (PHQ-9 or DISC) (+ SNAP for child) -> GAD-7 -> CRAFFT -> Self-harm -> ASRS -> PTSD -> ACE -> PSS
  const [u2] = React.useState(true);
  const [u3, setU3] = React.useState(gateAfterDepression);
  const [uCRAFFT, setUCRAFFT] = React.useState(complete2);
  const [u4, setU4] = React.useState(completeCRAFFT);
  const [u5, setU5] = React.useState(complete3);
  const [u6, setU6] = React.useState(complete4);
  const [u7, setU7] = React.useState(complete5);
  const [u8, setU8] = React.useState(complete6);
  // Child-only sequential gating
  const [uSnap, setUSnap] = React.useState(
    profile.isChild === true ? !!discDone : false
  );
  const [uScaredSelf, setUScaredSelf] = React.useState(
    profile.isChild === true ? !!snapDone : false
  );
  const [uScaredParent, setUScaredParent] = React.useState(
    profile.isChild === true ? !!scaredSelfDone : false
  );

  // Rising-edge auto-open refs
  const prevGate = React.useRef(gateAfterDepression);
  const prevComplete2 = React.useRef(complete2);
  const prevCompleteCRAFFT = React.useRef(completeCRAFFT);
  const prevComplete3 = React.useRef(complete3);
  const prevComplete4 = React.useRef(complete4);
  const prevComplete5 = React.useRef(complete5);
  const prevComplete6 = React.useRef(complete6);

  React.useEffect(() => {
    if (!prevGate.current && gateAfterDepression) {
      setU3(true);
      setOpenGAD(true);
    }
    prevGate.current = gateAfterDepression;
  }, [gateAfterDepression]);

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

  const prevDiscDone = React.useRef(discDone);
  const prevSnapDone = React.useRef(snapDone);
  const prevScaredSelfDone = React.useRef(scaredSelfDone);

  React.useEffect(() => {
    if (profile.isChild === true) {
      if (!prevDiscDone.current && discDone) {
        setUSnap(true);
        setOpenSnap(true);
      }
      prevDiscDone.current = discDone;
    }
  }, [profile.isChild, discDone]);

  React.useEffect(() => {
    if (profile.isChild === true) {
      if (!prevSnapDone.current && snapDone) {
        setUScaredSelf(true);
        setOpenScaredSelf(true);
      }
      prevSnapDone.current = snapDone;
    }
  }, [profile.isChild, snapDone]);

  React.useEffect(() => {
    if (profile.isChild === true) {
      if (!prevScaredSelfDone.current && scaredSelfDone) {
        setUScaredParent(true);
        setOpenScaredParent(true);
      }
      prevScaredSelfDone.current = scaredSelfDone;
    }
  }, [profile.isChild, scaredSelfDone]);

  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title} />

      {/* 2) First depression block: PHQ-9 for adults or DISC for children */}
      {profile.isChild === true ? (
        <>
          <Collapsible
            title="DISC Depression Scale — Child Self-Report"
            subtitle="Child completes this section privately (last 4 weeks)"
            open={open2}
            setOpen={setOpen2}
            enabled={true}
            complete={complete1}
          >
            <DiscTeenForm a={a} setA={setA} form="self" />
          </Collapsible>

          <Collapsible
            title="DISC Depression Scale — Parent Report"
            subtitle="Parent/guardian completes this section privately (last 4 weeks)"
            open={open2Parent}
            setOpen={setOpen2Parent}
            enabled={true}
            complete={complete1Parent}
          >
            <DiscTeenForm a={a} setA={setA} form="parent" />
          </Collapsible>

          <Collapsible
            title="SNAP-IV"
            subtitle="ADHD screener"
            open={openSnap}
            setOpen={setOpenSnap}
            enabled={uSnap}
            complete={snapDone}
          >
            <SNAPForm a={a} setA={setA} snap0to3={snap0to3} />
          </Collapsible>
          <Collapsible
            title="SCARED — Child Self-Report"
            subtitle="Screen for Child Anxiety Related Disorders (past 3 months)"
            open={openScaredSelf}
            setOpen={setOpenScaredSelf}
            enabled={uScaredSelf}
            complete={scaredSelfDone}
          >
            <SCAREDForm a={a} setA={setA} form="self" />
          </Collapsible>

          <Collapsible
            title="SCARED — Parent Report"
            subtitle="Screen for Child Anxiety Related Disorders (past 3 months)"
            open={openScaredParent}
            setOpen={setOpenScaredParent}
            enabled={uScaredParent}
            complete={scaredParentDone}
          >
            <SCAREDForm a={a} setA={setA} form="parent" />
          </Collapsible>
        </>
      ) : (
        <>
          <Collapsible
            title="PHQ-9"
            subtitle="Patient Health Questionnaire-9"
            open={open2}
            setOpen={setOpen2}
            enabled={true}
            complete={complete1}
          >
            <Phq9Form a={a} setA={setA} freq0to3={freq0to3} />
          </Collapsible>
          {/* 3) GAD-7 */}
          <Collapsible
            title="GAD-7"
            subtitle="General Anxiety Disorder-7"
            open={openGAD}
            setOpen={setOpenGAD}
            enabled={u3}
            complete={complete2}
          >
            <GAD7Form a={a} setA={setA} freq0to3={freq0to3} />
          </Collapsible>
          {/* CRAFFT */}
          <Collapsible
            title="CRAFFT 2.1"
            subtitle="Substance Use Screener"
            open={openCRAFFT}
            setOpen={setOpenCRAFFT}
            enabled={uCRAFFT}
            complete={completeCRAFFT}
          >
            <CRAFFTForm a={a} setA={setA} />
          </Collapsible>
          {/* Self-Harm */}
          <Collapsible
            title="Self-Harm"
            subtitle="Non-suicidal self-injury"
            open={open4}
            setOpen={setOpen4}
            enabled={u4}
            complete={complete3}
          >
            <SelfHarmForm a={a} setA={setA} />
          </Collapsible>
          {/* ASRS-5 */}
          <Collapsible
            title="ASRS-5"
            subtitle="Adult ADHD Self-Report Scale"
            open={open5}
            setOpen={setOpen5}
            enabled={u5}
            complete={complete4}
          >
            <ASRS5Form a={a} setA={setA} asrs0to4={asrs0to4} />
          </Collapsible>
          {/* PTSD */}
          <Collapsible
            title="PTSD"
            subtitle="PCL-5 Short"
            open={open6}
            setOpen={setOpen6}
            enabled={u6}
            complete={complete5}
          >
            <PTSDForm a={a} setA={setA} />
          </Collapsible>
          {/* ACE Resilience */}
          <Collapsible
            title="ACE"
            subtitle="Adverse Childhood Experiences"
            open={open7}
            setOpen={setOpen7}
            enabled={u7}
            complete={complete6}
          >
            <ACEResilienceForm a={a} setA={setA} aceTrue5={aceTrue5} />
          </Collapsible>
          {/* PSS-4 (Stress) */}
          <Collapsible
            title="Stress (PSS-4)"
            subtitle="Perceived Stress Scale — 4 item"
            open={open8}
            setOpen={setOpen8}
            enabled={u8}
            complete={complete7}
          >
            <PSS4Form a={a} setA={setA} pss0to4={pss0to4} />
          </Collapsible>
        </>
      )}
    </div>
  );
}
