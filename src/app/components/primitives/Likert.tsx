"use client";

import React from "react";
import { intPsychTheme, theme } from "../theme";

type Props = {
  id?: string;
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options?: { key: string; label: string }[];
};

const Likert: React.FC<Props> = ({ id, label, value, onChange, options }) => {
  return (
    <div className="rounded-2xl border border-slate-300 p-4 bg-slate-50">
      <div className={`text-slate-800 ${label ? "mb-3" : "mb-0"}`}>{label}</div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((o) => (
          <button
            key={o.key}
            onClick={() => onChange(o.key)}
            className={`rounded-xl border px-3 py-2 text-sm transition ${
              value === o.key
                ? "border-transparent text-white"
                : "border-slate-300 text-slate-700 hover:border-slate-400"
            }`}
            style={
              value === o.key
                ? {
                    background: `linear-gradient(90deg, ${intPsychTheme.accent}, ${intPsychTheme.primary})`,
                  }
                : {}
            }
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Likert;
