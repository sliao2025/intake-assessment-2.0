"use client";

import React from "react";
import { intPsychTheme, theme, sigmundTheme } from "./theme";

const StepTitle: React.FC<{ n: number; title: string; subtitle?: string }> = ({
  n,
  title,
  subtitle,
}) => (
  <div className="space-y-2">
    <div className="flex items-center gap-3">
      <div
        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
        style={{ background: sigmundTheme.secondary, color: "white" }}
      >
        {n}
      </div>
      <h2 className="text-2xl font-serif" style={{ color: theme.text }}>
        {title}
      </h2>
    </div>
    {subtitle && <p className="text-sm italic text-stone-600">{subtitle}</p>}
  </div>
);

export default StepTitle;
