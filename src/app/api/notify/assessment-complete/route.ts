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
    console.log(body);
    console.log("[notify] submitted raw:", {
      fromBody: { submittedAtEpoch, submittedAtISO },
      parsedIso: submittedIso,
      parsedET: submittedEt,
    });

    // Mark intake as finished for the authenticated user (server-side session)
    try {
      const session = await getServerSession(authOptions);
      const authedUserId = (session?.user as any)?.id as string | undefined;
      if (authedUserId) {
        await prisma.user.update({
          where: { id: authedUserId },
          data: { intakeFinished: true },
        });
      } else {
        console.warn(
          "[notify] No authenticated user in session; skipping intakeFinished toggle."
        );
      }
    } catch (e) {
      console.error("[notify] Failed to set intakeFinished on user:", e);
      // Do not fail the notification on this.
    }
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REFRESH_TOKEN = process.env.GMAIL_REFRESH_TOKEN;
    const SENDER = process.env.GMAIL_SENDER; // e.g., noreply@your-domain.com (must match authorized Gmail account)
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
          <tr><td style="padding:4px 8px; color:#555">Submitted (ET)</td><td style="padding:4px 8px">${submittedEt}</td></tr>
          <tr><td style="padding:4px 8px; color:#555">Submitted (ISO/UTC)</td><td style="padding:4px 8px"><code>${submittedIso}</code></td></tr>
        </table>
        <p style="margin:12px 0 0; font-size:14px;">
          You can view the patient’s results here:
          <a href="https://integrative-psych-clinician-report-34615113909.us-east4.run.app/" target="_blank" rel="noopener noreferrer">https://integrative-psych-clinician-report-34615113909.us-east4.run.app/</a>.
          Please input the name exactly as written in this email.
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

    console.log({ Gmail: raw });

    return NextResponse.json({
      ok: true,
      to: toList,
      cc: ccList,
      bcc: bccList,
    });
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
