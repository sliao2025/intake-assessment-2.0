"use client";
import React, { useEffect, useRef, useState } from "react";
import Gauge from "../primitives/Gauge";
import StepTitle from "../StepTitle";
import type {
  Profile,
  PatientReport,
  ReportInterpretations,
} from "../../lib/types/types";

type Props = {
  /** Full intake profile (required) */
  profile: Profile;
  /** Section title shown at the top */
  title: string;
  /** Step index (for StepTitle's number dot) */
  step: number;

  /** Updater from page.tsx so we can persist into Profile.report */
  setProfile?: (updater: (prev: Profile) => Profile) => void;

  /** Back-compat: old cache props. Safe to omit. */
  cachedText?: string | null;
  cachedInterp?: Record<string, string> | null;
  onCache?: (payload: {
    text: string;
    interpretations: Record<string, string>;
  }) => void;
};

/** Coerce any loose record into strongly-typed ReportInterpretations shape */
function coerceInterp(
  input: Record<string, string> | null | undefined
): ReportInterpretations {
  return {
    gad7: input?.gad7 ?? "",
    phq9: input?.phq9 ?? "",
    pss4: input?.pss4 ?? "",
    asrs5: input?.asrs5 ?? "",
    ptsd: input?.ptsd ?? "",
    crafft: input?.crafft ?? "",
    ace: input?.ace ?? "",
  };
}

// Sum helper for string/number objects
const scoreSum = (obj: Record<string, any> = {}) =>
  Object.values(obj).reduce(
    (a, v) => a + (typeof v === "string" ? Number(v) || 0 : v || 0),
    0
  );

export default function ReportSection({
  profile,
  title,
  step,
  setProfile,
  // legacy props for temporary compatibility
  cachedText,
  cachedInterp,
  onCache,
}: Props) {
  // ---- Compute metrics used in the report request & gauges ----
  const gadScore = scoreSum(profile?.assessments?.gad7);
  const phqScore = scoreSum(profile?.assessments?.phq9);
  const pssScore = scoreSum(profile?.assessments?.stress);
  const asrsScore = scoreSum(profile?.assessments?.asrs5);
  const ptsdYes =
    Object.values(profile?.assessments?.ptsd ?? {}).filter(
      (v: any) => String(v).toLowerCase() === "yes"
    ).length || 0;
  const aceScore = scoreSum(profile?.assessments?.aceResilience);

  const crafftKeys = [
    "car",
    "relax",
    "alone",
    "forget",
    "familyFriends",
    "trouble",
  ] as const;
  const crafftB = (profile?.assessments?.crafft?.partB ?? {}) as Record<
    string,
    any
  >;
  const crafftScore = crafftKeys.reduce(
    (n, k) => n + (String(crafftB[k] ?? "").toLowerCase() === "yes" ? 1 : 0),
    0
  );

  const metrics = {
    gad7: gadScore,
    phq9: phqScore,
    pss4: pssScore,
    asrs5: asrsScore,
    ptsdFlags: ptsdYes,
    crafft: crafftScore,
    ace: aceScore,
  };

  // ---- Initialize from Profile.report first; fall back to legacy cache props ----
  const initialText = profile?.report?.text ?? cachedText ?? "";
  const initialInterp =
    profile?.report?.interpretations ?? coerceInterp(cachedInterp ?? undefined);
  const hasReport =
    Boolean(profile?.report?.text) && Boolean(profile?.report?.interpretations);

  const [text, setText] = useState<string>(initialText);
  const [interp, setInterp] = useState<ReportInterpretations>(initialInterp);
  const [loading, setLoading] = useState<boolean>(false);
  const [interpLoading, setInterpLoading] = useState<boolean>(
    !hasReport && !(cachedText || cachedInterp)
  );
  const [error, setError] = useState<string | null>(null);
  const [interpError, setInterpError] = useState<string | null>(null);

  // Guard: ensure we only POST once per lifecycle
  const fetchedRef = useRef<boolean>(
    hasReport || Boolean(cachedText || cachedInterp)
  );

  useEffect(() => {
    // Commented out fetching and interpretation logic for now.
    /*
    if (fetchedRef.current) return;

    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setInterpLoading(true);
        setError(null);
        setInterpError(null);

        // Single POST generates both the long-form text and per-scale interpretations
        const res = await fetch("/api/report/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ profile, metrics }),
        });
        const data = await res.json();

        if (!res.ok || !data?.ok) {
          throw new Error(data?.error || `HTTP ${res.status}`);
        }
        if (!alive) return;

        const newText: string = String(data.text || "");
        const newInterp: ReportInterpretations = coerceInterp(
          data.interpretations || {}
        );

        // Update local UI
        setText(newText);
        setInterp(newInterp);

        // Persist into Profile.report if we have a setter
        if (setProfile) {
          setProfile((prev) => {
            const next: Profile = {
              ...prev,
              report: {
                text: newText,
                interpretations: newInterp,
              },
            };
            return next;
          });
        } else {
          // Back-compat: bubble up via legacy cache callback
          onCache?.({ text: newText, interpretations: newInterp });
        }

        fetchedRef.current = true;
      } catch (e: any) {
        if (!alive) return;
        const msg = e?.message || "Failed to load report.";
        setError(msg);
        setInterpError(msg);
      } finally {
        if (!alive) return;
        setLoading(false);
        setInterpLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <StepTitle n={step + 1} title={title} />
      <p className="mb-4 text-sm text-slate-700 mt-2">
        Below is an overview of your symptom screen results.
      </p>

      {/* Loading skeleton */}
      {loading && (
        <div className="mt-4 mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm"
            >
              <div className="p-4 space-y-3">
                <div className="h-5 w-24 bg-slate-100 animate-pulse rounded" />
                <div className="h-6 bg-slate-100 animate-pulse rounded" />
                <div className="h-16 bg-slate-100 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50/70 text-rose-700 p-4 text-sm">
          Error generating summary: {error}
        </div>
      )}

      {/* Main content grid */}
      {!loading && !error && (
        <div className="mt-4 mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Anxiety */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <Gauge
                label="Anxiety"
                score={gadScore}
                max={21}
                caption="0–4 minimal · 5–9 mild · 10–14 moderate · 15–21 severe"
              />
            </div>
          </div>

          {/* Depression */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <Gauge
                label="Depression"
                score={phqScore}
                max={27}
                caption="0–4 minimal · 5–9 mild · 10–14 moderate · 15–19 moderately severe · 20–27 severe"
              />
            </div>
          </div>

          {/* Stress */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <Gauge
                label="Stress"
                score={pssScore}
                max={16}
                caption="higher = more stress"
              />
            </div>
          </div>

          {/* Adult ADHD */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <Gauge
                label="Adult ADHD"
                score={asrsScore}
                max={24}
                caption=">14 = possible ADHD symptoms · <14 = ADHD less likely"
              />
            </div>
          </div>

          {/* PTSD */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <Gauge
                label="Post Traumatic Stress Disorder"
                score={ptsdYes}
                max={5}
                caption="higher = more PTSD symptoms"
              />
            </div>
          </div>

          {/* CRAFFT */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <Gauge
                label="Substance Use Risk"
                score={crafftScore}
                max={6}
                caption="higher = more risk from substance use"
              />
            </div>
          </div>

          {/* ACE */}
          <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4">
              <Gauge
                label="Adverse Childhood Experiences"
                score={aceScore}
                max={52}
                caption="higher = more adverse childhood experiences"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
