import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

// Keep it minimal. Avoid PHI in email bodies.
export async function POST(req: NextRequest) {
  try {
    const { firstName, lastInitial, email, submittedAt } = await req.json();

    const subject = `Intake completed${
      firstName ? `: ${firstName} ${lastInitial || ""}.` : ""
    }`;
    const lines = [
      `An intake assessment was completed.`,
      firstName ? `Name (minimal): ${firstName} ${lastInitial || ""}.` : "",
      email ? `Email (provided by user session): ${email}` : "",
      submittedAt ? `Submitted at: ${submittedAt}` : "",
    ].filter(Boolean);

    const to = (process.env.NOTIFY_TO || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (to.length === 0) {
      return NextResponse.json(
        { error: "NOTIFY_TO env not set" },
        { status: 400 }
      );
    }

    await resend.emails.send({
      from: process.env.NOTIFY_FROM || "no-reply@your-domain.com",
      to,
      subject,
      text: lines.join("\n"),
      // NOTE: We're not passing `react: <Component/>`, but Turbopack still
      // resolves the optional renderer. That's why @react-email/render must be installed.
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("notify error", e);
    return NextResponse.json({ error: "notify_failed" }, { status: 500 });
  }
}
