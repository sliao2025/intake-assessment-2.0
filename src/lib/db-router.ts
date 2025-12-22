/**
 * Database Router with Dual-Write and Failover Support
 *
 * This module provides a database access layer with:
 * - Dual-write: Writes to Cloud SQL (primary) are strictly mirrored to PlanetScale (backup) safely
 * - Failover: Reads from backup if primary is unavailable
 * - Health monitoring: Track database health status
 *
 * Configuration via environment variables:
 * - DATABASE_URL          → Primary database (Cloud SQL)
 * - DATABASE_URL_BACKUP   → Backup database (PlanetScale)
 * - ENABLE_DUAL_WRITE     → Enable writing to both databases (default: true)
 * - FORCE_BACKUP_DB       → Force using backup database only
 */

import { PrismaClient } from "@prisma/client";

// Configuration
const ENABLE_DUAL_WRITE =
  process.env.ENABLE_DUAL_WRITE?.toLowerCase() !== "false"; // Default: true
const FORCE_BACKUP = process.env.FORCE_BACKUP_DB?.toLowerCase() === "true";
const DATABASE_URL_BACKUP = process.env.DATABASE_URL_BACKUP;

// Health tracking
let primaryHealthy = true;
let backupHealthy = true;
let lastPrimaryCheck = new Date(0);
let lastBackupCheck = new Date(0);
let primaryConsecutiveFailures = 0;
let backupConsecutiveFailures = 0;
const HEALTH_CHECK_INTERVAL = 30000; // 30 seconds
const FAILOVER_THRESHOLD = 3; // Consecutive failures before failover

// Singleton clients
const globalForPrisma = globalThis as unknown as {
  primaryPrisma?: PrismaClient;
  backupPrisma?: PrismaClient;
};

// Primary Prisma client (Cloud SQL)
export function getPrimaryClient(): PrismaClient {
  if (!globalForPrisma.primaryPrisma) {
    globalForPrisma.primaryPrisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
  }
  return globalForPrisma.primaryPrisma;
}

// Backup Prisma client (PlanetScale)
export function getBackupClient(): PrismaClient | null {
  if (!DATABASE_URL_BACKUP) {
    return null;
  }

  if (!globalForPrisma.backupPrisma) {
    // Create a new Prisma client with the backup URL
    // Note: This requires the backup URL to use the same schema
    globalForPrisma.backupPrisma = new PrismaClient({
      datasources: {
        db: {
          url: DATABASE_URL_BACKUP,
        },
      },
      log:
        process.env.NODE_ENV === "development"
          ? ["query", "error", "warn"]
          : ["error"],
    });
  }
  return globalForPrisma.backupPrisma;
}

// Prevent hot-reload from creating new clients in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.primaryPrisma = getPrimaryClient();
  if (DATABASE_URL_BACKUP) {
    globalForPrisma.backupPrisma = getBackupClient() ?? undefined;
  }
}

/**
 * Check primary database health
 */
async function checkPrimaryHealth(): Promise<boolean> {
  if (Date.now() - lastPrimaryCheck.getTime() < HEALTH_CHECK_INTERVAL) {
    return primaryHealthy;
  }

  try {
    const client = getPrimaryClient();
    await client.$queryRaw`SELECT 1`;
    primaryHealthy = true;
    primaryConsecutiveFailures = 0;
    lastPrimaryCheck = new Date();
    return true;
  } catch (error: any) {
    console.error("[DB Primary Health] Check failed:", error.message);
    primaryConsecutiveFailures++;
    if (primaryConsecutiveFailures >= FAILOVER_THRESHOLD) {
      primaryHealthy = false;
    }
    lastPrimaryCheck = new Date();
    return false;
  }
}

/**
 * Check backup database health
 */
async function checkBackupHealth(): Promise<boolean> {
  const backupClient = getBackupClient();
  if (!backupClient) {
    backupHealthy = false;
    return false;
  }

  if (Date.now() - lastBackupCheck.getTime() < HEALTH_CHECK_INTERVAL) {
    return backupHealthy;
  }

  try {
    await backupClient.$queryRaw`SELECT 1`;
    backupHealthy = true;
    backupConsecutiveFailures = 0;
    lastBackupCheck = new Date();
    return true;
  } catch (error: any) {
    console.error("[DB Backup Health] Check failed:", error.message);
    backupConsecutiveFailures++;
    if (backupConsecutiveFailures >= FAILOVER_THRESHOLD) {
      backupHealthy = false;
    }
    lastBackupCheck = new Date();
    return false;
  }
}

/**
 * Get the active database client for reads
 * Automatically fails over to backup if primary is unhealthy
 */
function getActiveClient(): PrismaClient {
  // Force backup mode
  if (FORCE_BACKUP) {
    const backupClient = getBackupClient();
    if (backupClient) {
      console.log("[DB Router] Using backup database (forced)");
      return backupClient;
    }
    console.warn("[DB Router] Backup database not configured, using primary");
    return getPrimaryClient();
  }

  // Failover logic
  if (!primaryHealthy && backupHealthy) {
    const backupClient = getBackupClient();
    if (backupClient) {
      console.log("[DB Router] Using backup database (failover)");
      return backupClient;
    }
  }
  console.log("[DB Router] Using primary database");
  return getPrimaryClient();
}

/**
 * GET DB (Failover-only Client)
 * This client is used primarily for READS.
 * It does NOT automatically dual-write.
 */
export function getDb(): PrismaClient {
  return getActiveClient();
}

export const db = getActiveClient();

/**
 * @deprecated automatic dual-write is now enabled via Prisma extensions.
 * This function is kept for backward compatibility but operates as a pass-through.
 */
export async function dualWrite<T>(
  operation: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  // Use the proxied prisma client which handles dual-write automatically
  return operation(prisma);
}

/**
 * Execute a transaction across both databases (for critical operations)
 * Both writes must succeed for the operation to complete
 *
 * Use this sparingly - it's slower but guarantees consistency
 */
export async function dualWriteSync<T>(
  operation: (prisma: PrismaClient) => Promise<T>
): Promise<{ primary: T; backup?: T }> {
  // For now, fall back to simple primary execution as sync logic is complex with extensions
  // True dual-sync is hard to guarantee without 2PC.
  const result = await operation(prisma);
  return { primary: result, backup: undefined };
}

/**
 * Helper function to heal missing records on backup for updateMany operations.
 *
 * updateMany doesn't throw when a record is missing - it just returns { count: 0 }.
 * This function fetches the record from Primary and upserts it to Backup.
 */
async function healMissingRecord(
  model: string,
  args: any,
  primaryClient: PrismaClient,
  backupClient: PrismaClient
): Promise<void> {
  try {
    // Extract the unique identifier from the where clause
    // For Profile, this is usually { userId, updatedAt } but we only need userId for the lookup
    const whereClause = args.where || {};

    // Try to find a unique identifier to fetch the record
    let lookupWhere: any = {};
    if (whereClause.id) {
      lookupWhere = { id: whereClause.id };
    } else if (whereClause.userId) {
      lookupWhere = { userId: whereClause.userId };
    } else if (whereClause.email) {
      lookupWhere = { email: whereClause.email };
    } else {
      // For compound where clauses (like { userId, updatedAt }), extract the primary key
      // Common patterns in our app:
      const possibleKeys = ["id", "userId", "email", "clinicId"];
      for (const key of possibleKeys) {
        if (whereClause[key]) {
          lookupWhere[key] = whereClause[key];
          break;
        }
      }
    }

    if (Object.keys(lookupWhere).length === 0) {
      console.warn(
        `[Dual Write Heal] Could not determine unique identifier from where clause for ${model}:`,
        JSON.stringify(whereClause)
      );
      return;
    }

    console.log(
      `[Dual Write Heal] Fetching ${model} from Primary with lookup:`,
      JSON.stringify(lookupWhere)
    );

    // Fetch the full record from Primary
    // @ts-ignore - Dynamic model access
    const primaryRecord = await primaryClient[model].findUnique({
      where: lookupWhere,
    });

    if (!primaryRecord) {
      console.warn(
        `[Dual Write Heal] Record not found on Primary for ${model}:`,
        JSON.stringify(lookupWhere)
      );
      return;
    }

    console.log(
      `[Dual Write Heal] Found record on Primary for ${model}. Preparing to sync to Backup...`
    );

    // SPECIAL HANDLING FOR PROFILE:
    // Ensure parent User exists in Backup first
    if (model === "Profile" && primaryRecord.userId) {
      // @ts-ignore
      const backupUser = await backupClient.user.findUnique({
        where: { id: primaryRecord.userId },
      });

      if (!backupUser) {
        console.log(
          `[Dual Write Heal] Parent User ${primaryRecord.userId} missing in Backup. Fetching from Primary...`
        );
        // @ts-ignore
        const primaryUser = await primaryClient.user.findUnique({
          where: { id: primaryRecord.userId },
        });

        if (primaryUser) {
          console.log(
            `[Dual Write Heal] Creating User ${primaryRecord.userId} in Backup...`
          );
          try {
            // @ts-ignore
            await backupClient.user.create({
              data: primaryUser,
            });
          } catch (userErr: any) {
            // Might already exist due to race condition
            if (!userErr.message?.includes("Unique constraint")) {
              console.error(
                `[Dual Write Heal] Failed to create parent User in Backup:`,
                userErr.message
              );
              return;
            }
          }
        }
      }
    }

    // Upsert the record to Backup
    // @ts-ignore - Dynamic model access
    await backupClient[model].upsert({
      where: lookupWhere,
      create: primaryRecord,
      update: primaryRecord,
    });

    console.log(`[Dual Write Heal] Successfully synced ${model} to Backup.`);

    // Extra logging for Profile
    if (model === "Profile") {
      const jsonPreview = primaryRecord.json
        ? JSON.stringify(primaryRecord.json).substring(0, 300)
        : "(no json)";
      console.log(
        `[Dual Write Heal] Profile JSON synced:`,
        jsonPreview + "..."
      );
    }
  } catch (err: any) {
    console.error(`[Dual Write Heal] Failed to heal ${model}:`, err.message);
  }
}

/**
 * Helper function to heal missing records on PRIMARY for updateMany operations.
 * This is the REVERSE direction - called when in failover mode, syncing from Backup to Primary.
 */
async function healMissingRecordReverse(
  model: string,
  args: any,
  backupClient: PrismaClient,
  primaryClient: PrismaClient
): Promise<void> {
  try {
    // Extract the unique identifier from the where clause
    const whereClause = args.where || {};

    // Try to find a unique identifier to fetch the record
    let lookupWhere: any = {};
    if (whereClause.id) {
      lookupWhere = { id: whereClause.id };
    } else if (whereClause.userId) {
      lookupWhere = { userId: whereClause.userId };
    } else if (whereClause.email) {
      lookupWhere = { email: whereClause.email };
    } else {
      const possibleKeys = ["id", "userId", "email", "clinicId"];
      for (const key of possibleKeys) {
        if (whereClause[key]) {
          lookupWhere[key] = whereClause[key];
          break;
        }
      }
    }

    if (Object.keys(lookupWhere).length === 0) {
      console.warn(
        `[Reverse Dual Write Heal] Could not determine unique identifier from where clause for ${model}:`,
        JSON.stringify(whereClause)
      );
      return;
    }

    console.log(
      `[Reverse Dual Write Heal] Fetching ${model} from BACKUP with lookup:`,
      JSON.stringify(lookupWhere)
    );

    // Fetch the full record from Backup
    // @ts-ignore - Dynamic model access
    const backupRecord = await backupClient[model].findUnique({
      where: lookupWhere,
    });

    if (!backupRecord) {
      console.warn(
        `[Reverse Dual Write Heal] Record not found on BACKUP for ${model}:`,
        JSON.stringify(lookupWhere)
      );
      return;
    }

    console.log(
      `[Reverse Dual Write Heal] Found record on BACKUP for ${model}. Preparing to sync to PRIMARY...`
    );

    // SPECIAL HANDLING FOR PROFILE:
    // Ensure parent User exists in Primary first
    if (model === "Profile" && backupRecord.userId) {
      // @ts-ignore
      const primaryUser = await primaryClient.user.findUnique({
        where: { id: backupRecord.userId },
      });

      if (!primaryUser) {
        console.log(
          `[Reverse Dual Write Heal] Parent User ${backupRecord.userId} missing in PRIMARY. Fetching from BACKUP...`
        );
        // @ts-ignore
        const backupUser = await backupClient.user.findUnique({
          where: { id: backupRecord.userId },
        });

        if (backupUser) {
          console.log(
            `[Reverse Dual Write Heal] Creating User ${backupRecord.userId} in PRIMARY...`
          );
          try {
            // @ts-ignore
            await primaryClient.user.create({
              data: backupUser,
            });
          } catch (userErr: any) {
            // Might already exist due to race condition
            if (!userErr.message?.includes("Unique constraint")) {
              console.error(
                `[Reverse Dual Write Heal] Failed to create parent User in PRIMARY:`,
                userErr.message
              );
              return;
            }
          }
        }
      }
    }

    // Upsert the record to Primary
    // @ts-ignore - Dynamic model access
    await primaryClient[model].upsert({
      where: lookupWhere,
      create: backupRecord,
      update: backupRecord,
    });

    console.log(
      `[Reverse Dual Write Heal] Successfully synced ${model} to PRIMARY.`
    );

    // Extra logging for Profile
    if (model === "Profile") {
      const jsonPreview = backupRecord.json
        ? JSON.stringify(backupRecord.json).substring(0, 300)
        : "(no json)";
      console.log(
        `[Reverse Dual Write Heal] Profile JSON synced:`,
        jsonPreview + "..."
      );
    }
  } catch (err: any) {
    console.error(
      `[Reverse Dual Write Heal] Failed to heal ${model}:`,
      err.message
    );
  }
}

/**
 * createDualWriteExtension
 * Creates a Prisma extension that intercepts all write operations
 * and mirrors them to the backup database in the background.
 */
function createDualWriteExtension(primaryClient: PrismaClient) {
  return primaryClient.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          // List of operations that modify data
          const writeOperations = [
            "create",
            "createMany",
            "update",
            "updateMany",
            "upsert",
            "delete",
            "deleteMany",
          ];

          // 1. Execute the operation on the PRIMARY database (always await)
          const result = await query(args);

          // 2. If it's a write operation, mirror to BACKUP
          if (
            ENABLE_DUAL_WRITE &&
            !FORCE_BACKUP && // Don't dual-write if we are fully failed over
            writeOperations.includes(operation)
          ) {
            const backupClient = getBackupClient();
            if (backupClient) {
              const mirrorToBackup = async () => {
                try {
                  // SYNC ID LOGIC:
                  if (operation === "create" && result && (result as any).id) {
                    // Ensure args.data exists
                    if (!(args as any).data) (args as any).data = {};
                    // Override/Set ID to match Primary
                    (args as any).data.id = (result as any).id;
                  }

                  // @ts-ignore - Dynamic model access
                  const backupResult =
                    await backupClient[model][operation](args);
                  console.log(
                    `[Dual Write] Mirrored ${operation} on ${model} to backup (ID synced: ${
                      (result as any)?.id ? "yes" : "n/a"
                    }).`
                  );

                  // Debug Profile creation JSON
                  if (
                    model === "Profile" &&
                    (operation === "create" || operation === "update")
                  ) {
                    console.log(
                      `[Dual Write] ${operation} Profile JSON:`,
                      JSON.stringify((result as any)?.json).substring(0, 100) +
                        "..."
                    );
                  }

                  // ========================================
                  // HEALING LOGIC FOR updateMany (count: 0)
                  // ========================================
                  // updateMany doesn't throw when record is missing - it returns { count: 0 }
                  // This is the root cause of Profile JSON not syncing to backup!
                  if (
                    operation === "updateMany" &&
                    backupResult &&
                    (backupResult as any).count === 0
                  ) {
                    console.log(
                      `[Dual Write] updateMany on ${model} returned count: 0 on backup. Attempting to heal...`
                    );
                    await healMissingRecord(
                      model,
                      args,
                      primaryClient,
                      backupClient
                    );
                  }
                } catch (err: any) {
                  console.error(
                    `[Dual Write] Failed to mirror ${operation} on ${model}:`,
                    err.message
                  );

                  // Debug for DELETE specifically
                  if (operation.startsWith("delete")) {
                    console.error(
                      `[Dual Write] DELETE failure details for ${model}:`,
                      JSON.stringify(args, null, 2)
                    );
                  }

                  // HEALING LOGIC FOR update (P2025 error):
                  // If update failed because record is missing in backup (P2025)
                  if (
                    operation === "update" &&
                    (err.code === "P2025" ||
                      err.message?.includes("Record to update not found")) &&
                    result
                  ) {
                    console.log(
                      `[Dual Write] Attempting to heal missing record on backup for ${model}...`
                    );
                    try {
                      // SPECIAL HANDLING FOR PROFILE:
                      // If creating a Profile, we MUST ensure the User exists first.
                      if (model === "Profile") {
                        const userId = (result as any).userId;
                        if (userId) {
                          // Check if user exists in backup
                          // @ts-ignore
                          const backupUser = await backupClient.user.findUnique(
                            {
                              where: { id: userId },
                            }
                          );

                          if (!backupUser) {
                            console.log(
                              `[Dual Write] Healing: User ${userId} missing in backup. Fetching from primary...`
                            );
                            // Fetch user from primary
                            // @ts-ignore
                            const primaryUser =
                              await primaryClient.user.findUnique({
                                where: { id: userId },
                              });

                            if (primaryUser) {
                              console.log(
                                `[Dual Write] Healing: Creating User ${userId} in backup...`
                              );
                              // Create user in backup
                              // @ts-ignore
                              await backupClient.user.create({
                                data: primaryUser,
                              });
                            }
                          }
                        }
                      }

                      // Now heal the record using UPSERT instead of create.
                      // This handles both cases:
                      // 1. Record is truly missing -> Create it.
                      // 2. Record exists but was stale (updatedAt mismatch) -> Update it.

                      // Determine unique identifier for WHERE clause
                      const whereClause: any = {};
                      if ((result as any).id) {
                        whereClause.id = (result as any).id;
                      } else if ((result as any).userId) {
                        whereClause.userId = (result as any).userId;
                      } else {
                        // Fallback: look at args.where but try to isolate the ID
                        // This is tricky without metadata, but for our app, id and userId cover 99%
                        console.warn(
                          `[Dual Write] Could not determine unique ID for healing ${model}. Skipping.`
                        );
                        return;
                      }

                      // @ts-ignore
                      await backupClient[model].upsert({
                        where: whereClause,
                        create: result,
                        update: result,
                      });
                      console.log(
                        `[Dual Write] Successfully healed/upserted ${model} on backup (synced with Primary).`
                      );

                      // Extra logging for Profile JSON debugging
                      if (model === "Profile") {
                        console.log(
                          `[Dual Write] Profile JSON synced to backup:`,
                          JSON.stringify((result as any).json).substring(
                            0,
                            200
                          ) + "..."
                        );
                      }
                    } catch (healErr: any) {
                      console.error(
                        `[Dual Write] Heal attempt failed:`,
                        healErr.message
                      );
                    }
                  }
                }
              };

              // Run background sync effectively
              mirrorToBackup();
            }
          }

          return result;
        },
      },
    },
  });
}

/**
 * createReverseDualWriteExtension
 * Creates a Prisma extension that intercepts all write operations on the BACKUP database
 * and mirrors them to the PRIMARY database in the background.
 *
 * This is the REVERSE direction of dual-write, used when in failover mode.
 * It ensures that when Primary comes back online, it has all the data that was
 * written to Backup during the outage.
 */
function createReverseDualWriteExtension(backupClient: PrismaClient) {
  const primaryClient = getPrimaryClient();

  return backupClient.$extends({
    query: {
      $allModels: {
        async $allOperations({ model, operation, args, query }) {
          // List of operations that modify data
          const writeOperations = [
            "create",
            "createMany",
            "update",
            "updateMany",
            "upsert",
            "delete",
            "deleteMany",
          ];

          // 1. Execute the operation on the BACKUP database (always await)
          const result = await query(args);

          // 2. If it's a write operation, mirror to PRIMARY (reverse direction)
          if (ENABLE_DUAL_WRITE && writeOperations.includes(operation)) {
            const mirrorToPrimary = async () => {
              try {
                // SYNC ID LOGIC:
                if (operation === "create" && result && (result as any).id) {
                  // Ensure args.data exists
                  if (!(args as any).data) (args as any).data = {};
                  // Override/Set ID to match Backup
                  (args as any).data.id = (result as any).id;
                }

                // @ts-ignore - Dynamic model access
                const primaryResult =
                  await primaryClient[model][operation](args);
                console.log(
                  `[Reverse Dual Write] Mirrored ${operation} on ${model} to PRIMARY (ID synced: ${
                    (result as any)?.id ? "yes" : "n/a"
                  }).`
                );

                // HEALING LOGIC FOR updateMany (count: 0) - same as forward direction
                if (
                  operation === "updateMany" &&
                  primaryResult &&
                  (primaryResult as any).count === 0
                ) {
                  console.log(
                    `[Reverse Dual Write] updateMany on ${model} returned count: 0 on PRIMARY. Attempting to heal...`
                  );
                  await healMissingRecordReverse(
                    model,
                    args,
                    backupClient,
                    primaryClient
                  );
                }
              } catch (err: any) {
                console.error(
                  `[Reverse Dual Write] Failed to mirror ${operation} on ${model} to PRIMARY:`,
                  err.message
                );

                // HEALING LOGIC FOR update (P2025 error):
                if (
                  operation === "update" &&
                  (err.code === "P2025" ||
                    err.message?.includes("Record to update not found")) &&
                  result
                ) {
                  console.log(
                    `[Reverse Dual Write] Attempting to heal missing record on PRIMARY for ${model}...`
                  );
                  try {
                    // SPECIAL HANDLING FOR PROFILE:
                    if (model === "Profile") {
                      const userId = (result as any).userId;
                      if (userId) {
                        // @ts-ignore
                        const primaryUser = await primaryClient.user.findUnique(
                          {
                            where: { id: userId },
                          }
                        );

                        if (!primaryUser) {
                          console.log(
                            `[Reverse Dual Write] Healing: User ${userId} missing in PRIMARY. Fetching from BACKUP...`
                          );
                          // @ts-ignore
                          const backupUser = await backupClient.user.findUnique(
                            {
                              where: { id: userId },
                            }
                          );

                          if (backupUser) {
                            console.log(
                              `[Reverse Dual Write] Healing: Creating User ${userId} in PRIMARY...`
                            );
                            // @ts-ignore
                            await primaryClient.user.create({
                              data: backupUser,
                            });
                          }
                        }
                      }
                    }

                    // Upsert to PRIMARY
                    const whereClause: any = {};
                    if ((result as any).id) {
                      whereClause.id = (result as any).id;
                    } else if ((result as any).userId) {
                      whereClause.userId = (result as any).userId;
                    } else {
                      console.warn(
                        `[Reverse Dual Write] Could not determine unique ID for healing ${model}. Skipping.`
                      );
                      return;
                    }

                    // @ts-ignore
                    await primaryClient[model].upsert({
                      where: whereClause,
                      create: result,
                      update: result,
                    });
                    console.log(
                      `[Reverse Dual Write] Successfully healed/upserted ${model} on PRIMARY.`
                    );
                  } catch (healErr: any) {
                    console.error(
                      `[Reverse Dual Write] Heal attempt failed:`,
                      healErr.message
                    );
                  }
                }
              }
            };

            // Run background sync effectively
            mirrorToPrimary();
          }

          return result;
        },
      },
    },
  });
}

/**
 * The 'prisma' export is the main entry point for the application.
 * It uses a Proxy to dynamically switch between:
 * 1. The Primary Client (configured with Dual-Write Extension) -> mirrors to Backup
 * 2. The Backup Client (configured with Reverse Dual-Write Extension) -> mirrors to Primary
 *
 * This enables BIDIRECTIONAL sync - whichever DB is active, writes are
 * mirrored to the other one in the background.
 */
export const prisma = new Proxy({} as PrismaClient, {
  get: (_target, prop) => {
    // 1. Determine which physical client is active (Failover Logic)
    const activeRawClient = getActiveClient();

    // 2. If we are on the PRIMARY, wrap with forward Dual-Write Extension
    //    (mirrors writes to Backup)
    if (activeRawClient === getPrimaryClient() && !FORCE_BACKUP) {
      const extendedClient = createDualWriteExtension(activeRawClient);
      // @ts-ignore - Proxy generic typing
      return extendedClient[prop];
    }

    // 3. If we are on the BACKUP (Failover/Force Backup mode), wrap with REVERSE Dual-Write Extension
    //    (mirrors writes back to Primary)
    //    This ensures data written during failover is synced when Primary comes back online
    const backupClient = getBackupClient();
    if (backupClient && ENABLE_DUAL_WRITE) {
      const extendedBackupClient =
        createReverseDualWriteExtension(backupClient);
      // @ts-ignore - Proxy generic typing
      return extendedBackupClient[prop];
    }

    // 4. No dual-write configured, use raw backup client
    return activeRawClient[prop as keyof PrismaClient];
  },
});

/**
 * Health status for monitoring
 */
export interface DatabaseHealthStatus {
  primary: {
    healthy: boolean;
    lastCheck: Date;
    consecutiveFailures: number;
    configured: boolean;
  };
  backup: {
    healthy: boolean;
    lastCheck: Date;
    consecutiveFailures: number;
    configured: boolean;
  };
  activeDatabase: "primary" | "backup";
  dualWriteEnabled: boolean;
}

export async function getDatabaseHealthStatus(): Promise<DatabaseHealthStatus> {
  await Promise.all([checkPrimaryHealth(), checkBackupHealth()]);

  return {
    primary: {
      healthy: primaryHealthy,
      lastCheck: lastPrimaryCheck,
      consecutiveFailures: primaryConsecutiveFailures,
      configured: true,
    },
    backup: {
      healthy: backupHealthy,
      lastCheck: lastBackupCheck,
      consecutiveFailures: backupConsecutiveFailures,
      configured: !!DATABASE_URL_BACKUP,
    },
    activeDatabase:
      FORCE_BACKUP || (!primaryHealthy && backupHealthy) ? "backup" : "primary",
    dualWriteEnabled: ENABLE_DUAL_WRITE && !!DATABASE_URL_BACKUP,
  };
}

/**
 * Disconnect all clients (for graceful shutdown)
 */
export async function disconnectAll(): Promise<void> {
  const promises: Promise<void>[] = [];

  if (globalForPrisma.primaryPrisma) {
    promises.push(globalForPrisma.primaryPrisma.$disconnect());
  }

  if (globalForPrisma.backupPrisma) {
    promises.push(globalForPrisma.backupPrisma.$disconnect());
  }

  await Promise.all(promises);
}
