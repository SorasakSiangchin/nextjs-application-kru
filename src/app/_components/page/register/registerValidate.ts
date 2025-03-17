import { z } from "zod";

const registerSchemaValidate = z.object({
  firstName: z.string().min(1, { message: "กรุณาใส่ชื่อ" }),
  lastName: z.string().min(1, { message: "กรุณาใส่นามสกุล" }),
  email: z
    .string()
    .min(1, { message: "กรณากรอกอีเมล" })
    .email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z.string().min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
  age: z.string({ message: "กรุณากรอกอายุ" }).min(1, "อายุต้องมากกว่า 0"),
});

export default registerSchemaValidate;
