import { PrismaClient } from "@prisma/client";

/**
 * SYNC DELETIONS SCRIPT
 *
 * Purpose:
 * Finds records that exist in the BACKUP (PlanetScale) but are missing from the PRIMARY (Cloud SQL).
 * This is useful when you have manually deleted records from the Primary (e.g. via Prisma Studio)
 * and need to clean up the "orphans" in the Backup.
 */

// 1. Configure Clients
const primaryUrl = process.env.DATABASE_URL;
const backupUrl = process.env.DATABASE_URL_BACKUP;

if (!primaryUrl || !backupUrl) {
  console.error("Error: Missing DATABASE_URL or DATABASE_URL_BACKUP env vars.");
  process.exit(1);
}

const primary = new PrismaClient({
  datasources: { db: { url: primaryUrl } },
  log: ["error"],
});

const backup = new PrismaClient({
  datasources: { db: { url: backupUrl } },
  log: ["error"],
});

async function syncDeletionsForModel(modelName: string) {
  console.log(`\n--- Syncing Model: ${modelName} ---`);

  // @ts-ignore
  const client: any = backup[modelName];
  // @ts-ignore
  const primaryModel: any = primary[modelName];

  if (!client || !primaryModel) {
    console.log(`Skipping ${modelName} (not found in Prisma client)`);
    return;
  }

  try {
    // A. Fetch ALL IDs from Backup
    // Determine PK field name (default 'id', but 'userId' for Profile)
    const pkField = modelName === "profile" ? "userId" : "id";

    // @ts-ignore
    const backupRecords = await client.findMany({
      select: { [pkField]: true },
    });

    if (backupRecords.length === 0) {
      console.log("Backup table is empty. Nothing to clean.");
      return;
    }

    const backupIds = backupRecords.map((r: any) => r[pkField]);
    console.log(`Backup has ${backupIds.length} records.`);

    // B. Check existence in Primary
    // Efficient way: Fetch IDs from Primary that match the Backup IDs
    const existingPrimaryRecords = await primaryModel.findMany({
      where: { [pkField]: { in: backupIds } },
      select: { [pkField]: true },
    });

    const primaryIdSet = new Set(
      existingPrimaryRecords.map((r: any) => r[pkField])
    );

    // C. Determine Orphans
    const orphanIds = backupIds.filter((id: string) => !primaryIdSet.has(id));

    if (orphanIds.length === 0) {
      console.log("No orphans found. Tables are in sync.");
      return;
    }

    console.log(
      `Found ${orphanIds.length} orphan records in Backup (missing in Primary).`
    );
    console.log("Deleting orphans...");

    // D. Delete Orphans from Backup
    const deleteResult = await client.deleteMany({
      where: { [pkField]: { in: orphanIds } },
    });

    console.log(`Successfully deleted ${deleteResult.count} records.`);
  } catch (err: any) {
    console.error(`Error syncing ${modelName}:`, err.message);
  }
}

async function main() {
  console.log("Starting Delete Synchronization...");

  // List of models to sync. We prioritize User and Profile.
  // Add other models here if needed.
  const models = ["user", "profile", "assessment", "clinicalNote"];

  for (const model of models) {
    await syncDeletionsForModel(model);
  }

  console.log("\nSync Complete.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await primary.$disconnect();
    await backup.$disconnect();
  });
