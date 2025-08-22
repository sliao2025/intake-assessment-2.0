// src/app/components/decor/bamboo/BambooCluster.tsx
import React from "react";
import BambooStick from "./BambooStick";

type ClusterProps = {
  n?: number;
  baseH?: number;
  stems?: string[];
  nodes?: string[];
  leaves?: string[];
  gap?: number;
  /** ~15% dead by default; we implement deterministically via index for stability */
  deadChance?: number;
};

const BambooCluster: React.FC<ClusterProps> = ({
  n = 5,
  baseH = 160,
  stems = ["#2e7d32", "#2f8f3a", "#237a30"],
  nodes = ["#256f2a", "#1f6a25", "#1a5c1f"],
  leaves = ["#43a047", "#3ba16a", "#5bbf6e"],
  gap = 6,
  deadChance = 0.05,
}) => {
  // Deterministic "sparse" dead rule: every 7th stick appears dead.
  // If you want pure randomness, use Math.random() < deadChance (beware SSR hydration).
  const isDead = (i: number) =>
    i % Math.max(3, Math.round(1 / deadChance)) === 0; // ~1/deadChance

  return (
    <div className="flex items-end">
      {Array.from({ length: n }).map((_, i) => {
        const h = Math.round(baseH * (0.9 + (i % 3) * 0.07));
        const tilt = (i % 2 === 0 ? -1 : 1) * (0.5 + (i % 3) * 0.3);
        const stem = stems[i % stems.length];
        const node = nodes[i % nodes.length];
        const leaf = leaves[i % leaves.length];
        const swayDelay = (i % 6) * 0.22 - 0.55;
        const swayDuration = 3.4 + (i % 4) * 0.3;

        return (
          <div key={i} style={{ marginLeft: i === 0 ? 0 : gap }}>
            <BambooStick
              h={h}
              stem={stem}
              node={node}
              leaf={leaf}
              tilt={tilt}
              swayDelay={swayDelay}
              swayDuration={swayDuration}
              dead={isDead(i)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BambooCluster;
