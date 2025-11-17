<!-- 23287d06-85c1-4b1b-aa9d-ce5492b24601 35d636dc-b304-4f2b-be4e-6530534bef17 -->
# Patient Portal Integration Plan

## Current Repo Structure Analysis

- **Entry Point**: Root redirects to `/intake`
- **Intake Flow**: Single page at `/intake` with multi-step form
- **Components**: Organized under `/components` with sections
- **Theme**: Garden/nature aesthetic already established
- **Auth**: NextAuth with `intakeFinished` boolean in User model

## Proposed Organizational Structure

### 1. Route Architecture

```
src/app/
├── page.tsx                    # NEW: Root router logic
├── (auth)/
│   └── auth/signin/           # Existing auth
├── intake/
│   └── page.tsx               # Existing intake (keep as-is)
├── dashboard/
│   └── page.tsx               # NEW: Main dashboard
├── journal/
│   ├── page.tsx               # NEW: Journal list
│   └── [id]/page.tsx          # NEW: Journal entry detail
├── assessments/
│   ├── page.tsx               # NEW: Assessment history
│   └── [type]/page.tsx        # NEW: Take assessment
├── modules/
│   ├── page.tsx               # NEW: Module list
│   └── [id]/page.tsx          # NEW: Module content
└── api/
    ├── (existing routes)
    └── portal/                # NEW: Portal APIs
        ├── dashboard/
        ├── journal/
        ├── assessments/
        └── modules/
```

### 2. Root Page Router Logic

**Create `/src/app/page.tsx`:**

```typescript
'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RootPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Check if intake is finished
    if (!session.user.intakeFinished) {
      router.push('/intake')
    } else {
      router.push('/dashboard')
    }
  }, [session, status, router])

  return <LoadingSpinner />
}
```

### 3. Component Organization

```
src/app/components/
├── intake/              # Move existing components here
│   ├── Sections/
│   ├── Scales/
│   ├── Garden/
│   └── primitives/
├── portal/              # NEW: Portal components
│   ├── Dashboard/
│   │   ├── StatsCard.tsx
│   │   ├── TrendChart.tsx
│   │   ├── RecentAssessments.tsx
│   │   ├── MoodDisplay.tsx
│   │   └── PsychoedCard.tsx
│   ├── Journal/
│   │   ├── JournalEntryForm.tsx
│   │   ├── JournalList.tsx
│   │   └── MoodSelector.tsx
│   ├── Assessments/
│   │   ├── AssessmentCard.tsx
│   │   ├── AssessmentForm.tsx (reuse intake scales!)
│   │   └── TrendGraph.tsx
│   ├── Modules/
│   │   ├── ModuleCard.tsx
│   │   ├── ModuleViewer.tsx
│   │   └── ProgressBar.tsx
│   └── Layout/
│       ├── PortalLayout.tsx
│       ├── Sidebar.tsx
│       └── Header.tsx
└── shared/              # NEW: Shared between intake & portal
    ├── Garden/          # Reuse garden components!
    ├── primitives/
    └── theme.ts
```

### 4. Dashboard Implementation (From Mockup)

**Key Features from Design:**

- **Left Sidebar**: Navigation (Dashboard, Assessments, Journal, Settings)
- **Main Content**:
  - Garden illustration (reuse existing `GardenFrame`!)
  - Welcome message with mood indicator
  - Stats cards: Assessments Completed, Current Mood, Symptom Severity
  - Trends section with mini trend indicators
  - Recent Assessments with progress bars and change arrows
  - Psychoeducation module card
- **Bottom**: User profile

### 5. Reusable Components Strategy

**Keep DRY by reusing:**

- `GardenFrame` from intake → use in dashboard
- `Phq9Form`, `Gad7Form`, etc. → reuse for repeat assessments
- `theme.ts` → extend for portal styling
- `VoiceRecorder` → use in journal entries
- `primitives/` → use throughout portal

### 6. API Route Structure

```
src/app/api/portal/
├── dashboard/
│   └── route.ts          # GET: aggregate stats, recent activity
├── journal/
│   ├── route.ts          # GET: list, POST: create
│   └── [id]/route.ts     # GET: detail, PUT: update, DELETE: delete
├── assessments/
│   ├── route.ts          # GET: history, POST: submit
│   └── available/route.ts # GET: assigned assessments
└── modules/
    ├── route.ts          # GET: list modules
    └── [id]/
        ├── route.ts      # GET: module content
        └── progress/route.ts # PUT: update progress
```

### 7. Data Flow Architecture

**Initial Load:**

```
Login → Check intakeFinished
├─ false → /intake → Complete → Set intakeFinished=true → /dashboard
└─ true → /dashboard → Load dashboard data
```

**Dashboard Data Aggregation:**

```typescript
GET /api/portal/dashboard → {
  assessments: {
    completed: 12,
    total: 14,
    recent: [...] // Last 3 assessments with scores
  },
  mood: {
    current: "Stable",
    lastUpdated: "Today"
  },
  severity: {
    percentage: 18,
    level: "Severe",
    trend: "down"
  },
  trends: {
    phq9: { current: 12, change: -3, direction: "down" },
    gad7: { current: 8, change: -2, direction: "down" },
    sleep: { current: 6.5, change: +1.5, direction: "up" }
  },
  currentModule: { ... } // Featured psychoed module
}
```

### 8. Migration Strategy

**Phase 1: Schema & Infrastructure**

1. Add Prisma models (JournalEntry, AssessmentResponse, ModuleProgress)
2. Run migration
3. Create portal directory structure
4. Implement root router logic

**Phase 2: Layout & Navigation**

1. Build PortalLayout with sidebar
2. Create navigation components
3. Set up routing

**Phase 3: Dashboard Page**

1. Implement dashboard data aggregation API
2. Build stats cards
3. Add recent assessments section
4. Integrate trends display
5. Add psychoed module card

**Phase 4: Feature Pages**

1. Journal: List + create/edit forms
2. Assessments: History + retake interface (reuse scales!)
3. Modules: List + content viewer with progress tracking

**Phase 5: Polish**

1. Loading states
2. Error handling
3. Responsive design
4. Animations (reuse existing framer-motion)

### 9. Styling Approach

**Extend existing theme:**

```typescript
// Match dashboard mockup colors
export const portalTheme = {
  ...intPsychTheme,
  sidebar: {
    bg: "#F5F9F7",      // Light green from mockup
    active: "#E8F4EF",  // Slightly darker for active state
    text: "#374151"
  },
  cards: {
    bg: "#FFFFFF",
    border: "#E5E7EB",
    shadow: "0 1px 3px rgba(0,0,0,0.1)"
  },
  severity: {
    minimal: "#10B981",
    mild: "#F59E0B",
    moderate: "#F97316",
    severe: "#EF4444"
  }
}
```

### 10. Key Benefits of This Structure

✅ **Minimal disruption**: Intake flow stays exactly as-is

✅ **Clean separation**: Clear boundaries between intake and portal

✅ **Reusability**: Garden, scales, primitives used in both contexts

✅ **Scalability**: Easy to add new portal features

✅ **Maintainability**: Organized by feature, not by type

✅ **Performance**: Conditional routing prevents loading unused code

## Next Steps

1. **Schema first**: Add new models to Prisma
2. **Root router**: Implement conditional logic
3. **Portal structure**: Create directories and base components
4. **Dashboard API**: Build data aggregation endpoint
5. **Dashboard UI**: Implement from mockup
6. **Feature pages**: Build journal, assessments, modules

This approach transforms your repo into a full portal while preserving the existing intake flow completely.

### To-dos

- [ ] Add JournalEntry, AssessmentResponse, PsychoedModule, ModuleProgress models to schema.prisma
- [ ] Create and run Prisma migration for new tables
- [ ] Create src/app/page.tsx with conditional routing logic based on intakeFinished
- [ ] Create directory structure: dashboard/, journal/, assessments/, modules/ pages and components
- [ ] Build PortalLayout component with sidebar navigation from mockup
- [ ] Implement /api/portal/dashboard route for data aggregation
- [ ] Build dashboard page matching mockup design