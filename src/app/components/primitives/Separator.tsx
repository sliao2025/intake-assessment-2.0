// src/app/components/primitives/Separator.tsx
"use client";

import React from "react";
import { intPsychTheme } from "../theme";

type Props = {
  label?: string;
  className?: string;
};

export default function Separator({ label, className = "" }: Props) {
  return (
    <div className={`relative my-6 ${className}`}>
      <div className="border-t border-slate-600  " />
      {label ? (
        <span
          className="absolute -top-3 left-1/2 -translate-x-1/2
                     px-3 py-1 rounded-full
                     text-xs font-semibold text-white backdrop-blur-sm"
          style={{ backgroundColor: intPsychTheme.secondary }}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}
