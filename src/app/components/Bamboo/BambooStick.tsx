// src/app/components/Bamboo/BambooStick.tsx
import React from "react";

type BambooStickProps = {
  h?: number;
  stem?: string;
  node?: string;
  leaf?: string;
  nodes?: number;
  tilt?: number;
  swayDelay?: number;
  swayDuration?: number;
  /** NEW: render a dead/dry stalk (muted khaki stem, darker nodes, no leaves) */
  dead?: boolean;
};

const BambooStick: React.FC<BambooStickProps> = ({
  h = 160,
  stem = "#2e7d32",
  node = "#256f2a",
  leaf = "#43a047",
  nodes = 4,
  tilt = 5,
  swayDelay,
  swayDuration,
  dead = false,
}) => {
  const width = 40;
  const headH = Math.max(20, Math.round(h * 0.22)); // top segment (sways)
  const shaftH = h - headH; // bottom static segment
  const delay =
    typeof swayDelay === "number" ? swayDelay : Math.random() * 3 - 1.5;
  const duration =
    typeof swayDuration === "number" ? swayDuration : 3.2 + Math.random() * 1.8;

  // Colors: override when dead
  const stemColor = dead ? "#efe691ff" : stem; // khaki/olive
  const nodeColor = dead ? "#e0bf65ff" : node; // darker ring
  const leafColor = dead ? "transparent" : leaf; // hide leaves entirely when dead

  // Keep leaves inside viewBox
  const stemLeft = Math.round(width / 3) + 1;
  const stemRight = Math.round((width * 2) / 3) - 1;

  const nodeYs = Array.from({ length: nodes }).map(
    (_, i) => headH + (i + 1) * (shaftH / (nodes + 1))
  );

  return (
    <svg
      width={width}
      height={h}
      viewBox={`0 0 ${width} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ display: "block", transform: `rotate(${tilt}deg)` }}
    >
      {/* Static shaft */}
      <rect
        x={width / 3}
        y={headH}
        width={width / 3}
        height={shaftH}
        rx={4}
        fill={stemColor}
      />

      {/* Node rings on the shaft */}
      {nodeYs.map((y, i) => (
        <rect
          key={i}
          x={width / 3 - 1}
          y={y - 2}
          width={width / 3 + 2}
          height={4}
          rx={2}
          fill={nodeColor}
          opacity={0.9}
        />
      ))}

      {/* Swaying head (top segment + leaves) */}
      <g
        className="bamboo-head-sway"
        style={{
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
        }}
      >
        {/* top cylinder */}
        <rect
          x={width / 3}
          y={0}
          width={width / 3}
          height={headH}
          rx={4}
          fill={stemColor}
        />
        {/* node at base of head */}
        <rect
          x={width / 3 - 1}
          y={headH - 3}
          width={width / 3 + 2}
          height={4}
          rx={2}
          fill={nodeColor}
        />

        {/* Leaves (suppressed when dead) */}
        {leafColor !== "transparent" && (
          <>
            {(() => {
              const tiers = [
                { r: 0.34, dx: 8, dy: 12, o: 0.95 },
                { r: 0.5, dx: 10, dy: 14, o: 0.85 },
                { r: 0.66, dx: 12, dy: 16, o: 0.75 },
              ];
              return tiers.map((t, i) => {
                const y = Math.round(headH * t.r);
                return (
                  <g key={i}>
                    {/* left leaf */}
                    <path
                      d={`M ${stemLeft} ${y} q ${-t.dx} 3 ${-t.dx - 2} ${
                        t.dy
                      } q ${t.dx - 2} -6 ${t.dx + 2} ${-t.dy} Z`}
                      fill={leafColor}
                      opacity={t.o}
                    />
                    {/* right leaf */}
                    <path
                      d={`M ${stemRight} ${y + 2} q ${t.dx} 3 ${t.dx + 2} ${
                        t.dy
                      } q ${-t.dx + 2} -6 ${-t.dx - 2} ${-t.dy} Z`}
                      fill={leafColor}
                      opacity={t.o}
                    />
                  </g>
                );
              });
            })()}
          </>
        )}
      </g>

      <style jsx>{`
        .bamboo-head-sway {
          transform-origin: ${width / 2}px ${headH}px; /* pivot at base of head */
          transform-box: fill-box;
          animation: bamboo-sway 4.6s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes bamboo-sway {
          0%,
          100% {
            transform: rotate(-1.6deg);
          }
          50% {
            transform: rotate(1.6deg);
          }
        }
      `}</style>
    </svg>
  );
};

export default BambooStick;
