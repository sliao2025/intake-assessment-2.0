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

  return (
    <div className="flex items-start justify-between">
      <div className="flex w-5/6 flex-col items-start">
        <div className="mb-1 flex justify-between w-full">
          <p className="text-[16px] font-bold text-slate-700">{label}</p>
        </div>

        {/* Track */}
        <div className="relative h-3 w-full rounded-full bg-slate-200/80">
          {/* Filled gradient up to score */}
          <div
            className="h-3 rounded-full"
            style={{
              width: `${100}%`,
              background:
                "linear-gradient(90deg, #b8e7f8ff 0%, #3a9ce2ff 50%, #05539cff 100%)",
            }}
          />

          {/* Ticker at score position */}
          <div
            className="pointer-events-none rounded-full absolute -top-1 h-5 w-3 bg-white border border-slate-300 shadow-sm"
            style={{ left: `calc(${pct}% - 1px)` }}
            aria-hidden="true"
          />
        </div>
        {caption && (
          <p className="mt-1 w-5/6 text-[12px] text-slate-500">{caption}</p>
        )}
      </div>
      <div
        className="self-start text-[50px] ml-4 font-bold leading-none inline-block bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(180deg, ${intPsychTheme.accent} 0%, ${intPsychTheme.primary} 100%)`,
        }}
      >
        {score}
      </div>
    </div>
  );
}
