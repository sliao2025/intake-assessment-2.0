import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";
import { AQ10_QUESTIONS } from "../../text";

const aqOptions = [
  { key: "0", label: "Definitely Disagree" },
  { key: "1", label: "Slightly Disagree" },
  { key: "2", label: "Slightly Agree" },
  { key: "3", label: "Definitely Agree" },
];

export default function AQ10Form({ a, setA }: { a: any; setA: SetAActions }) {
  return (
    <div className="grid md:grid-cols-1 gap-4">
      {Object.entries(AQ10_QUESTIONS).map(([key, text]) => (
        <Field key={key} title={text}>
          <Likert
            value={a.aq10?.[key]}
            onChange={(v) =>
              setA((n) => ((n.assessments as any).data.aq10[key] = String(v)))
            }
            options={aqOptions}
          />
        </Field>
      ))}
    </div>
  );
}
