import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import type { Adapter } from "next-auth/adapters";

// Default clinic ID for Integrative Psych
const DEFAULT_CLINIC_ID =
  process.env.DEFAULT_CLINIC_ID || "uvfoatdxzh7c1s395kc61u7i";

/**
 * Custom Prisma Adapter that handles multi-tenant (clinicId) requirements
 */
export function CustomPrismaAdapter(prisma: PrismaClient): Adapter {
  const baseAdapter = PrismaAdapter(prisma);

  return {
    ...baseAdapter,

    // Override getUserByEmail to use email_clinicId compound key
    async getUserByEmail(email: string) {
      const user = await prisma.user.findFirst({
        where: {
          email,
          clinicId: DEFAULT_CLINIC_ID,
        },
      });
      return user;
    },

    // Override createUser to include clinicId
    async createUser(data: any) {
      const user = await prisma.user.create({
        data: {
          ...data,
          clinicId: DEFAULT_CLINIC_ID,
        },
      });
      return user;
    },

    // Override linkAccount to ensure it works with multi-tenant users
    async linkAccount(data: any) {
      const account = await prisma.account.create({
        data,
      });
      return account;
    },
  };
}
