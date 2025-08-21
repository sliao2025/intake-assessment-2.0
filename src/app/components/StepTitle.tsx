"use client";

import React from "react";
import { intPsychTheme, theme } from "./theme";

const StepTitle: React.FC<{ n: number; title: string }> = ({ n, title }) => (
  <div className="flex items-center gap-3">
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
      style={{ background: intPsychTheme.secondary, color: "white" }}
    >
      {n}
    </div>
    <h2 className="text-2xl font-serif" style={{ color: theme.text }}>
      {title}
    </h2>
  </div>
);

export default StepTitle;
