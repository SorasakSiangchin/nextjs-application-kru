import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}

export const db = createPrismaClient();

/** @returns {PrismaClient} */
function createPrismaClient() {
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient();
  }

  return globalThis.prismaClient;
}

// ป้องกันการสร้าง instance ใหม่ทุกครั้งใน development
// declare global {
//     var prisma: PrismaClient | undefined
//   }

//   const prisma = global.prisma || new PrismaClient()

//   if (process.env.NODE_ENV !== 'production') global.prisma = prisma
