"use client";

import React from "react";
import { theme } from "../theme";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
};

const Likert: React.FC<Props> = ({ id, label, value, onChange }) => {
  const options = [
    { key: "0", label: "Not at all" },
    { key: "1", label: "Several days" },
    { key: "2", label: "More than half the days" },
    { key: "3", label: "Nearly every day" },
  ];
  return (
    <div className="rounded-2xl border border-slate-300 p-4 bg-slate-50">
      <div className="text-slate-800 mb-3">{label}</div>
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
                    background: `linear-gradient(90deg, ${theme.accent}, ${theme.primary})`,
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
