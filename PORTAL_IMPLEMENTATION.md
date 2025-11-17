# Patient Portal Implementation Guide

## Overview
This document outlines the transformation of the intake assessment repository into a comprehensive patient portal. The portal serves as a one-stop platform for patients throughout their mental health journey.

## Architecture

### Conditional Routing Flow
```
User Login
   ↓
Check intakeFinished
   ↓
   ├─→ false → /intake (Complete Assessment)
   │                  ↓
   │            Set intakeFinished=true
   │                  ↓
   └─→ true → /dashboard (Patient Portal)
```

## Schema Changes

### New Prisma Models

#### 1. JournalEntry
Stores patient journal entries with mood tracking and sentiment analysis.
- **Fields**: content, mood (1-5), sentimentResult (JSON from Cardiff NLP RoBERTa)
- **Relations**: User, Clinic
- **Indexes**: userId+createdAt, clinicId+createdAt

#### 2. AssessmentResponse  
Tracks repeat assessments for monitoring progress over time.
- **Fields**: assessmentType (string), responses (JSON), totalScore, severity
- **Relations**: User, Clinic
- **Indexes**: userId+completedAt, userId+assessmentType+completedAt

#### 3. PsychoedModule
Master list of psychoeducational modules.
- **Fields**: title, description, category, content (JSON), totalSteps, duration, ageGroup
- **Indexes**: category, isActive

#### 4. ModuleProgress
Tracks user progress through modules (similar to intake's maxVisited pattern).
- **Fields**: currentStep, isCompleted, completedAt
- **Relations**: User, Clinic, PsychoedModule
- **Unique**: userId + moduleId

### Database Migration
⚠️ **IMPORTANT**: The schema has been updated but migration has NOT been applied due to shared database across multiple repos.

**Next Steps**:
1. Coordinate with other repos using this database
2. Run migration on all repos: `npx prisma migrate dev --name add_patient_portal_models`
3. OR manually create migration and apply across all environments

## File Structure

```
src/app/
├── page.tsx                          # ✅ NEW: Root router with conditional logic
├── dashboard/
│   └── page.tsx                      # ✅ NEW: Main portal dashboard
├── journal/
│   ├── page.tsx                      # ✅ NEW: Journal list
│   ├── new/page.tsx                  # ✅ NEW: Create journal entry
│   └── [id]/                         # TODO: View/edit specific entry
├── assessments/
│   ├── page.tsx                      # ✅ NEW: Assessment history
│   └── [type]/                       # TODO: Take specific assessment
├── modules/
│   ├── page.tsx                      # ✅ NEW: Module list
│   └── [id]/                         # TODO: Module viewer/content
├── components/
│   ├── portal/                       # ✅ NEW: Portal-specific components
│   │   └── Layout/
│   │       └── PortalLayout.tsx     # ✅ NEW: Sidebar navigation
│   └── (existing components)
└── api/
    └── portal/                       # ✅ NEW: Portal API routes
        ├── dashboard/route.ts        # ✅ NEW: Dashboard data aggregation
        ├── journal/route.ts          # ✅ NEW: Journal CRUD
        ├── assessments/route.ts      # ✅ NEW: Assessment history & submission
        └── modules/route.ts          # ✅ NEW: Module listing
```

## Implemented Features

### ✅ Completed

1. **Root Router** (`/page.tsx`)
   - Checks authentication status
   - Routes based on `intakeFinished` boolean
   - Shows loading state during routing

2. **Portal Layout** (`components/portal/Layout/PortalLayout.tsx`)
   - Sidebar navigation matching mockup design
   - Active state highlighting
   - User profile display
   - Navigation items: Dashboard, Assessments, Journal, Settings

3. **Dashboard** (`/dashboard`)
   - Garden illustration (reuses existing GardenFrame component)
   - Stats cards: Assessments Completed, Current Mood, Symptom Severity
   - Recent assessments with trend indicators
   - Psychoeducation module card
   - API endpoint for data aggregation

4. **Journal** (`/journal`)
   - List view of all journal entries
   - Mood indicators (1-5 scale with icons)
   - Sentiment analysis display (positive/neutral/negative breakdown)
   - Create new entry page with mood selector
   - API endpoints for listing and creating entries

5. **Assessments** (`/assessments`)
   - List of available assessments to take
   - Complete assessment history
   - Severity badges and scores
   - Date tracking
   - API endpoints for history and submission

6. **Psychoeducation Modules** (`/modules`)
   - Module cards with categories
   - Progress tracking (similar to intake maxVisited pattern)
   - Duration and step count display
   - Completion status
   - API endpoint for module listing with progress

## TODO: Implementation Tasks

### High Priority

1. **Assessment Taking Interface** (`/assessments/[type]/page.tsx`)
   - Reuse existing scale components from intake (Phq9Form, Gad7Form, etc.)
   - Submit to `/api/portal/assessments` POST endpoint
   - Calculate scores client-side before submission
   - Show results after completion

2. **Journal Entry Detail View** (`/journal/[id]/page.tsx`)
   - View individual entry with full sentiment analysis
   - Edit capability
   - Delete functionality
   - API routes for GET/PUT/DELETE by ID

3. **Module Viewer** (`/modules/[id]/page.tsx`)
   - Render module content from JSON structure
   - Step-by-step navigation
   - Progress tracking (update currentStep)
   - Mark as complete
   - API endpoint: `/api/portal/modules/[id]/progress` (PUT)

4. **Sentiment Analysis Integration**
   - Background job to process journal entries
   - Call existing Python sentiment analyzer
   - Update JournalEntry.sentimentResult after processing
   - Consider using queue system (Bull, BullMQ) or cron jobs

5. **Settings Page** (`/settings/page.tsx`)
   - User profile editing
   - Notification preferences
   - Privacy settings
   - Account management

### Medium Priority

6. **Assessment Trend Visualization**
   - Line charts showing score progression over time
   - Use Chart.js or Recharts
   - Show on dashboard and assessment detail pages

7. **Module Content Seeding**
   - Create seed script for initial psychoeducation modules
   - Define JSON structure for module content
   - Add 3-5 starter modules (e.g., Behavioral Activation, Sleep Hygiene, Mindfulness)

8. **Enhanced Dashboard**
   - Add "Care Path Suggestions" feature from mockup
   - Implement trends section with actual calculations
   - Add upcoming assessments/reminders

9. **Clinician Assignment System**
   - Allow clinicians to assign assessments to patients
   - Track `requestedBy` field in AssessmentResponse
   - Show assigned vs. self-initiated assessments differently

### Low Priority

10. **Mobile Responsiveness**
    - Sidebar collapses to hamburger menu
    - Touch-friendly controls
    - Mobile-optimized layouts

11. **Loading States & Error Handling**
    - Skeleton loaders for better UX
    - Error boundaries
    - Retry mechanisms for failed API calls

12. **Animations & Transitions**
    - Page transitions (reuse framer-motion from intake)
    - Smooth state changes
    - Celebration animations for milestones

## Reusable Components from Intake

The following components can be directly reused:
- `GardenFrame` - Used in dashboard
- `Phq9Form`, `Gad7Form`, etc. - Use for repeat assessments
- `VoiceRecorder` - Extend to journal entries
- `theme.ts` - Extended for portal styling
- `primitives/` - Form controls, buttons, etc.

## API Endpoints Reference

### Dashboard
- `GET /api/portal/dashboard` - Aggregate dashboard data

### Journal
- `GET /api/portal/journal` - List all entries
- `POST /api/portal/journal` - Create new entry
- `GET /api/portal/journal/[id]` - Get specific entry (TODO)
- `PUT /api/portal/journal/[id]` - Update entry (TODO)
- `DELETE /api/portal/journal/[id]` - Delete entry (TODO)

### Assessments
- `GET /api/portal/assessments` - List history
- `POST /api/portal/assessments` - Submit new response

### Modules
- `GET /api/portal/modules` - List modules with progress
- `GET /api/portal/modules/[id]` - Get module content (TODO)
- `PUT /api/portal/modules/[id]/progress` - Update progress (TODO)

## Testing Strategy

1. **Manual Testing Flow**
   - Complete intake as new user → verify redirect to dashboard
   - Login as existing user with completed intake → verify direct dashboard access
   - Test each portal section independently
   - Verify data persistence across sessions

2. **Multi-Tenant Testing**
   - Create users in different clinics
   - Verify data isolation
   - Check that clinicId is properly set on all new records

3. **Edge Cases**
   - User with no assessment history
   - User with no journal entries
   - Module progress tracking across multiple sessions

## Git Branch

All changes are on branch: `feature/patient-portal`

**To merge:**
1. Complete TODO items
2. Test thoroughly
3. Coordinate database migration across all repos
4. Create PR to main branch

## Environment Variables

Ensure these are set:
- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_SECRET` - Authentication secret
- `NEXTAUTH_URL` - Application URL

## Notes

- **Intake flow remains unchanged** - Existing users won't be affected
- **Clean separation** - Portal and intake are logically separated
- **Scalable architecture** - Easy to add new portal features
- **Multi-tenant safe** - All new models include clinicId
- **Future-ready** - Schema prepared for AI insights (can add Insight model later)

## Next Immediate Steps

1. ✅ Schema updated
2. ⚠️  Run database migration (coordinate across repos)
3. 🔲 Implement assessment taking interface
4. 🔲 Add journal detail view
5. 🔲 Build module viewer
6. 🔲 Integrate sentiment analysis job
7. 🔲 Test end-to-end user flows

---

*Last Updated: Nov 14, 2024*
*Branch: `feature/patient-portal`*

