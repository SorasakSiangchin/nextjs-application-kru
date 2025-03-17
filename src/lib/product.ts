import { ProductParam } from "@/interfaces/product/product";
import { db } from "./db";

async function getProducts({
  categoryId = "",
  searchName = "",
  sortPrice = "",
}: ProductParam) {
  // console.log("categoryId : ", categoryId);
  // console.log("searchName : ", searchName);
  // console.log("sortPrice : ", sortPrice);

  return await db.product.findMany({
    where: {
      name: {
        contains: searchName ? searchName : undefined, // ค้นหาชื่อสินค้า
      },
      categoryId: {
        equals: categoryId ? categoryId : undefined, // ค้นหาประเภทสินค้า
      },
    },
    orderBy: {
      price: sortPrice as any, // เรียงราคา
    },
    include: {
      category: true,
    },
  });
}

async function getProduct(id: string) {
  return await db.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

async function createProduct(data: any) {
  return await db.product.create({ data });
}

async function updateProduct(id: string, data: any) {
  return await db.product.update({ where: { id }, data });
}

async function deleteProduct(id: string) {
  return await db.product.delete({ where: { id } });
}

const productService = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
