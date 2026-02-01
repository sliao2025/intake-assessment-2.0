export default function TextAreaWithEncouragement({
  value,
  onChangeText,
  placeholder,
  rows = 6,
  className = "",
  recommendedWords = 60,
  lowPct = 0.33,
  mediumPct = 0.66,
}: {
  value: string;
  onChangeText: (next: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  recommendedWords?: number;
  lowPct?: number;
  mediumPct?: number;
}) {
  const wordCount = (text: string) =>
    (text || "").trim().split(/\s+/).filter(Boolean).length;

  const words = wordCount(value);
  const pct = Math.min(100, Math.round((words / recommendedWords) * 100));
  const pctFrac = pct / 100;

  const isLow = pctFrac <= lowPct;
  const isMedium = pctFrac > lowPct && pctFrac <= mediumPct;

  const textColor = isLow
    ? "text-red-600"
    : isMedium
      ? "text-amber-500"
      : "text-emerald-700";
  const barColor = isLow
    ? "bg-red-500"
    : isMedium
      ? "bg-amber-400"
      : "bg-emerald-600";

  return (
    <div>
      <textarea
        rows={rows}
        className={`w-full rounded-2xl bg-white border border-stone-300 px-4 py-3 text-stone-900 placeholder:text-stone-400 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
      />
      <div className="mt-2">
        <div className="h-1.5 rounded-full bg-stone-200 overflow-hidden">
          <div
            className={`h-full w-full ${barColor} origin-left transform transition-transform duration-700 ease-in-out motion-reduce:transition-none`}
            style={{
              transform: `scaleX(${pct / 100})`,
              willChange: "transform",
            }}
          />
        </div>
        <div
          className={`mt-1 text-xs ${textColor} transition-colors duration-300 ease-in-out`}
        >
          {words === 0
            ? `We recommend about ${recommendedWords}+ words to give your clinician helpful context.`
            : `You're at ${words} word${words === 1 ? "" : "s"} (~${pct}% of the suggested detail). ${
                words < recommendedWords
                  ? "Adding a bit more can help us understand your story."
                  : "Great detail—thank you!"
              }`}
        </div>
      </div>
    </div>
  );
}
