"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import type { Profile, Relationship } from "../../lib/types/types";
import Field from "../primitives/Field";
import { intPsychTheme } from "../theme";
import Likert from "../primitives/Likert";
import RemoveButton from "../primitives/Removebutton";
import { Pencil } from "lucide-react";

const strengthOptions: {
  label: string;
  value: Relationship["strength"];
  weight: number;
}[] = [
  { label: "Really bad", value: "really_bad", weight: 1 },
  { label: "Not great", value: "not_great", weight: 2 },
  { label: "Pretty good", value: "pretty_good", weight: 3 },
  { label: "Really good", value: "really_good", weight: 4 },
];

const weightFor = (s: Relationship["strength"]) =>
  strengthOptions.find((o) => o.value === s)?.weight ?? 2;

const colorFor = (happy: boolean) => (happy ? "#16a34a" : "#ef4444"); // green-600 / red-500

// Visual tuning
const nodeRadius = 22;
const centerRadius = 24;
const lineGap = 2; // lines stop before entering circles

// Helpers to derive tinted colors from theme.secondary
function hexToRgb(hex: string) {
  const m = hex.replace("#", "");
  const bigint = parseInt(
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
function withAlpha(hex: string, alpha: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

type Props = {
  title: string;
  step: number;
  profile: Profile;
  setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

export default function RelationshipSection({
  title,
  step,
  profile,
  setProfile,
  scrollContainerRef,
}: Props) {
  const relationships = profile.relationships ?? [];

  // --- Form draft ---
  const [draft, setDraft] = React.useState<Omit<Relationship, "id">>({
    name: "",
    role: "",
    strength: "pretty_good",
    happy: true,
  });
  // --- Editing state ---
  const [editingId, setEditingId] = React.useState<string | null>(null);

  // --- Interactions / refs ---
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const itemRefs = React.useRef<Record<string, HTMLLIElement | null>>({});
  const setItemRef = (id: string) => (el: HTMLLIElement | null) => {
    itemRefs.current[id] = el;
  };
  const scrollToItem = (id: string) => {
    const el = itemRefs.current[id];
    const container = scrollContainerRef.current;
    if (!el || !container) return;
    // Position of the element within the container viewport
    const containerTop = container.getBoundingClientRect().top;
    const elTop = el.getBoundingClientRect().top;
    const currentScroll = container.scrollTop;
    const elOffset = elTop - containerTop;
    // Center the item within the container's viewport
    const targetTop =
      currentScroll +
      elOffset -
      Math.max(0, (container.clientHeight - el.offsetHeight) / 2);
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  };
  const selectAndScroll = (id: string) => {
    scrollToItem(id);
    setSelectedId(id);
    window.setTimeout(() => {
      setSelectedId((cur) => (cur === id ? null : cur));
    }, 1500);
  };

  // --- CRUD ---
  const addRelationship = () => {
    if (!draft.name.trim() || !draft.role.trim()) return;
    if (!editingId) {
      // Add new
      const newRel: Relationship = { id: crypto.randomUUID(), ...draft };
      setProfile((prev) => ({
        ...prev,
        relationships: [...(prev.relationships ?? []), newRel],
      }));
      setDraft({ name: "", role: "", strength: "pretty_good", happy: true });
    } else {
      // Update existing
      setProfile((prev) => ({
        ...prev,
        relationships: (prev.relationships ?? []).map((r) =>
          r.id === editingId ? { ...r, ...draft } : r
        ),
      }));
      setEditingId(null);
      setDraft({ name: "", role: "", strength: "pretty_good", happy: true });
    }
  };
  const removeRelationship = (id: string) =>
    setProfile((prev) => ({
      ...prev,
      relationships: (prev.relationships ?? []).filter((r) => r.id !== id),
    }));

  // --- Layout (radial) ---
  const nodes = React.useMemo(() => {
    const cx = 260;
    const cy = 160;
    const N = relationships.length || 1;

    // Scale radius with count (for spacing), cap so labels remain in view
    const baseR = 120;
    const R = Math.min(220, baseR + Math.max(0, (N - 6) * 16));

    return relationships.map((r, i) => {
      const angle = (i / N) * Math.PI * 2 - Math.PI / 2; // start at top, clockwise
      const x = cx + R * Math.cos(angle);
      const y = cy + R * Math.sin(angle);

      // unit vector from center to node
      const dx = x - cx;
      const dy = y - cy;
      const len = Math.max(1, Math.hypot(dx, dy));
      const ux = dx / len;
      const uy = dy / len;

      // lines start/stop at circle edges
      const x1 = cx + ux * (centerRadius + lineGap);
      const y1 = cy + uy * (centerRadius + lineGap);
      const x2 = x - ux * (nodeRadius + lineGap);
      const y2 = y - uy * (nodeRadius + lineGap);

      return { ...r, x, y, x1, y1, x2, y2, cx, cy };
    });
  }, [relationships]);

  return (
    <div className="space-y-6">
      <StepTitle n={step + 1} title={title} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* LEFT: Map + List */}
        <div className="md:col-span-3 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="text-sm text-slate-600 mb-2">
            Relationship Map (click a person or line to jump to their details)
          </div>

          <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
            <svg viewBox="0 0 520 320" className="w-full h-[320px]">
              <defs>
                <filter
                  id="soft-blur"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="4" />
                </filter>
              </defs>
              {nodes.map((n) => {
                const isHover = hoveredId === n.id;
                // Dotted line for "really_bad" or "not_great"
                const isDotted =
                  n.strength === "really_bad" || n.strength === "not_great";
                const sw = 2 + (isHover ? 1 : 0);
                return (
                  <g key={`edge-${n.id}`} className="cursor-pointer">
                    <line
                      x1={n.x1}
                      y1={n.y1}
                      x2={n.x2}
                      y2={n.y2}
                      stroke={colorFor(n.happy)}
                      strokeWidth={sw}
                      strokeOpacity={isHover ? 1 : 0.9}
                      className="transition-all duration-150"
                      style={{ cursor: "pointer" }}
                      strokeDasharray={isDotted ? "4 3" : undefined}
                      onMouseEnter={() => setHoveredId(n.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => selectAndScroll(n.id)}
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((n) => {
                const isHover = hoveredId === n.id;
                return (
                  <g
                    key={n.id}
                    onMouseEnter={() => setHoveredId(n.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => selectAndScroll(n.id)}
                    className="cursor-pointer"
                  >
                    {isHover && (
                      <g>
                        {/* soft blurred halo */}
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={nodeRadius + 10}
                          fill="#ffffff"
                          fillOpacity={0.6}
                          filter="url(#soft-blur)"
                        />
                        {/* pencil button to the right of the circle */}
                        <g
                          transform={`translate(${n.x + nodeRadius + 8}, ${
                            n.y - 14
                          })`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setDraft({
                              name: n.name,
                              role: n.role,
                              strength: n.strength,
                              happy: n.happy,
                            });
                            setEditingId(n.id);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          <rect
                            x={0}
                            y={0}
                            width={28}
                            height={28}
                            rx={14}
                            ry={14}
                            fill="#ffffff"
                            fillOpacity={0.9}
                            stroke={intPsychTheme.secondary}
                            strokeOpacity={0.8}
                          />
                          <foreignObject x={0} y={0} width={28} height={28}>
                            <div className="flex items-center justify-center w-full h-full">
                              <Pencil
                                size={14}
                                className="text-slate-800 opacity-80"
                              />
                            </div>
                          </foreignObject>
                        </g>
                      </g>
                    )}
                    <circle
                      cx={n.x}
                      cy={n.y}
                      r={nodeRadius}
                      fill="#ffffff"
                      stroke={isHover ? intPsychTheme.secondary : "#CBD5E1"}
                    />
                    <text
                      x={n.x}
                      y={n.y - 3}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#0f172a"
                    >
                      {n.name.length > 10 ? n.name.slice(0, 10) + "…" : n.name}
                    </text>
                    <text
                      x={n.x}
                      y={n.y + 12}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#475569"
                    >
                      {n.role.length > 12 ? n.role.slice(0, 12) + "…" : n.role}
                    </text>
                    <title>
                      {n.name} • {n.role} • {n.happy ? "Happy" : "Not happy"}
                    </title>
                  </g>
                );
              })}

              {/* Center "You" */}
              <g pointerEvents="none">
                <circle
                  cx={260}
                  cy={160}
                  r={centerRadius}
                  fill={intPsychTheme.primary}
                  opacity="0.95"
                />
                <text
                  x={260}
                  y={165}
                  textAnchor="middle"
                  fontSize="12"
                  fill="white"
                >
                  You
                </text>
              </g>
            </svg>
          </div>

          {/* People list BELOW the map */}
          {relationships.length > 0 && (
            <ul className="space-y-2 mt-4">
              {relationships.map((r) => (
                <li
                  key={r.id}
                  ref={setItemRef(r.id)}
                  className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-shadow border-slate-200 bg-white ${
                    selectedId === r.id ? "shadow-md" : ""
                  }`}
                  style={
                    selectedId === r.id
                      ? {
                          borderColor: withAlpha(intPsychTheme.secondary, 0.65), // medium saturation border
                          backgroundColor: withAlpha(
                            intPsychTheme.secondary,
                            0.08
                          ), // light wash background
                          boxShadow: `0 0 0 3px ${withAlpha(
                            intPsychTheme.secondary,
                            0.25
                          )}`, // ring-like accent
                        }
                      : undefined
                  }
                >
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">{r.name}</div>
                    <div className="text-slate-600">
                      {r.role} •{" "}
                      {
                        strengthOptions.find((o) => o.value === r.strength)
                          ?.label
                      }{" "}
                      • {r.happy ? "Happy" : "Not happy"}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Edit affordance */}
                    <button
                      type="button"
                      className="cursor-pointer opacity-40 hover:opacity-80 transition text-xl px-1"
                      title="Edit"
                      onClick={() => {
                        setDraft({
                          name: r.name,
                          role: r.role,
                          strength: r.strength,
                          happy: r.happy,
                        });
                        setEditingId(r.id);
                      }}
                    >
                      <Pencil size={16} />
                    </button>
                    <RemoveButton onClick={() => removeRelationship(r.id)} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RIGHT: Add form only */}
        <div className="md:col-span-2 space-y-3">
          <Field title="Name">
            <input
              className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
              placeholder="e.g., Alex"
              value={draft.name}
              onChange={(e) =>
                setDraft((d) => ({ ...d, name: e.target.value }))
              }
            />
          </Field>

          <Field title="Relationship to you">
            <input
              className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900 placeholder:text-slate-400"
              placeholder="e.g., partner, parent, friend"
              value={draft.role}
              onChange={(e) =>
                setDraft((d) => ({ ...d, role: e.target.value }))
              }
            />
          </Field>

          <Field title="How is this relationship?">
            <select
              className="w-full rounded-xl bg-white border border-slate-300 px-3 py-2 text-slate-900"
              value={draft.strength}
              onChange={(e) =>
                setDraft((d) => ({
                  ...d,
                  strength: e.target.value as Relationship["strength"],
                }))
              }
            >
              {strengthOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field title="Are you happy with how the relationship currently is?">
            <Likert
              value={draft.happy ? "yes" : "no"}
              onChange={(v) => setDraft((d) => ({ ...d, happy: v === "yes" }))}
              options={[
                { key: "yes", label: "Yes" },
                { key: "no", label: "No" },
              ]}
            />
          </Field>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={addRelationship}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white cursor-pointer"
              style={{ background: intPsychTheme.secondary }}
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
