import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function PTSDForm({ a, setA }: { a: any; setA: SetAActions }) {
  return (
    <div className="grid md:grid-cols-1 gap-4">
      <Field title="In the past month, have you had nightmares or thought about the traumatic event(s) when you did not want to? ">
        <Likert
          value={a.ptsd.ptsd1}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.ptsd.ptsd1 = String(v)))
          }
          options={[
            { key: "yes", label: "Yes" },
            { key: "no", label: "No" },
          ]}
        />
      </Field>
      <Field title="In the past month, have you tried hard not to think about the traumatic event(s) or went out of your way to avoid situations that reminded you of these event(s)?">
        <Likert
          value={a.ptsd.ptsd2}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.ptsd.ptsd2 = String(v)))
          }
          options={[
            { key: "yes", label: "Yes" },
            { key: "no", label: "No" },
          ]}
        />
      </Field>
      <Field title="In the past month, have you been constantly on guard, watchful, or easily startled?">
        <Likert
          value={a.ptsd.ptsd3}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.ptsd.ptsd3 = String(v)))
          }
          options={[
            { key: "yes", label: "Yes" },
            { key: "no", label: "No" },
          ]}
        />
      </Field>
      <Field title="In the past month, have you felt numb or detached from people, activities, or your surroundings?">
        <Likert
          value={a.ptsd.ptsd4}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.ptsd.ptsd4 = String(v)))
          }
          options={[
            { key: "yes", label: "Yes" },
            { key: "no", label: "No" },
          ]}
        />
      </Field>
      <Field title="In the past month, have you felt guilty or unable to stop blaming yourself or others for the traumatic event(s) or any problems these event(s) may have caused?">
        <Likert
          value={a.ptsd.ptsd5}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.ptsd.ptsd5 = String(v)))
          }
          options={[
            { key: "yes", label: "Yes" },
            { key: "no", label: "No" },
          ]}
        />
      </Field>
    </div>
  );
}
