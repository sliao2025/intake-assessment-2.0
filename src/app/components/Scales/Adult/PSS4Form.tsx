import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

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
      <Field title="In the last month, how often have you felt confident about your ability to handle your personal problems?">
        <Likert
          value={a.stress.pss2}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.stress.pss2 = String(v)))
          }
          options={pss0to4}
        />
      </Field>
      {/* Q3: Positive framing - REVERSE scoring needed during calculation */}
      <Field title="In the last month, how often have you felt that things were going your way?">
        <Likert
          value={a.stress.pss3}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.stress.pss3 = String(v)))
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
