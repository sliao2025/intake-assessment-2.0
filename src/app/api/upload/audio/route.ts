import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// Use our file storage abstraction for dual-write support
import { uploadFileToStorage, deleteFileFromStorage } from "@/lib/file-storage";

export async function POST(req: NextRequest) {
  try {
    // Verify user is authenticated
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      return NextResponse.json({ error: "User ID not found" }, { status: 400 });
    }

    // Parse form data
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;
    const fieldName = formData.get("fieldName") as string;

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    if (!fieldName) {
      return NextResponse.json(
        { error: "Field name is required" },
        { status: 400 }
      );
    }

    // Normalize field name for use in filename
    let normalizedFieldName = fieldName;
    if (fieldName.startsWith("followupQuestions.question")) {
      const match = fieldName.match(/followupQuestions\.question(\d)\.answer/);
      if (match) {
        normalizedFieldName = `followupQuestion${match[1]}`;
      }
    }

    console.log(
      `[upload/audio] Field name: ${fieldName}, normalized: ${normalizedFieldName}`
    );

    // Create filename WITH timestamp - unique file per recording
    const timestamp = Date.now();
    const fileName = `${userId}/${normalizedFieldName}-${timestamp}.webm`;

    // Convert File to Buffer
    const arrayBuffer = await audioFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileSizeBytes = buffer.length;

    console.log(
      `[upload/audio] Uploading file: ${fileName}, size: ${fileSizeBytes} bytes`
    );

    // Call storage abstraction to handle DUAL-WRITE
    const result = await uploadFileToStorage(fileName, buffer, "audio/webm");

    console.log(
      `[upload/audio] File uploaded successfully to ${result.backend} (dual-write: ${result.dualWriteSuccess})`
    );

    // Return proxy URL that will be served through our API with auth check
    const proxyUrl = `/api/upload/audio/stream?fileName=${encodeURIComponent(fileName)}`;
    const uploadedAt = new Date().toISOString();

    return NextResponse.json({
      ok: true,
      url: proxyUrl, // Proxy URL through our API with auth check
      fileName, // Store this for reference
      uploadedAt,
    });
  } catch (error: any) {
    console.error("[upload/audio] Error:", error);
    return NextResponse.json(
      { error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}

// Optional: DELETE endpoint to remove audio files
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const fileName = searchParams.get("fileName");

    if (!fileName) {
      return NextResponse.json(
        { error: "fileName parameter required" },
        { status: 400 }
      );
    }

    // Verify the file belongs to this user (security check)
    const userId = (session.user as any).id;
    if (!fileName.startsWith(`${userId}/`)) {
      return NextResponse.json(
        { error: "Unauthorized to delete this file" },
        { status: 403 }
      );
    }

    await deleteFileFromStorage(fileName);

    console.log(`[upload/audio] File deleted: ${fileName}`);

    return NextResponse.json({
      ok: true,
      message: "File deleted successfully",
    });
  } catch (error: any) {
    console.error("[upload/audio] Delete error:", error);
    return NextResponse.json(
      { error: error.message || "Delete failed" },
      { status: 500 }
    );
  }
}
