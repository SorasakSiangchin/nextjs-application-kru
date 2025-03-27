import { z } from "zod";

const loginSchemaValidate = z.object({
  email: z
    .string({ message: "กรณากรอกอีเมล" })
    .email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z
    .string({ message: "กรณากรอกรหัสผ่าน" })
    .min(6, "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร"),
});

export default loginSchemaValidate;
