type Item = { id: string; scaleId?: string; stem: string; options: { labels: string[]; values: number[] }; params: { a: number; b: number } };

enum Scale { PHQ9 = 'PHQ9', GAD7 = 'GAD7' }

const likert = { labels: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'], values: [0,1,2,3] };

const PHQ9_ITEMS: Item[] = Array.from({ length: 9 }).map((_, i) => ({
  id: `phq9_${i+1}`,
  scaleId: Scale.PHQ9,
  stem: `PHQ‑9 item ${i+1}`,
  options: likert,
  params: { a: 1 + (i%3)*0.3, b: -1 + i*0.25 }
}));

const GAD7_ITEMS: Item[] = Array.from({ length: 7 }).map((_, i) => ({
  id: `gad7_${i+1}`,
  scaleId: Scale.GAD7,
  stem: `GAD‑7 item ${i+1}`,
  options: likert,
  params: { a: 1 + (i%2)*0.4, b: -0.5 + i*0.2 }
}));

export const ASSESSMENTS: Record<string, { slug: string; title: string; items: Item[] }> = {
  'phq-9': { slug: 'phq-9', title: 'PHQ‑9', items: PHQ9_ITEMS },
  'gad-7': { slug: 'gad-7', title: 'GAD‑7', items: GAD7_ITEMS }
};
