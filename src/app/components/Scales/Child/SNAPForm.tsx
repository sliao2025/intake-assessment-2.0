import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";
import type { SetAActions } from "../../../lib/types/types";

export default function SNAPForm({
  a,
  setA,
  snap0to3,
}: {
  a: any;
  setA: SetAActions;
  snap0to3: { key: string; label: string }[];
}) {
  // SNAP key helper
  const snapKey = (i: number) => `snap${String(i).padStart(2, "0")}`;

  // 26 SNAP-IV items (wording condensed from the official form)
  const questions: { key: string; title: string }[] = [
    {
      key: snapKey(1),
      title:
        "Often fails to give close attention to details or makes careless mistakes",
    },
    {
      key: snapKey(2),
      title:
        "Often has difficulty sustaining attention in tasks or play activities",
    },
    {
      key: snapKey(3),
      title: "Often does not seem to listen when spoken to directly",
    },
    {
      key: snapKey(4),
      title:
        "Often does not follow through on instructions and fails to finish tasks",
    },
    {
      key: snapKey(5),
      title: "Often has difficulty organizing tasks and activities",
    },
    {
      key: snapKey(6),
      title: "Often avoids or dislikes tasks requiring sustained mental effort",
    },
    {
      key: snapKey(7),
      title:
        "Often loses things necessary for activities (e.g., assignments, pencils, books)",
    },
    { key: snapKey(8), title: "Often is distracted by extraneous stimuli" },
    { key: snapKey(9), title: "Often is forgetful in daily activities" },
    {
      key: snapKey(10),
      title: "Often fidgets with hands or feet or squirms in seat",
    },
    {
      key: snapKey(11),
      title:
        "Often leaves seat in situations where remaining seated is expected",
    },
    {
      key: snapKey(12),
      title:
        "Often runs about or climbs excessively in inappropriate situations",
    },
    {
      key: snapKey(13),
      title:
        "Often has difficulty playing or engaging in leisure activities quietly",
    },
    {
      key: snapKey(14),
      title: "Often is 'on the go' or acts as if 'driven by a motor'",
    },
    { key: snapKey(15), title: "Often talks excessively" },
    {
      key: snapKey(16),
      title: "Often blurts out answers before questions have been completed",
    },
    { key: snapKey(17), title: "Often has difficulty awaiting turn" },
    {
      key: snapKey(18),
      title:
        "Often interrupts or intrudes on others (e.g., butts into conversations/games)",
    },
    { key: snapKey(19), title: "Often loses temper" },
    { key: snapKey(20), title: "Often argues with adults" },
    {
      key: snapKey(21),
      title: "Often actively defies or refuses adult requests or rules",
    },
    {
      key: snapKey(22),
      title: "Often deliberately does things that annoy other people",
    },
    {
      key: snapKey(23),
      title: "Often blames others for his or her mistakes or misbehavior",
    },
    { key: snapKey(24), title: "Often is touchy or easily annoyed by others" },
    { key: snapKey(25), title: "Often is angry and resentful" },
    { key: snapKey(26), title: "Often is spiteful or vindictive" },
  ];

  // Ensure container object exists before writing a response
  const setSnap = (k: string, v: string) =>
    setA((n) => {
      const data = (n.assessments as any).data;
      if (!data.snap) data.snap = {};
      data.snap[k] = String(v);
    });

  return (
    <div className="grid md:grid-cols-1 gap-4">
      <h1 className="italic text-slate-800">
        For each item, select how much the statement describes the
        child/adolescent.
      </h1>

      {questions.map((q, idx) => (
        <Field key={q.key} title={`${idx + 1}. ${q.title}`}>
          <Likert
            value={String(a?.snap?.[q.key] ?? "")}
            onChange={(v) => setSnap(q.key, String(v))}
            options={snap0to3}
          />
        </Field>
      ))}
    </div>
  );
}
