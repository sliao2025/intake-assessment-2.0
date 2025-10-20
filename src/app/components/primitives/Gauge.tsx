import { intPsychTheme } from "../theme";

export default function Gauge({
  label,
  score,
  max,
  caption,
}: {
  label: string;
  score: number;
  max: number;
  caption?: string;
}) {
  const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
  const v = clamp01(score / max);
  const pct = Math.round(v * 1000) / 10; // one-decimal precision
  const pctClamped = Math.max(0, Math.min(100, pct));
  const isMin = pctClamped === 0;
  const isMax = pctClamped === 100;

  return (
    <div className="flex w-full flex-col">
      <div className="mb-1 flex items-center justify-between">
        <p className="text-[16px] font-bold text-slate-700">{label}</p>
        <span className="text-[16px] font-bold text-slate-700">
          {score}/{max}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-3 w-full rounded-full bg-slate-200/80">
        {/* Filled gradient up to score */}
        <div
          className="h-3 rounded-full"
          style={{
            width: `${pctClamped}%`,
            background:
              "linear-gradient(90deg, #b8e7f8ff 0%, #3a9ce2ff 50%, #05539cff 100%)",
          }}
        />

        {/* Ticker at score position */}
        <div
          className="pointer-events-none rounded-full absolute -top-1 h-5 w-3 bg-white border border-slate-300 shadow-sm"
          style={
            isMax
              ? { right: 0 }
              : isMin
                ? { left: 0 }
                : { left: `calc(${pctClamped}% - 6px)` }
          }
          aria-hidden="true"
        />
      </div>

      {caption && <p className="mt-1 text-[12px] text-slate-500">{caption}</p>}
    </div>
  );
}
