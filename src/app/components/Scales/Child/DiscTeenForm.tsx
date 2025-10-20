import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function DiscTeenForm({
  a,
  setA,
  form,
}: {
  a: any;
  setA: SetAActions;
  form: "self" | "parent";
}) {
  const dtdsKeys = [
    "dtds01",
    "dtds02",
    "dtds03",
    "dtds04",
    "dtds05",
    "dtds06",
    "dtds07",
    "dtds08",
    "dtds09",
    "dtds10",
    "dtds11",
    "dtds12",
    "dtds13",
    "dtds14",
    "dtds15",
    "dtds16",
    "dtds17",
    "dtds18",
    "dtds19",
    "dtds20",
    "dtds21",
    "dtds22",
  ] as const;

  // Wording (kept identical to original)
  const discTeenQuestionsSelf: string[] = [
    "Have you often felt sad or depressed?",
    "Have you felt like nothing is fun for you and you just aren’t interested in anything?",
    "Have you often felt grouchy or irritable and often in a bad mood, when even little things would make you mad?",
    "Have you lost weight, more than just a few pounds?",
    "Have you lost your appetite or often felt less like eating?",
    "Have you gained a lot of weight, more than just a few pounds?",
    "Have you felt much hungrier than usual or eaten a lot more than usual?",
    "Have you had trouble sleeping, that is, trouble falling asleep, staying asleep, or waking up too early?",
    "Have you slept more during the day than you usually do?",
    "Have you often felt slowed down … like you walked or talked much slower than you usually do?",
    "Have you often felt restless … like you just had to keep walking around?",
    "Have you had less energy than you usually do?",
    "Has doing even little things made you feel really tired?",
    "Have you often blamed yourself for bad things that happened?",
    "Have you felt you couldn’t do anything well or that you weren’t as good-looking or as smart as other people?",
    "Has it seemed like you couldn’t think as clearly or as fast as usual?",
    "Have you often had trouble keeping your mind on your schoolwork or other things?",
    "Has it often been hard for you to make up your mind or to make decisions?",
    "Have you often thought about death or about people who had died or about being dead yourself?",
    "Have you thought seriously about killing yourself?",
    "Have you tried to kill yourself in the last four weeks?",
    "Have you EVER, in your WHOLE LIFE, tried to kill yourself or made a suicide attempt?",
  ];

  const discTeenQuestionsParent: string[] = [
    "Has your child often seemed sad or depressed?",
    "Has it seemed like nothing was fun for your child and they just weren’t interested in anything?",
    "Has your child often been grouchy or irritable and often in a bad mood, when even little things would make them mad?",
    "Has your child lost weight, more than just a few pounds?",
    "Has it seemed like your child lost their appetite or ate a lot less than usual?",
    "Has your child gained a lot of weight, more than just a few pounds?",
    "Has it seemed like your child felt much hungrier than usual or ate a lot more than usual?",
    "Has your child had trouble sleeping – that is, trouble falling asleep, staying asleep, or waking up too early?",
    "Has your child slept more during the day than they usually do?",
    "Has your child seemed to do things like walking or talking much more slowly than usual?",
    "Has your child often seemed restless … like they just had to keep walking around?",
    "Has your child seemed to have less energy than they usually do?",
    "Has doing even little things seemed to make your child feel really tired?",
    "Has your child often blamed themself for bad things that happened?",
    "Has your child said they couldn’t do anything well or that they weren’t as good looking or as smart as other people?",
    "Has it seemed like your child couldn’t think as clearly or as fast as usual?",
    "Has your child often seemed to have trouble keeping their mind on their schoolwork or other things?",
    "Has it often seemed hard for your child to make up their mind or to make decisions?",
    "Has your child said they often thought about death or about people who had died or about being dead themself?",
    "Has your child talked seriously about killing themself?",
    "Has your child tried to kill themself in the last four weeks?",
    "Has your child EVER, in their WHOLE LIFE, tried to kill themself or made a suicide attempt?",
  ];

  const resp: Record<string, string> =
    form === "self"
      ? (a.discTeen?.self?.responses ?? ({} as any))
      : (a.discTeen?.parent?.responses ?? ({} as any));

  const items =
    form === "self" ? discTeenQuestionsSelf : discTeenQuestionsParent;

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-amber-900 text-sm">
        {form === "self" ? (
          <span>
            <b>The child must complete this privately:</b> Parent/guardian,
            please step out for this section. When finished, hand the device
            back to your parent for their section. Answer based on the last 4
            weeks.
          </span>
        ) : (
          <span>
            <b>Parent/guardian complete privately:</b> The child must step out
            for this section. Answer based on the last 4 weeks.
          </span>
        )}
      </div>
      <h1 className="italic text-slate-800">
        Over the <b>past 4 weeks</b>, answer Yes/No:
      </h1>
      {items.map((question, idx) => {
        const k = dtdsKeys[idx];
        return (
          <Field key={String(k)} title={`${idx + 1}. ${question}`}>
            <Likert
              value={resp[String(k)] ?? ""}
              onChange={(v) =>
                setA((n) => {
                  if (form === "self") {
                    (
                      (n.assessments as any).data.discTeen.self.responses as any
                    )[k] = String(v);
                  } else {
                    if (!(n.assessments as any).data.discTeen.parent) {
                      (n.assessments as any).data.discTeen.parent = {
                        form: "parent",
                        presentWindow: "last_4_weeks",
                        responses: {} as any,
                      } as any;
                    }
                    (
                      (n.assessments as any).data.discTeen.parent
                        .responses as any
                    )[k] = String(v);
                  }
                })
              }
              options={[
                { key: "1", label: "Yes" },
                { key: "0", label: "No" },
              ]}
            />
          </Field>
        );
      })}
    </div>
  );
}
