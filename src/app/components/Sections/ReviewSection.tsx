"use client";

import React from "react";
import StepTitle from "../StepTitle";
import { CheckCircle2, Shield, RotateCcw, ClipboardCheck } from "lucide-react";
import { useSession } from "next-auth/react";
import { intPsychTheme } from "../theme";

export default function ReviewSection({
  title,
  step,
  submitted,
}: {
  title?: string;
  step: number;
  submitted: boolean;
}) {
  const { data: session } = useSession();

  // Code-like emphasis for the word Submit
  const SubmitPill = () => (
    <span className="inline-flex items-center rounded-md border border-lime-300 bg-lime-100 px-2 py-0.5 font-mono text-sm text-lime-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
      <b>Submit</b>
    </span>
  );

  // Pill that *visually matches* the filled primary action button
  const FeedbackPill = () => (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 font-mono text-sm shadow-sm"
      style={{ background: intPsychTheme.primary, color: "#fff" }}
    >
      <b>Feedback</b>
    </span>
  );

  return (
    <div className="space-y-4">
      <StepTitle n={step + 1} title={title ?? "You're all set"} />

      {submitted ? (
        <>
          <div className="mt-4 rounded-xl border border-sky-200 bg-sky-50/90 px-4 py-3 text-sky-900 text-md shadow-sm">
            <p className="mb-2">
              Thanks again {session?.user?.name?.split(" ")[0]}! Based on your
              responses, we’ve compiled a short visualization and summary of
              your symptom screens. Click below to view your{" "}
              <span className="font-semibold">personal report</span>.
            </p>
            <p className="text-sky-900/90">
              We’d also greatly appreciate it if you could fill out a brief
              survey for our internal quality improvement. Tap <FeedbackPill />{" "}
              below to open the form.
            </p>
          </div>

          {/* Security / next steps */}
          <div className="rounded-xl border border-gray-200 bg-white/80 p-4">
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-md font-semibold tracking-wide text-gray-900">
                Security & Next Steps
              </h3>
            </div>

            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Your data has been securely saved</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-emerald-600 mt-0.5" />
                <span>Information is transmitted confidentially</span>
              </li>
              <li className="flex items-start gap-2">
                <ClipboardCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <span>
                  Your clinician will review results before your first session
                </span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <>
          <div className="rounded-xl border border-gray-200 bg-white/90 p-4">
            <p className="text-gray-900 font-medium">
              Thank you for completing the Integrative Psych pre-clinical
              assessment!
            </p>
            <p className="mt-2 text-gray-800">
              To finish, please click <SubmitPill /> below. This ensures your
              responses are securely sent to your clinician.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white/80 p-4">
            <div className="mb-3 flex items-center gap-2">
              <h3 className="text-md font-semibold tracking-wide text-gray-900">
                Security & Next Steps
              </h3>
            </div>

            <ul className="space-y-3 text-gray-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <span>Your data has been securely saved</span>
              </li>
              <li className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-emerald-600 mt-0.5" />
                <span>Information is transmitted confidentially</span>
              </li>
              <li className="flex items-start gap-2">
                <ClipboardCheck className="h-5 w-5 text-green-600 mt-0.5" />
                <span>
                  Your clinician will review results before your first session
                </span>
              </li>
            </ul>
          </div>

          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Reminder:</strong> If you close this tab without clicking{" "}
              <SubmitPill />, your clinician may not see your latest updates.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white/60 p-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="mt-0.5 h-4 w-4 text-gray-500" />
              <p className="text-sm text-gray-700">
                Want to review your answers? You can jump back and edit. When
                you’re ready, return here and press <SubmitPill />.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
