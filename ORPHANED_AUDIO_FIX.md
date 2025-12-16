# Orphaned Audio Reference Fix

## Problem

When a user deletes an audio recording but the tab hasn't been active for a while, the deletion only removes the file from Google Cloud Storage (GCS) but fails to update the Cloud SQL database. This leaves orphaned references in the database that point to non-existent files.

**Specific Case:**

- User: `cmgi991fx0000s60d6dk383l5`
- Field: `cultureContext`
- Issue: Audio field exists in database but file is missing from GCS bucket
- Result: Cannot delete from GUI because the file doesn't exist to delete

## Solution

Implemented automatic orphaned reference detection and cleanup at two levels:

### 1. Backend: Stream Endpoint Auto-Cleanup

**File:** `src/app/api/upload/audio/stream/route.ts`

When the stream endpoint detects a missing file in GCS:

1. **Extracts the field name** from the fileName (e.g., `userId/cultureContext-1234567890.webm` → `cultureContext`)
2. **Cleans up the database** by removing the audio reference from the Profile JSON
3. **Returns a special 404 response** with `cleaned: true` flag to notify the frontend

**Key Functions Added:**

- `extractFieldNameFromFileName()`: Parses GCS fileName to extract the field name
  - Handles both simple fields (`cultureContext`) and nested fields (`followupQuestions.question1.answer`)
- `cleanupOrphanedReference()`: Removes the audio reference from the database
  - Fetches the profile
  - Navigates to the field using dot notation
  - Deletes the `audio` property
  - Updates the database

### 2. Frontend: VoiceRecorder Auto-Detection

**File:** `src/app/components/VoiceRecorder.tsx`

Enhanced the audio error handler to detect orphaned references:

1. **Detects audio load failures** when the `<audio>` element fails to load
2. **Checks if it's a 404 with cleanup flag** by fetching the audio URL
3. **Resets local state** if orphaned reference was detected and cleaned
4. **Calls `onAttach(null)`** to refresh the parent component's state from the database

**Changes Made:**

- Made `handleError` async to support fetch calls
- Added orphaned reference detection logic
- Added automatic state reset when cleanup is detected
- Updated useEffect dependencies to include necessary values

## How It Works

### Scenario 1: User Loads Page with Orphaned Reference

1. VoiceRecorder component loads with `audioState` pointing to missing file
2. Audio element tries to load → fails with error
3. Error handler fetches the URL to check response
4. Stream endpoint returns 404 with `cleaned: true`
5. VoiceRecorder resets state and calls `onAttach(null)`
6. UI updates to show "No recording yet"

### Scenario 2: User Tries to Play Orphaned Recording

1. User clicks Play button
2. Audio element tries to load → fails
3. Same cleanup process as Scenario 1
4. Recording disappears from UI

### Scenario 3: Background Cleanup

1. Any request to stream a missing file triggers cleanup
2. Database is automatically updated
3. Next page load shows clean state

## Files Modified

1. **`src/app/api/upload/audio/stream/route.ts`**
   - Added Prisma import for database access
   - Added `extractFieldNameFromFileName()` function
   - Added `cleanupOrphanedReference()` function
   - Enhanced file-not-found handling with automatic cleanup

2. **`src/app/components/VoiceRecorder.tsx`**
   - Enhanced audio error handler to detect orphaned references
   - Added automatic state reset on orphaned reference detection
   - Updated useEffect dependencies

## Testing the Fix

### For the Specific User Issue

The orphaned reference for user `cmgi991fx0000s60d6dk383l5` in the `cultureContext` field will be automatically cleaned up when:

1. The user loads the page with that field
2. The user tries to play the recording
3. Any attempt to access the audio file is made

### General Testing

1. Create an audio recording
2. Manually delete the file from GCS (simulating the glitch)
3. Reload the page or try to play the recording
4. Verify that the UI automatically clears and shows "No recording yet"
5. Check database to confirm the audio reference was removed

## Benefits

1. **Self-Healing**: System automatically fixes orphaned references
2. **No Manual Intervention**: No need to manually clean up the database
3. **User-Friendly**: Users don't see broken recordings in the UI
4. **Prevents Data Inconsistency**: Keeps database in sync with storage
5. **Comprehensive**: Works for all audio fields (story, goals, culture context, follow-up questions)

## Field Name Mapping

The system handles both frontend and backend field name formats:

| Frontend Field                       | Backend Field       | GCS FileName Pattern                      |
| ------------------------------------ | ------------------- | ----------------------------------------- |
| `cultureContext`                     | `cultureContext`    | `userId/cultureContext-timestamp.webm`    |
| `storyNarrative`                     | `storyNarrative`    | `userId/storyNarrative-timestamp.webm`    |
| `goals`                              | `goals`             | `userId/goals-timestamp.webm`             |
| `followupQuestions.question1.answer` | `followupQuestion1` | `userId/followupQuestion1-timestamp.webm` |
| `followupQuestions.question2.answer` | `followupQuestion2` | `userId/followupQuestion2-timestamp.webm` |
| `followupQuestions.question3.answer` | `followupQuestion3` | `userId/followupQuestion3-timestamp.webm` |

## Future Considerations

1. **Batch Cleanup**: Could add an admin endpoint to scan and clean all orphaned references
2. **Monitoring**: Add metrics to track how often orphaned references occur
3. **Prevention**: Investigate why the original delete sometimes fails and fix the root cause
4. **Audit Log**: Log all automatic cleanups for debugging purposes
