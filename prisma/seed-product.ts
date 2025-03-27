import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    id: "1",
    name: "สมาร์ทโฟน XYZ",
    price: 15900,
    stock: 20,
    imageUrl: "/products/product-1.png",
    detail: "สมาร์ทโฟนหน้าจอ 6.5 นิ้ว กล้อง 64MP",
    categoryId: "1",
  },
  {
    id: "2",
    name: "เครื่องซักผ้า ABC",
    price: 8990,
    stock: 15,
    imageUrl: "/products/product-2.jpg",
    detail: "เครื่องซักผ้าฝาหน้า ประหยัดพลังงาน",
    categoryId: "2",
  },
  {
    id: "3",
    name: "เสื้อเชิ้ตลำลอง",
    price: 590,
    stock: 50,
    imageUrl: "/products/product-3.jpg",
    detail: "เสื้อเชิ้ตผ้าฝ้าย ใส่สบาย",
    categoryId: "3",
  },
  {
    id: "4",
    name: "รองเท้ากีฬา ZYX",
    price: 2290,
    stock: 30,
    imageUrl: "/products/product-4.jpg",
    detail: "รองเท้ากีฬาสำหรับวิ่ง เบาสบาย",
    categoryId: "3",
  },
  {
    id: "5",
    name: "กาแฟคั่วบดพิเศษ",
    price: 350,
    stock: 40,
    imageUrl: "/products/product-5.jpg",
    detail: "กาแฟอาราบิก้าแท้ 100%",
    categoryId: "4",
  },
  {
    id: "6",
    name: "ขนมเวเฟอร์ช็อกโกแลต",
    price: 25,
    stock: 100,
    imageUrl: "/products/product-6.jpg",
    detail: "เวเฟอร์เคลือบช็อกโกแลตเข้มข้น",
    categoryId: "4",
  },
  {
    id: "7",
    name: "ดัมเบล 10 กก.",
    price: 1290,
    stock: 25,
    imageUrl: "/products/product-7.jpg",
    detail: "ดัมเบลเหล็ก 10 กก. สำหรับออกกำลังกาย",
    categoryId: "5",
  },
  {
    id: "8",
    name: "จักรยานเสือภูเขา",
    price: 15900,
    stock: 10,
    imageUrl: "/products/product-8.jpg",
    detail: "จักรยานเสือภูเขา เกียร์ 21 สปีด",
    categoryId: "5",
  },
  {
    id: "9",
    name: "หูฟังไร้สาย",
    price: 2490,
    stock: 35,
    imageUrl: "/products/product-9.jpg",
    detail: "หูฟังไร้สายตัดเสียงรบกวน",
    categoryId: "1",
  },
  {
    id: "10",
    name: "เตาไมโครเวฟ",
    price: 3290,
    stock: 18,
    imageUrl: "/products/product-10.jpg",
    detail: "เตาไมโครเวฟขนาด 23 ลิตร",
    categoryId: "2",
  },
];

async function main() {
  products.map(async (prouct) => {
    await prisma.product.create({
      data: prouct as any,
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async () => {
    await prisma.$disconnect();
    process.exit(1);
  });
