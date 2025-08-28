"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
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
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-4 py-3">
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
              className="font-bold text-2xl font-serif"
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

        <div className="mt-3 flex items-center gap-3 overflow-x-auto text-sm">
          {stepTitles.map((title, i) => (
            <div
              key={title}
              className={`flex items-center gap-1 ${
                i === step ? "font-semibold" : "text-gray-500"
              } ${i <= maxVisited ? "cursor-pointer" : "cursor-not-allowed"}`}
              style={
                i === step
                  ? { color: intPsychTheme.primary }
                  : i < maxVisited
                  ? { color: theme.primary }
                  : undefined
              }
              onClick={() => {
                const isAllowed = i <= maxVisited;
                if (isAllowed) {
                  onStepClick(i);
                }
              }}
            >
              <div
                className={`h-2 w-2 rounded-full ${"bg-gray-300"}`}
                style={
                  i === step
                    ? { background: intPsychTheme.primary }
                    : i < maxVisited
                    ? { background: theme.primary }
                    : undefined
                }
              />{" "}
              {title}
            </div>
          ))}
        </div>

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
      </div>
    </div>
  );
};

export default ProgressHeader;
