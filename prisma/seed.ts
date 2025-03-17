import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  {
    id: "1",
    name: "test1",
  },
  {
    id: "2",
    name: "test2",
  },
  {
    id: "3",
    name: "test3",
  },
];

async function main() {
  categories.map(async (category) => {
    await prisma.category.create({
      data: category,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect(); // ปิด connection กับ database เมื่อเสร็จสิ้น
  })
  .catch(async (e) => {
    console.error(e); // แสดง error ถ้ามี
    await prisma.$disconnect();
    process.exit(1); // exit process ด้วย error code
  });
