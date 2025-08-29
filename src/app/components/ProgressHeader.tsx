"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { theme, intPsychTheme, ease } from "./theme";
import logo from "../../assets/IP_Logo.png";

type Props = {
  step: number;
  total: number;
  praise: string | null;
  onStepClick: (i: number) => void;
  stepTitles: string[];
  canNext: boolean;
  maxVisited: number;
  progressPct: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function estimateTabPx(title: string) {
  const base = 56;
  const perChar = 7.2;
  return clamp(Math.round(base + title.length * perChar), 90, 220);
}

function estimateAvgTabPx(titles: string[], center: number) {
  if (!titles.length) return 140;
  const radius = 5;
  const start = clamp(center - radius, 0, titles.length - 1);
  const end = clamp(center + radius, 0, titles.length - 1);
  let sum = 0;
  let count = 0;
  for (let i = start; i <= end; i++) {
    sum += estimateTabPx(titles[i]);
    count++;
  }
  return clamp(Math.round(sum / Math.max(1, count)), 100, 180);
}

const useSmartCapacity = (
  targetRef: React.RefObject<HTMLDivElement>,
  titles: string[],
  step: number
) => {
  const [capacity, setCapacity] = React.useState<number>(7);

  React.useEffect(() => {
    if (!targetRef.current) return;
    const el = targetRef.current;

    const compute = () => {
      const width = el.clientWidth || 0;
      const avgTabPx = estimateAvgTabPx(titles, step);
      const gapPx = 12;
      const usable = Math.max(0, width);

      const n = Math.floor((usable + gapPx) / (avgTabPx + gapPx));
      setCapacity(clamp(n, 3, 12));
    };

    const ro = new ResizeObserver(() => compute());
    ro.observe(el);
    compute();
    window.addEventListener("resize", compute, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [targetRef, titles, step]);

  return capacity;
};

function computeWindow(
  current: number,
  total: number,
  capacity: number
): { start: number; end: number; showLeft: boolean; showRight: boolean } {
  if (capacity >= total) {
    return { start: 0, end: total - 1, showLeft: false, showRight: false };
  }
  const half = Math.floor(capacity / 2);
  let start = current - half;
  let end = start + capacity - 1;
  if (start < 0) {
    start = 0;
    end = capacity - 1;
  }
  if (end > total - 1) {
    end = total - 1;
    start = end - capacity + 1;
  }
  return { start, end, showLeft: start > 0, showRight: end < total - 1 };
}

const OverflowSignal: React.FC<{
  side: "left" | "right";
  hiddenCount: number;
}> = ({ side, hiddenCount }) => {
  const gradient =
    side === "left"
      ? "bg-gradient-to-r from-white to-transparent"
      : "bg-gradient-to-l from-white to-transparent";
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  const label = hiddenCount > 0 ? `${hiddenCount} more` : "More";

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 w-20 ${gradient} ${
        side === "left" ? "left-0 justify-start" : "right-0 justify-end"
      } flex items-center`}
      style={{ zIndex: 1 }}
    >
      <div
        className={`pointer-events-none inline-flex items-center gap-1 rounded-full bg-gray-100/90 px-2 py-0.5 text-xs font-medium text-gray-600 shadow-sm border border-gray-200 whitespace-nowrap leading-none ${
          side === "left" ? "ml-1" : "mr-1"
        }`}
        title={side === "left" ? "Earlier sections" : "Later sections"}
      >
        <Icon className="h-3.5 w-3.5 shrink-0" />
        <span className="shrink-0">{label}</span>
      </div>
    </div>
  );
};

const ProgressHeader: React.FC<Props> = ({
  step,
  total,
  praise,
  onStepClick,
  stepTitles,
  canNext,
  maxVisited,
  progressPct,
}) => {
  const stepsRowRef = React.useRef<HTMLDivElement>(null);
  const capacity = useSmartCapacity(stepsRowRef, stepTitles, step);

  const { start, end, showLeft, showRight } = React.useMemo(
    () => computeWindow(step, stepTitles.length, capacity),
    [step, stepTitles.length, capacity]
  );

  const visible = React.useMemo(
    () => stepTitles.slice(start, end + 1),
    [stepTitles, start, end]
  );

  const hiddenLeftCount = start;
  const hiddenRightCount = stepTitles.length - 1 - end;

  // alignment mode
  const justifyClass =
    showLeft && showRight
      ? "justify-center"
      : showLeft
      ? "justify-end"
      : "justify-start";

  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-4 py-3">
        {/* Logo / praise */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Integrative Psych logo"
              width={48}
              height={48}
              className="h-10 w-10 object-contain"
            />
            <span
              className="font-semibold text-2xl font-serif"
              style={{ color: intPsychTheme.primary }}
            >
              Integrative Psych Intake Assessment
            </span>
          </div>

          {praise && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="hidden md:flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium bg-green-100 text-green-700"
            >
              <CheckCircle2 className="h-4 w-4" /> {praise}
            </motion.div>
          )}
        </div>

        {/* Steps */}
        <div className="relative mt-3">
          {showLeft && (
            <OverflowSignal side="left" hiddenCount={hiddenLeftCount} />
          )}
          {showRight && (
            <OverflowSignal side="right" hiddenCount={hiddenRightCount} />
          )}

          <div
            ref={stepsRowRef}
            className={`flex items-center ${justifyClass} gap-3 text-sm overflow-hidden`}
            role="tablist"
            aria-label="Assessment sections"
            style={{
              paddingLeft: showLeft ? 80 : 0,
              paddingRight: showRight ? 80 : 0,
            }}
          >
            {visible.map((title, idx) => {
              const absoluteIndex = start + idx;
              const isActive = absoluteIndex === step;
              const isVisited = absoluteIndex <= maxVisited;
              const color = isActive
                ? intPsychTheme.primary
                : absoluteIndex < maxVisited
                ? theme.primary
                : undefined;

              return (
                <button
                  key={`${title}-${absoluteIndex}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-current={isActive ? "step" : undefined}
                  disabled={!isVisited}
                  onClick={() => {
                    if (isVisited) onStepClick(absoluteIndex);
                  }}
                  className={`group flex items-center gap-2 rounded-full px-2 py-1 transition-colors ${
                    isVisited ? "cursor-pointer" : "cursor-not-allowed"
                  } ${isActive ? "font-semibold" : "text-gray-600"}`}
                  style={color ? { color } : undefined}
                >
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-gray-300 transition-colors"
                    style={
                      isActive
                        ? { background: intPsychTheme.primary }
                        : absoluteIndex < maxVisited
                        ? { background: theme.primary }
                        : undefined
                    }
                  />
                  <span className="whitespace-nowrap">{title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-2"
            style={{
              background: `linear-gradient(90deg, ${intPsychTheme.primary}, ${intPsychTheme.accent})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.6, ease }}
          />
        </div>

        {/* Screen reader context */}
        <div className="sr-only">
          Showing steps {start + 1}–{end + 1} of {stepTitles.length}.{" "}
          {showLeft && `${hiddenLeftCount} earlier section(s) hidden.`}{" "}
          {showRight && `${hiddenRightCount} later section(s) hidden.`}
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
