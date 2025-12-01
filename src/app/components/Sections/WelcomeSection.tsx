import {
  CheckCircle2,
  Clock2Icon,
  Mic,
  RotateCcw,
  FileAudio,
  Check,
  ChevronDown,
} from "lucide-react";
import type { Profile } from "../../lib/types/types";
import type { StateSetter } from "../../lib/types/types";
import { welcomeMessages } from "../messages";
import StepTitle from "../StepTitle";
import { Session } from "next-auth";
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  makeDefaultAdultProfile,
  makeDefaultChildProfile,
} from "../../intake/page";
import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { CLINICIANS } from "../../lib/text";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function WelcomeSection({
  title,
  step,
  profile,
  session,
  setProfile,
}: {
  title?: string;
  step: number;
  profile: Profile;
  session: Session;
  setProfile: StateSetter<Profile>;
}) {
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clinicianName, setClinicianName] = useState<string>("");

  const updateDropdownPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px = mt-2
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  // Fetch clinician name from database on mount
  useEffect(() => {
    const fetchClinician = async () => {
      try {
        const response = await fetch("/api/profile/load");
        if (response.ok) {
          const data = await response.json();
          if (data.clinician) {
            setClinicianName(data.clinician);
          }
        }
      } catch (error) {
        console.error("Error fetching clinician:", error);
      }
    };

    fetchClinician();
  }, []);

  const saveClinician = async (clinician: string) => {
    try {
      const response = await fetch("/api/profile/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "updateClinician",
          clinician,
        }),
      });

      if (!response.ok) {
        console.error("Failed to save clinician");
      }
    } catch (error) {
      console.error("Error saving clinician:", error);
    }
  };

  return (
    <div className={`space-y-4 ${dm_sans.className}`}>
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

      {/* Adult vs Child selector (only if unanswered) */}
      {profile.maxVisited === 0 && (
        <div className="rounded-2xl border border-[#e7e5e4] bg-white p-4 md:p-5">
          <h3 className="font-semibold text-slate-900">
            Who is this assessment for?
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Please select who will be receiving treatment.
          </p>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() =>
                setProfile({ ...makeDefaultAdultProfile(), isChild: false })
              }
              className={`w-full text-left rounded-xl border border-b-4 p-4 transition hover:brightness-95 active:scale-95 ${
                profile.isChild === false
                  ? "border-emerald-500 bg-emerald-50/80"
                  : "border-slate-200 bg-white/70"
              }`}
            >
              <div className="font-medium text-slate-900">
                Myself (Adult 18+)
              </div>
              <div className="text-sm text-slate-600">
                I am completing this for my own treatment.
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setProfile({ ...makeDefaultChildProfile(), isChild: true });
              }}
              className={`w-full text-left rounded-xl border border-b-4 p-4 transition hover:brightness-95 active:scale-95 ${
                profile.isChild === true
                  ? "border-emerald-500 bg-emerald-50/80"
                  : "border-slate-200 bg-white/70"
              }`}
            >
              <div className="font-medium text-slate-900">
                My Child (Under 18)
              </div>
              <div className="text-sm text-slate-600">
                I am a parent or guardian filling this out for my child.
              </div>
            </button>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold text-slate-900">
              Who's your clinician?
            </h3>
            <Field className="mt-3" title="Who's your clinician?">
              <Listbox
                value={clinicianName || ""}
                onChange={(val: string) => {
                  setClinicianName(val);
                  setDropdownPosition(null);
                  saveClinician(val);
                }}
              >
                {({ open }) => {
                  // Update position when dropdown opens
                  React.useEffect(() => {
                    if (open) {
                      // Small delay to ensure button is rendered
                      requestAnimationFrame(() => {
                        updateDropdownPosition();
                      });
                    } else {
                      setDropdownPosition(null);
                    }
                  }, [open]);

                  return (
                    <div className="relative">
                      <ListboxButton
                        ref={buttonRef}
                        className="w-full relative block rounded-xl bg-white border border-slate-300 px-3 py-2 text-left text-slate-900"
                      >
                        {clinicianName ? (
                          <span className="text-slate-900">
                            {clinicianName}
                          </span>
                        ) : (
                          <span className="text-slate-400">
                            Your assigned clinician…
                          </span>
                        )}
                        <ChevronDown
                          className="group pointer-events-none absolute top-3 right-2.5 size-4"
                          aria-hidden="true"
                        />
                      </ListboxButton>

                      {open && dropdownPosition && typeof window !== "undefined"
                        ? createPortal(
                            <ListboxOptions
                              static
                              className="fixed z-[9999] mt-2 max-h-60 overflow-auto rounded-xl bg-white py-1 shadow-lg border border-slate-200 focus:outline-none list-none"
                              style={{
                                top: `${dropdownPosition.top}px`,
                                left: `${dropdownPosition.left}px`,
                                width: `${dropdownPosition.width}px`,
                              }}
                            >
                              {CLINICIANS.map((clinician) => (
                                <ListboxOption
                                  key={clinician.name}
                                  value={clinician.name}
                                  as={React.Fragment}
                                >
                                  {({ active, selected }) => (
                                    <li
                                      className={`${
                                        active ? "bg-slate-100" : "bg-white"
                                      } relative cursor-pointer select-none py-2 pl-4 pr-10`}
                                    >
                                      <span
                                        className={`${
                                          selected
                                            ? "font-medium text-slate-900"
                                            : "font-normal text-slate-700"
                                        } block truncate`}
                                      >
                                        {clinician.name}
                                      </span>
                                      {selected && (
                                        <span className="absolute inset-y-0 right-3 flex items-center text-slate-600">
                                          <Check />
                                        </span>
                                      )}
                                    </li>
                                  )}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>,
                            document.body
                          )
                        : null}
                    </div>
                  );
                }}
              </Listbox>
            </Field>
          </div>
        </div>
      )}

      {profile.isChild !== null && clinicianName !== "" && (
        <>
          {/* At-a-glance cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-4">
              <div className="text-sm text-slate-500">Estimated time</div>
              <div className="text-lg items-start flex font-semibold text-slate-900">
                <p>30–60 minutes</p>
              </div>
              <div className="mt-2 text-sm text-slate-600">
                You can move between sections and come back to edit answers.
              </div>
            </div>
            <div className="rounded-2xl border border-[#e7e5e4] bg-white p-4">
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
          <div className="rounded-2xl border border-[#e7e5e4] bg-white p-4 md:p-5">
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
                  The more <b>detail</b> you provide, the better we can tailor
                  your care.
                </span>
              </li>
            </ul>
          </div>

          {/* Voice Recordings */}
          <div className="rounded-2xl border border-[#e7e5e4] bg-white p-4 md:p-5">
            <h3 className="font-semibold text-slate-900">Voice Recordings</h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start gap-2">
                <Mic className="mt-0.5 h-5 w-5 shrink-0 flex-none text-red-600" />
                <span className="text-slate-700">
                  <b>Record your answers</b> instead of typing—your clinician
                  will gain a richer, more nuanced understanding of your
                  situation.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <FileAudio className="mt-0.5 h-5 w-5 shrink-0 flex-none text-red-600" />
                <span className="text-slate-700">
                  You can record, type, or use <b>both methods</b> for each
                  question.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <RotateCcw className="mt-0.5 h-5 w-5 shrink-0 flex-none text-red-600" />
                <span className="text-slate-700">
                  To re-record, click <b>Delete</b> first, then click{" "}
                  <b>Record</b> again.
                </span>
              </li>
            </ul>
          </div>

          {/* Saving behavior */}
          <div className="rounded-2xl border border-[#e7e5e4] bg-white p-4 md:p-5">
            <h3 className="font-semibold text-slate-900">
              Saving &amp; returning
            </h3>
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
                  Note: If you leave a page mid‑way without clicking Next,
                  answers on that page may not be saved.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
