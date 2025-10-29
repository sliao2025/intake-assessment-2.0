# Production Domain Setup Guide

## Setting up integrativepsych.tx-accelerator.com

---

## 🎯 Overview

You want to deploy your multi-tenant app to production with:

- **Root domain:** `tx-accelerator.com`
- **First clinic subdomain:** `integrativepsych.tx-accelerator.com`
- **Hosting:** Cloud Run (based on your cloudbuild.yaml)

---

## 📋 Prerequisites

✅ Domain purchased: `tx-accelerator.com` on GoDaddy
✅ App deployed to Cloud Run
✅ Multi-tenant middleware ready

---

## Part 1: Deploy to Cloud Run

### Step 1: Deploy Your App

```bash
# In your project directory
gcloud run deploy intake-assessment \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

**Save the Cloud Run URL** you get (e.g., `https://intake-assessment-xyz.run.app`)

---

## Part 2: Set Up Domain Mapping in Google Cloud

### Step 2: Add Domain Mapping in Cloud Run

```bash
# Map the root domain
gcloud run domain-mappings create \
  --service intake-assessment \
  --domain tx-accelerator.com \
  --region us-central1

# Map the subdomain
gcloud run domain-mappings create \
  --service intake-assessment \
  --domain integrativepsych.tx-accelerator.com \
  --region us-central1
```

**Important:** Google Cloud will give you DNS records to add. They'll look like:

```
Type: CNAME
Name: integrativepsych
Value: ghs.googlehosted.com

Type: A
Name: @
Value: [IP addresses provided by Google]
```

**Save these records!** You'll need them in the next step.

---

## Part 3: Configure DNS in GoDaddy

### Step 3: Log into GoDaddy DNS Management

1. Go to [GoDaddy DNS Management](https://dcc.godaddy.com/control/portfolio/dns)
2. Find `tx-accelerator.com`
3. Click "DNS" or "Manage DNS"

### Step 4: Add DNS Records

You need to add records that Google Cloud provided. Here's the typical setup:

#### **For the subdomain (integrativepsych.tx-accelerator.com):**

1. Click "Add Record"
2. Select **Type: CNAME**
3. Fill in:
   - **Host/Name:** `integrativepsych`
   - **Points to:** `ghs.googlehosted.com`
   - **TTL:** 600 seconds (or default)
4. Click "Save"

#### **For the root domain (tx-accelerator.com):**

**Option A: If Google provides A records (IP addresses):**

1. Click "Add Record"
2. Select **Type: A**
3. Fill in:
   - **Host/Name:** `@` (this represents the root)
   - **Points to:** [IP address from Google]
   - **TTL:** 600 seconds
4. Repeat for all IP addresses Google provided
5. Click "Save"

**Option B: If you want to use Cloud Run directly:**

1. Add a **CNAME** record:
   - **Host/Name:** `@`
   - **Points to:** `ghs.googlehosted.com`
   - **TTL:** 600 seconds

⚠️ **Note:** Some DNS providers don't allow CNAME for root domains. If GoDaddy doesn't allow it, use the A records.

#### **For www redirect (optional):**

1. Click "Add Record"
2. Select **Type: CNAME**
3. Fill in:
   - **Host/Name:** `www`
   - **Points to:** `tx-accelerator.com`
   - **TTL:** 600 seconds

### Step 5: Verify Domain Ownership (if prompted)

Google may ask you to verify domain ownership:

1. They'll provide a TXT record like:

   ```
   Type: TXT
   Name: @
   Value: google-site-verification=ABC123XYZ...
   ```

2. Add this in GoDaddy:
   - Click "Add Record"
   - Type: **TXT**
   - Host: `@`
   - TXT Value: [paste the verification code]
   - TTL: 600
   - Save

3. Go back to Google Cloud Console and click "Verify"

---

## Part 4: Update Your Application Code

### Step 6: Update Middleware for Production Domain

Update your middleware to handle production domains:

**File:** `src/middleware.ts`

```typescript
// 🔥 MULTI-TENANT: Extract and store clinic identifier
const host = req.headers.get("host") || "";
const parts = host.split(".");
let clinicSubdomain: string | null = null;

// Check if it's a subdomain
if (parts.length >= 2 && parts[0] !== "localhost" && parts[0] !== "127") {
  // Local development: integrative-psych.localhost
  if (parts[1]?.startsWith("localhost")) {
    clinicSubdomain = parts[0];
  }
  // Production: integrativepsych.tx-accelerator.com
  else if (parts.length >= 3) {
    // Extract subdomain (first part before main domain)
    clinicSubdomain = parts[0];
  }
  // Handle root domain tx-accelerator.com (no subdomain)
  else if (parts.length === 2) {
    // Default to integrative-psych for root domain
    clinicSubdomain = "integrative-psych";
  }
}

console.log("[Middleware] Host:", host, "Subdomain:", clinicSubdomain);
```

### Step 7: Update Clinic Database Record

Update the Integrative Psych clinic to include the custom domain:

```bash
npx prisma studio
```

Or via script - create `scripts/update-production-domain.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.clinic.update({
    where: { subdomain: "integrative-psych" },
    data: {
      customDomain: "integrativepsych.tx-accelerator.com",
    },
  });

  console.log("✅ Updated Integrative Psych with production domain");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run it:

```bash
npx ts-node --compiler-options '{"module":"commonjs"}' scripts/update-production-domain.ts
```

### Step 8: Update Environment Variables

Make sure your production environment has:

```env
# .env.production or in Cloud Run environment variables
NEXTAUTH_URL=https://integrativepsych.tx-accelerator.com
NEXTAUTH_SECRET=your-secure-secret-here
DATABASE_URL=your-production-database-url

# Keep your Google OAuth credentials
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

Update in Cloud Run:

```bash
gcloud run services update intake-assessment \
  --update-env-vars NEXTAUTH_URL=https://integrativepsych.tx-accelerator.com \
  --region us-central1
```

---

## Part 5: SSL/HTTPS Setup

### Step 9: Google Cloud Handles SSL Automatically

✅ **Good news:** Google Cloud Run automatically provisions SSL certificates for your custom domains!

Once DNS propagates (can take 24-48 hours), Google will:

1. Detect your DNS records
2. Automatically provision SSL certificates
3. Enable HTTPS

**Check SSL status:**

```bash
gcloud run domain-mappings describe \
  --domain integrativepsych.tx-accelerator.com \
  --region us-central1
```

---

## Part 6: Testing & Verification

### Step 10: Test DNS Propagation

**Wait for DNS to propagate** (15 minutes to 48 hours):

```bash
# Check if DNS is working
nslookup integrativepsych.tx-accelerator.com

# Or use dig
dig integrativepsych.tx-accelerator.com
```

**Expected output:**

```
Name: integrativepsych.tx-accelerator.com
Address: [Google Cloud IP or CNAME to ghs.googlehosted.com]
```

### Step 11: Test Your App

Once DNS propagates:

1. **Visit:** `https://integrativepsych.tx-accelerator.com`
2. **Verify:**
   - ✅ Site loads
   - ✅ Shows Integrative Psych branding
   - ✅ HTTPS (padlock in browser)
   - ✅ Auth works (sign in, guest login)
   - ✅ Middleware logs show correct subdomain

**Check browser console:**

```
[Middleware] Host: integrativepsych.tx-accelerator.com Subdomain: integrative-psych
[API /clinic] Found clinic: Integrative Psych
```

---

## 🎯 Quick Reference: GoDaddy DNS Records

Here's what your GoDaddy DNS should look like:

| Type  | Name             | Value/Points To              | TTL |
| ----- | ---------------- | ---------------------------- | --- |
| CNAME | integrativepsych | ghs.googlehosted.com         | 600 |
| A     | @                | [Google IP 1]                | 600 |
| A     | @                | [Google IP 2]                | 600 |
| A     | @                | [Google IP 3]                | 600 |
| A     | @                | [Google IP 4]                | 600 |
| CNAME | www              | tx-accelerator.com           | 600 |
| TXT   | @                | google-site-verification=... | 600 |

---

## 🔧 Troubleshooting

### DNS not resolving

- **Wait longer:** DNS can take 24-48 hours
- **Clear cache:** `sudo dscacheutil -flushcache` (Mac) or `ipconfig /flushdns` (Windows)
- **Check propagation:** https://www.whatsmydns.net/

### SSL certificate not provisioning

- **Verify DNS records** are correct
- **Wait:** Can take up to 24 hours after DNS propagates
- **Check status:** `gcloud run domain-mappings describe ...`

### Site shows wrong clinic

- **Check middleware logs** in Cloud Run console
- **Verify database:** Make sure subdomain matches in Clinic table
- **Clear browser cookies**

### 404 or "Service not found"

- **Verify domain mapping:** `gcloud run domain-mappings list`
- **Check service is running:** `gcloud run services list`
- **Redeploy:** `gcloud run deploy intake-assessment --source .`

---

## 📋 Checklist

Before going live, verify:

- [ ] Cloud Run service deployed
- [ ] Domain mappings created in Google Cloud
- [ ] DNS records added in GoDaddy
- [ ] Domain ownership verified (if required)
- [ ] Environment variables updated (NEXTAUTH_URL, etc.)
- [ ] Database updated with production domain
- [ ] Middleware handles production domain
- [ ] DNS propagated (use nslookup)
- [ ] SSL certificate active (HTTPS works)
- [ ] Site loads and shows correct branding
- [ ] Authentication works (Google OAuth, email, guest)
- [ ] Test creating/loading profiles

---

## 🚀 Adding More Clinics Later

When you want to add more clinics:

1. **Add DNS record in GoDaddy:**

   ```
   Type: CNAME
   Name: newclinic
   Value: ghs.googlehosted.com
   ```

2. **Create domain mapping in Cloud Run:**

   ```bash
   gcloud run domain-mappings create \
     --service intake-assessment \
     --domain newclinic.tx-accelerator.com \
     --region us-central1
   ```

3. **Add clinic to database:**
   ```typescript
   await prisma.clinic.create({
     data: {
       name: "New Clinic",
       subdomain: "newclinic",
       customDomain: "newclinic.tx-accelerator.com",
       // ... other fields
     },
   });
   ```

Done! 🎉

---

## 💡 Cost Considerations

- **GoDaddy Domain:** ~$12-15/year
- **Cloud Run:** Pay per request (free tier generous)
- **SSL Certificates:** FREE (automatically managed by Google)
- **DNS hosting:** Included with GoDaddy domain

---

Need help with any step? Let me know! 🚀
