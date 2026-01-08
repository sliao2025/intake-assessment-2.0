# Intake Assessment v2

<p align="center">
  <strong>Patient-Facing Mental Health Intake Portal</strong>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#project-structure">Project Structure</a>
</p>

---

## Overview

**Intake Assessment v2** is a modern, mobile-first web application that enables patients to complete comprehensive mental health intake assessments before their first clinical appointment. The platform supports both **adult** and **child** assessment pathways, featuring voice recording capabilities, standardized psychological scales, and AI-generated follow-up questions.

This application is part of the Integrative Psych Assessment Platform and works in conjunction with:

- **`intake-analysis`** - Backend AI services for transcription, sentiment analysis, and clinical insights
- **`clinician-report`** - Clinician-facing dashboard for reviewing patient assessments

### Key Features

- 🎤 **Voice Recording** - Patients can speak their responses with real-time audio upload
- 📝 **Comprehensive Forms** - Multi-step intake covering demographics, medical history, and presenting concerns
- 📊 **Standardized Scales** - PHQ-9, GAD-7, ACE, PTSD, and more for adults; SCARED, SNAP, C-SSRS for children
- 🤖 **AI Follow-up Questions** - Dynamic questions generated based on patient responses
- 📱 **Mobile-First Design** - Responsive UI optimized for smartphone completion
- 🔒 **HIPAA Compliant** - Secure data handling with encrypted storage
- 🌐 **Multi-Clinic Support** - White-label ready with clinic-specific branding

---

## Features

### Assessment Workflow

```
Welcome → HIPAA → Contact → Profile → Medical → Relationship → Story →
Assessments → Follow-Up Questions → Review → Report
```

### Adult Assessment Scales

| Scale         | Full Name                      | Purpose                              |
| ------------- | ------------------------------ | ------------------------------------ |
| **PHQ-9**     | Patient Health Questionnaire-9 | Depression severity                  |
| **GAD-7**     | Generalized Anxiety Disorder-7 | Anxiety severity                     |
| **ACE**       | Adverse Childhood Experiences  | Trauma history                       |
| **PSS-4**     | Perceived Stress Scale-4       | Current stress level                 |
| **ASRS-5**    | Adult ADHD Self-Report Scale   | ADHD screening                       |
| **PC-PTSD-5** | Primary Care PTSD Screen       | PTSD screening                       |
| **CRAFFT**    | Substance use screening        | Adolescent/young adult substance use |

### Child Assessment Scales

| Scale         | Full Name                                  | Purpose               |
| ------------- | ------------------------------------------ | --------------------- |
| **SCARED**    | Screen for Child Anxiety Related Disorders | Anxiety disorders     |
| **SNAP-IV**   | Swanson, Nolan, and Pelham Questionnaire   | ADHD symptoms         |
| **C-SSRS**    | Columbia Suicide Severity Rating Scale     | Suicide risk          |
| **DISC-Teen** | Diagnostic Interview Schedule              | Behavioral assessment |

### Voice Recording Fields

Patients can provide audio responses for:

- **Story Narrative** - Personal mental health journey
- **Goals** - Treatment goals and expectations
- **Living Situation** - Current living arrangements
- **Culture Context** - Cultural background and considerations
- **Follow-up Questions** - AI-generated personalized questions

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        INTAKE-ASSESSMENT-V2                              │
│                     (Next.js 15 + React 19)                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                         PAGES (App Router)                          │ │
│  ├────────────────────────────────────────────────────────────────────┤ │
│  │                                                                     │ │
│  │  /intake/[type]  ─────────────────── Main intake flow (adult/child)│ │
│  │  /dashboard      ─────────────────── Patient dashboard              │ │
│  │  /journal        ─────────────────── Mood journaling               │ │
│  │  /sessions       ─────────────────── Session management            │ │
│  │  /assessments    ─────────────────── Scheduled assessments         │ │
│  │  /psychoeducation ────────────────── Educational modules           │ │
│  │  /garden         ─────────────────── Wellness gamification         │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                           COMPONENTS                                │ │
│  ├────────────────────────────────────────────────────────────────────┤ │
│  │                                                                     │ │
│  │  Sections/                 Scales/                                 │ │
│  │  ├── WelcomeSection       ├── Adult/                              │ │
│  │  ├── HIPAASection         │   ├── PHQ-9, GAD-7, ACE...           │ │
│  │  ├── ContactSection       └── Child/                              │ │
│  │  ├── ProfileSection           ├── SCARED, SNAP, C-SSRS...        │ │
│  │  ├── MedicalSection                                                │ │
│  │  ├── RelationshipSection   VoiceRecorder.tsx                       │ │
│  │  ├── StorySection          ProgressHeader.tsx                      │ │
│  │  ├── AssessmentsSection    AssessmentReportPDF.tsx                │ │
│  │  ├── FollowUpSection                                               │ │
│  │  └── ReviewSection                                                 │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────────┐ │
│  │                          API ROUTES                                 │ │
│  ├────────────────────────────────────────────────────────────────────┤ │
│  │                                                                     │ │
│  │  /api/profile/*     ───────── CRUD operations for patient profile │ │
│  │  /api/upload/audio  ───────── Audio file upload to GCS            │ │
│  │  /api/transcribe    ───────── Trigger transcription service       │ │
│  │  /api/followup      ───────── Generate AI follow-up questions     │ │
│  │  /api/insights      ───────── Trigger clinical insights          │ │
│  │  /api/notify        ───────── Email notifications                 │ │
│  │  /api/pdf           ───────── PDF report generation               │ │
│  │  /api/portal        ───────── Patient portal operations           │ │
│  │                                                                     │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
              ┌───────────────────────────────────────┐
              │         EXTERNAL SERVICES             │
              ├───────────────────────────────────────┤
              │                                       │
              │  intake-analysis (Cloud Run)          │
              │  ├── /transcribe                      │
              │  ├── /sentiment                       │
              │  └── /summarize                       │
              │                                       │
              │  Google Cloud Storage                 │
              │  └── intake-assessment-audio-files    │
              │                                       │
              │  Cloud SQL (MySQL)                    │
              │  └── Patient profiles & assessments   │
              │                                       │
              └───────────────────────────────────────┘
```

---

## Project Structure

```
intake-assessment-v2/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── api/                      # API routes
│   │   │   ├── auth/                 # NextAuth.js authentication
│   │   │   ├── profile/              # Profile CRUD operations
│   │   │   │   ├── route.ts          # GET/POST profile
│   │   │   │   ├── create/           # Create new profile
│   │   │   │   └── update/           # Update existing profile
│   │   │   ├── upload/
│   │   │   │   └── audio/            # Audio file uploads
│   │   │   │       ├── route.ts      # Upload handler
│   │   │   │       └── stream/       # Audio streaming endpoint
│   │   │   ├── transcribe/           # Transcription triggers
│   │   │   ├── followup/             # AI follow-up questions
│   │   │   ├── insights/             # Clinical insights trigger
│   │   │   ├── notify/               # Email notifications
│   │   │   │   ├── assessment-complete/
│   │   │   │   └── suicide-alert/    # Critical alert system
│   │   │   ├── pdf/                  # PDF report generation
│   │   │   │   └── download/         # PDF download endpoint
│   │   │   └── portal/               # Patient portal features
│   │   │       ├── scales/           # Assigned scales
│   │   │       ├── assessments/      # Assessment history
│   │   │       └── journal/          # Mood journal
│   │   │
│   │   ├── intake/                   # Main intake flow
│   │   │   ├── page.tsx              # Type selection (adult/child)
│   │   │   └── [type]/
│   │   │       └── page.tsx          # Multi-step intake wizard
│   │   │
│   │   ├── dashboard/                # Patient dashboard
│   │   ├── assessments/              # Scheduled assessments
│   │   ├── journal/                  # Mood journaling
│   │   ├── sessions/                 # Therapy sessions
│   │   ├── psychoeducation/          # Learning modules
│   │   ├── garden/                   # Wellness gamification
│   │   │
│   │   ├── components/               # React components
│   │   │   ├── Sections/             # Intake form sections
│   │   │   │   ├── WelcomeSection.tsx
│   │   │   │   ├── HIPAASection.tsx
│   │   │   │   ├── ContactSection.tsx
│   │   │   │   ├── ProfileSection.tsx
│   │   │   │   ├── MedicalSection.tsx
│   │   │   │   ├── RelationshipSection.tsx
│   │   │   │   ├── StorySection.tsx
│   │   │   │   ├── AssessmentsSection.tsx
│   │   │   │   ├── FollowUpSection.tsx
│   │   │   │   ├── ReviewSection.tsx
│   │   │   │   ├── ReportSectionAdult.tsx
│   │   │   │   └── ReportSectionChild.tsx
│   │   │   │
│   │   │   ├── Scales/               # Psychological assessment scales
│   │   │   │   ├── Adult/
│   │   │   │   │   ├── Phq9Form.tsx
│   │   │   │   │   ├── Gad7Form.tsx
│   │   │   │   │   ├── ACEResilienceForm.tsx
│   │   │   │   │   ├── PSS4Form.tsx
│   │   │   │   │   ├── ASRS5Form.tsx
│   │   │   │   │   ├── PTSDForm.tsx
│   │   │   │   │   ├── CRAFFTForm.tsx
│   │   │   │   │   └── SelfHarmForm.tsx
│   │   │   │   └── Child/
│   │   │   │       ├── SCAREDForm.tsx
│   │   │   │       ├── SNAPForm.tsx
│   │   │   │       ├── C-SSRSForm.tsx
│   │   │   │       └── DiscTeenForm.tsx
│   │   │   │
│   │   │   ├── VoiceRecorder.tsx     # Audio recording component
│   │   │   ├── ProgressHeader.tsx    # Step progress indicator
│   │   │   ├── AssessmentReportPDFAdult.tsx  # PDF generation
│   │   │   ├── AssessmentReportPDFChild.tsx
│   │   │   ├── WeatherWidget.tsx     # Mood weather widget
│   │   │   ├── Garden/               # Wellness garden components
│   │   │   ├── Bamboo/               # Growth visualization
│   │   │   └── primitives/           # UI primitives (buttons, inputs)
│   │   │
│   │   ├── lib/                      # Utilities and hooks
│   │   │   ├── prisma.ts             # Prisma client
│   │   │   ├── storage.ts            # GCS storage utilities
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   └── types/                # TypeScript definitions
│   │   │
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── providers.tsx             # Context providers
│   │
│   ├── middleware.ts                 # Auth & routing middleware
│   ├── assets/                       # Static assets
│   └── lib/                          # Shared utilities
│
├── prisma/
│   ├── schema.prisma                 # Database schema
│   └── migrations/                   # Database migrations
│
├── public/                           # Static files
│   ├── IP_Logo.png                   # Integrative Psych logo
│   └── ...
│
├── scripts/
│   └── migrate.ts                    # Database migration scripts
│
├── Dockerfile                        # Cloud Run containerization
├── cloudbuild.yaml                   # Cloud Build CI/CD
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind CSS config
└── next.config.ts                    # Next.js configuration
```

---

## Technology Stack

| Category           | Technology                                 |
| ------------------ | ------------------------------------------ |
| **Framework**      | Next.js 15 (App Router, Turbopack)         |
| **Language**       | TypeScript 5                               |
| **UI Library**     | React 19                                   |
| **Styling**        | Tailwind CSS 4, Framer Motion              |
| **UI Components**  | Headless UI, Chakra UI, MUI                |
| **Database**       | Prisma ORM + MySQL (Cloud SQL)             |
| **Authentication** | NextAuth.js 4 (Google OAuth + Credentials) |
| **Cloud Storage**  | Google Cloud Storage                       |
| **PDF Generation** | @react-pdf/renderer                        |
| **Email**          | Resend                                     |
| **Charts**         | Recharts, MUI X-Charts                     |
| **Icons**          | Lucide React, React Icons                  |

---

## Getting Started

### Prerequisites

- **Node.js** >= 20.0.0
- **npm** >= 9.0.0
- **MySQL** 8.0 (local or Cloud SQL)

### Installation

```bash
# Clone the repository
git clone https://github.com/sliao2025/intake-assessment-v2.git
cd intake-assessment-v2

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Run database migrations (development)
npm run db:migrate
```

### Environment Variables

Create a `.env.local` file:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/intake_db"
DATABASE_URL_BACKUP="mysql://user:password@backup-host:3306/intake_db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google OAuth
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Google Cloud
GOOGLE_APPLICATION_CREDENTIALS_JSON='{"type":"service_account",...}'
GCS_BUCKET_NAME="intake-assessment-audio-files"

# Services
INTAKE_ANALYSIS_URL="https://intake-analysis-xxxxx.a.run.app"

# OpenAI (for follow-up questions)
OPENAI_API_KEY="sk-..."

# Email (Resend)
RESEND_API_KEY="re_..."

# Dual-Write
ENABLE_DUAL_WRITE="true"
```

### Development

```bash
# Start development server
npm run dev

# Open Prisma Studio (database GUI)
npm run db:studio
```

Visit `http://localhost:3000` to view the application.

---

## Deployment

### Dual-Hosting Strategy

The application is deployed with high availability using dual hosting:

| Platform      | Purpose              | URL                                                         |
| ------------- | -------------------- | ----------------------------------------------------------- |
| **Vercel**    | Primary (Global CDN) | `https://intake.psych-nyc.com`                              |
| **Cloud Run** | Backup               | `https://integrative-psych-intake-assessment-xxx.a.run.app` |

### Git Branches

- `main` → Production (Vercel auto-deploy)
- `backup-vercel` → Cloud Run backup deployment

### Vercel Deployment

Pushing to `main` automatically deploys to Vercel:

```bash
git push origin main
```

### Cloud Run Deployment

```bash
# Build and deploy to Cloud Run
gcloud builds submit --config cloudbuild.yaml
```

### Docker (Local Testing)

```bash
# Build Docker image
docker build -t intake-assessment-v2 .

# Run container
docker run -p 8080:8080 intake-assessment-v2
```

---

## Database Schema

### Key Models

```prisma
model User {
  id             String    @id @default(cuid())
  email          String?
  name           String?
  clinicId       String
  intakeFinished Boolean   @default(false)
  profile        Profile?
  // ... relationships
}

model Profile {
  userId    String   @id
  json      Json     // All intake data stored as JSON
  version   Int      @default(1)
  updatedAt DateTime @updatedAt
  firstName String?
  lastName  String?
  email     String?
  age       String?
  isChild   Boolean?
  clinicId  String
  // ... demographic fields
}

model Clinic {
  id           String  @id @default(cuid())
  name         String
  subdomain    String  @unique
  primaryColor String? @default("#3B82F6")
  // ... branding fields
}

model AssessmentResponse {
  id             String @id @default(cuid())
  userId         String
  assessmentType String
  responses      Json
  totalScore     Int?
  completedAt    DateTime?
}
```

---

## API Endpoints

### Profile Management

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| GET    | `/api/profile`        | Get current user's profile |
| POST   | `/api/profile/create` | Create new profile         |
| PUT    | `/api/profile/update` | Update existing profile    |

### Audio & Transcription

| Method | Endpoint                   | Description                   |
| ------ | -------------------------- | ----------------------------- |
| POST   | `/api/upload/audio`        | Upload audio recording to GCS |
| GET    | `/api/upload/audio/stream` | Stream audio file             |
| POST   | `/api/transcribe/trigger`  | Trigger transcription service |

### AI Features

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| POST   | `/api/followup` | Generate AI follow-up questions      |
| POST   | `/api/insights` | Trigger clinical insights generation |

### Notifications

| Method | Endpoint                          | Description                        |
| ------ | --------------------------------- | ---------------------------------- |
| POST   | `/api/notify/assessment-complete` | Send completion email to clinician |
| POST   | `/api/notify/suicide-alert`       | Critical suicide risk alert        |

### PDF Generation

| Method | Endpoint            | Description                      |
| ------ | ------------------- | -------------------------------- |
| GET    | `/api/pdf/download` | Generate and download PDF report |

---

## Security

### Authentication Flow

1. **Patient Registration**: Email-based magic link or Google OAuth
2. **Session Management**: NextAuth.js with JWT tokens
3. **Protected Routes**: Middleware enforces authentication

### Data Protection

- **Encryption in Transit**: TLS 1.3 enforced
- **Encryption at Rest**: Google-managed encryption for Cloud SQL and GCS
- **HIPAA Compliance**: PHI handled according to healthcare regulations
- **Audit Logging**: All database access logged

### Suicide Risk Protocol

When a patient indicates self-harm ideation (PHQ-9 Q9 > 0 or C-SSRS triggers):

1. Immediate in-app crisis resources displayed
2. Email alert sent to assigned clinician
3. Flagged in clinician dashboard

---

## Related Repositories

| Repository                                                          | Description                                              |
| ------------------------------------------------------------------- | -------------------------------------------------------- |
| [`intake-analysis`](https://github.com/sliao2025/intake-analysis)   | Backend AI services (transcription, sentiment, insights) |
| [`clinician-report`](https://github.com/sliao2025/clinician-report) | Clinician-facing dashboard                               |

---

## Scripts

| Command                     | Description                 |
| --------------------------- | --------------------------- |
| `npm run dev`               | Start development server    |
| `npm run build`             | Build for production        |
| `npm run start`             | Start production server     |
| `npm run lint`              | Run ESLint                  |
| `npm run db:migrate`        | Run Prisma migrations (dev) |
| `npm run db:migrate:deploy` | Deploy migrations (prod)    |
| `npm run db:studio`         | Open Prisma Studio          |
| `npm run db:generate`       | Generate Prisma client      |
| `npm run db:push`           | Push schema to database     |
| `npm run db:seed`           | Seed database               |

---

## Contributing

1. Create a feature branch from `main`
2. Make changes with appropriate tests
3. Submit a pull request
4. After approval, changes auto-deploy to Vercel

### Code Style

- TypeScript strict mode enabled
- ESLint + Prettier for formatting
- Component-based architecture
- Server/Client component separation (Next.js App Router)

---

## Troubleshooting

### Common Issues

**Audio Recording Not Working**

- Ensure HTTPS is enabled (required for MediaRecorder API)
- Check browser permissions for microphone access

**Database Connection Errors**

- Verify `DATABASE_URL` format
- Ensure Cloud SQL proxy is running (for local development)

**Authentication Issues**

- Check `NEXTAUTH_URL` matches your domain
- Verify Google OAuth credentials

---

## License

This project is proprietary software for Integrative Psychiatry. All rights reserved.

---

<p align="center">
  <sub>Built with ❤️ for mental healthcare</sub>
</p>
