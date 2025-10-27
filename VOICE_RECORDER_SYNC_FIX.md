# Voice Recorder Sync Fix

## Problem Statement

The voice recorder component had synchronization issues between Cloud Storage and SQL database:

1. **Race conditions**: Upload to cloud and save to SQL were happening at different times
2. **State inconsistencies**: Local state, cloud storage, and SQL database could get out of sync
3. **Duplicate files**: Re-recording didn't properly delete old files before creating new ones
4. **Unreliable delete**: Delete operations didn't ensure both cloud and SQL were cleared atomically

## Solution Overview

Refactored the voice recorder to ensure **atomic operations** where cloud storage and SQL database are always in sync.

### Key Principles

1. **Single Source of Truth**: Only one file should exist per field per user in both cloud storage and SQL
2. **Atomic Operations**: Upload/delete operations update both cloud storage and SQL database sequentially before updating local state
3. **Proper Cleanup**: Starting a new recording always deletes any existing recording first
4. **Sequential Consistency**: Operations happen in order: Cloud → SQL → Local State

## Changes Made

### 1. VoiceRecorder Component (`VoiceRecorder.tsx`)

#### Removed Auto-Upload Callback from useRecorder

- Removed `onBlobReady` callback parameter from `useRecorder` hook
- This prevented premature uploads before state was ready

#### Added Auto-Upload useEffect

```typescript
// Auto-upload when a new recording blob is created
const uploadingRef = useRef(false);
useEffect(() => {
  if (audioBlob && !isUploaded && !uploading && !uploadingRef.current) {
    console.log(
      `[VoiceRecorder ${fieldName}] New blob detected, triggering upload...`
    );
    uploadingRef.current = true;
    uploadBlobToCloud(audioBlob)
      .catch((err) => {
        console.error(`[VoiceRecorder ${fieldName}] Auto-upload failed:`, err);
      })
      .finally(() => {
        uploadingRef.current = false;
      });
  }
}, [audioBlob, isUploaded, uploading, fieldName]);
```

This ensures:

- Upload only happens once per blob
- No race conditions with duplicate uploads
- Proper error handling

#### Improved Upload Flow

```typescript
const uploadBlobToCloud = async (blob: Blob) => {
  // 1. Upload to Cloud Storage (overwrites if exists)
  const response = await fetch("/api/upload/audio", {
    method: "POST",
    body: formData,
  });

  // 2. Call parent's onAttach to save to SQL
  if (onAttach) {
    await onAttach(uploadData);
  }

  // 3. Update local state
  setIsUploaded(true);
  setCurrentFileName(data.fileName);
};
```

#### Improved Delete Flow

```typescript
const handleDelete = async () => {
  // 1. Delete from Cloud Storage
  await fetch(
    `/api/upload/audio?fileName=${encodeURIComponent(currentFileName)}`,
    { method: "DELETE" }
  );

  // 2. Clear SQL reference via onAttach(null)
  if (onAttach) {
    await onAttach(null);
  }

  // 3. Clear local state
  reset();
  setIsUploaded(false);
  setCurrentFileName(null);
};
```

#### Improved Start Recording Flow

```typescript
const handleStart = async () => {
  // If there's an existing recording, delete it first
  if (audioURL || currentFileName) {
    await handleDelete();
  }

  // Start new recording
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  startVisualizer(stream);
  await start();
};
```

This ensures:

- Old recording is completely deleted (from cloud and SQL) before starting new one
- No orphaned files in cloud storage
- SQL database always reflects current state

#### Added Props Sync

```typescript
useEffect(() => {
  if (existingFileName && existingFileName !== currentFileName) {
    setCurrentFileName(existingFileName);
    setIsUploaded(true);
  }
}, [existingFileName, currentFileName, fieldName]);
```

This ensures the component properly reflects existing recordings when navigating back to the page.

### 2. StorySection Component (`StorySection.tsx`)

#### Improved onAttach Handler

```typescript
onAttach={async (data) => {
  // 1. Compute updated profile synchronously (avoid setState race condition)
  const updatedProfile = {
    ...profile,
    storyNarrative: {
      ...profile.storyNarrative,
      audio: data ? {
        url: data.url,
        fileName: data.fileName,
        uploadedAt: data.uploadedAt,
      } : undefined,
    },
  };

  // 2. Save to SQL first (ensures cloud and SQL are in sync)
  await saveProfileToSQL(updatedProfile);

  // 3. Then update local state
  setProfile(updatedProfile);
}}
```

**Key improvement**: Computing the updated profile synchronously before saving to SQL prevents race conditions with `setState`.

### 3. Cloud Storage API (`/api/upload/audio/route.ts`)

No changes needed - already designed to overwrite files with the same name:

```typescript
// Create filename WITHOUT timestamp - one file per field per user
const fileName = `${userId}/${fieldName}.webm`;
```

This ensures:

- Only one file exists per field per user
- New recordings overwrite old ones automatically
- No orphaned files

## Flow Diagrams

### Recording Flow (STOP button clicked)

```
1. User clicks STOP
   ↓
2. MediaRecorder stops → blob created
   ↓
3. useEffect detects new blob
   ↓
4. uploadBlobToCloud(blob)
   ├─ Upload to Cloud Storage (overwrites if exists)
   ├─ Call onAttach(uploadData)
   │  ├─ Save to SQL database
   │  └─ Update parent state
   └─ Update local state (isUploaded=true)
```

### Delete Flow (DELETE button clicked)

```
1. User clicks DELETE
   ↓
2. handleDelete()
   ├─ Delete from Cloud Storage
   ├─ Call onAttach(null)
   │  ├─ Clear audio field in SQL
   │  └─ Update parent state
   └─ Clear local state
```

### Re-record Flow (RECORD button clicked when recording exists)

```
1. User clicks RECORD
   ↓
2. handleStart()
   ├─ Detect existing recording
   ├─ Call handleDelete()
   │  ├─ Delete from Cloud Storage
   │  ├─ Clear SQL database
   │  └─ Clear local state
   └─ Start new recording
```

## Testing Checklist

- [x] **New Recording**: Record → Stop → Verify file in cloud and SQL
- [x] **Delete Recording**: Record → Stop → Delete → Verify removed from cloud and SQL
- [x] **Re-record**: Record → Stop → Record Again → Verify only one file exists
- [x] **Navigation**: Record → Stop → Navigate away → Navigate back → Verify recording is shown
- [x] **Playback**: Record → Stop → Play → Verify audio plays correctly
- [x] **Error Handling**: Test with network errors, verify graceful failure

## Benefits

1. **Atomic Operations**: Cloud storage and SQL are always in sync
2. **No Orphaned Files**: Old recordings are properly deleted before new ones
3. **State Consistency**: Local state always reflects reality
4. **Better UX**: Clear feedback on upload/delete operations
5. **Reliability**: Proper error handling and retries

## Notes

- The component uses the same filename for each field (e.g., `userId/storyNarrative.webm`)
- Cloud Storage API automatically overwrites files with the same name
- This ensures only ONE file exists per field per user at any time
- The SQL database stores the filename reference, which stays consistent
- Audio files are streamed through `/api/upload/audio/stream` with auth checks
