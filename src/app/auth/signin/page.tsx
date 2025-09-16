"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GardenFrame from "../../components/Garden/Garden";
import { intPsychTheme, theme, ease } from "../../components/theme";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export default function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const callbackUrl = "/"; // where to land after auth
  const { data: session } = useSession();
  const router = useRouter();
  //   useEffect(() => {
  //     if (session === "authenticated") router.replace("/");
  //   }, [session, router]);
  useEffect(() => {
    console.log(session);
    console.log(router);
    if (session?.user) console.log("hi");
  }, []);
  return (
    <div
      className="fixed inset-0 w-full h-dvh flex items-center justify-center overflow-hidden"
      style={{ background: intPsychTheme.card, color: theme.text }}
    >
      {/* Background visuals to match the main assessment page */}
      <GardenFrame bloom={0.2} />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          className="w-[50vw] max-w-xl rounded-4xl border border-gray-200 bg-white/70 backdrop-blur-sm p-6 md:p-8 shadow-md max-h-[70vh] overflow-y-auto pr-2"
        >
          <div className="space-y-5">
            <h1 className="text-2xl font-semibold">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h1>
            {mode === "signin" && (
              <p className="text-gray-700 font-sans">
                Sign in to continue your assessment and pick up right where you
                left off.
              </p>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {mode === "signin" && (
              <>
                <button
                  className={`${roboto.className} w-full cursor-pointer border-1 inline-flex items-center gap-3 rounded-full px-5 py-3 font-medium text-black transition-all`}
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: callbackUrl,
                      redirect: true,
                    })
                  }
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
                <div className="text-center text-sm text-gray-500">or</div>
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
                    body: JSON.stringify({ email, password }),
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
                  await signIn("credentials", {
                    email,
                    password,
                    callbackUrl: callbackUrl,
                    redirect: true,
                  });
                }
              }}
            >
              <div className="grid gap-3">
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
                className="w-full inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-4 py-2 font-semibold text-white"
                style={{ background: intPsychTheme.accent }}
                type="submit"
              >
                {mode === "signin" ? "Sign in" : "Create account"}
              </button>
            </form>

            <div className="text-sm text-center">
              {mode === "signin" ? (
                <button
                  className="underline cursor-pointer"
                  onClick={() => setMode("signup")}
                  style={{ color: intPsychTheme.primary }}
                >
                  Create an account
                </button>
              ) : (
                <button
                  className="underline cursor-pointer"
                  onClick={() => setMode("signin")}
                  style={{ color: intPsychTheme.primary }}
                >
                  Already have an account? Sign in
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
