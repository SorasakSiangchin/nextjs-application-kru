"use server";

import fetchInterceptor from "../utils/fetchInterceptor";

export async function fetchCategories() {
  const response = await fetchInterceptor.get("/api/category");
  return response;
}
