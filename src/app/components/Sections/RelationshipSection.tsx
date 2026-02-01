"use client";

import * as React from "react";
import StepTitle from "../StepTitle";
import type { Profile, Relationship } from "../../lib/types/types";
import Field from "../primitives/Field";
import { sigmundTheme } from "../theme";
import Likert from "../primitives/Likert";
import RemoveButton from "../primitives/Removebutton";
import { Pencil } from "lucide-react";
import { DM_Sans } from "next/font/google";

const dm_sans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

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

  const subtitle =
    "Add as many relationships as you feel are relevant to note.";
  return (
    <div className={`space-y-6 ${dm_sans.className}`}>
      <StepTitle n={step + 1} title={title} subtitle={subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* LEFT: List */}
        <div className="md:col-span-3 rounded-2xl border border-stone-200 bg-white p-4">
          {relationships.length === 0 ? (
            <div className="text-sm text-stone-500 text-center py-8">
              No relationships added yet. Use the form to add people.
            </div>
          ) : (
            <ul className="space-y-2">
              {relationships.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between rounded-xl border px-3 py-2 text-sm transition-shadow border-stone-200 bg-white"
                >
                  <div className="flex-1">
                    <div className="font-medium text-stone-900">{r.name}</div>
                    <div className="text-stone-600">
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
              className="w-full rounded-xl bg-white border border-stone-300 px-3 py-2 text-stone-900 placeholder:text-stone-400"
              placeholder="e.g., Alex"
              value={draft.name}
              onChange={(e) =>
                setDraft((d) => ({ ...d, name: e.target.value }))
              }
            />
          </Field>

          <Field title="Relationship to you">
            <input
              className="w-full rounded-xl bg-white border border-stone-300 px-3 py-2 text-stone-900 placeholder:text-stone-400"
              placeholder="e.g., partner, parent, friend"
              value={draft.role}
              onChange={(e) =>
                setDraft((d) => ({ ...d, role: e.target.value }))
              }
            />
          </Field>

          <Field title="How is this relationship?">
            <select
              className="w-full rounded-xl bg-white border border-stone-300 px-3 py-2 text-stone-900"
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
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold text-white cursor-pointer border-b-4"
              style={{
                background: sigmundTheme.accent,
                borderColor: sigmundTheme.accentDark,
              }}
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
