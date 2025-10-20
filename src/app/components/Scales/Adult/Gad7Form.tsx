import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function GAD7Form({
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
      <Field title="Feeling nervous, anxious, or on edge">
        <Likert
          value={a.gad7.gad1}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.gad7.gad1 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Not being able to stop or control worrying">
        <Likert
          value={a.gad7.gad2}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.gad7.gad2 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Worrying too much about different things">
        <Likert
          value={a.gad7.gad3}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.gad7.gad3 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Trouble relaxing">
        <Likert
          value={a.gad7.gad4}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.gad7.gad4 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Being so restless that it is hard to sit still">
        <Likert
          value={a.gad7.gad5}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.gad7.gad5 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Becoming easily annoyed or irritable">
        <Likert
          value={a.gad7.gad6}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.gad7.gad6 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
      <Field title="Feeling afraid as if something awful might happen">
        <Likert
          value={a.gad7.gad7}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.gad7.gad7 = String(v)))
          }
          options={freq0to3}
        />
      </Field>
    </div>
  );
}
