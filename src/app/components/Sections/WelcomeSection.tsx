import { CheckCircle2, Clock2Icon } from "lucide-react";
import type { Profile } from "../../lib/types/types";
import { welcomeMessages } from "../messages";
import StepTitle from "../StepTitle";
import { Session } from "next-auth";

export default function WelcomeSection({
  title,
  step,
  profile,
  session,
}: {
  title?: string;
  step: number;
  profile: Profile;
  session: Session;
}) {
  return (
    <div className="space-y-6">
      <StepTitle
        n={step + 1}
        title={`${(() => {
          if (profile.maxVisited === 0) return welcomeMessages[0];
          if (profile.maxVisited >= 1 && profile.maxVisited <= 4)
            return welcomeMessages[1];
          if (profile.maxVisited === 5) return welcomeMessages[2];
          if (profile.maxVisited >= 6 && profile.maxVisited <= 8)
            return welcomeMessages[3];
          return welcomeMessages[4];
        })()} ${session?.user?.name?.split(" ")[0] ?? ""}!`}
      />

      {/* At-a-glance cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
          <div className="text-sm text-slate-500">Estimated time</div>
          <div className="text-lg items-start flex font-semibold text-slate-900">
            <p>30–60 minutes</p>
          </div>
          <div className="mt-2 text-sm text-slate-600">
            You can move between sections and come back to edit answers.
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
          <div className="text-sm text-slate-500">Format</div>
          <div className="text-lg font-semibold text-slate-900">
            Multiple‑choice + Free‑response
          </div>
          <div className="mt-2 text-sm text-slate-600">
            Type your responses or select from options.
          </div>
        </div>
      </div>

      {/* What to expect */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
        <h3 className="font-semibold text-slate-900">What to expect</h3>
        <ul className="mt-3 space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 flex-none text-emerald-600" />
            <span className="text-slate-700">
              This intake helps your clinician <b>jumpstart treatment</b> by
              gathering context that might otherwise take a full session.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 flex-none text-emerald-600" />
            <span className="text-slate-700">
              Progress is shown above. You’ll unlock later sections as you
              complete earlier ones.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 flex-none text-emerald-600" />
            <span className="text-slate-700">
              The more <b>detail</b> you provide, the better we can tailor your
              care.
            </span>
          </li>
        </ul>
      </div>

      {/* Saving behavior */}
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
        <h3 className="font-semibold text-slate-900">Saving &amp; returning</h3>
        {session?.user?.role === "guest" ? (
          <p className="mt-2 text-slate-700">
            You’re using a <b>guest session</b>. If you close this tab, your
            progress won’t save. To save and return later, please create an
            account or sign in with Google.
          </p>
        ) : (
          <div className="mt-2 space-y-2 text-slate-700">
            <p>
              Your progress saves each time you click <b>Next</b>. You can
              return later and pick up where you left off.
            </p>
            <p className="text-sm text-slate-600">
              Note: If you leave a page mid‑way without clicking Next, answers
              on that page may not be saved.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
