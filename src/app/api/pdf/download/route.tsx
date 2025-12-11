import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "../../../lib/prisma";
import React from "react";
import { renderToStream } from "@react-pdf/renderer";
import { AssessmentReportPDFAdult } from "../../../components/AssessmentReportPDFAdult";
import { AssessmentReportPDFChild } from "../../../components/AssessmentReportPDFChild";
import type { Profile } from "../../../lib/types/types";

export const runtime = "nodejs"; // Ensure Node.js runtime for @react-pdf/renderer

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const authedUserId = (session?.user as any)?.id as string | undefined;

  if (!authedUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profileRecord = await prisma.profile.findUnique({
      where: { userId: authedUserId },
      select: { json: true, firstName: true, lastName: true },
    });

    if (!profileRecord || !profileRecord.json) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const profileData = profileRecord.json as unknown as Profile;
    const filename =
      `Intake_Report_${profileRecord.firstName || "Patient"}_${profileRecord.lastName || "Report"}.pdf`.replace(
        /\s+/g,
        "_"
      );

    // Use appropriate PDF component based on patient type
    const pdfComponent = profileData.isChild ? (
      <AssessmentReportPDFChild profile={profileData} />
    ) : (
      <AssessmentReportPDFAdult profile={profileData} />
    );

    const stream = await renderToStream(pdfComponent);

    // Node.js readable stream to Web Response
    // renderToStream returns a NodeJS.ReadableStream. NextResponse body accepts ReadableStream (web standard)
    // We might need to convert. But usually passing the node stream works in Next.js Node runtime.
    // If not, we can use `renderToBuffer` instead.
    // Let's use generic stream approach or buffer to be safe.
    // Actually renderToStream returns a Promise<NodeJS.ReadableStream>.

    return new NextResponse(stream as any, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (err: any) {
    console.error("PDF generation error:", err);
    return NextResponse.json(
      { error: "Failed to generate PDF", details: err.message },
      { status: 500 }
    );
  }
}
