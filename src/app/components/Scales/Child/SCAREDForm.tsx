import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function SCAREDForm({
  a,
  setA,
  form,
}: {
  a: any;
  setA: SetAActions;
  form: "self" | "parent";
}) {
  // 41 SCARED items (0–2), stored as "scared01"…"scared41"
  const scaredKeys = Array.from(
    { length: 41 },
    (_, i) => `scared${String(i + 1).padStart(2, "0")}`
  );

  // Question text per PDF (child vs parent perspective)
  const childItems: string[] = [
    "When I feel frightened, it is hard for me to breathe",
    "I get headaches when I am at school",
    "I don’t like to be with people I don’t know well",
    "I get scared if I sleep away from home",
    "I worry about other people liking me",
    "When I get frightened, I feel like passing out",
    "I am nervous",
    "I follow my mother or father wherever they go",
    "People tell me that I look nervous",
    "I feel nervous with people I don’t know well",
    "I get stomachaches at school",
    "When I get frightened, I feel like I am going crazy",
    "I worry about sleeping alone",
    "I worry about being as good as other kids",
    "When I get frightened, I feel like things are not real",
    "I have nightmares about something bad happening to my parents",
    "I worry about going to school",
    "When I get frightened, my heart beats fast",
    "I get shaky",
    "I have nightmares about something bad happening to me",
    "I worry about things working out for me",
    "When I get frightened, I sweat a lot",
    "I am a worrier",
    "I get really frightened for no reason at all",
    "I am afraid to be alone in the house",
    "It is hard for me to talk with people I don’t know well",
    "When I get frightened, I feel like I am choking",
    "People tell me that I worry too much",
    "I don’t like to be away from my family",
    "I am afraid of having anxiety (or panic) attacks",
    "I worry that something bad might happen to my parents",
    "I feel shy with people I don’t know well",
    "I worry about what is going to happen in the future",
    "When I get frightened, I feel like throwing up",
    "I worry about how well I do things",
    "I am scared to go to school",
    "I worry about things that have already happened",
    "When I get frightened, I feel dizzy",
    "I feel nervous when I am with other children or adults and I have to do something while they watch me (for example: read aloud, speak, play a game, play a sport)",
    "I feel nervous when I am going to parties, dances, or any place where there will be people that I don’t know well",
    "I am shy",
  ];

  const parentItems: string[] = [
    "When my child feels frightened, it is hard for him/her to breathe",
    "My child gets headaches when he/she is at school",
    "My child doesn’t like to be with people he/she doesn’t know well",
    "My child gets scared if he/she sleeps away from home",
    "My child worries about other people liking him/her",
    "When my child gets frightened, he/she feels like passing out",
    "My child is nervous",
    "My child follows me wherever I go",
    "People tell me that my child looks nervous",
    "My child feels nervous with people he/she doesn’t know well",
    "My child gets stomachaches at school",
    "When my child gets frightened, he/she feels like he/she is going crazy",
    "My child worries about sleeping alone",
    "My child worries about being as good as other kids",
    "When he/she gets frightened, he/she feels like things are not real",
    "My child has nightmares about something bad happening to his/her parents",
    "My child worries about going to school",
    "When my child gets frightened, his/her heart beats fast",
    "He/she gets shaky",
    "My child has nightmares about something bad happening to him/her",
    "My child worries about things working out for him/her",
    "When my child gets frightened, he/she sweats a lot",
    "My child is a worrier",
    "My child gets really frightened for no reason at all",
    "My child is afraid to be alone in the house",
    "It is hard for my child to talk with people he/she doesn’t know well",
    "When my child gets frightened, he/she feels like he/she is choking",
    "People tell me that my child worries too much",
    "My child doesn’t like to be away from his/her family",
    "My child is afraid of having anxiety (or panic) attacks",
    "My child worries that something bad might happen to his/her parents",
    "My child feels shy with people he/she doesn’t know well",
    "My child worries about what is going to happen in the future",
    "When my child gets frightened, he/she feels like throwing up",
    "My child worries about how well he/she does things",
    "My child is scared to go to school",
    "My child worries about things that have already happened",
    "When my child gets frightened, he/she feels dizzy",
    "My child feels nervous when he/she is with other children or adults and he/she has to do something while they watch him/her (for example: read aloud, speak, play a game, play a sport)",
    "My child feels nervous when he/she is going to parties, dances, or any place where there will be people that he/she doesn’t know well",
    "My child is shy",
  ];

  const items = form === "self" ? childItems : parentItems;

  const resp: Record<string, string> =
    form === "self"
      ? (a.scared?.self?.responses ?? ({} as any))
      : (a.scared?.parent?.responses ?? ({} as any));

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-amber-900 text-sm">
        {form === "self" ? (
          <span>
            <b>The child must complete this privately:</b> Parent/guardian,
            please step out for this section. When finished, hand the device
            back to your parent for their section. Answer based on the{" "}
            <b>last 3 months</b>.
          </span>
        ) : (
          <span>
            <b>Parent/guardian complete privately:</b> The child must step out
            for this section. Answer based on the <b>last 3 months</b>.
          </span>
        )}
      </div>
      <h1 className="italic text-slate-800">
        Over the <b>past 3 months</b>, choose one:
      </h1>
      {items.map((question, idx) => {
        const k = scaredKeys[idx];
        return (
          <Field key={String(k)} title={`${idx + 1}. ${question}`}>
            <Likert
              value={resp[String(k)] ?? ""}
              onChange={(v) =>
                setA((n) => {
                  if (form === "self") {
                    ((n.assessments as any).data.scared = (n.assessments as any)
                      .data.scared ?? {
                      self: { form: "self", responses: {} as any },
                    }) as any;
                    ((n.assessments as any).data.scared.self.responses as any)[
                      k
                    ] = String(v);
                  } else {
                    if (!(n.assessments as any).data.scared) {
                      (n.assessments as any).data.scared = {
                        self: { form: "self", responses: {} as any },
                      } as any;
                    }
                    if (!(n.assessments as any).data.scared.parent) {
                      (n.assessments as any).data.scared.parent = {
                        form: "parent",
                        responses: {} as any,
                      } as any;
                    }
                    (
                      (n.assessments as any).data.scared.parent.responses as any
                    )[k] = String(v);
                  }
                })
              }
              options={[
                { key: "0", label: "Not true / hardly ever true" },
                { key: "1", label: "Somewhat true / sometimes true" },
                { key: "2", label: "Very true / often true" },
              ]}
            />
          </Field>
        );
      })}
    </div>
  );
}
