"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Legend as ReLegend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip as ReTooltip,
} from "recharts";
import Gauge from "../primitives/Gauge";
import StepTitle from "../StepTitle";
import { FileDown } from "lucide-react";
import { cx } from "../cx";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Svg,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  Image,
} from "@react-pdf/renderer";
import type {
  Profile,
  PatientReport,
  ReportInterpretations,
  SummaryPair,
} from "../../lib/types/types";
import { intPsychTheme } from "../theme";

import logo from "../../../assets/IP_Logo.png";
import { useSession } from "next-auth/react";

// Styled numeric tick for PolarRadiusAxis (0–100 labels)
const CustomRadarChartTick = (props: any) => {
  const { x, y, payload } = props || {};
  // Fallback guards
  const xx = typeof x === "number" ? x : 0;
  const yy = typeof y === "number" ? y : 0;
  // Size of the label box; adjust if you use different tick values
  const W = 34; // width in px
  const H = 18; // height in px
  return (
    <g transform={`translate(${xx - W / 2}, ${yy - H / 2})`}>
      <foreignObject width={W} height={H}>
        <div
          className="rounded-full bg-white border border-slate-200 py-0.5 text-[10px] leading-none text-slate-600  flex items-center justify-center"
          style={{ transform: "translateZ(0)" }}
        >
          {payload?.value}
        </div>
      </foreignObject>
    </g>
  );
};

const pdfStyles = StyleSheet.create({
  page: { padding: 32, color: "#0f172a", fontFamily: "Helvetica" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  logo: {
    width: 45,
    height: 45,
    marginRight: 8,
  },
  brand: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1D3749",
    fontFamily: "Helvetica",
  },
  subtle: { fontSize: 9, color: "#64748b" },
  h1: {
    fontSize: 16,
    color: "#1D3749",
    fontFamily: "Helvetica",
    fontWeight: 700,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 700,
    color: "#113e60",
    marginBottom: 6,
    fontFamily: "Helvetica",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    backgroundColor: "#ffffff",
  },
  gridRow: { flexDirection: "row", flexWrap: "wrap" },
  gridItem: { width: "50%", paddingRight: 12, marginBottom: 6 },
  label: { fontSize: 10, color: "#64748b", marginBottom: 2 },
  value: {
    fontSize: 11,
    color: "#0f172a",
    fontWeight: 400,
    fontFamily: "Helvetica",
  },
  p: { fontSize: 11, lineHeight: 1.38, color: "#334155" },
  caption: { fontSize: 9, color: "#64748b", marginTop: 4 },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginTop: 8,
    marginBottom: 8,
  },
  footer: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 12,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  gaugeWrap: { marginTop: 6, marginBottom: 10 },
  gaugeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  gaugeLabel: { fontSize: 12, fontWeight: 700, color: "#334155" },
  gaugeValue: { fontSize: 12, fontWeight: 700, color: "#334155" },
  gaugeCaption: { fontSize: 9, color: "#64748b", marginTop: 4 },
  interpText: {
    fontSize: 11,
    lineHeight: 1.35,
    color: "#334155",
    fontWeight: 400,
  },
  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  badge: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
});

// PDF Gauge component for react-pdf
const PdfGauge = ({
  label,
  score,
  max,
  caption,
  interpretation,
  fallback = false,
}: {
  label: string;
  score: number;
  max: number;
  caption?: string;
  interpretation?: string;
  fallback?: boolean;
}) => {
  const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x);
  const v = clamp01(max > 0 ? score / max : 0);
  const pct = Math.round(v * 1000) / 10;
  // Dimensions (in PDF points): A4 inner width ≈ 595 - (2*32 padding) - (2*12 card padding) = ~507
  const W = 440;
  const H = 14; // slightly thicker
  const corner = 7;
  const SVG_H = H + 8; // extra vertical room so the ticker can exceed the bar height
  const BAR_Y = 4; // vertically center the bar within the SVG
  // Clamp ticker inside the bar to avoid clipping on rounded corners
  const TICK_W = 5; // thicker ticker
  const rawX = (pct / 100) * W;
  const EDGE_PAD_PX = TICK_W / 2 + 1; // keep a 1px margin inside both ends
  const tickerX = Math.max(EDGE_PAD_PX, Math.min(W - EDGE_PAD_PX, rawX));
  const TICK_RX = 2.5;
  const TICK_Y = BAR_Y - 2; // extend 2pt above the bar
  const TICK_H = H + 4; // and 2pt below the bar

  return (
    <View style={[pdfStyles.gaugeWrap, { flexDirection: "column" }]}>
      {/* Row: left content + right big score */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* Left: label + bar */}
        <View style={{ flexGrow: 1, paddingRight: 12 }}>
          <Text style={pdfStyles.gaugeLabel}>{label}</Text>
          {/* Bar */}
          <Svg width={W} height={SVG_H}>
            {fallback ? null : (
              <Defs>
                <LinearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                  <Stop offset="0%" stopColor="#B8E4DA" />
                  <Stop offset="50%" stopColor="#3A9CE2" />
                  <Stop offset="100%" stopColor="#05539C" />
                </LinearGradient>
              </Defs>
            )}
            {/* Track */}
            <Rect
              x={0}
              y={BAR_Y}
              width={W}
              height={H}
              rx={corner}
              ry={corner}
              fill="#e5e7eb"
            />
            {/* Fill */}
            {fallback ? (
              <Rect
                x={0}
                y={BAR_Y}
                width={W}
                height={H}
                rx={corner}
                ry={corner}
                fill="#B8E4DA"
              />
            ) : (
              <Rect
                x={0}
                y={BAR_Y}
                width={W}
                height={H}
                rx={corner}
                ry={corner}
                fill="url(#barGrad)"
              />
            )}
            {/* Ticker shadow */}
            <Rect
              x={tickerX - TICK_W / 2}
              y={TICK_Y + 1}
              width={TICK_W}
              height={TICK_H}
              rx={TICK_RX}
              ry={TICK_RX}
              fill="#0f172a"
              opacity={0.18}
            />
            {/* Ticker body */}
            <Rect
              x={tickerX - TICK_W / 2}
              y={TICK_Y}
              width={TICK_W}
              height={TICK_H}
              rx={TICK_RX}
              ry={TICK_RX}
              fill="#ffffff"
            />
            {/* Ticker outline */}
            <Rect
              x={tickerX - TICK_W / 2}
              y={TICK_Y}
              width={TICK_W}
              height={TICK_H}
              rx={TICK_RX}
              ry={TICK_RX}
              stroke="#94a3b8"
              strokeWidth={0.75}
            />
          </Svg>
        </View>
        {/* Right: big score */}
        <View style={{ minWidth: 40, alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#05539C", // close to theme accent; react-pdf can't do gradient text
              lineHeight: 1.0,
            }}
          >
            {String(score)}
          </Text>
        </View>
      </View>
      {/* Caption below bar */}
      {caption ? (
        <Text style={[pdfStyles.gaugeCaption, { marginTop: 6 }]}>
          {caption}
        </Text>
      ) : null}
      {/* Interpretation box (kept as-is) */}
      {interpretation ? (
        <View
          style={{
            borderWidth: 1,
            borderColor: "#e2e8f0",
            borderRadius: 8,
            backgroundColor: "#f8fafc",
            padding: 8,
            marginTop: 6,
          }}
        >
          <Text style={pdfStyles.interpText}>{interpretation}</Text>
        </View>
      ) : null}
    </View>
  );
};

type Props = {
  /** Full intake profile (required) */
  profile: Profile;
  /** Section title shown at the top */
  title: string;
  /** Step index (for StepTitle's number dot) */
  step: number;

  /** Updater from page.tsx so we can persist into Profile.report */
  setProfile?: (updater: (prev: Profile) => Profile) => void;
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
}: Props) {
  // ---- Compute metrics used in the report request & gauges ----
  const printableRef = useRef<HTMLDivElement | null>(null);
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

  const radarData = [
    {
      subject: "Anxiety (GAD-7)",
      pct: Math.round((gadScore / 21) * 100),
      raw: gadScore,
      max: 21,
    },
    {
      subject: "Depression (PHQ-9)",
      pct: Math.round((phqScore / 27) * 100),
      raw: phqScore,
      max: 27,
    },
    {
      subject: "Stress (PSS-4)",
      pct: Math.round((pssScore / 16) * 100),
      raw: pssScore,
      max: 16,
    },
    {
      subject: "Adult ADHD (ASRS-5)",
      pct: Math.round((asrsScore / 24) * 100),
      raw: asrsScore,
      max: 24,
    },
    {
      subject: "Substance Risk (CRAFFT)",
      pct: Math.round((crafftScore / 6) * 100),
      raw: crafftScore,
      max: 6,
    },
    {
      subject: "PTSD Flags",
      pct: Math.round((ptsdYes / 5) * 100),
      raw: ptsdYes,
      max: 5,
    },
    {
      subject: "ACE Resilience",
      pct: Math.round((aceScore / 52) * 100),
      raw: aceScore,
      max: 52,
    },
  ];

  const hasReport =
    Boolean(profile?.report?.summary) &&
    Boolean(profile?.report?.interpretations);

  const [summary, setSummary] = useState<SummaryPair>(
    profile?.report?.summary ?? { reason_for_eval: "", background: "" }
  );
  const [interp, setInterp] = useState<ReportInterpretations>(
    profile?.report?.interpretations ?? coerceInterp(undefined)
  );
  const [loading, setLoading] = useState<boolean>(!hasReport);
  const [interpLoading, setInterpLoading] = useState<boolean>(!hasReport);
  const [error, setError] = useState<string | null>(null);
  const [interpError, setInterpError] = useState<string | null>(null);
  const { data: session } = useSession();

  async function saveProgress(override?: Profile) {
    try {
      const payload = override ?? profile;
      const r = await fetch("/api/profile/create", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const msg = await r.text();
        throw new Error(`${r.status} ${msg}`);
      }
      await r.json();
    } catch (error) {
      console.error("Failed to store profile", error);
    }
  }

  useEffect(() => {
    if (hasReport) {
      // Ensure loading indicators are off if we already have data
      setLoading(false);
      setInterpLoading(false);
      return;
    }

    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setInterpLoading(true);
        setError(null);
        setInterpError(null);

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

        const newInterp: ReportInterpretations = coerceInterp(
          data.interpretations || {}
        );
        const newSummary: SummaryPair = data.summary ?? {
          reason_for_eval: "",
          background: "",
        };

        setInterp(newInterp);
        setSummary(newSummary);

        if (setProfile) {
          setProfile((prev) => ({
            ...prev,
            report: {
              summary: newSummary,
              interpretations: newInterp,
            },
          }));
          const nextProfile: Profile = {
            ...profile,
            report: {
              summary: newSummary,
              interpretations: newInterp,
            },
          };
          await saveProgress(nextProfile);
        }
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
    // Intentionally no deps: fire exactly once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Helper functions for patient info and summary ---
  const safe = (v: any) =>
    v === undefined || v === null || v === "" ? "—" : String(v);
  const first =
    (profile as any)?.basic?.firstName || (profile as any)?.firstName;
  const last = (profile as any)?.basic?.lastName || (profile as any)?.lastName;
  const fullName = safe(
    [first, last].filter(Boolean).join(" ") || (profile as any)?.name
  );

  const buildPdfDoc = (opts?: { fallback?: boolean }) => {
    const useFallback = !!opts?.fallback;
    return (
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.headerRow}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={pdfStyles.logo} src={logo.src} />
              <Text style={pdfStyles.brand}>
                Integrative Psych — Patient Report
              </Text>
            </View>
            <Text style={pdfStyles.subtle}>
              Created:{" "}
              {new Date().toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
          <View style={pdfStyles.card}>
            <View style={pdfStyles.badgeRow}>
              <View style={[pdfStyles.badge, { backgroundColor: "#0072ce" }]} />
              <Text style={pdfStyles.sectionHeader}>Patient Info</Text>
            </View>
            <View style={pdfStyles.gridRow}>
              <View style={pdfStyles.gridItem}>
                <Text style={pdfStyles.label}>Name</Text>
                <Text style={pdfStyles.value}>{fullName}</Text>
              </View>
              <View style={pdfStyles.gridItem}>
                <Text style={pdfStyles.label}>Email</Text>
                <Text style={pdfStyles.value}>
                  {safe((profile as Profile)?.email)}
                </Text>
              </View>
              <View style={pdfStyles.gridItem}>
                <Text style={pdfStyles.label}>Age</Text>
                <Text style={pdfStyles.value}>
                  {(profile as Profile)?.age || "—"}
                </Text>
              </View>
              <View style={pdfStyles.gridItem}>
                <Text style={pdfStyles.label}>Phone</Text>
                <Text style={pdfStyles.value}>
                  {safe((profile as Profile)?.contactNumber)}
                </Text>
              </View>
            </View>
          </View>
          <View style={pdfStyles.card}>
            <View style={pdfStyles.badgeRow}>
              <View style={[pdfStyles.badge, { backgroundColor: "#ffa440" }]} />
              <Text style={pdfStyles.sectionHeader}>Reason for Evaluation</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#e2e8f0",
                borderRadius: 8,
                backgroundColor: "#f8fafc",
                padding: 8,
                marginTop: 4,
              }}
            >
              <Text style={pdfStyles.interpText}>
                {summary.reason_for_eval || "—"}
              </Text>
            </View>
          </View>
          <View style={pdfStyles.card}>
            <View style={pdfStyles.badgeRow}>
              <View style={[pdfStyles.badge, { backgroundColor: "#113e60" }]} />
              <Text style={pdfStyles.sectionHeader}>Background</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#e2e8f0",
                borderRadius: 8,
                backgroundColor: "#f8fafc",
                padding: 8,
                marginTop: 4,
              }}
            >
              <Text style={pdfStyles.interpText}>
                {summary.background || "—"}
              </Text>
            </View>
          </View>
          <View style={pdfStyles.card}>
            <View style={pdfStyles.badgeRow}>
              <View style={[pdfStyles.badge, { backgroundColor: "#0072ce" }]} />
              <Text style={pdfStyles.sectionHeader}>Screening Scores</Text>
            </View>
            <PdfGauge
              label="Anxiety"
              score={gadScore}
              max={21}
              caption="0–4 minimal · 5–9 mild · 10–14 moderate · 15–21 severe"
              interpretation={interp.gad7}
              fallback={useFallback}
            />
            <PdfGauge
              label="Depression"
              score={phqScore}
              max={27}
              caption="0–4 minimal · 5–9 mild · 10–14 moderate · 15–19 moderately severe · 20–27 severe"
              interpretation={interp.phq9}
              fallback={useFallback}
            />
            <PdfGauge
              label="Stress"
              score={pssScore}
              max={16}
              caption="higher = more stress"
              interpretation={interp.pss4}
              fallback={useFallback}
            />
            <PdfGauge
              label="Adult ADHD"
              score={asrsScore}
              max={24}
              caption=">14 = possible ADHD symptoms · <14 = ADHD less likely"
              interpretation={interp.asrs5}
              fallback={useFallback}
            />
            <PdfGauge
              label="PTSD Flags"
              score={ptsdYes}
              max={5}
              caption="higher = more PTSD symptoms"
              interpretation={interp.ptsd}
              fallback={useFallback}
            />
            <PdfGauge
              label="Substance Use Risk"
              score={crafftScore}
              max={6}
              caption="higher = more risk from substance use"
              interpretation={interp.crafft}
              fallback={useFallback}
            />
            <PdfGauge
              label="Resilience"
              score={aceScore}
              max={52}
              caption="higher = greater resilience"
              interpretation={interp.ace}
              fallback={useFallback}
            />
          </View>
          <Text style={pdfStyles.footer}>
            This document is for informational purposes only and does not
            constitute a diagnosis or treatment plan.
          </Text>
        </Page>
      </Document>
    );
  };

  const downloadReactPdf = async () => {
    const tryBuild = async (fallback: boolean) => {
      const blob = await pdf(buildPdfDoc({ fallback })).toBlob();
      return blob;
    };
    try {
      let blob: Blob;
      try {
        blob = await tryBuild(false);
      } catch (e) {
        console.warn(
          "PDF generation failed with gradient/fonts, retrying with fallback…",
          e
        );
        blob = await tryBuild(true);
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `IntegrativePsych_Patient_Report_${fullName || "Patient"}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF generation failed", e);
      alert("Sorry—PDF generation failed. Please try again.");
    }
  };

  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <StepTitle n={step + 1} title={title} />
        <button
          type="button"
          onClick={downloadReactPdf}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-[13px] font-medium text-white transition duration-150 hover:brightness-95 active:scale-95 shrink-0"
          style={{ background: intPsychTheme.accent }}
          aria-label="Download PDF of this report"
        >
          <FileDown className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">Download PDF</span>
          <span className="sm:hidden">PDF</span>
        </button>
      </div>
      <div ref={printableRef}>
        <p className="mb-4 text-sm text-slate-700 mt-2">
          Below is a summarized overview of your results. Your clinician will
          have access to the full, more detailed report.
        </p>

        {/* User-facing loading message */}
        {loading && (
          <div
            role="status"
            aria-live="polite"
            className="mb-3 rounded-xl border border-slate-200 bg-white/80 shadow-sm p-4"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-5 w-5 border-2 border-slate-300 border-t-transparent rounded-full animate-spin"
                style={{ borderTopColor: intPsychTheme.accent }}
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium text-slate-800">
                  Building your personalized report…
                </p>
                <p className="text-xs text-slate-600">
                  This may take a few moments. Your results will appear here as
                  soon as they’re ready.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <>
            <div className="mt-4 mb-4 mx-auto space-y-4">
              {/* Patient Info skeleton (top-centered) */}
              <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
                <div className="p-4 space-y-3">
                  <div className="h-5 w-28 bg-slate-100 animate-pulse rounded" />
                  <div className="h-5 w-40 bg-slate-100 animate-pulse rounded" />
                  <div className="h-10 bg-slate-100 animate-pulse rounded" />
                </div>
              </div>
              {/* Summary skeleton (top-centered) */}
              <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
                <div className="p-4 space-y-3">
                  <div className="h-5 w-20 bg-slate-100 animate-pulse rounded" />
                  <div className="h-20 bg-slate-100 animate-pulse rounded" />
                </div>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </>
        )}

        {/* Error state */}
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 text-rose-700 p-4 text-sm">
            Error generating summary: {error}
          </div>
        )}

        {/* Main content grid */}
        {!error && !loading && (
          <>
            <div className="mt-4 mb-6 mx-auto space-y-4">
              {/* Patient Info card (top-centered) */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm card">
                <div className="p-4">
                  <h3 className="text-md font-bold text-slate-900">
                    Patient Info
                  </h3>
                  <div className="mt-3 text-slate-800 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-3 whitespace-pre-wrap">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
                      <div>
                        <div className="text-slate-500">Name</div>
                        <div className="text-slate-800">{fullName}</div>
                      </div>
                      <div>
                        <div className="text-slate-500">Email</div>
                        <div className="text-slate-800">
                          {safe((profile as Profile)?.email)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Age</div>
                        <div className="text-slate-800">
                          {(profile as Profile)?.age}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-500">Phone</div>
                        <div className="text-slate-800">
                          {safe((profile as Profile)?.contactNumber)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary card (top-centered) */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm card">
                <div className="p-4">
                  <h3 className="text-md font-bold text-slate-900">
                    Reason for Evaluation
                  </h3>
                  <div className="mt-3 text-[13px] leading-5 text-slate-800 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2 whitespace-pre-wrap">
                    {summary.reason_for_eval || "—"}
                  </div>
                </div>
              </div>
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm card">
                <div className="p-4">
                  <h3 className="text-md font-bold text-slate-900">
                    Background
                  </h3>
                  <div className="mt-3 text-[13px] leading-5 text-slate-800 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2 whitespace-pre-wrap">
                    {summary.background || "—"}
                  </div>
                </div>
              </div>
              {/* Radar diagram of sum scores (raw) */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm card">
                <div className="p-4">
                  <h3 className="text-md font-bold text-slate-900">
                    {`${session?.user?.name?.split(" ")[0]}'s Profile`}
                  </h3>
                  <p className="text-[12px] text-slate-600 mb-2">
                    A visual representation of your screening scores as a % of
                    the maximum score possible for each screener.
                  </p>
                  <div className="w-full" style={{ height: 420 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsRadarChart
                        data={radarData}
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        className="size-full font-medium text-slate-700 [&_.recharts-polar-grid]:text-slate-200 [&_.recharts-text]:text-xs"
                      >
                        <PolarGrid
                          stroke="currentColor"
                          className="text-slate-200"
                        />
                        <PolarAngleAxis
                          dataKey="subject"
                          tickLine={false}
                          axisLine={false}
                          tick={({
                            x,
                            y,
                            textAnchor,
                            index,
                            payload,
                            ...props
                          }) => (
                            <text
                              x={x}
                              y={
                                index === 0
                                  ? Number(y) - 14
                                  : index === 3 || index === 4
                                    ? Number(y) + 10
                                    : Number(y)
                              }
                              textAnchor={textAnchor}
                              {...props}
                              className={cx(
                                "recharts-text recharts-polar-angle-axis-tick-value",
                                props.className
                              )}
                            >
                              <tspan
                                dy="0em"
                                className="fill-utility-gray-700 text-xs font-medium"
                              >
                                {payload.value}
                              </tspan>
                            </text>
                          )}
                        />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          tick={(props) => <CustomRadarChartTick {...props} />}
                          axisLine={false}
                        />
                        <ReTooltip
                          formatter={(value, _name, props) => {
                            const p = props?.payload as
                              | { pct: number; raw: number; max: number }
                              | undefined;
                            return p
                              ? [`${p.raw} / ${p.max} (${p.pct}%)`, "Score"]
                              : [String(value), "Score"];
                          }}
                          labelFormatter={(label) => String(label)}
                          wrapperStyle={{ fontSize: 12 }}
                          wrapperClassName="rounded-lg shadow-lg"
                        />
                        <Radar
                          name="% of max"
                          dataKey="pct"
                          isAnimationActive={false}
                          className="text-[#0072ce]"
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="currentColor"
                          fillOpacity={0.18}
                          strokeLinejoin="round"
                        />
                      </RechartsRadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 gauges">
              {/* Anxiety */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="Anxiety"
                    score={gadScore}
                    max={21}
                    caption="0–4 minimal · 5–9 mild · 10–14 moderate · 15–21 severe"
                  />
                  <div className="mt-3">
                    {interpLoading ? (
                      <div className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                    ) : interpError ? (
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 p-3 text-[13px]">
                        {interpError}
                      </div>
                    ) : (
                      <p className="text-[13px] leading-5 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2">
                        {interp.gad7}
                      </p>
                    )}
                  </div>
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
                  <div className="mt-3">
                    {interpLoading ? (
                      <div className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                    ) : interpError ? (
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 p-3 text-[13px]">
                        {interpError}
                      </div>
                    ) : (
                      <p className="text-[13px] leading-5 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2">
                        {interp.phq9}
                      </p>
                    )}
                  </div>
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
                  <div className="mt-3">
                    {interpLoading ? (
                      <div className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                    ) : interpError ? (
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 p-3 text-[13px]">
                        {interpError}
                      </div>
                    ) : (
                      <p className="text-[13px] leading-5 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2">
                        {interp.pss4}
                      </p>
                    )}
                  </div>
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
                  <div className="mt-3">
                    {interpLoading ? (
                      <div className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                    ) : interpError ? (
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 p-3 text-[13px]">
                        {interpError}
                      </div>
                    ) : (
                      <p className="text-[13px] leading-5 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2">
                        {interp.asrs5}
                      </p>
                    )}
                  </div>
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
                  <div className="mt-3">
                    {interpLoading ? (
                      <div className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                    ) : interpError ? (
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 p-3 text-[13px]">
                        {interpError}
                      </div>
                    ) : (
                      <p className="text-[13px] leading-5 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2">
                        {interp.ptsd}
                      </p>
                    )}
                  </div>
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
                  <div className="mt-3">
                    {interpLoading ? (
                      <div className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                    ) : interpError ? (
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 p-3 text-[13px]">
                        {interpError}
                      </div>
                    ) : (
                      <p className="text-[13px] leading-5 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2">
                        {interp.crafft}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ACE */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="Resilience"
                    score={aceScore}
                    max={52}
                    caption="higher = more resilience"
                  />
                  <div className="mt-3">
                    {interpLoading ? (
                      <div className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                    ) : interpError ? (
                      <div className="rounded-lg border border-rose-200 bg-rose-50/70 text-rose-700 p-3 text-[13px]">
                        {interpError}
                      </div>
                    ) : (
                      <p className="text-[13px] leading-5 text-slate-700 bg-slate-50/70 border border-slate-200/70 rounded-lg px-3 py-2">
                        {interp.ace}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
