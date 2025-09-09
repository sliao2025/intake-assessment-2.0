// src/app/seed/assessments.ts
// Hard-coded PHQ-9 GRM parameters (a, b1..b3). No CSV loading.
// Exposes both 'phq9' and 'phq-9' slugs to avoid caller mismatch.

type Likert = { labels: string[]; values: number[] };

type GRMParams = { a: number; bs: number[] }; // bs = [b1,b2,b3]
type SimpleParams = { a: number; b: number }; // kept for non-GRM placeholders

type Item =
  | {
      id: string;
      scaleId?: string;
      stem: string;
      options: Likert;
      params: GRMParams;
    }
  | {
      id: string;
      scaleId?: string;
      stem: string;
      options: Likert;
      params: SimpleParams;
    };

enum Scale {
  PHQ9 = "PHQ9",
  GAD7 = "GAD7",
}

const likert: Likert = {
  labels: [
    "Not at all",
    "Several days",
    "More than half the days",
    "Nearly every day",
  ],
  values: [0, 1, 2, 3],
};

// PHQ-9 stems
const PHQ9_STEMS: Record<string, string> = {
  PHQ1: "Little interest or pleasure in doing things",
  PHQ2: "Feeling down, depressed, or hopeless",
  PHQ3: "Trouble falling or staying asleep, or sleeping too much",
  PHQ4: "Feeling tired or having little energy",
  PHQ5: "Poor appetite or overeating",
  PHQ6: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  PHQ7: "Trouble concentrating on things, such as reading the newspaper or watching television",
  PHQ8: "Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  PHQ9: "Thoughts that you would be better off dead, or of hurting yourself in some way",
};

// ==== HARD-CODED GRM PARAMS (from your mirt export) ====
const PHQ9_PARAMS: { id: string; a: number; bs: [number, number, number] }[] = [
  { id: "PHQ1", a: 3.537366, bs: [-0.847536, 0.151514, 0.782373] },
  { id: "PHQ2", a: 3.463504, bs: [-0.808187, 0.130861, 0.76137] },
  { id: "PHQ3", a: 1.730227, bs: [-1.29696, -0.074093, 0.737166] },
  { id: "PHQ4", a: 2.535258, bs: [-1.40807, -0.19013, 0.536461] },
  { id: "PHQ5", a: 1.618693, bs: [-0.623894, 0.382749, 1.13571] },
  { id: "PHQ6", a: 2.203201, bs: [-0.833996, 0.117347, 0.68419] },
  { id: "PHQ7", a: 1.070902, bs: [-1.69952, -0.30353, 0.58217] },
  { id: "PHQ8", a: 0.847226, bs: [0.436488, 1.65409, 2.90989] },
  { id: "PHQ9", a: 1.392947, bs: [1.163289, 2.16667, 2.90682] },
];

const PHQ9_ITEMS: Item[] = PHQ9_PARAMS.map((p) => ({
  id: p.id, // Keep canonical IDs PHQ1..PHQ9
  scaleId: Scale.PHQ9,
  stem: PHQ9_STEMS[p.id] ?? `PHQ-9 item ${p.id.replace("PHQ", "")}`,
  options: likert,
  params: { a: p.a, bs: [...p.bs] },
}));

// Keep GAD-7 placeholder (simple/legacy params) to avoid breaking other parts.
const GAD7_ITEMS: Item[] = Array.from({ length: 7 }).map((_, i) => ({
  id: `gad7_${i + 1}`,
  scaleId: Scale.GAD7,
  stem: `GAD-7 item ${i + 1}`,
  options: likert,
  params: { a: 1 + (i % 2) * 0.4, b: -0.5 + i * 0.2 },
}));

export const ASSESSMENTS: Record<
  string,
  { slug: string; title: string; items: Item[] }
> = {
  // Expose both slugs for compatibility with callers expecting 'phq9' or 'phq-9'
  phq9: { slug: "phq9", title: "PHQ-9", items: PHQ9_ITEMS },
  "phq-9": { slug: "phq-9", title: "PHQ-9", items: PHQ9_ITEMS },

  // Leave GAD-7 as-is for now
  "gad-7": { slug: "gad-7", title: "GAD-7", items: GAD7_ITEMS },
};
