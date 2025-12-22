import { prisma, getPrimaryClient, getBackupClient } from "./src/lib/db-router";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: ".env.local" });

async function runTest() {
  console.log("🚀 Starting Dual-Write Verification Test...");
  const timestamp = Date.now();
  const testEmail = `test-user-${timestamp}@example.com`;
  const testName = `Test User ${timestamp}`;
  const clinicId = "uvfoatdxzh7c1s395kc61u7i"; // Using known clinic ID from context

  try {
    // 1. CREATE USER
    console.log(
      "\n1️⃣ Creating User via Router (Should hit Primary + Backup)..."
    );
    const createdUser = await prisma.user.create({
      data: {
        email: testEmail,
        name: testName,
        clinicId: clinicId,
        image: "https://example.com/avatar.jpg",
      },
    });
    console.log(`✅ User created with ID: ${createdUser.id}`);

    // Verify Primary
    const primaryUser = await getPrimaryClient().user.findUnique({
      where: { id: createdUser.id },
    });
    if (!primaryUser) throw new Error("❌ User missing from PRIMARY DB!");
    console.log("✅ Verified: User exists in Primary DB");

    // Verify Backup
    const backupClient = getBackupClient();
    if (!backupClient) throw new Error("❌ Backup client not configured!");

    // Allow a slight delay for async dual-write
    await new Promise((r) => setTimeout(r, 1000));

    // @ts-ignore
    const backupUser = await backupClient.user.findUnique({
      where: { id: createdUser.id },
    });
    if (!backupUser) throw new Error("❌ User missing from BACKUP DB!");
    console.log("✅ Verified: User exists in Backup DB");

    // 2. CREATE PROFILE
    console.log("\n2️⃣ Creating Profile via Router...");
    const createdProfile = await prisma.profile.create({
      data: {
        userId: createdUser.id,
        clinicId: clinicId,
        json: { initialData: true },
        firstName: "Test",
        lastName: "User",
      },
    });
    console.log("✅ Profile created");

    // Verify Primary
    const primaryProfile = await getPrimaryClient().profile.findUnique({
      where: { userId: createdUser.id },
    });
    if (!primaryProfile) throw new Error("❌ Profile missing from PRIMARY DB!");
    console.log("✅ Verified: Profile exists in Primary DB");

    // Verify Backup
    await new Promise((r) => setTimeout(r, 1000));
    // @ts-ignore
    const backupProfile = await backupClient.profile.findUnique({
      where: { userId: createdUser.id },
    });
    if (!backupProfile) throw new Error("❌ Profile missing from BACKUP DB!");
    console.log("✅ Verified: Profile exists in Backup DB");

    // 3. UPDATE PROFILE
    console.log("\n3️⃣ Updating Profile via Router...");
    const updatedProfile = await prisma.profile.update({
      where: { userId: createdUser.id },
      data: {
        firstName: "UpdatedName",
        json: { initialData: true, updatedField: "success" },
      },
    });
    console.log("✅ Profile updated");

    // Verify Primary
    const primaryUpdated = await getPrimaryClient().profile.findUnique({
      where: { userId: createdUser.id },
    });
    if (primaryUpdated?.firstName !== "UpdatedName")
      throw new Error("❌ Primary DB update failed!");
    console.log("✅ Verified: Primary DB has updated data");

    // Verify Backup
    await new Promise((r) => setTimeout(r, 1000));
    // @ts-ignore
    const backupUpdated = await backupClient.profile.findUnique({
      where: { userId: createdUser.id },
    });
    if (backupUpdated?.firstName !== "UpdatedName")
      throw new Error("❌ Backup DB update failed (Dual-write missed)!");
    console.log("✅ Verified: Backup DB has updated data");

    console.log(
      "\n🎉 TEST COMPLETED SUCCESSFULY: Dual-write is working perfectly!"
    );
  } catch (error: any) {
    console.error("\n❌ TEST FAILED:", error);
    process.exit(1);
  } finally {
    console.log("\n🧹 Cleaning up test data...");
    /* 
    // Cleanup logic if desired, but keeping it can be useful for manual inspection
    try {
      if (getPrimaryClient()) await getPrimaryClient().user.delete({ where: { email: testEmail } });
    } catch (e) {}
    try {
      if (getBackupClient()) {
        // @ts-ignore
        await getBackupClient().user.delete({ where: { email: testEmail } });
      }
    } catch (e) {}
    */
    process.exit(0);
  }
}

runTest();
