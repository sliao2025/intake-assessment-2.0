import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

// Reverse scoring for positively-framed questions (0→4, 1→3, 2→2, 3→1, 4→0)
const reverseScore = (v: string | number): string => String(4 - Number(v));

// For display: convert stored reversed score back to the visual selection
const displayValue = (stored: string): string =>
  stored === "" ? "" : reverseScore(stored);

export default function PSS4Form({
  a,
  setA,
  pss0to4,
}: {
  a: any;
  setA: SetAActions;
  pss0to4: { key: string; label: string }[];
}) {
  return (
    <div className="grid md:grid-cols-1 gap-4">
      {/* Q1: Negative framing - normal scoring */}
      <Field title="In the last month, how often have you felt that you were unable to control the important things in your life?">
        <Likert
          value={a.stress.pss1}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.stress.pss1 = String(v)))
          }
          options={pss0to4}
        />
      </Field>
      {/* Q2: Positive framing - REVERSE scoring (stored value is reversed) */}
      <Field title="In the last month, how often have you felt confident about your ability to handle your personal problems?">
        <Likert
          value={displayValue(a.stress.pss2)}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.stress.pss2 = reverseScore(v))
            )
          }
          options={pss0to4}
        />
      </Field>
      {/* Q3: Positive framing - REVERSE scoring (stored value is reversed) */}
      <Field title="In the last month, how often have you felt that things were going your way?">
        <Likert
          value={displayValue(a.stress.pss3)}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.stress.pss3 = reverseScore(v))
            )
          }
          options={pss0to4}
        />
      </Field>
      {/* Q4: Negative framing - normal scoring */}
      <Field title="In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?">
        <Likert
          value={a.stress.pss4}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.stress.pss4 = String(v)))
          }
          options={pss0to4}
        />
      </Field>
    </div>
  );
}
