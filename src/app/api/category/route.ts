import categoryService from "@/lib/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const response = await categoryService.getCategories();
  return NextResponse.json(response);
}
