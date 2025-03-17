import { fetchProduct } from "@/app/_actions/productAction";
import StockEditPage from "@/app/_components/page/stock/StockEditPage";
import { ProductData } from "@/interfaces/product/product";
import { Metadata } from "next";
import React from "react";

type Props = {
  searchParams: {
    id?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  let product = {} as ProductData;

  if (searchParams.id) {
    product = await fetchProduct(searchParams.id);
  }

  return {
    title: product.name ?? "Stock Edit",
    description: product.name + "price: " + product.price,
  };
}

//TODO: สรวจสอบว่ามี product หรือไม่

const StockEdit = async ({ searchParams }: Props) => {
  let product = {} as ProductData;

  if (searchParams.id) {
    product = await fetchProduct(searchParams.id);
  }

  return <StockEditPage product={product} />;
};

export default StockEdit;
