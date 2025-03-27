import { fetchProduct } from "@/app/_actions/productAction";
import ShopDetailPage from "@/components/page/shop/ShopDetailPage";
import { ProductData } from "@/interfaces/product/product";
import React from "react";

type Props = {
  params: {
    id?: string;
  };
};

const ShopDetail = async ({ params: { id } }: Props) => {
  let product = {} as ProductData;

  if (id) {
    product = await fetchProduct(id);
  }

  return <ShopDetailPage product={product} />;
};

export default ShopDetail;
