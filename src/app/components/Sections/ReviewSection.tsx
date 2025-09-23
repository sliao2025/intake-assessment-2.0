"use client";

import React from "react";
import StepTitle from "../StepTitle";
import { intPsychTheme } from "../theme";

export default function ReviewSection({
  title,
  step,
}: {
  title?: string;
  step: number;
}) {
  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title ?? "You're all set 🎉"} />

      <div className="rounded-xl border border-gray-200 bg-white/80 p-5">
        <p className="text-gray-800">
          You’ve completed the full intake assessment. Thank you for taking the
          time to share your background and goals—this helps your clinician
          start strong.
        </p>
        <ul className="mt-4 list-disc pl-5 text-gray-700 space-y-2">
          <li>Your responses are securely saved.</li>
          <li>
            If anything changes, you can update details at your first session.
          </li>
          <li>We’ll review your information and follow up as needed.</li>
        </ul>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white/60 p-4">
        <p className="text-sm text-gray-600">
          Tip: You can close this tab, or use the button below to jump back to
          the beginning to review your responses if you wish.
        </p>
      </div>
    </div>
  );
}
