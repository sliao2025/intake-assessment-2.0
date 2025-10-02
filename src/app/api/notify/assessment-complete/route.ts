import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";

// Helper to build base64url MIME message
function buildRawEmail({
  from,
  to,
  subject,
  html,
}: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  const message = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
  ].join("\r\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      firstName = "",
      lastName = "",
      email = "",
      submittedAt = new Date().toISOString(),
    } = body || {};

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
    const SENDER = process.env.GMAIL_SENDER; // e.g., noreply@your-domain.com (must match authorized Gmail account)
    const NOTIFY_TO = process.env.NOTIFY_TO || SENDER;

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !SENDER) {
      return NextResponse.json(
        {
          error:
            "Missing Gmail API environment variables. Ensure GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, and GMAIL_SENDER are set.",
        },
        { status: 500 }
      );
    }

    const oAuth2Client = new google.auth.OAuth2({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: "urn:ietf:wg:oauth:2.0:oob", // not used at runtime; token must be pre-generated
    });

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const subject = "New Intake Assessment Completed";
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5;">
        <h2 style="margin:0 0 8px">Intake Submitted</h2>
        <p style="margin:0 0 8px">A patient just completed the intake assessment.</p>
        <table style="border-collapse:collapse; font-size:14px;">
          <tr><td style="padding:4px 8px; color:#555">Name</td><td style="padding:4px 8px"><b>${firstName || "(unknown)"} ${lastName || ""}</b></td></tr>
          <tr><td style="padding:4px 8px; color:#555">Email</td><td style="padding:4px 8px">${email || "(not provided)"}</td></tr>
          <tr><td style="padding:4px 8px; color:#555">Submitted At</td><td style="padding:4px 8px">${submittedAt}</td></tr>
        </table>
        <p style="margin:12px 0 0; font-size:14px;">
          You can view the patient’s results here:
          <a href="https://integrative-psych-clinician-report-34615113909.us-east4.run.app/" target="_blank" rel="noopener noreferrer">https://integrative-psych-clinician-report-34615113909.us-east4.run.app/</a>.
          Please input the name exactly as written in this email.
        </p>
      </div>
    `;

    const raw = buildRawEmail({
      from: SENDER,
      to: NOTIFY_TO || SENDER,
      subject,
      html,
    });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(
      "/api/notify/assessment-complete error:",
      err?.message || err
    );
    return NextResponse.json(
      {
        error: "Failed to send Gmail notification",
        details: String(err?.message || err),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
