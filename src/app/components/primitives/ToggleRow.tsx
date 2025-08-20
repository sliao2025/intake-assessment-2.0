"use client";

import React from "react";
import { theme } from "../theme";

const ToggleRow: React.FC<{
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}> = ({ label, checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left ${
        checked ? "border-transparent" : "border-slate-300"
      }`}
      style={
        checked
          ? {
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.accent})`,
              color: "white",
            }
          : { color: theme.text }
      }
    >
      <span className="text-sm">{label}</span>
      <span
        className={`h-5 w-10 rounded-full transition ${
          checked ? "bg-white/40" : "bg-slate-300"
        }`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
};

export default ToggleRow;
