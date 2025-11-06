# Upload Routes Split Architecture

## Overview

The audio upload and transcription functionality has been split into two separate API routes for better separation of concerns, cleaner code organization, and independent error handling.

## Route Structure

### 1. `/api/upload/audio/route.ts`

**Purpose:** Handle audio file uploads to Google Cloud Storage and deletions.

**Endpoints:**

- **POST**: Upload audio blob to GCS
  - Accepts: FormData with `audio` blob and `fieldName`
  - Returns: `{ok, url, fileName, uploadedAt}`
  - Response time: ~1-2 seconds
- **DELETE**: Remove audio file from GCS
  - Accepts: JSON with `fileName`
  - Returns: `{ok, message}`
  - Includes security check (user can only delete their own files)

**Responsibilities:**

- Validate authentication
- Upload audio to GCS with pattern: `userId/fieldName-timestamp.webm`
- Generate proxy URL for secure access: `/api/upload/audio/stream?fileName=...`
- Delete files from GCS on request

### 2. `/api/transcribe/trigger/route.ts` (NEW)

**Purpose:** Trigger the transcription service to process uploaded audio files.

**Endpoints:**

- **POST**: Trigger transcription
  - Accepts: JSON with `{fileName, fieldType, bucket?}`
  - Returns: `{ok, message}` or error details
  - Response time: ~100-200ms (doesn't wait for transcription)

**Responsibilities:**

- Validate authentication
- Call transcription service at `https://intake-analysis-34615113909.us-east4.run.app/transcribe`
- Send: `{fileName, userId, fieldType, bucket}`
- Fire-and-forget pattern (doesn't wait for transcription to complete)

## Client-Side Flow (VoiceRecorder.tsx)

```typescript
async function uploadBlobToCloud(blob: Blob) {
  // STEP 1: Upload to GCS
  const response = await fetch("/api/upload/audio", {
    method: "POST",
    body: formData, // audio blob + fieldName
  });

  const data = await response.json();
  // data = {url, fileName, uploadedAt}

  // STEP 2: Save metadata to DB immediately
  if (onAttach) {
    await onAttach(data); // Saves to SQL via /api/profile/create
  }

  // STEP 3: Trigger transcription in background
  fetch("/api/transcribe/trigger", {
    method: "POST",
    body: JSON.stringify({
      fileName: data.fileName,
      fieldType: fieldName,
    }),
  }); // Fire-and-forget, don't await

  return data;
}
```

## Timing Breakdown

| Step | Action                   | Time      | Blocking?               |
| ---- | ------------------------ | --------- | ----------------------- |
| 1    | Upload to GCS            | 1-2s      | ✅ Yes                  |
| 2    | Save metadata to DB      | <1s       | ✅ Yes                  |
| 3    | Trigger transcription    | 100-200ms | ❌ No (fire-and-forget) |
| 4    | Transcription processing | 3-8s      | ❌ No (background)      |

**Total user wait time:** ~2-3 seconds (Steps 1+2 only)

## Database State Evolution

### After Upload (Steps 1-2 complete):

```json
{
  "storyNarrative": {
    "url": "/api/upload/audio/stream?fileName=user123/storyNarrative-1699372800000.webm",
    "fileName": "user123/storyNarrative-1699372800000.webm",
    "uploadedAt": "2024-11-07T12:00:00.000Z"
  }
}
```

### After Transcription (Step 4 complete, 3-8s later):

```json
{
  "storyNarrative": {
    "url": "/api/upload/audio/stream?fileName=user123/storyNarrative-1699372800000.webm",
    "fileName": "user123/storyNarrative-1699372800000.webm",
    "uploadedAt": "2024-11-07T12:00:00.000Z",
    "transcription": "I've been struggling with anxiety for years...",
    "duration": 45.2,
    "wordCount": 127
  }
}
```

## Benefits of Split Architecture

1. **Separation of Concerns**
   - Upload route only handles GCS operations
   - Transcription route only handles transcription service
   - Each can be tested/debugged independently

2. **Better Error Handling**
   - Upload failures don't affect transcription trigger
   - Transcription failures don't affect upload success
   - More granular error messages

3. **Flexibility**
   - Can call transcription endpoint independently if needed
   - Can retry transcription without re-uploading
   - Can add webhook/callback pattern later

4. **Code Clarity**
   - Smaller, focused files
   - Easier to understand and maintain
   - Clear responsibilities

## Environment Variables

- `GCS_BUCKET_NAME`: Google Cloud Storage bucket name
- `GCS_SERVICE_ACCOUNT_KEY`: Service account credentials (JSON)
- `TRANSCRIPTION_SERVICE_URL`: Transcription service endpoint (defaults to production URL)

## Security

- Both routes require authentication via NextAuth session
- Upload route: User can only upload to their own folder (`userId/`)
- Delete route: User can only delete files from their own folder
- Transcription route: User ID verified before calling transcription service
- Stream endpoint: Validates file ownership before serving content

## Error Handling

### Upload Route Errors:

- 401: No authentication
- 400: Missing file or fieldName
- 500: GCS upload failure

### Transcription Route Errors:

- 401: No authentication
- 400: Missing fileName or fieldType
- 500: Transcription service unavailable
- Returns transcription service error details for debugging

### Client-Side Handling:

- Upload failures block the process (user sees error)
- Transcription failures are logged but don't block UI
- User can immediately see audio metadata even if transcription fails
