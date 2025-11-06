# Audio Management - Final Solution

## Problem History

### Issue 1: Race Condition (Initial Problem)

- Frontend saved `{url, fileName, uploadedAt}` immediately after upload
- Transcription service saved complete object `{url, fileName, uploadedAt, transcription, chunks, transcribedAt}`
- **Frontend's save overwrote the transcription** ❌

### Issue 2: SQL/GCS Mismatch (Discovered After Fix #1)

- User deletes audio → GCS file deleted ✅
- Frontend only updated local state
- **Database was never cleared** ❌
- Clinician reports showed stale/broken audio links ❌

### Issue 3: Missing Metadata (Caused by Fix #1)

- When we stopped saving on upload to fix race condition
- Initial metadata `{url, fileName, uploadedAt}` was never persisted to database
- **Clinician reports had no audio data at all** ❌

## Final Solution (Current Implementation)

### Architecture

```
Upload Flow:
1. User records audio
2. Frontend uploads to GCS
3. Frontend saves initial metadata {url, fileName, uploadedAt} to DB ✅
4. Frontend triggers transcription service
5. Transcription service uses fetch-modify-save to ADD transcription fields ✅
6. Final DB state: {url, fileName, uploadedAt, transcription, chunks, transcribedAt} ✅

Delete Flow:
1. User deletes audio
2. Frontend deletes from GCS ✅
3. Frontend clears audio reference from DB ✅
4. Final DB state: audio field is undefined/null ✅
```

### Key Implementation Details

**Always save to database:**

```typescript
onAttach={async (data) => {
  const updatedProfile = {
    ...profile,
    fieldName: {
      text: profile.fieldName?.text || "",
      ...(data && { audio: { url: data.url, fileName: data.fileName, uploadedAt: data.uploadedAt } }),
    },
  };

  // ✅ Save to DB in BOTH cases
  await saveProfileToSQL(updatedProfile);
  setProfile(updatedProfile);
}}
```

**Why This Works:**

1. **Upload**: Frontend saves metadata immediately → Clinician reports can access audio
2. **Transcription**: Service uses fetch-modify-save → Adds transcription without overwriting
3. **Delete**: Frontend clears DB reference → No stale data in clinician reports

### Transcription Service Fetch-Modify-Save Pattern

The Cloud Run service ensures no data loss:

```python
# 1. Fetch full profile from database
profile = get_profile_from_db(user_id)

# 2. Update only the specific audio field
profile['storyNarrative']['audio'] = {
    **profile['storyNarrative'].get('audio', {}),  # Preserve existing metadata
    'transcription': transcription_text,
    'chunks': chunks,
    'transcribedAt': datetime.now()
}

# 3. Save complete profile back
save_profile_to_db(profile)
```

This ensures:

- ✅ Initial metadata `{url, fileName, uploadedAt}` preserved
- ✅ Text edits preserved
- ✅ Transcription data added
- ✅ Other audio fields preserved

## Files Modified

### 1. StorySection.tsx

Updated 4 VoiceRecorder `onAttach` callbacks:

- `storyNarrative`
- `goals`
- `livingSituation`
- `cultureContext`

**Pattern:**

```typescript
onAttach={async (data) => {
  const updatedProfile = { ...profile, /* updates */ };

  // ✅ Always save to DB (both upload and delete)
  await saveProfileToSQL(updatedProfile);
  setProfile(updatedProfile);
}}
```

### 2. FollowUpSection.tsx

Updated 3 VoiceRecorder `onAttach` callbacks:

- `followupQuestions.question1.answer`
- `followupQuestions.question2.answer`
- `followupQuestions.question3.answer`

**Pattern:** Same as StorySection

### 3. VoiceRecorder.tsx

No changes needed - component already:

- Uploads to GCS ✅
- Calls `onAttach(data)` with metadata ✅
- Calls `onAttach(null)` on delete ✅

### 4. /api/upload/audio/route.ts

Already triggers transcription service ✅

## Testing Checklist

- [x] Upload audio → Initial metadata saved to DB
- [x] Wait for transcription → Transcription fields added without overwriting metadata
- [x] Delete audio → Database reference cleared
- [x] Clinician reports show correct audio state (with or without audio)
- [x] No SQL/GCS mismatches
- [x] No race conditions

## Summary

The final solution **saves to database on both upload and delete**, ensuring:

1. **Immediate metadata availability** for clinician reports
2. **No race conditions** because transcription service uses fetch-modify-save
3. **No stale data** because deletes are properly persisted
4. **Complete data integrity** across all workflows

This is a **two-way sync** approach:

- Frontend: Manages metadata and deletions
- Transcription Service: Adds transcription data via merge pattern
