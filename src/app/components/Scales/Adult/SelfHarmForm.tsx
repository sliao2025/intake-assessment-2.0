import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function SelfHarmForm({
  a,
  setA,
}: {
  a: any;
  setA: SetAActions;
}) {
  return (
    <div className="grid md:grid-cols-1 gap-4">
      <Field title="In the past month, have you intentionally hurt yourself (e.g., cut, burned, scratched) without wanting to die?">
        <Likert
          value={a.selfHarm.pastMonth}
          onChange={(v) =>
            setA(
              (n) =>
                ((n.assessments as any).data.selfHarm.pastMonth = String(v))
            )
          }
          options={[
            { key: "yes", label: "Yes" },
            { key: "no", label: "No" },
          ]}
        />
      </Field>
      <Field title="Have you ever intentionally hurt yourself without wanting to die?">
        <Likert
          value={a.selfHarm.lifetime}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.selfHarm.lifetime = String(v))
            )
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
