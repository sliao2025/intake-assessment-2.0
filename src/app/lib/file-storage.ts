/**
 * File Storage Abstraction Layer
 *
 * This module provides a unified interface for file storage that can use either:
 * - Google Cloud Storage (original, preserved)
 * - S3-compatible storage (new, for R2/AWS)
 *
 * Switch between backends using the STORAGE_BACKEND environment variable:
 * - STORAGE_BACKEND=gcs  → Use Google Cloud Storage
 * - STORAGE_BACKEND=s3   → Use S3/R2 (default for new deployment)
 */

import { Readable } from "stream";

// Determine storage backend from environment
const STORAGE_BACKEND = process.env.STORAGE_BACKEND || "s3";

// Types
export interface UploadResult {
  success: boolean;
  key: string;
  url?: string;
}

export interface FileStreamResult {
  stream: Readable;
  contentType: string | undefined;
  contentLength: number | undefined;
}

// Dynamic imports to avoid loading unused dependencies
async function getS3Module() {
  return import("./storage-s3");
}

async function getGCSModule() {
  // This will use the original GCS code when we need it
  const { Storage } = await import("@google-cloud/storage");
  return { Storage };
}

/**
 * Upload a file to storage
 */
export async function uploadFileToStorage(
  fileName: string,
  buffer: Buffer,
  contentType: string
): Promise<UploadResult> {
  if (STORAGE_BACKEND === "gcs") {
    // Original GCS implementation
    const { Storage } = await getGCSModule();
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
    });
    const bucketName =
      process.env.GCS_BUCKET_NAME || "intake-assessment-audio-files";
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    await file.save(buffer, {
      contentType,
      resumable: false,
    });

    return { success: true, key: fileName };
  } else {
    // S3/R2 implementation
    const s3 = await getS3Module();
    return s3.uploadFile(fileName, buffer, contentType);
  }
}

/**
 * Download a file from storage
 */
export async function downloadFileFromStorage(
  fileName: string
): Promise<Buffer> {
  if (STORAGE_BACKEND === "gcs") {
    const { Storage } = await getGCSModule();
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
    });
    const bucketName =
      process.env.GCS_BUCKET_NAME || "intake-assessment-audio-files";
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [contents] = await file.download();
    return contents;
  } else {
    const s3 = await getS3Module();
    return s3.downloadFile(fileName);
  }
}

/**
 * Get file as a readable stream
 */
export async function getFileStreamFromStorage(
  fileName: string
): Promise<FileStreamResult> {
  if (STORAGE_BACKEND === "gcs") {
    const { Storage } = await getGCSModule();
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
    });
    const bucketName =
      process.env.GCS_BUCKET_NAME || "intake-assessment-audio-files";
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    const [metadata] = await file.getMetadata();
    const stream = file.createReadStream();

    return {
      stream: stream as unknown as Readable,
      contentType: metadata.contentType,
      contentLength: parseInt(metadata.size as string, 10),
    };
  } else {
    const s3 = await getS3Module();
    return s3.getFileStream(fileName);
  }
}

/**
 * Delete a file from storage
 */
export async function deleteFileFromStorage(
  fileName: string
): Promise<boolean> {
  if (STORAGE_BACKEND === "gcs") {
    const { Storage } = await getGCSModule();
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
    });
    const bucketName =
      process.env.GCS_BUCKET_NAME || "intake-assessment-audio-files";
    const bucket = storage.bucket(bucketName);

    await bucket.file(fileName).delete();
    return true;
  } else {
    const s3 = await getS3Module();
    return s3.deleteFile(fileName);
  }
}

/**
 * Check if a file exists
 */
export async function fileExistsInStorage(fileName: string): Promise<boolean> {
  if (STORAGE_BACKEND === "gcs") {
    const { Storage } = await getGCSModule();
    const storage = new Storage({
      projectId: process.env.GCP_PROJECT_ID,
    });
    const bucketName =
      process.env.GCS_BUCKET_NAME || "intake-assessment-audio-files";
    const bucket = storage.bucket(bucketName);

    const [exists] = await bucket.file(fileName).exists();
    return exists;
  } else {
    const s3 = await getS3Module();
    return s3.fileExists(fileName);
  }
}

/**
 * Get the current storage backend name
 */
export function getStorageBackend(): string {
  return STORAGE_BACKEND;
}
