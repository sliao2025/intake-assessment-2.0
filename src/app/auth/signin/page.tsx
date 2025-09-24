"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import logo from "../../../assets/IP_Logo.png";
useEffect(() => {
  if (typeof window !== "undefined" && (window as any).__setGardenBloom) {
    (window as any).__setGardenBloom(0);
  }
}, []);
import { intPsychTheme, theme, ease } from "../../components/theme";
import { Roboto, DM_Serif_Text } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });
const dm_serif = DM_Serif_Text({ subsets: ["latin"], weight: ["400"] });

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "guest">("signin");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errorTip, setErrorTip] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!errorTip) return;
    const t = setTimeout(() => setErrorTip(null), 3500);
    return () => clearTimeout(t);
  }, [errorTip]);
  const callbackUrl = "/intake";

  return (
    <div
      className="fixed inset-0 h-dvh flex items-center justify-center overflow-hidden"
      style={{ background: intPsychTheme.card, color: theme.text }}
    >
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -15, opacity: 0 }}
          transition={{ duration: 0.8, ease }}
          className="w-full rounded-4xl border border-gray-200 bg-white/70 backdrop-blur-sm px-4 py-6 md:px-6 md:py-8 shadow-md max-h-[80vh] scrollable-div overflow-y-auto overflow-x-hidden box-border overscroll-y-contain"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarGutter: "stable both-edges",
            overscrollBehaviorX: "none",
            touchAction: "pan-y",
          }}
        >
          {errorTip && (
            <div className="mb-3">
              <div
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-white shadow"
                style={{ background: "#ef4444" /* tailwind red-500 */ }}
                role="alert"
                aria-live="assertive"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 14.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5ZM9 5.75A1 1 0 0 1 10 4.75h0a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{errorTip}</span>
              </div>
            </div>
          )}
          <div className="">
            <div className="flex items-center ">
              <Image
                src={logo}
                alt="Integrative Psych logo"
                width={100}
                height={100}
                className="object-contain mr-4"
              />
              <h1 className="text-3xl font-semibold">
                {mode !== "signup" ? (
                  <span
                    className={`${dm_serif.className}  `}
                    style={{ color: intPsychTheme.primary }}
                  >
                    Integrative Psych Intake Form
                  </span>
                ) : (
                  <span
                    className={`${dm_serif.className}`}
                    style={{ color: intPsychTheme.primary }}
                  >
                    Create your account
                  </span>
                )}
              </h1>
            </div>
            {mode === "signin" && (
              <p className="text-gray-700 font-sans">
                {/* Sign in to begin your treatment or pick up right where you left
                off. */}
              </p>
            )}
          </div>
          {mode !== "guest" && (
            <>
              <div className="mt-6 space-y-4">
                {mode === "signin" && (
                  <>
                    <button
                      className={`${roboto.className} w-full cursor-pointer border-1 inline-flex items-center gap-3 rounded-full px-5 py-3 font-medium text-black transition-all`}
                      onClick={async () => {
                        const res = await signIn("google", {
                          callbackUrl,
                          redirect: false,
                        });
                        if (res?.url) {
                          router.push(res.url);
                        }
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 533.5 544.3"
                        aria-hidden="true"
                      >
                        <path
                          fill="#4285F4"
                          d="M533.5 278.4c0-18.5-1.7-36.3-5-53.3H272v100.9h146.9c-6.3 34-25 62.8-53.3 82v68.2h86.2c50.4-46.5 81.7-115 81.7-197.8z"
                        />
                        <path
                          fill="#34A853"
                          d="M272 544.3c73.9 0 135.9-24.5 181.2-66.4l-86.2-68.2c-23.9 16.1-54.6 25.7-95 25.7-72.9 0-134.7-49.2-156.7-115.3H26.7v72.5C71.7 486.7 165.7 544.3 272 544.3z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M115.3 320.1c-10.6-31.8-10.6-66.3 0-98.1V149.5H26.7c-38.6 77.1-38.6 168.3 0 245.4l88.6-74.8z"
                        />
                        <path
                          fill="#EA4335"
                          d="M272 107.7c39.9-.6 78.2 14 107.5 40.9l80.2-80.2C409.6 25.8 344.4-.1 272 0 165.7 0 71.7 57.6 26.7 149.5l88.6 72.5C137.3 156.9 199.1 107.7 272 107.7z"
                        />
                      </svg>
                      <span>Sign in with Google</span>
                    </button>
                    <div className="my-4 flex items-center gap-3">
                      <div className="h-px bg-gray-300 flex-1" />
                      <span className="text-xs uppercase tracking-wide text-gray-500">
                        or
                      </span>
                      <div className="h-px bg-gray-300 flex-1" />
                    </div>
                  </>
                )}

                <form
                  className="space-y-3"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (mode === "signup") {
                      const res = await fetch("/api/auth/signup", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({
                          email,
                          password,
                          firstName,
                          lastName,
                        }),
                      });
                      if (!res.ok) {
                        alert(await res.text());
                        return;
                      }
                      await signIn("credentials", {
                        email,
                        password,
                        callbackUrl: callbackUrl,
                        redirect: true,
                      });
                    } else {
                      const res = await signIn("credentials", {
                        email,
                        password,
                        callbackUrl,
                        redirect: false,
                      });
                      if (res?.ok && res.url) {
                        router.push(res.url);
                      } else if (res?.error) {
                        setErrorTip(
                          "There was an error logging in. Please check your credentials and try again."
                        );
                      }
                    }
                  }}
                >
                  <div className="grid gap-3">
                    {mode === "signup" && (
                      <>
                        <input
                          className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                          type="text"
                          placeholder="First Name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                        <input
                          className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </>
                    )}
                    <input
                      className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                      type="password"
                      placeholder="Your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-white bg-[color:var(--accent)] hover:bg-[color:var(--accent-hover)] transition-colors duration-200 ease-in-out"
                    style={{
                      // fallback if you don’t use CSS vars
                      ["--accent" as any]: intPsychTheme.accent,
                      ["--accent-hover" as any]: "#0f5caeff", // a slightly darker shade
                    }}
                    type="submit"
                  >
                    {mode === "signin" ? "Sign in" : "Create account"}
                  </button>
                </form>

                <div>
                  {mode === "signin" ? (
                    <div className="flex justify-center ">
                      <button
                        className="text-sm underline cursor-pointer"
                        onClick={() => setMode("signup")}
                        style={{ color: intPsychTheme.primary }}
                      >
                        Create an account
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button
                        className="text-sm underline cursor-pointer"
                        onClick={() => setMode("signin")}
                        style={{ color: intPsychTheme.primary }}
                      >
                        Already have an account? Sign in
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-4">
                  {mode === "signin" && (
                    <>
                      <div className="my-4 flex items-center gap-3">
                        <div className="h-px bg-gray-300 flex-1" />
                        <span className="text-xs uppercase tracking-wide text-gray-500">
                          or
                        </span>
                        <div className="h-px bg-gray-300 flex-1" />
                      </div>
                      <button
                        className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-white bg-[color:var(--accent)] hover:bg-[color:var(--accent-hover)] transition-colors duration-200 ease-in-out"
                        style={{
                          // fallback if you don’t use CSS vars
                          ["--accent" as any]: intPsychTheme.secondary,
                          ["--accent-hover" as any]: "#e28929ff", // a slightly darker shade
                        }}
                        type="button"
                        onClick={() => {
                          setMode("guest");
                        }}
                      >
                        Continue as a Guest
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
          {mode === "guest" && (
            <form className="space-y-4 mt-4">
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <input
                className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <button
                className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-white bg-[color:var(--accent)] hover:bg-[color:var(--accent-hover)] transition-colors duration-200 ease-in-out"
                style={{
                  ["--accent" as any]: intPsychTheme.accent,
                  ["--accent-hover" as any]: "#0f5caeff",
                }}
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await signIn("credentials", {
                    redirect: false,
                    guest: "true",
                    firstName,
                    lastName,
                    callbackUrl,
                  });
                  if (res?.ok) {
                    router.push(callbackUrl);
                  } else {
                    setErrorTip("Guest sign-in failed. Please try again.");
                  }
                }}
              >
                Continue
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
