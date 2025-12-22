import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod/v3";
import fs from "fs/promises";
import { NextResponse } from "next/server";

// Define the schema for follow-up questions using Zod
// This ensures the model's output strictly adheres to this structure
const FollowUpQuestionsSchema = z.object({
  question1: z.string().describe("First personalized follow-up question"),
  question2: z.string().describe("Second personalized follow-up question"),
  question3: z.string().describe("Third personalized follow-up question"),
});

export async function POST(req: Request) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let payload: { profile?: any } = {};
    try {
      payload = await req.json();
    } catch {
      payload = {};
    }

    const hasProfile = !!payload.profile;
    const isChild = payload.profile?.isChild;

    if (!hasProfile) {
      return NextResponse.json(
        { ok: false, error: "No profile provided" },
        { status: 400 }
      );
    }

    // Load appropriate instructions based on patient type
    let instructions = "";
    if (isChild) {
      instructions = await fs.readFile(
        "public/prompts/child_followup_prompt.txt",
        "utf-8"
      );
    } else {
      instructions = await fs.readFile(
        "public/prompts/adult_followup_prompt.txt",
        "utf-8"
      );
    }

    // Call OpenAI with Structured Outputs to generate follow-up questions
    // Using zodTextFormat ensures the model's response strictly adheres to our schema
    const response = await client.responses.parse({
      model: "gpt-5-mini",
      input: [
        { role: "developer", content: instructions },
        {
          role: "user",
          content: JSON.stringify({ profile: payload.profile }),
        },
      ],
      text: {
        format: zodTextFormat(FollowUpQuestionsSchema, "followup_questions"),
      },
    });

    // Check for refusals (safety-based model refusals)
    // The Responses API may return refusals in the output content
    const firstOutput = response.output?.[0];
    if (
      firstOutput &&
      "content" in firstOutput &&
      Array.isArray(firstOutput.content)
    ) {
      const refusalContent = firstOutput.content.find(
        (c: { type: string; refusal?: string }) => c.type === "refusal"
      );
      if (refusalContent && "refusal" in refusalContent) {
        console.warn(
          "[Follow-up API] Model refused to generate questions:",
          refusalContent.refusal
        );
        return NextResponse.json({
          ok: true,
          questions: {
            question1: "Can you tell me more about your current symptoms?",
            question2: "How has this been affecting your daily life?",
            question3: "What are your goals for treatment?",
          },
        });
      }
    }

    // Handle incomplete responses (e.g., max tokens reached)
    if (response.status === "incomplete") {
      console.warn(
        "[Follow-up API] Incomplete response:",
        response.incomplete_details
      );
      return NextResponse.json({
        ok: true,
        questions: {
          question1: "Can you tell me more about your current symptoms?",
          question2: "How has this been affecting your daily life?",
          question3: "What are your goals for treatment?",
        },
      });
    }

    // With Structured Outputs, output_parsed is guaranteed to match our schema
    const questions = response.output_parsed;
    console.log("[Follow-up API] Parsed questions:", questions);

    if (!questions) {
      console.warn("[Follow-up API] No parsed output available");
      return NextResponse.json({
        ok: true,
        questions: {
          question1: "Can you tell me more about your current symptoms?",
          question2: "How has this been affecting your daily life?",
          question3: "What are your goals for treatment?",
        },
      });
    }

    return NextResponse.json({
      ok: true,
      questions,
    });
  } catch (err: any) {
    console.error("[/api/followup] error", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
