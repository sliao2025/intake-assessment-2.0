import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function ASRS5Form({
  a,
  setA,
  asrs0to4,
}: {
  a: any;
  setA: SetAActions;
  asrs0to4: { key: string; label: string }[];
}) {
  return (
    <div className="grid md:grid-cols-1 gap-4">
      <Field title="How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?">
        <Likert
          value={a.asrs5.asrs1}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.asrs5.asrs1 = String(v)))
          }
          options={asrs0to4}
        />
      </Field>
      <Field title="How often do you have difficulty getting things in order when you have to do a task that requires organization?">
        <Likert
          value={a.asrs5.asrs2}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.asrs5.asrs2 = String(v)))
          }
          options={asrs0to4}
        />
      </Field>
      <Field title="How often do you have problems remembering appointments or obligations?">
        <Likert
          value={a.asrs5.asrs3}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.asrs5.asrs3 = String(v)))
          }
          options={asrs0to4}
        />
      </Field>
      <Field title="When you have a task that requires a lot of thought, how often do you avoid or delay getting started?">
        <Likert
          value={a.asrs5.asrs4}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.asrs5.asrs4 = String(v)))
          }
          options={asrs0to4}
        />
      </Field>
      <Field title="How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?">
        <Likert
          value={a.asrs5.asrs5}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.asrs5.asrs5 = String(v)))
          }
          options={asrs0to4}
        />
      </Field>
      <Field title="How often do you feel overly active and compelled to do things, like you were driven by a motor?">
        <Likert
          value={a.asrs5.asrs6}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.asrs5.asrs6 = String(v)))
          }
          options={asrs0to4}
        />
      </Field>
    </div>
  );
}
