"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { theme, ease } from "./theme";

type Props = {
  step: number;
  total: number;
  praise: string | null;
  onStepClick: (i: number) => void;
  stepTitles: string[];
  canNext: boolean;
};

const ProgressHeader: React.FC<Props> = ({
  step,
  total,
  praise,
  onStepClick,
  stepTitles,
  canNext,
}) => {
  const progress = Math.round(((step + 1) / total) * 100);

  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-4xl px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-xl flex items-center justify-center"
              style={{ background: theme.primary }}
            >
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span
              className="font-semibold font-serif"
              style={{ color: theme.text }}
            >
              Assessment
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
              className={`flex items-center gap-1 cursor-pointer ${
                i === step ? "font-semibold text-green-700" : "text-gray-500"
              }`}
              onClick={() => {
                const isBackOrCurrent = i <= step;
                const isForwardAllowed = i > step && canNext;
                if (isBackOrCurrent || isForwardAllowed) {
                  onStepClick(i);
                }
              }}
            >
              <div
                className={`h-2 w-2 rounded-full ${
                  i <= step ? "bg-green-600" : "bg-gray-300"
                }`}
              />{" "}
              {title}
            </div>
          ))}
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-2"
            style={{
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressHeader;
