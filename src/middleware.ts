import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { JWT_COOKIE } from "./app/utils/constant";
import { UserData } from "./interfaces/user/userData";

// middleware file คืออะไร?
export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(JWT_COOKIE)?.value;

  const userData = JSON.parse(cookie || "{}").user as UserData;

  const path = request.nextUrl.pathname;

  if (cookie === undefined && path !== "login" && path !== "register") {
    // บังคับให้ไปหน้า login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // https://medium.com/@chsherryy/implementing-role-based-access-control-in-next-js-next-auth-with-prisma-and-mongodb-324f1929cf93
  // check the role
  if (userData.roleCode !== "ADMIN") {
    if (path.startsWith("/member")) {
      return NextResponse.redirect(new URL("/shop", request.url));
    }
  }

  return NextResponse.next({
    request,
  });
}

// config ทำหน้าที่กำหนด เส้นทาง (routes) ที่ Middleware จะทำงาน
export const config = {
  // => "/", "/shop/:path*", "/stock/:path*", "/member/:path*"
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};

// => /((?!api|_next/static|_next/image|favicon.ico|login|register).*)
