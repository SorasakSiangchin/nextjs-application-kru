"use server";
import { RegisterRequest } from "@/interfaces/user/registerRequest";
import fetchInterceptor from "../utils/fetchInterceptor";
import { ResponseService } from "@/interfaces/responseService";
import { SignJWT } from "jose";
import { UserData } from "@/interfaces/user/userData";
import { cookies } from "next/headers";
import { JWT_COOKIE, JWT_DURATION, JWT_SECRET } from "../utils/constant";

export async function login(
  email: string,
  password: string
): Promise<ResponseService<UserData>> {
  try {
    const result: ResponseService<UserData> = await fetchInterceptor.post(
      "/api/user/login",
      {
        email,
        password,
      }
    );

    const { data } = result;

    // exprire in 2 weeks
    const expirationTime = new Date(Date.now() + JWT_DURATION);

    // create token
    const token = await new SignJWT({ ...data }) // payload (ข้อมูลภายใน token)
      .setProtectedHeader({ alg: "HS256" }) // HS256 เป็นอัลกอริทึมเข้ารหัส
      .setExpirationTime(expirationTime) // กำหนดเวลาหมดอายุของ token
      .sign(JWT_SECRET); // เข้ารหัส JWT (JSON Web Token) ด้วยคีย์ลับ

    const cookiesSession = await cookies();

    // set token to cookie
    cookiesSession.set(
      JWT_COOKIE,
      JSON.stringify({
        token,
        user: data,
      }),
      {
        secure: true,
        sameSite: "strict", // ป้องกันการส่ง Cookie ไปกับ request ข้ามไซต์ (เว็บไซต์หนึ่งพยายามเรียกใช้ทรัพยากรหรือส่งคำขอไปยังอีกเว็บไซต์หนึ่ง) (ป้องกัน CSRF)
        path: "/", // Cookie ใช้ได้ทุก path ของเว็บไซต์
      }
    );

    return result;
  } catch (error: any) {
    return error;
  }
}

export async function register(
  data: RegisterRequest
): Promise<ResponseService<UserData>> {
  try {
    const result = await fetchInterceptor.post("/api/user/register", data);

    return result;
  } catch (error: any) {
    return error;
  }
}

export async function logout(): Promise<string> {
  const cookiesSession = await cookies();

  cookiesSession.delete(JWT_COOKIE);

  return "OK";
}

export async function fetchMembers(): Promise<ResponseService<UserData[]>> {
  const result = await fetchInterceptor.get("/api/user");

  return result;
}

export async function getUser(): Promise<UserData | null> {
  const cookiesSession = await cookies();

  const cookiesData: any = cookiesSession.get(JWT_COOKIE)?.value;

  if (!cookiesData) {
    return null;
  }

  return JSON.parse(cookiesData || "{}").user as UserData;
}
