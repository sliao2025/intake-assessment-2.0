import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function Phq9Form({
  a,
  setA,
  freq0to3,
}: {
  a: any;
  setA: SetAActions;
  freq0to3: { key: string; label: string }[];
}) {
  return (
    <div className="grid md:grid-cols-1 gap-4">
      <h1 className="italic text-slate-800">
        <b>Over the last 2 weeks</b>, how often have you been bothered by the
        following problems
      </h1>
      <Field title="Little interest or pleasure in doing things">
        <Likert
          value={a.phq9.phq1}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq1 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Feeling down, depressed, or hopeless">
        <Likert
          value={a.phq9.phq2}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq2 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Trouble falling or staying asleep, or sleeping too much">
        <Likert
          value={a.phq9.phq3}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq3 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Feeling tired or having little energy">
        <Likert
          value={a.phq9.phq4}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq4 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Poor appetite or overeating">
        <Likert
          value={a.phq9.phq5}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq5 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Feeling bad about yourself — or that you are a failure or have let yourself or your family down">
        <Likert
          value={a.phq9.phq6}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq6 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Trouble concentrating on things, such as reading the newspaper or watching television">
        <Likert
          value={a.phq9.phq7}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq7 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Moving or speaking so slowly that other people could have noticed. Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual">
        <Likert
          value={a.phq9.phq8}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq8 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Thoughts that you would be better off dead, or of hurting yourself in some way">
        <Likert
          value={a.phq9.phq9}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.phq9.phq9 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
    </div>
  );
}
