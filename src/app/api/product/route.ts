import { ProductData } from "@/interfaces/product/product";
import { ResponseService } from "@/interfaces/responseService";
import productService from "@/lib/product";
import { NextRequest, NextResponse } from "next/server";

// path => ช่วยในการทำงานกับ path (เส้นทาง) ของไฟล์และโฟลเดอร์
import path from "path";

// fs => (ย่อมาจาก File System) เป็น core module มีหน้าที่ในการจัดการไฟล์
import fs from "fs";

import { v4 as uuidv4 } from "uuid"; // ติดตั้ง uuid ด้วย: npm install uuid @types/uuid

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const categoryId = searchParams.get("categoryId") || undefined;

  const searchName = searchParams.get("searchName") || undefined;

  const sortPrice = searchParams.get("sortPrice") || "asc";

  const products = await productService.getProducts({
    categoryId,
    searchName,
    sortPrice,
  });

  return NextResponse.json(products);
}

// ข้อควรระวัง
// ตอน save ลงฐานข้อมูล type ต้องถูกต้อง
// ตอน save property ต้องตรงกับ schema
export async function POST(
  request: NextRequest,
  context: {
    params: {
      route: string;
    };
  }
): Promise<any> {
  try {
    const formData = await request.formData();
    // ชื่อคุณสมบัติ (property name) ของออบเจ็กต์นี้จะเป็นชนิด string เสมอ
    const formDataObject: { [key: string]: any } = {};

    // entries => กำหนดแต่ละครั้งที่วนลูปให้เป็น [key, value]
    for (const [key, value] of formData.entries()) {
      formDataObject[key] = value;
    }

    let imageUrl = "";

    // ถ้ามี file
    if (formDataObject.file) {
      const file = formDataObject.file as File;

      // เป็นการ สร้าง path (เส้นทาง) ไปยังโฟลเดอร์ public
      // cwd => (current working directory) => มันบอกว่าตอนนี้เรา "อยู่ที่" โฟลเดอร์ไหนของโปรเจ็กต์
      const publicDir = path.join(process.cwd(), "public");

      // เป็นการสร้าง path ไปยัง public/products
      const productDir = path.join(publicDir, "products");

      // exists (แปลว่ามีอยู่จริงไหม?)
      if (!fs.existsSync(productDir)) {
        // สร้าง diretory จาก path => public/products
        fs.mkdirSync(productDir);
      }

      // อ่านไฟล์และคืนค่าออกมาเป็น ข้อมูล binary ดิบ ๆ ของไฟล์ที่อัปโหลด
      const bytes = await file.arrayBuffer();

      // Buffer => เป็น class ที่อยู่ใน Node.js เท่านั้น มีหน้าที่ จัดการกับข้อมูล binary
      // Buffer ของ Node.js เพื่อเตรียมพร้อมสำหรับการใช้งานกับ fs.writeFileSync()
      const buffer = Buffer.from(bytes);

      // ใช้นามสกุลไฟล์เดิม
      const otiginalName = file.name;
      // ดึงนามสกุลไฟล์
      const extension = path.extname(otiginalName);
      // สร้างชือใหม่
      const fileName = `${uuidv4()}${extension}`;
      // สร้าง path ไปยัง public/products/<ชื่อไฟล์>.นามสกุลไฟล์
      const filePath = path.join(productDir, fileName);

      // เขียนไฟล์ => buffer เปลียบสเหมือนเนื้อไฟล์  และเขียนไฟล์ตาม path นี้
      fs.writeFileSync(filePath, buffer);

      imageUrl = `/products/${fileName}`;
    }

    // ดึงข้อมูลทุกตัวยกเว้น file
    const { file, ...productDataWithoutFile } = formDataObject;

    // set product data
    const productData = {
      ...productDataWithoutFile,
      price: Number(productDataWithoutFile.price),
      stock: Number(productDataWithoutFile.stock),
      imageUrl,
    } as ProductData;

    const result = await productService.createProduct(productData);

    const response: ResponseService<ProductData> = {
      data: result as any,
      message: "",
      success: true,
    };

    return NextResponse.json(response);
  } catch (error) {
    const response: ResponseService<ProductData> = {
      data: null,
      message: error as any,
      success: false,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
