// Helper to format a Date in ET and ISO
const formatET = (d: Date) =>
  new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short", // ET/EST/EDT
  }).format(d);
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";

// Utility to split recipient lists (comma/semicolon/newline)
const splitList = (s?: string) =>
  (s || "")
    .split(/[,;\n]/)
    .map((x) => x.trim())
    .filter((x) => x.length > 0);

// Helper to build base64url MIME message (supports arrays and cc/bcc)
function buildRawEmail({
  from,
  to,
  cc,
  bcc,
  subject,
  html,
}: {
  from: string;
  to: string[] | string;
  cc?: string[] | string;
  bcc?: string[] | string;
  subject: string;
  html: string;
}) {
  const toHeader = Array.isArray(to) ? to.join(", ") : to;
  const ccHeader = cc ? (Array.isArray(cc) ? cc.join(", ") : cc) : "";
  const bccHeader = bcc ? (Array.isArray(bcc) ? bcc.join(", ") : bcc) : "";

  const lines = [
    `From: ${from}`,
    `To: ${toHeader}`,
    ccHeader ? `Cc: ${ccHeader}` : "",
    bccHeader ? `Bcc: ${bccHeader}` : "",
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8",
    "",
    html,
  ].filter(Boolean) as string[];

  const message = lines.join("\r\n");

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
      isChild = null,
      concernQuestions = [],
      submittedAtEpoch,
      submittedAtISO,
      notifyTo,
      notifyCc,
      notifyBcc,
    } = body || {};
    const submitted =
      typeof submittedAtEpoch === "number"
        ? new Date(submittedAtEpoch)
        : submittedAtISO
          ? new Date(submittedAtISO)
          : new Date();
    const submittedIso = submitted.toISOString();
    const submittedEt = formatET(submitted);

    const session = await getServerSession(authOptions);
    const authedUserId = (session?.user as any)?.id as string | undefined;

    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN2;
    const SENDER = process.env.GMAIL_SENDER;
    // Accept comma/semicolon/newline-separated lists in env; allow override from request body
    const NOTIFY_TO = splitList(process.env.NOTIFY_TO || SENDER);
    const NOTIFY_CC = splitList(process.env.NOTIFY_CC || "");
    const NOTIFY_BCC = splitList(process.env.NOTIFY_BCC || "");

    // Compute final recipient lists (body overrides env if present)
    const toList = (Array.isArray(notifyTo) ? notifyTo : splitList(notifyTo))
      .length
      ? Array.isArray(notifyTo)
        ? notifyTo
        : splitList(notifyTo)
      : NOTIFY_TO;
    const ccList = (Array.isArray(notifyCc) ? notifyCc : splitList(notifyCc))
      .length
      ? Array.isArray(notifyCc)
        ? notifyCc
        : splitList(notifyCc)
      : NOTIFY_CC;
    const bccList = (Array.isArray(notifyBcc)
      ? notifyBcc
      : splitList(notifyBcc)
    ).length
      ? Array.isArray(notifyBcc)
        ? notifyBcc
        : splitList(notifyBcc)
      : NOTIFY_BCC;

    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN || !SENDER) {
      return NextResponse.json(
        {
          error:
            "Missing Gmail API environment variables. Ensure GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GMAIL_REFRESH_TOKEN2, and GMAIL_SENDER are set.",
        },
        { status: 500 }
      );
    }

    const oAuth2Client = new google.auth.OAuth2({
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      redirectUri: "urn:ietf:wg:oauth:2.0:oob",
    });

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

    const patientType = isChild === true ? "Child" : "Adult";
    const subject = `[URGENT] ${patientType} Intake Suicide Risk`;

    // Build the list of concerning responses
    const concernListHtml =
      Array.isArray(concernQuestions) && concernQuestions.length > 0
        ? `<ul style="margin:8px 0; padding-left:20px;">${concernQuestions.map((q: string) => `<li style="margin:4px 0;">${q} <strong>(Yes)</strong></li>`).join("")}</ul>`
        : "<p style='margin:8px 0; color:#d32f2f;'><strong>No specific questions listed, but risk indicators were detected.</strong></p>";

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height:1.5;">
        <h2 style="margin:0 0 8px; color:#d32f2f;">⚠️ URGENT: ${patientType} Intake Suicide Risk Detected</h2>
        <p style="margin:0 0 16px; color:#d32f2f; font-weight:bold;">A patient has submitted an intake assessment with suicide risk indicators.</p>
        <table style="border-collapse:collapse; font-size:14px; margin-bottom:16px;">
          <tr><td style="padding:4px 8px; color:#555; font-weight:bold;">Name</td><td style="padding:4px 8px"><b>${firstName || "(unknown)"} ${lastName || ""}</b></td></tr>
          <tr><td style="padding:4px 8px; color:#555; font-weight:bold;">Email</td><td style="padding:4px 8px">${email || "(not provided)"}</td></tr>
          <tr><td style="padding:4px 8px; color:#555; font-weight:bold;">Patient Type</td><td style="padding:4px 8px">${patientType}</td></tr>
          <tr><td style="padding:4px 8px; color:#555; font-weight:bold;">Submitted (ET)</td><td style="padding:4px 8px">${submittedEt}</td></tr>
          <tr><td style="padding:4px 8px; color:#555; font-weight:bold;">Submitted (ISO/UTC)</td><td style="padding:4px 8px"><code>${submittedIso}</code></td></tr>
        </table>
        <div style="background-color:#fff3cd; border-left:4px solid #ffc107; padding:12px; margin:16px 0;">
          <h3 style="margin:0 0 8px; color:#856404;">Concerning Responses:</h3>
          ${concernListHtml}
        </div>
        <p style="margin:16px 0 0; font-size:14px;">
          You can view the patient's full intake assessment here:
          <a href="https://integrative-psych-clinician-report-34615113909.us-east4.run.app/report/${authedUserId || ""}" target="_blank" rel="noopener noreferrer" style="color:#1976d2; text-decoration:underline;">Integrative Psych Intake Assessment Clinician Portal</a>.
        </p>
      </div>
    `;

    const raw = buildRawEmail({
      from: SENDER!,
      to: toList,
      cc: ccList.length ? ccList : undefined,
      bcc: bccList.length ? bccList : undefined,
      subject,
      html,
    });

    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    console.log("[suicide-risk] Notification sent:", {
      to: toList,
      concernQuestions,
    });

    return NextResponse.json({
      ok: true,
      to: toList,
      cc: ccList,
      bcc: bccList,
    });
  } catch (err: any) {
    console.error("/api/notify/suicide-risk error:", err?.message || err);
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
