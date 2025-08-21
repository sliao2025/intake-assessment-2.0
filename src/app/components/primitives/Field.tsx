"use client";

import React from "react";

const Field: React.FC<{
  label?: string | React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}> = ({ label, required, children }) => (
  <label className="block">
    <div className="mb-1 text-sm text-slate-700">
      {required && <span className="text-rose-600">* </span>}
      {label}
    </div>
    {children}
  </label>
);

export default Field;
