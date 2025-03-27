import { PrismaClient } from "@prisma/client";

// เป็นการประกาศตัวแปร prisma บน global เพื่อให้ TypeScript รู้จักตัวแปรนี้
declare global {
  var prismaClient: PrismaClient | undefined;
}

export const db = createPrismaClient();

// ระบุว่า ฟังก์ชันจะ return ค่าเป็น PrismaClient
/** @returns {PrismaClient} **/
function createPrismaClient() {
  // globalThis => ตัวแปรมาตรฐาน ช่วยให้เราเข้าถึง global object
  if (!globalThis.prismaClient) {
    globalThis.prismaClient = new PrismaClient();
  }

  return globalThis.prismaClient;
}
