import { ResponseService } from "@/interfaces/responseService";
import { UserData } from "@/interfaces/user/userData";
import userService from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  context: {
    params: {
      route: string;
    };
  }
): Promise<any> {
  const route = context?.params?.route ?? "";

  const body = await request.json();

  if (route === "register") {
    return register(body);
  } else if (route === "login") {
    return login(body);
  }
}

// login
async function login(data: any) {
  try {
    const result = await userService.Login(data);

    const response: ResponseService<UserData> = {
      data: result,
      message: "",
      success: true,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.log("error : ", error);

    const response: ResponseService<any> = {
      data: null,
      message: error,
      success: false,
    };

    return NextResponse.json(response, { status: 401 });
  }
}

// register
async function register(data: any) {
  try {
    const result = await userService.Register(data);

    const response: ResponseService<any> = {
      data: result,
      message: "",
      success: true,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    const response: ResponseService<any> = {
      data: null,
      message: error,
      success: false,
    };

    return NextResponse.json(response, { status: 401 });
  }
}
