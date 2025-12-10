/**
 * Migration script to:
 * 1. Fix PSS-4 reverse scoring for questions 2 and 3
 * 2. Migrate old schema (assessments.stress) to new schema (assessments.data.stress with kind)
 * 
 * PSS-4 questions 2 and 3 are positively framed and should have been reverse scored:
 * - 0 → 4
 * - 1 → 3
 * - 2 → 2
 * - 3 → 1
 * - 4 → 0
 * 
 * Old schema: assessments.stress, assessments.phq9, etc.
 * New schema: assessments.kind = "adult" | "child", assessments.data.stress, etc.
 * 
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/fix-pss4-scores.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Reverse scoring function
const reverseScore = (v: string | number): string => {
  const num = Number(v);
  if (isNaN(num) || v === "" || v === undefined || v === null) return String(v ?? "");
  return String(4 - num);
};

// Check if profile uses old schema (no kind/data structure)
const isOldSchema = (assessments: any): boolean => {
  if (!assessments) return false;
  // Old schema has fields directly on assessments (e.g., assessments.stress)
  // New schema has assessments.kind and assessments.data
  return !assessments.kind && !assessments.data && (
    assessments.stress !== undefined ||
    assessments.phq9 !== undefined ||
    assessments.gad7 !== undefined ||
    assessments.suicide !== undefined
  );
};

// Migrate old schema to new schema
const migrateToNewSchema = (assessments: any): any => {
  // Extract all the assessment data from old flat structure
  const data: any = {};
  
  // Copy over all known assessment fields
  const knownFields = [
    'phq9', 'gad7', 'ptsd', 'asrs5', 'crafft', 'stress', 
    'suicide', 'selfHarm', 'aceResilience'
  ];
  
  for (const field of knownFields) {
    if (assessments[field] !== undefined) {
      data[field] = assessments[field];
    }
  }
  
  return {
    kind: "adult",
    data: data
  };
};

async function main() {
  console.log("🔍 Fetching all profiles...");
  
  // Get all profiles
  const profiles = await prisma.profile.findMany({
    select: {
      userId: true,
      json: true,
      isChild: true,
    },
  });

  console.log(`📊 Found ${profiles.length} total profiles`);

  let updatedScores = 0;
  let migratedSchema = 0;
  let skipped = 0;
  let errors = 0;

  for (const profile of profiles) {
    try {
      const json = profile.json as any;
      
      // Skip child profiles (they don't have PSS-4)
      if (profile.isChild === true || json?.isChild === true) {
        skipped++;
        continue;
      }

      let assessments = json?.assessments;
      if (!assessments) {
        skipped++;
        continue;
      }

      // Create a deep copy of the JSON to modify
      const updatedJson = JSON.parse(JSON.stringify(json));
      let needsUpdate = false;
      let schemaChanged = false;

      // Check if we need to migrate from old schema to new schema
      if (isOldSchema(assessments)) {
        console.log(`\n🔄 User ${profile.userId}: Migrating from old schema to new schema`);
        updatedJson.assessments = migrateToNewSchema(assessments);
        assessments = updatedJson.assessments;
        schemaChanged = true;
        needsUpdate = true;
        migratedSchema++;
      }

      // Now fix PSS-4 scores (handle both old and new schema locations)
      let stress: any = null;
      let stressPath: string = "";

      if (assessments?.data?.stress) {
        stress = assessments.data.stress;
        stressPath = "assessments.data.stress";
      } else if (assessments?.stress) {
        // This shouldn't happen after migration, but just in case
        stress = assessments.stress;
        stressPath = "assessments.stress";
      }

      if (!stress) {
        if (needsUpdate) {
          // Still need to save schema migration even if no stress data
          await prisma.profile.update({
            where: { userId: profile.userId },
            data: { json: updatedJson },
          });
          console.log(`   ✅ Schema migrated (no stress data to fix)`);
        } else {
          skipped++;
        }
        continue;
      }

      // Check if pss2 or pss3 have values to fix
      const hasPss2 = stress.pss2 !== undefined && stress.pss2 !== "";
      const hasPss3 = stress.pss3 !== undefined && stress.pss3 !== "";

      if (!hasPss2 && !hasPss3) {
        if (needsUpdate) {
          await prisma.profile.update({
            where: { userId: profile.userId },
            data: { json: updatedJson },
          });
          console.log(`   ✅ Schema migrated (no pss2/pss3 to fix)`);
        } else {
          skipped++;
        }
        continue;
      }

      const oldPss2 = stress.pss2;
      const oldPss3 = stress.pss3;

      // Apply reverse scoring to pss2 and pss3
      if (hasPss2) {
        if (stressPath === "assessments.data.stress") {
          updatedJson.assessments.data.stress.pss2 = reverseScore(oldPss2);
        } else {
          updatedJson.assessments.stress.pss2 = reverseScore(oldPss2);
        }
        needsUpdate = true;
      }
      if (hasPss3) {
        if (stressPath === "assessments.data.stress") {
          updatedJson.assessments.data.stress.pss3 = reverseScore(oldPss3);
        } else {
          updatedJson.assessments.stress.pss3 = reverseScore(oldPss3);
        }
        needsUpdate = true;
      }

      const newPss2 = stressPath === "assessments.data.stress" 
        ? updatedJson.assessments.data.stress.pss2 
        : updatedJson.assessments.stress.pss2;
      const newPss3 = stressPath === "assessments.data.stress" 
        ? updatedJson.assessments.data.stress.pss3 
        : updatedJson.assessments.stress.pss3;

      if (!schemaChanged) {
        console.log(`\n📝 User ${profile.userId}:`);
      }
      if (hasPss2) console.log(`   pss2: "${oldPss2}" → "${newPss2}"`);
      if (hasPss3) console.log(`   pss3: "${oldPss3}" → "${newPss3}"`);

      // Update the profile in the database
      if (needsUpdate) {
        await prisma.profile.update({
          where: { userId: profile.userId },
          data: { json: updatedJson },
        });
        updatedScores++;
      }
    } catch (err) {
      console.error(`❌ Error processing user ${profile.userId}:`, err);
      errors++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ Migration complete!");
  console.log(`   PSS-4 scores fixed: ${updatedScores} profiles`);
  console.log(`   Schema migrated: ${migratedSchema} profiles`);
  console.log(`   Skipped: ${skipped} profiles (child or no relevant data)`);
  console.log(`   Errors: ${errors} profiles`);
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


