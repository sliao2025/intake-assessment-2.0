"use client";

import React from "react";

const ReviewItem: React.FC<{ label: string; value?: string }> = ({
  label,
  value,
}) => (
  <div>
    <div className="text-slate-600 mb-1">{label}</div>
    <div className="text-slate-900">{value || "—"}</div>
  </div>
);

export default ReviewItem;
