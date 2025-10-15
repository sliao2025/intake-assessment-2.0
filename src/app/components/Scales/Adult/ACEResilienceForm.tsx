import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function ACEResilienceForm({
  a,
  setA,
  aceTrue5,
}: {
  a: any;
  setA: SetAActions;
  aceTrue5: { key: string; label: string }[];
}) {
  return (
    <div className="grid md:grid-cols-1 gap-4">
      <Field title="I believe that my mother loved me when I was little.">
        <Likert
          value={a.aceResilience.r01}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r01 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="I believe that my father loved me when I was little.">
        <Likert
          value={a.aceResilience.r02}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r02 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="When I was little, other people helped my mother and father take care of me and they seemed to love me.">
        <Likert
          value={a.aceResilience.r03}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r03 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="I’ve heard that when I was an infant someone in my family enjoyed playing with me, and I enjoyed it too.">
        <Likert
          value={a.aceResilience.r04}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r04 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      {/* Continue mapping remaining r05 - r13 to preserve parity with parent logic */}
      <Field title="When I was a child, there were relatives who made me feel better if I was sad or worried.">
        <Likert
          value={a.aceResilience.r05}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r05 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="When I was a child, neighbors or my friends’ parents seemed to like me.">
        <Likert
          value={a.aceResilience.r06}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r06 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="When I was a child, teachers, coaches, youth leaders or ministers were there to help me.">
        <Likert
          value={a.aceResilience.r07}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r07 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="Someone in my family cared about how I was doing in school.">
        <Likert
          value={a.aceResilience.r08}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r08 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="My family, neighbors and friends talked often about making our lives better.">
        <Likert
          value={a.aceResilience.r09}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r09 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="We had rules in our house and were expected to keep them.">
        <Likert
          value={a.aceResilience.r10}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r10 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="When I felt really bad, I could almost always find someone I trusted to talk to.">
        <Likert
          value={a.aceResilience.r11}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r11 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="As a youth, people noticed that I was capable and could get things done.">
        <Likert
          value={a.aceResilience.r12}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r12 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
      <Field title="I was independent and a go-getter.">
        <Likert
          value={a.aceResilience.r13}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.aceResilience.r13 = String(v))
            )
          }
          options={aceTrue5}
        />
      </Field>
    </div>
  );
}
