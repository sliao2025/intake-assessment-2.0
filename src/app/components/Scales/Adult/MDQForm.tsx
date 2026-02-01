import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";
import { MDQ_QUESTIONS } from "../../text";

const yesNo = [
  { key: "yes", label: "Yes" },
  { key: "no", label: "No" },
];

const impactOptions = [
  { key: "0", label: "No Problem" },
  { key: "1", label: "Minor Problem" },
  { key: "2", label: "Moderate Problem" },
  { key: "3", label: "Serious Problem" },
];

export default function MDQForm({ a, setA }: { a: any; setA: SetAActions }) {
  const mdq = a.mdq || {};

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-stone-700 mb-4">
          Part 1. Has there ever been a period of time when you were not your
          usual self and...
        </h3>
        <div className="grid md:grid-cols-1 gap-4">
          {Object.entries(MDQ_QUESTIONS).map(([key, text]) => (
            <Field key={key} title={text}>
              <Likert
                value={mdq[key]}
                onChange={(v) =>
                  setA(
                    (n) => ((n.assessments as any).data.mdq[key] = String(v))
                  )
                }
                options={yesNo}
              />
            </Field>
          ))}
        </div>
      </div>

      <Field title="Part 2. If you checked YES to more than one of the above, have several of these ever happened during the same period of time?">
        <Likert
          value={mdq.cooccurrence}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.mdq.cooccurrence = String(v))
            )
          }
          options={yesNo}
        />
      </Field>

      <Field title="Part 3. How much of a problem did any of these cause you — like being able to work; having family, money or legal troubles; getting into arguments or fights?">
        <Likert
          value={mdq.impact}
          onChange={(v) =>
            setA((n) => ((n.assessments as any).data.mdq.impact = String(v)))
          }
          options={impactOptions}
        />
      </Field>
    </div>
  );
}
