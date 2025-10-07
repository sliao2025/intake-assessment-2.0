import { NextResponse } from "next/server";
import OpenAI from "openai";
import fs from "fs/promises";

// Ensure OPENAI_API_KEY is set in your environment

export async function POST(req: Request) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let payload: any = {};
    try {
      payload = await req.json();
    } catch {
      payload = {};
    }

    // --- New: branch for metrics/interpretations mode ---
    if (payload.metrics) {
      // Only include primitive numbers for metrics
      console.log(payload.metrics?.ptsdFlags, "ptsdflags");
      const metrics = {
        gad7: Number(payload.metrics?.gad7 ?? 0),
        phq9: Number(payload.metrics?.phq9 ?? 0),
        pss4: Number(payload.metrics?.pss4 ?? 0),
        asrs5: Number(payload.metrics?.asrs5 ?? 0),
        ptsdFlags: Number(payload.metrics?.ptsdFlags ?? 0),
        crafft: Number(payload.metrics?.crafft ?? 0),
        ace: Number(payload.metrics?.ace ?? 0),
      };
      const instructions = await fs.readFile(
        "src/app/prompts/scale_prompt.txt",
        "utf-8"
      );
      const user = `Metrics: ${JSON.stringify(metrics)}. Using only these numbers, return JSON exactly with those keys, each value a single paragraph (<=3 short sentences).`;

      const response = await client.responses.create({
        model: "gpt-5-mini",
        input: [
          { role: "developer", content: instructions },
          { role: "user", content: user },
        ],
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
      });
      const text =
        (response as any)?.output_text ?? "No interpretation generated.";
      let interpretations: any = null;
      try {
        interpretations = JSON.parse(text);
      } catch {
        interpretations = null;
      }
      const safe =
        interpretations && typeof interpretations === "object"
          ? interpretations
          : {
              gad7: text,
              phq9: text,
              pss4: text,
              asrs5: text,
              ptsd: text,
              crafft: text,
              ace: text,
            };
      return NextResponse.json({ ok: true, interpretations: safe });
    }

    // --- Existing summary branch ---
    const { profile } = payload || {};

    const system = [
      "You are a clinical summarizer for an intake assessment.",
      "Write a brief, readable summary for clinicians with neutral, nonjudgmental tone.",
      "Avoid diagnoses and treatment plans; stick to intake information.",
      "If data is sparse, still provide a useful summary.",
    ].join(" ");

    const user = profile
      ? `Summarize this patient intake into 4–6 bullet points with short headers:\n${JSON.stringify(
          profile
        )}`
      : "Summarize a generic intake result into 4–6 bullet points with short headers.";

    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const text = (response as any)?.output_text ?? "No summary generated.";
    return NextResponse.json({ ok: true, text });
  } catch (err: any) {
    console.error("[/api/report/summarize] error", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}

// Optional: quick test endpoint
export async function GET() {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input:
        "Write a single-sentence friendly confirmation that the intake was submitted.",
    });
    const text =
      (response as any)?.output_text ?? "Thanks! Your intake was submitted.";
    return NextResponse.json({ ok: true, text });
  } catch (err: any) {
    console.error("[/api/report/summarize] GET error", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
