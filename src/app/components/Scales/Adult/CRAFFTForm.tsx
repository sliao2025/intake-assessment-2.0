import { SetAActions } from "../../../lib/types/types";
import Field from "../../primitives/Field";
import Likert from "../../primitives/Likert";

export default function CRAFFTForm({ a, setA }: { a: any; setA: SetAActions }) {
  const pA = a.crafft.partA;
  const pB = a.crafft.partB;
  const showAllB =
    Number(pA.daysAlcohol || "0") > 0 ||
    Number(pA.daysMarijuana || "0") > 0 ||
    Number(pA.daysOther || "0") > 0;

  function DaysField({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) {
    return (
      <div className="flex items-center gap-2">
        <label className="text-[15px] font-medium text-slate-800 w-56">
          {label}
        </label>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          max={365}
          className="w-24 rounded-lg border border-slate-300 px-2 py-1 text-[15px] text-slate-800"
          value={value}
          onChange={(e) => {
            const raw = e.target.value.replace(/[^\d]/g, "");
            if (raw === "") return onChange("");
            const n = Math.max(0, Math.min(365, parseInt(raw, 10)));
            onChange(String(n));
          }}
          placeholder="0"
        />
        <span className="text-slate-500 text-sm">days</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="italic text-slate-800">
        During the <b>past 12 months</b>:
      </h1>

      {/* Part A */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3 space-y-2">
        <div className="text-sm font-semibold text-slate-900">Part A</div>
        <DaysField
          label="Alcohol (beer, wine, liquor)"
          value={pA.daysAlcohol}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.crafft.partA.daysAlcohol = v)
            )
          }
        />
        <DaysField
          label="Marijuana / THC (incl. vapes/edibles)"
          value={pA.daysMarijuana}
          onChange={(v) =>
            setA(
              (n) =>
                ((n.assessments as any).data.crafft.partA.daysMarijuana = v)
            )
          }
        />
        <DaysField
          label="Other drugs to get high"
          value={pA.daysOther}
          onChange={(v) =>
            setA(
              (n) => ((n.assessments as any).data.crafft.partA.daysOther = v)
            )
          }
        />
      </div>

      {/* Part B */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <div className="text-sm font-semibold text-slate-900 mb-2">Part B</div>

        {/* CAR is always present */}
        <Field title="Have you ever ridden in a CAR driven by someone (including yourself) who was high or had been using alcohol or drugs?">
          <Likert
            value={pB.car}
            onChange={(v) =>
              setA(
                (n) =>
                  ((n.assessments as any).data.crafft.partB.car = String(v))
              )
            }
            options={[
              { key: "yes", label: "Yes" },
              { key: "no", label: "No" },
            ]}
          />
        </Field>

        {showAllB && (
          <>
            <Field title="Do you ever use alcohol or drugs to RELAX, feel better about yourself, or fit in?">
              <Likert
                value={pB.relax}
                onChange={(v) =>
                  setA(
                    (n) =>
                      ((n.assessments as any).data.crafft.partB.relax =
                        String(v))
                  )
                }
                options={[
                  { key: "yes", label: "Yes" },
                  { key: "no", label: "No" },
                ]}
              />
            </Field>
            <Field title="Do you ever use alcohol or drugs while you are by yourself, or ALONE?">
              <Likert
                value={pB.alone}
                onChange={(v) =>
                  setA(
                    (n) =>
                      ((n.assessments as any).data.crafft.partB.alone =
                        String(v))
                  )
                }
                options={[
                  { key: "yes", label: "Yes" },
                  { key: "no", label: "No" },
                ]}
              />
            </Field>
            <Field title="Do you ever FORGET things you did while using alcohol or drugs?">
              <Likert
                value={pB.forget}
                onChange={(v) =>
                  setA(
                    (n) =>
                      ((n.assessments as any).data.crafft.partB.forget =
                        String(v))
                  )
                }
                options={[
                  { key: "yes", label: "Yes" },
                  { key: "no", label: "No" },
                ]}
              />
            </Field>
            <Field title="Do your FAMILY or FRIENDS ever tell you that you should cut down on your drinking or drug use?">
              <Likert
                value={pB.familyFriends}
                onChange={(v) =>
                  setA(
                    (n) =>
                      ((n.assessments as any).data.crafft.partB.familyFriends =
                        String(v))
                  )
                }
                options={[
                  { key: "yes", label: "Yes" },
                  { key: "no", label: "No" },
                ]}
              />
            </Field>
            <Field title="Have you ever gotten into TROUBLE while you were using alcohol or drugs?">
              <Likert
                value={pB.trouble}
                onChange={(v) =>
                  setA(
                    (n) =>
                      ((n.assessments as any).data.crafft.partB.trouble =
                        String(v))
                  )
                }
                options={[
                  { key: "yes", label: "Yes" },
                  { key: "no", label: "No" },
                ]}
              />
            </Field>
          </>
        )}
      </div>
    </div>
  );
}
