import OpenAI from "openai";
import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let payload: any = {};
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

    // Call OpenAI to generate follow-up questions
    const response = await client.responses.create({
      model: "gpt-5-mini",
      input: [
        { role: "developer", content: instructions },
        {
          role: "user",
          content: JSON.stringify({ profile: payload.profile }),
        },
      ],
      reasoning: { effort: "low" },
      text: { verbosity: "low", format: { type: "json_object" } },
    });

    const responseText = (response as any)?.output_text ?? "{}";
    console.log("[Follow-up API] Raw response:", responseText);
    let parsedQuestions: any = {};

    try {
      console.log("[Follow-up API]", responseText);
      parsedQuestions = JSON.parse(responseText);
    } catch {
      // Fallback if parsing fails
      parsedQuestions = {
        question1: "Can you tell me more about your current symptoms?",
        question2: "How has this been affecting your daily life?",
        question3: "What are your goals for treatment?",
      };
    }

    // Ensure we have exactly 3 questions in the expected format
    const questions = {
      question1:
        parsedQuestions.question1 ||
        parsedQuestions.questions?.[0] ||
        "Can you tell me more about your current symptoms?",
      question2:
        parsedQuestions.question2 ||
        parsedQuestions.questions?.[1] ||
        "How has this been affecting your daily life?",
      question3:
        parsedQuestions.question3 ||
        parsedQuestions.questions?.[2] ||
        "What are your goals for treatment?",
    };

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
