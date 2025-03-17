"use server";

import { ProductData, ProductParam } from "@/interfaces/product/product";
import fetchInterceptor from "../utils/fetchInterceptor";
import { ResponseService } from "@/interfaces/responseService";

export async function fetchProducts(params: ProductParam) {
  const qurery = new URLSearchParams({
    searchName: params.searchName || "",
    categoryId: params.categoryId || "",
    sortPrice: params.sortPrice || "",
  }).toString();

  const response = await fetchInterceptor.get("/api/product?" + qurery);

  return response;
}

export async function fetchProduct(id: string) {
  const response = await fetchInterceptor.get(`/api/product/${id}`);
  return response;
}

export async function createProduct(
  product: any
): Promise<ResponseService<ProductData>> {
  try {
    const result: ResponseService<ProductData> = await fetchInterceptor.post(
      "/api/product",
      product
    );

    return result;
  } catch (error: any) {
    return error;
  }
}

export async function editProduct(
  id: string,
  product: any
): Promise<ResponseService<ProductData>> {
  try {
    const result: ResponseService<ProductData> = await fetchInterceptor.put(
      `/api/product/${id}`,
      product
    );

    return result;
  } catch (error: any) {
    return error;
  }
}

export async function removeProduct(id: string): Promise<string> {
  try {
    const response = await fetchInterceptor.del(`/api/product/${id}`);
    return response;
  } catch (error: any) {
    return error;
  }
}
