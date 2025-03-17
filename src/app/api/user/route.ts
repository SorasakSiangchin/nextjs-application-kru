import { ResponseService } from "@/interfaces/responseService";
import { UserData } from "@/interfaces/user/userData";
import userService from "@/lib/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const result = await userService.GetUsers();

    console.log("result : ", result);

    const response: ResponseService<UserData[]> = {
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
