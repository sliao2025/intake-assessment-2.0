import { ShieldUser, CheckCircle2, ChevronRight } from "lucide-react";
import StepTitle from "../StepTitle";
import { intPsychTheme } from "../theme";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function HIPAASection({
  title,
  step,
}: {
  title?: string;
  step: number;
}) {
  return (
    <div className={`space-y-5 ${dm_sans.className}`}>
      <StepTitle n={step + 1} title={title} />

      {/* Compact privacy callout */}
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 flex items-start gap-3">
        <ShieldUser className="h-5 w-5 text-emerald-600 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-emerald-900">
            Your privacy is protected
          </h3>
          <p className="text-sm text-emerald-900/90 mt-0.5">
            We keep your responses <b>private</b> and <b>secure</b> in
            accordance with <b>HIPAA</b>.
          </p>
        </div>
      </div>

      {/* Details card */}
      <div className="rounded-2xl border border-[#e7e5e4] bg-white p-5">
        <p className="text-gray-800">
          Before we start, here’s a quick overview of how your information is
          handled:
        </p>
        <ul className="mt-3 space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
            <span>Data is encrypted in transit and at rest</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
            <span>Only your care team can access your responses</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
            <span>You can review and edit answers before submitting</span>
          </li>
        </ul>

        <a
          href="https://www.integrative-psych.org/legal/hipaa"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 rounded-full border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:brightness-95"
          style={{ color: intPsychTheme.accent }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = intPsychTheme.primary)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = intPsychTheme.accent)
          }
        >
          Read the full HIPAA Notice
          <ChevronRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
