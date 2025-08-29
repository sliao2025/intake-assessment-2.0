"use client";

import React from "react";

const Field: React.FC<{
  title?: string | React.ReactNode;
  label?: string | React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ title, label, required, children, className }) => (
  <label className={`block ${className || ""}`}>
    <div className="mb-1 text-md semibold text-slate-700">
      {required && <span className="text-rose-600">* </span>}
      {title}
    </div>
    <div className="mb-1 text-sm semibold text-slate-700">{label}</div>
    {children}
  </label>
);

export default Field;
