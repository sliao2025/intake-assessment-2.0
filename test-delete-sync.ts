import { prisma, getPrimaryClient, getBackupClient } from "./src/lib/db-router";
import dotenv from "dotenv";

// Load env vars
dotenv.config({ path: ".env.local" });

async function runDeleteTest() {
  console.log("🚀 Starting Delete Mirroring Test...");
  const timestamp = Date.now();
  const testEmail = `delete-test-${timestamp}@example.com`;
  const clinicId = "uvfoatdxzh7c1s395kc61u7i";

  try {
    // 1. Setup - Create User
    console.log("\n1️⃣ Creating Test User (Peyton Manning II)...");
    const createdUser = await prisma.user.create({
      data: {
        email: testEmail,
        name: "Peyton Manning II",
        clinicId: clinicId,
        image: "https://example.com/peyton.jpg",
      },
    });
    console.log(`✅ User created: ${createdUser.id}`);

    // Wait for sync
    await new Promise((r) => setTimeout(r, 2000));

    // Verify it exists in both
    const pClient = getPrimaryClient();
    const bClient = getBackupClient();

    if (!bClient) throw new Error("No backup client configured");

    const pUser = await pClient.user.findUnique({
      where: { id: createdUser.id },
    });
    // @ts-ignore
    const bUser = await bClient.user.findUnique({
      where: { id: createdUser.id },
    });

    if (!pUser || !bUser) {
      throw new Error(
        `User creation failed to sync. Primary: ${!!pUser}, Backup: ${!!bUser}`
      );
    }
    console.log("✅ User confirmed in both databases.");

    // 2. Perform Delete
    console.log("\n2️⃣ Deleting User from Primary...");
    await prisma.user.delete({
      where: { id: createdUser.id },
    });
    console.log("✅ Delete command executed.");

    // Wait for sync
    await new Promise((r) => setTimeout(r, 2000));

    // 3. Verify Deletion
    const pUserAfter = await pClient.user.findUnique({
      where: { id: createdUser.id },
    });
    // @ts-ignore
    const bUserAfter = await bClient.user.findUnique({
      where: { id: createdUser.id },
    });

    if (pUserAfter) console.error("❌ User still exists in PRIMARY!");
    else console.log("✅ User successfully deleted from PRIMARY.");

    if (bUserAfter)
      console.error(
        "❌ User still exists in BACKUP! (Delete failed to mirror)"
      );
    else console.log("✅ User successfully deleted from BACKUP.");

    if (!pUserAfter && !bUserAfter) {
      console.log("\n🎉 TEST SUCCESS: Delete was correctly mirrored.");
    } else {
      console.log("\n⚠️ TEST FAILED: Discrepancy detected.");
    }
  } catch (error: any) {
    console.error("\n❌ TEST ERROR:", error);
  } finally {
    process.exit(0);
  }
}

runDeleteTest();
