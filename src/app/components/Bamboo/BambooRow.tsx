// src/app/components/decor/bamboo/BambooRow.tsx
import React from "react";
import BambooCluster from "./BambooCluster";

type RowProps = {
  count?: number; // # clusters across the row
  scale?: number; // css scale factor
  palette?: {
    stems: string[];
    nodes: string[];
    leaves: string[];
  };
};

const BambooRow: React.FC<RowProps> = ({
  count = 10,
  scale = 1,
  palette = {
    stems: ["#2e7d32", "#2f8f3a", "#237a30"],
    nodes: ["#256f2a", "#1f6a25", "#1a5c1f"],
    leaves: ["#43a047", "#3ba16a", "#5bbf6e"],
  },
}) => {
  return (
    <div
      className="pointer-events-none w-full grid"
      style={{
        gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
      }}
      aria-hidden
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`bamboo-sway ${
            i % 2 ? "sway-fast" : "sway-slow"
          } flex items-end justify-center`}
          style={{ animationDelay: `${(i % 5) * 0.2}s` }}
        >
          <BambooCluster
            n={5}
            baseH={140 + (i % 4) * 8}
            stems={palette.stems}
            nodes={palette.nodes}
            leaves={palette.leaves}
          />
        </div>
      ))}

      <style jsx>{`
        .bamboo-sway {
          animation: row-sway 6s ease-in-out infinite;
        }
        .sway-slow {
          animation-duration: 7.2s;
        }
        .sway-fast {
          animation-duration: 4.8s;
        }

        @keyframes row-sway {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </div>
  );
};

export default BambooRow;
