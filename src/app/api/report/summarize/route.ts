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

    // --- New: support for metrics/profile combinations ---
    const hasMetrics = !!payload.metrics;
    const hasProfile = !!payload.profile;
    if (hasMetrics && hasProfile) {
      // Both metrics and profile present: generate both interpretations and summary concurrently
      const metrics = {
        gad7: Number(payload.metrics?.gad7 ?? 0),
        phq9: Number(payload.metrics?.phq9 ?? 0),
        pss4: Number(payload.metrics?.pss4 ?? 0),
        asrs5: Number(payload.metrics?.asrs5 ?? 0),
        ptsdFlags: Number(payload.metrics?.ptsdFlags ?? 0),
        crafft: Number(payload.metrics?.crafft ?? 0),
        ace: Number(payload.metrics?.ace ?? 0),
      };
      const scaleInstructions = await fs.readFile(
        "src/app/prompts/scale_prompt.txt",
        "utf-8"
      );
      const summaryInstructions = await fs.readFile(
        "src/app/prompts/summary_prompt.txt",
        "utf-8"
      );
      // Prepare OpenAI calls
      const interpPromise = client.responses.create({
        model: "gpt-5-mini",
        input: [
          { role: "developer", content: scaleInstructions },
          {
            role: "user",
            content: `Metrics: ${JSON.stringify(metrics)}. Using only these numbers, return JSON exactly with those keys, each value a single paragraph (<=3 short sentences).`,
          },
        ],
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
      });
      const summaryPromise = client.responses.create({
        model: "gpt-5-mini",
        input: [
          { role: "developer", content: summaryInstructions },
          { role: "user", content: JSON.stringify(payload.profile) },
        ],
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
      });
      const [interpResp, summaryResp] = await Promise.all([
        interpPromise,
        summaryPromise,
      ]);
      const interpText =
        (interpResp as any)?.output_text ?? "No interpretation generated.";
      let parsedInterpretations: any = null;
      try {
        parsedInterpretations = JSON.parse(interpText);
      } catch {
        parsedInterpretations = null;
      }
      const safeInterp =
        parsedInterpretations && typeof parsedInterpretations === "object"
          ? parsedInterpretations
          : {
              gad7: interpText,
              phq9: interpText,
              pss4: interpText,
              asrs5: interpText,
              ptsd: interpText,
              crafft: interpText,
              ace: interpText,
            };
      const rawSummary =
        (summaryResp as any)?.output_text ?? "No summary generated.";

      // Parse the model's JSON per summary_prompt.txt: must contain "reason_for_eval" and "background"
      let summaryObj: any = null;
      try {
        summaryObj = JSON.parse(rawSummary);
      } catch {
        summaryObj = null;
      }
      if (
        !summaryObj ||
        typeof summaryObj !== "object" ||
        !("reason_for_eval" in summaryObj) ||
        !("background" in summaryObj)
      ) {
        throw new Error(
          "Summary JSON missing required keys 'reason_for_eval' and 'background'."
        );
      }

      // Maintain backward compatibility with existing UI by also returning a joined text version
      const combinedText = `${String(summaryObj.reason_for_eval || "").trim()}

${String(summaryObj.background || "").trim()}`.trim();

      return NextResponse.json({
        ok: true,
        text: combinedText,
        summary: {
          reason_for_eval: String(summaryObj.reason_for_eval || ""),
          background: String(summaryObj.background || ""),
        },
        interpretations: safeInterp,
      });
    }
    // Only metrics present
    if (hasMetrics && !hasProfile) {
      const metrics = {
        gad7: Number(payload.metrics?.gad7 ?? 0),
        phq9: Number(payload.metrics?.phq9 ?? 0),
        pss4: Number(payload.metrics?.pss4 ?? 0),
        asrs5: Number(payload.metrics?.asrs5 ?? 0),
        ptsdFlags: Number(payload.metrics?.ptsdFlags ?? 0),
        crafft: Number(payload.metrics?.crafft ?? 0),
        ace: Number(payload.metrics?.ace ?? 0),
      };
      const scaleInstructions = await fs.readFile(
        "src/app/prompts/scale_prompt.txt",
        "utf-8"
      );
      const response = await client.responses.create({
        model: "gpt-5-mini",
        input: [
          { role: "developer", content: scaleInstructions },
          {
            role: "user",
            content: `Metrics: ${JSON.stringify(metrics)}. Using only these numbers, return JSON exactly with those keys, each value a single paragraph (<=3 short sentences).`,
          },
        ],
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
      });
      const interpText =
        (response as any)?.output_text ?? "No interpretation generated.";
      let parsedInterpretations: any = null;
      try {
        parsedInterpretations = JSON.parse(interpText);
      } catch {
        parsedInterpretations = null;
      }
      const safeInterp =
        parsedInterpretations && typeof parsedInterpretations === "object"
          ? parsedInterpretations
          : {
              gad7: interpText,
              phq9: interpText,
              pss4: interpText,
              asrs5: interpText,
              ptsd: interpText,
              crafft: interpText,
              ace: interpText,
            };
      return NextResponse.json({ ok: true, interpretations: safeInterp });
    }
    // Only profile present
    if (hasProfile && !hasMetrics) {
      const summaryInstructions = await fs.readFile(
        "src/app/prompts/summary_prompt.txt",
        "utf-8"
      );
      const response = await client.responses.create({
        model: "gpt-5-mini",
        input: [
          { role: "developer", content: summaryInstructions },
          { role: "user", content: JSON.stringify(payload.profile) },
        ],
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
      });
      const rawSummary =
        (response as any)?.output_text ?? "No summary generated.";

      // Parse the model's JSON per summary_prompt.txt: must contain "reason_for_eval" and "background"
      let summaryObj: any = null;
      try {
        summaryObj = JSON.parse(rawSummary);
      } catch {
        summaryObj = null;
      }
      if (
        !summaryObj ||
        typeof summaryObj !== "object" ||
        !("reason_for_eval" in summaryObj) ||
        !("background" in summaryObj)
      ) {
        throw new Error(
          "Summary JSON missing required keys 'reason_for_eval' and 'background'."
        );
      }

      // Maintain backward compatibility with existing UI by also returning a joined text version
      const combinedText = `${String(summaryObj.reason_for_eval || "").trim()}

${String(summaryObj.background || "").trim()}`.trim();

      return NextResponse.json({
        ok: true,
        text: combinedText,
        summary: {
          reason_for_eval: String(summaryObj.reason_for_eval || ""),
          background: String(summaryObj.background || ""),
        },
      });
    }
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
