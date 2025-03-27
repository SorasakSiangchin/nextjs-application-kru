import { z } from "zod";

// const FileSchema = z.instanceof(File).optional().refine(
//   (file) => file?.size !== 0,
//   { message: "กรุณาเลือกรูปภาพ" }
// );

const FileSchema = z.instanceof(File).nullable();

const formValidate = z.object({
  name: z.string().min(1, { message: "กรุณาใส่ชื่อ" }),
  price: z.number().min(1, { message: "กรุณาใส่ราคา" }),
  stock: z.number().min(1, { message: "กรุณาใส่จำนวนคลัง" }),
  file: FileSchema,
  // imageUrl: z.string(),
  detail: z.string(),
  categoryId: z.string().min(1, { message: "กรุณาเลือกประเภทสินค้า" }),
});

export default formValidate;
