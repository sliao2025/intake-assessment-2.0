# 🎯 Audio Transcription Race Condition Fix

## Problem Diagnosis

The transcription data was being overwritten due to **race conditions** between concurrent database updates:

### The Race Condition Flow:

```
Time 1: User records Field A → Frontend saves {url, fileName, uploadedAt} to DB
Time 2: Backend starts transcribing Field A → Fetches profile from DB
Time 3: User records Field B → Frontend saves entire profile to DB (overwrites!)
Time 4: Backend completes transcription A → Saves entire profile back to DB (overwrites Field B!)
Time 5: Backend starts transcribing Field B → This works
Result: Field A transcription is lost, Field B works
```

### Root Causes:

1. **Fetch-Modify-Save Pattern**: Both frontend and backend were fetching the entire profile, modifying it, then saving it back
2. **No Concurrency Control**: Multiple processes could read old data and overwrite each other's changes
3. **Full Profile Updates**: Updating one field required rewriting the entire JSON, making race windows larger

## Solution: Field-Level Updates with Optimistic Locking

### Architecture Changes:

#### 1. New Field-Level Update API (`/api/profile/update-field`)

- **PATCH endpoint** that updates ONLY one field at a time
- Uses **optimistic concurrency control** with retry logic
- Prevents race conditions through transaction isolation
- Implements exponential backoff for retries

```typescript
// Optimistic lock check - ensures version hasn't changed
where: {
  userId,
  updatedAt: profile.updatedAt, // Ensures record hasn't been modified
}
```

#### 2. Frontend Changes

**Before:**

```typescript
// ❌ BAD: Full profile update
const updatedProfile = { ...profile, field: newValue };
await saveProfileToSQL(updatedProfile); // Overwrites everything!
```

**After:**

```typescript
// ✅ GOOD: Field-level update
await fetch("/api/profile/update-field", {
  method: "PATCH",
  body: JSON.stringify({
    fieldName: "storyNarrative",
    fieldValue: { text: "...", audio: {...} }
  })
});
```

**Benefits:**

- Only touches the specific field being updated
- Preserves transcription data added by backend
- Immediate UI updates (optimistic local state)
- Graceful handling of concurrent updates

#### 3. Backend Transcription Service (Needs Update)

The backend service should also use the same field-level update API instead of fetch-modify-save.

**Current Backend Code (NEEDS FIX):**

```typescript
// ❌ PROBLEM: fetch-modify-save without retry
const profile = await prisma.profile.findUnique({ where: { userId } });
profileData[fieldType].audio = {
  /* transcription data */
};
await prisma.profile.update({ where: { userId }, data: { json: profileData } });
```

**Recommended Backend Fix:**

```typescript
// ✅ SOLUTION: Use field-level update with retry
async function updateProfileWithTranscriptRetry(
  userId,
  fieldType,
  transcript,
  fileName,
  uploadedAt
) {
  const MAX_RETRIES = 5;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const result = await prisma.$transaction(async (tx) => {
        const profile = await tx.profile.findUnique({ where: { userId } });
        const profileData = profile.json;

        // Build complete audio object
        const audioData = {
          url: `/api/upload/audio/stream?fileName=${encodeURIComponent(fileName)}`,
          fileName,
          uploadedAt,
          transcription: transcript.transcription?.text,
          chunks: transcript.transcription?.chunks,
          transcribedAt: new Date().toISOString(),
        };

        // Handle nested fields (followupQuestions)
        if (fieldType.startsWith("followupQuestion")) {
          const questionNum = fieldType.replace("followupQuestion", "");
          const questionKey = `question${questionNum}`;

          if (!profileData.followupQuestions[questionKey].answer) {
            profileData.followupQuestions[questionKey].answer = {};
          }

          // MERGE with existing data (preserves text field if present)
          profileData.followupQuestions[questionKey].answer.audio = {
            ...profileData.followupQuestions[questionKey].answer.audio,
            ...audioData,
          };
        } else {
          // Standard fields
          if (!profileData[fieldType]) {
            profileData[fieldType] = {};
          }

          profileData[fieldType].audio = {
            ...profileData[fieldType].audio,
            ...audioData,
          };
        }

        // Optimistic lock update
        return await tx.profile.update({
          where: {
            userId,
            updatedAt: profile.updatedAt, // Ensures no concurrent modifications
          },
          data: {
            json: profileData,
            updatedAt: new Date(),
          },
        });
      });

      console.log(
        `[Transcribe] Successfully updated ${fieldType} for ${userId}`
      );
      return; // Success!
    } catch (error) {
      if (
        error.code === "P2025" ||
        error.message?.includes("Record to update not found")
      ) {
        // Concurrency conflict - retry
        console.log(
          `[Transcribe] Retry ${attempt + 1}/${MAX_RETRIES} due to concurrent update`
        );
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 100)
        );
        continue;
      }
      throw error; // Other errors should fail immediately
    }
  }

  throw new Error(`Failed to update profile after ${MAX_RETRIES} retries`);
}
```

## Data Flow After Fix

### Happy Path (Normal Operation):

```
1. User clicks record → VoiceRecorder captures audio
2. Audio saved to GCS → Returns {url, fileName, uploadedAt}
3. Frontend calls onAttach() → Updates local state immediately
4. Frontend calls /api/profile/update-field → Saves metadata to DB
5. Backend transcription service triggered (fire-and-forget)
6. Backend downloads audio from GCS
7. Backend transcribes audio
8. Backend calls update with retry logic → Merges transcription data
9. User sees transcription appear automatically (via polling or refresh)
```

### Concurrent Updates (User records multiple fields):

```
Time 1: User records Field A
  ├─ Frontend saves Field A metadata → DB v1
  └─ Backend starts transcription A

Time 2: User records Field B (BEFORE transcription A completes)
  ├─ Frontend saves Field B metadata → DB v2
  └─ Backend starts transcription B

Time 3: Transcription A completes
  ├─ Backend tries to update → Detects version conflict (v2 vs expected v1)
  ├─ Retries → Fetches v2 → Updates ONLY Field A.audio
  └─ Success → DB v3 (has Field A transcription + Field B metadata)

Time 4: Transcription B completes
  ├─ Backend tries to update → Detects version conflict (v3 vs expected v2)
  ├─ Retries → Fetches v3 → Updates ONLY Field B.audio
  └─ Success → DB v4 (has BOTH transcriptions!)
```

## Type Updates

Added missing fields to `AudioAttachment` type:

```typescript
export type AudioAttachment = {
  url: string;
  fileName?: string;
  uploadedAt?: string;
  transcription?: string;        // Full text
  chunks?: Array<...>;           // ✅ NEW: Timestamped chunks
  transcribedAt?: string;        // ✅ NEW: When transcription completed
  // ... other fields
};
```

## Files Changed

### Frontend:

1. ✅ `/src/app/api/profile/update-field/route.ts` - New field-level update API
2. ✅ `/src/app/components/Sections/StorySection.tsx` - Updated all 4 fields
3. ✅ `/src/app/components/Sections/FollowUpSection.tsx` - Updated all 3 questions
4. ✅ `/src/app/lib/types/types.ts` - Added `chunks` and `transcribedAt` to `AudioAttachment`

### Backend (NEEDS UPDATE):

1. ⚠️ Backend transcription service - Update `updateProfileWithTranscript()` to use retry logic

## Testing Checklist

- [ ] Record audio for Field A, wait for transcription
- [ ] Record audio for Field B immediately after A (don't wait)
- [ ] Verify both Field A and Field B show transcriptions
- [ ] Delete audio for Field A
- [ ] Verify Field B transcription still exists
- [ ] Record new audio for Field A
- [ ] Verify both transcriptions exist and are correct
- [ ] Check browser console for any error messages
- [ ] Check backend logs for retry messages (should see "Retry X/5" if conflicts occur)

## Performance Considerations

- **Optimistic UI**: Users see their audio immediately (local state)
- **Fast Saves**: Field-level updates are faster than full profile updates
- **Retry Overhead**: Minimal - only occurs during true concurrent writes
- **Exponential Backoff**: 100ms, 200ms, 400ms, 800ms, 1600ms (max ~3 seconds total)
- **Transaction Isolation**: Prisma transactions prevent partial writes

## Future Improvements

1. **WebSocket Updates**: Push transcription updates to frontend in real-time
2. **Optimistic Transcription**: Show "Transcribing..." status in UI
3. **Conflict Metrics**: Log how often retries occur for monitoring
4. **Field Versioning**: Add per-field version numbers for even finer control
