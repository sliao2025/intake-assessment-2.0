// src/app/components/decor/bamboo/BambooForest.tsx
import React from "react";
import BambooRow from "./BambooRow";
import { intPsychTheme } from "../../components/theme";

/** Harmonized green shades (3–5 as requested) */
const G1 = "#0f5d33";
const G2 = "#188f4eff";
const G3 = "#25a92cff";
const G4 = "#3e8c41";
const G5 = "#4fa556";

const paletteCool = {
  stems: [G3, G1, G2],
  nodes: ["#175a2b", "#1f6a25", "#267c2e"],
  leaves: ["#4fb66a", "#49a95f", "#5fc57a"],
};

const paletteWarm = {
  stems: [G5, G4, G3],
  nodes: ["#4c6c2aff", "#26632f", "#225a2a"],
  leaves: ["#64c27e", "#58b972", "#4fb66a"],
};

const paletteFront = {
  stems: [G2, G3, G4],
  nodes: ["#1f9729ff", "#258e2fff", "#2ca136ff"],
  leaves: ["#64c27e", "#6acb86", "#73d18f"],
};

const BambooForestFrame: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      {/* Ground gradient (match your garden style) */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, rgba(4, 255, 0, 0.58), rgba(86, 205, 36, 0.14), rgba(164, 249, 115, 0))",
        }}
      />

      {/* Background layer – higher on screen, lighter opacity, smaller scale */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] opacity-40">
        <div className="mx-auto max-w-7xl px-2 space-y-6">
          <BambooRow count={10} scale={0.8} palette={paletteCool} />
          <BambooRow count={9} scale={0.9} palette={paletteCool} />
        </div>
      </div>

      {/* Midground */}
      <div className="absolute inset-x-0 bottom-0 h-[42%] opacity-60">
        <div className="mx-auto max-w-6xl px-3 space-y-4">
          <BambooRow count={10} scale={1.04} palette={paletteWarm} />
          <BambooRow count={10} scale={1.08} palette={paletteWarm} />
        </div>
      </div>

      {/* Foreground – closest/biggest/densest */}
      <div className=" absolute inset-x-0 bottom-0 h-[32%] opacity-80">
        <div className="mx-auto max-w-5xl px-4 space-y-3">
          <BambooRow count={11} scale={1.4} palette={paletteFront} />
          <BambooRow count={12} scale={1.75} palette={paletteFront} />
        </div>
      </div>
      <div className=" absolute inset-x-0 bottom-0 h-[15%] opacity-100">
        <div className="mx-auto max-w-5xl px-4 space-y-3">
          <BambooRow count={14} scale={2.2} palette={paletteFront} />
        </div>
      </div>

      <style jsx>{`
        /* Optional: faint mist drift like your garden's drift */
        .forest-drift {
          animation: forest-drift 24s linear infinite;
        }
        @keyframes forest-drift {
          0% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(6px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BambooForestFrame;
