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
  ReportInterpretationsChild,
  SummaryPair,
  ChildAssessments,
} from "../../lib/types/types";
import { intPsychTheme } from "../theme";
import logo from "../../../assets/IP_Logo.png";
import { useSession } from "next-auth/react";

// Styled numeric tick for PolarRadiusAxis (0–100 labels)
const CustomRadarChartTick = (props: any) => {
  const { x, y, payload } = props || {};
  const xx = typeof x === "number" ? x : 0;
  const yy = typeof y === "number" ? y : 0;
  const W = 34;
  const H = 18;
  return (
    <g transform={`translate(${xx - W / 2}, ${yy - H / 2})`}>
      <foreignObject width={W} height={H}>
        <div
          className="rounded-full bg-white border border-slate-200 py-0.5 text-[10px] leading-none text-slate-600 flex items-center justify-center"
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
  logo: { width: 45, height: 45, marginRight: 8 },
  brand: { fontSize: 18, fontWeight: 700, color: "#1D3749" },
  subtle: { fontSize: 9, color: "#64748b" },
  sectionHeader: {
    fontSize: 13,
    fontWeight: 700,
    color: "#113e60",
    marginBottom: 6,
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
  value: { fontSize: 11, color: "#0f172a" },
  p: { fontSize: 11, lineHeight: 1.38, color: "#334155" },
  gaugeCaption: { fontSize: 9, color: "#64748b", marginTop: 4 },
  footer: {
    fontSize: 9,
    color: "#64748b",
    marginTop: 12,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  gaugeWrap: { marginTop: 6, marginBottom: 10 },
  gaugeLabel: { fontSize: 12, fontWeight: 700, color: "#334155" },
  interpText: { fontSize: 11, lineHeight: 1.35, color: "#334155" },
  badgeRow: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  badge: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
});

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
  const W = 440;
  const H = 14;
  const corner = 7;
  const SVG_H = H + 8;
  const BAR_Y = 4;
  const TICK_W = 5;
  const rawX = (pct / 100) * W;
  const EDGE_PAD_PX = TICK_W / 2 + 1;
  const tickerX = Math.max(EDGE_PAD_PX, Math.min(W - EDGE_PAD_PX, rawX));
  const TICK_RX = 2.5;
  const TICK_Y = BAR_Y - 2;
  const TICK_H = H + 4;

  return (
    <View style={[pdfStyles.gaugeWrap, { flexDirection: "column" }]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flexGrow: 1, paddingRight: 12 }}>
          <Text style={pdfStyles.gaugeLabel}>{label}</Text>
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
            <Rect
              x={0}
              y={BAR_Y}
              width={W}
              height={H}
              rx={corner}
              ry={corner}
              fill="#e5e7eb"
            />
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
            <Rect
              x={tickerX - TICK_W / 2}
              y={TICK_Y}
              width={TICK_W}
              height={TICK_H}
              rx={TICK_RX}
              ry={TICK_RX}
              fill="#ffffff"
            />
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
        <View style={{ minWidth: 40, alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#05539C",
              lineHeight: 1.0,
            }}
          >
            {String(score)}
          </Text>
        </View>
      </View>
      {caption ? (
        <Text style={[pdfStyles.gaugeCaption, { marginTop: 6 }]}>
          {caption}
        </Text>
      ) : null}
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
  profile: Profile;
  title: string;
  step: number;
  setProfile?: (updater: (prev: Profile) => Profile) => void;
};

function coerceChildInterp(
  input: Record<string, string> | null | undefined
): ReportInterpretationsChild {
  return {
    discChild: input?.discChild ?? "",
    discParent: input?.discParent ?? "",
    snapInattention: input?.snapInattention ?? "",
    snapHyperactivity: input?.snapHyperactivity ?? "",
    snapOpposition: input?.snapOpposition ?? "",
    scaredChild: input?.scaredChild ?? "",
    scaredParent: input?.scaredParent ?? "",
  };
}

const scoreSum = (obj: Record<string, any> = {}) =>
  Object.values(obj).reduce(
    (a, v) => a + (typeof v === "string" ? Number(v) || 0 : v || 0),
    0
  );

export default function ReportSectionChild({
  profile,
  title,
  step,
  setProfile,
}: Props) {
  const childAssess = profile.assessments.data as ChildAssessments;
  const printableRef = useRef<HTMLDivElement | null>(null);

  // Compute child metrics
  // DISC Teen self-report (0-22)
  const discChildScore = scoreSum(
    childAssess?.discTeen?.self?.responses as Record<string, any>
  );

  // DISC Teen parent-report (0-22)
  const discParentScore = scoreSum(
    childAssess?.discTeen?.parent?.responses as Record<string, any>
  );

  // SNAP subscales (26 items total, rated 0-3)
  // Inattention: items 1-9 (0-27)
  const snapInattentionScore = scoreSum(
    Object.fromEntries(
      Object.entries(childAssess?.snap ?? {}).filter(([k]) => {
        const n = Number(k.replace("q", ""));
        return n >= 1 && n <= 9;
      })
    )
  );

  // Hyperactivity: items 10-18 (0-27)
  const snapHyperactivityScore = scoreSum(
    Object.fromEntries(
      Object.entries(childAssess?.snap ?? {}).filter(([k]) => {
        const n = Number(k.replace("q", ""));
        return n >= 10 && n <= 18;
      })
    )
  );

  // Opposition: items 19-26 (0-24)
  const snapOppositionScore = scoreSum(
    Object.fromEntries(
      Object.entries(childAssess?.snap ?? {}).filter(([k]) => {
        const n = Number(k.replace("q", ""));
        return n >= 19 && n <= 26;
      })
    )
  );

  // SCARED self-report (0-82)
  const scaredChildScore = scoreSum(
    childAssess?.scared?.self?.responses as Record<string, any>
  );

  // SCARED parent-report (0-82)
  const scaredParentScore = scoreSum(
    childAssess?.scared?.parent?.responses as Record<string, any>
  );

  const metrics = {
    discChild: discChildScore,
    discParent: discParentScore,
    snapInattention: snapInattentionScore,
    snapHyperactivity: snapHyperactivityScore,
    snapOpposition: snapOppositionScore,
    scaredChild: scaredChildScore,
    scaredParent: scaredParentScore,
  };

  const radarData = [
    {
      subject: "DISC Self-Report",
      pct: Math.round((discChildScore / 22) * 100),
      raw: discChildScore,
      max: 22,
    },
    {
      subject: "DISC Parent-Report",
      pct: Math.round((discParentScore / 22) * 100),
      raw: discParentScore,
      max: 22,
    },
    {
      subject: "SNAP Inattention",
      pct: Math.round((snapInattentionScore / 27) * 100),
      raw: snapInattentionScore,
      max: 27,
    },
    {
      subject: "SNAP Hyperactivity",
      pct: Math.round((snapHyperactivityScore / 27) * 100),
      raw: snapHyperactivityScore,
      max: 27,
    },
    {
      subject: "SNAP Opposition",
      pct: Math.round((snapOppositionScore / 24) * 100),
      raw: snapOppositionScore,
      max: 24,
    },
    {
      subject: "SCARED Self-Report",
      pct: Math.round((scaredChildScore / 82) * 100),
      raw: scaredChildScore,
      max: 82,
    },
    {
      subject: "SCARED Parent-Report",
      pct: Math.round((scaredParentScore / 82) * 100),
      raw: scaredParentScore,
      max: 82,
    },
  ];

  const hasReport =
    Boolean(profile?.report?.summary) &&
    Boolean(profile?.report?.interpretations);

  const [summary, setSummary] = useState<SummaryPair>(
    profile?.report?.summary ?? { reason_for_eval: "", background: "" }
  );
  const [interp, setInterp] = useState<ReportInterpretationsChild>(() => {
    const stored = profile?.report?.interpretations;
    if (stored && "discChild" in stored) {
      return stored as ReportInterpretationsChild;
    }
    return coerceChildInterp(undefined);
  });
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

        const newInterp: ReportInterpretationsChild = coerceChildInterp(
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
            report: { summary: newSummary, interpretations: newInterp },
          }));
          const nextProfile: Profile = {
            ...profile,
            report: { summary: newSummary, interpretations: newInterp },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              label="DISC Teen Self-Report"
              score={discChildScore}
              max={22}
              caption="0-6 very unlikely · 7-11 moderately unlikely · 12-15 likely · 16+ highly likely"
              interpretation={interp.discChild}
              fallback={useFallback}
            />
            <PdfGauge
              label="DISC Teen Parent-Report"
              score={discParentScore}
              max={22}
              caption="0-6 very unlikely · 7-11 moderately unlikely · 12-15 likely · 16+ highly likely"
              interpretation={interp.discParent}
              fallback={useFallback}
            />
            <PdfGauge
              label="SNAP Inattention"
              score={snapInattentionScore}
              max={27}
              caption="<13 not significant · 13-17 mild · 18-22 moderate · 23-27 severe"
              interpretation={interp.snapInattention}
              fallback={useFallback}
            />
            <PdfGauge
              label="SNAP Hyperactivity"
              score={snapHyperactivityScore}
              max={27}
              caption="<13 not significant · 13-17 mild · 18-22 moderate · 23-27 severe"
              interpretation={interp.snapHyperactivity}
              fallback={useFallback}
            />
            <PdfGauge
              label="SNAP Opposition"
              score={snapOppositionScore}
              max={24}
              caption="<8 not significant · 8-13 mild · 14-18 moderate · 19-24 severe"
              interpretation={interp.snapOpposition}
              fallback={useFallback}
            />
            <PdfGauge
              label="SCARED Self-Report"
              score={scaredChildScore}
              max={82}
              caption="greater than or equal to 25 may indicate anxiety disorder"
              interpretation={interp.scaredChild}
              fallback={useFallback}
            />
            <PdfGauge
              label="SCARED Parent-Report"
              score={scaredParentScore}
              max={82}
              caption="greater than or equal to 25 may indicate anxiety disorder"
              interpretation={interp.scaredParent}
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
          Below is a summarized overview of your child's results. Your clinician
          will have access to the full, more detailed report.
        </p>

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
                  soon as they're ready.
                </p>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <>
            <div className="mt-4 mb-4 mx-auto space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-sm">
                <div className="p-4 space-y-3">
                  <div className="h-5 w-28 bg-slate-100 animate-pulse rounded" />
                  <div className="h-5 w-40 bg-slate-100 animate-pulse rounded" />
                  <div className="h-10 bg-slate-100 animate-pulse rounded" />
                </div>
              </div>
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

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 text-rose-700 p-4 text-sm">
            Error generating summary: {error}
          </div>
        )}

        {!error && !loading && (
          <>
            <div className="mt-4 mb-6 mx-auto space-y-4">
              {/* Patient Info */}
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

              {/* Reason */}
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

              {/* Background */}
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

              {/* Radar */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm card">
                <div className="p-4">
                  <h3 className="text-md font-bold text-slate-900">{`${session?.user?.name?.split(" ")[0]}'s Profile`}</h3>
                  <p className="text-[12px] text-slate-600 mb-2">
                    A visual representation of your child's screening scores as
                    a % of the maximum score possible for each screener.
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
              {/* DISC Self */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="DISC Teen Self-Report"
                    score={discChildScore}
                    max={22}
                    caption="0-6 very unlikely · 7-11 moderately unlikely · 12-15 likely · 16+ highly likely"
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
                        {interp.discChild}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* DISC Parent */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="DISC Teen Parent-Report"
                    score={discParentScore}
                    max={22}
                    caption="0-6 very unlikely · 7-11 moderately unlikely · 12-15 likely · 16+ highly likely"
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
                        {interp.discParent}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SNAP Inattention */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="SNAP Inattention"
                    score={snapInattentionScore}
                    max={27}
                    caption="<13 not significant · 13-17 mild · 18-22 moderate · 23-27 severe"
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
                        {interp.snapInattention}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SNAP Hyperactivity */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="SNAP Hyperactivity"
                    score={snapHyperactivityScore}
                    max={27}
                    caption="<13 not significant · 13-17 mild · 18-22 moderate · 23-27 severe"
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
                        {interp.snapHyperactivity}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SNAP Opposition */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="SNAP Opposition"
                    score={snapOppositionScore}
                    max={24}
                    caption="<8 not significant · 8-13 mild · 14-18 moderate · 19-24 severe"
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
                        {interp.snapOpposition}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SCARED Self */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="SCARED Self-Report"
                    score={scaredChildScore}
                    max={82}
                    caption="≥ 25 may indicate anxiety disorder"
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
                        {interp.scaredChild}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SCARED Parent */}
              <div className="group rounded-2xl border border-slate-200 bg-white/80 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-4">
                  <Gauge
                    label="SCARED Parent-Report"
                    score={scaredParentScore}
                    max={82}
                    caption="≥ 25 may indicate anxiety disorder"
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
                        {interp.scaredParent}
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
