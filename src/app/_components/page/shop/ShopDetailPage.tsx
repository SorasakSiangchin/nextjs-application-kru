"use client";

import { ProductData } from "@/interfaces/product/product";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type Props = {
  product: ProductData;
};

const ShopDetailPage: FC<Props> = ({ product }) => {
  const route = useRouter();

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-3">
        {product?.imageUrl ? (
          <img
            alt={`product-${product.id}`}
            src={product?.imageUrl ?? ""}
            className="h-64 w-[50%] object-cover border sm:h-80 lg:h-96"
          />
        ) : (
          <></>
        )}
        <div className="flow-root w-[50%]">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Name</dt>
              <dd className="text-gray-700 sm:col-span-2">{product.name}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Price</dt>
              <dd className="text-gray-700 sm:col-span-2">{product.price}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Stock</dt>
              <dd className="text-gray-700 sm:col-span-2">{product.stock}</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Category Name</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {product.category.name}
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Detail</dt>
              <dd className="text-gray-700 sm:col-span-2">
                {product?.detail ?? ""}
              </dd>
            </div>
          </dl>
        </div>
        <div className="w-[50%] flex justify-end">
          <Button
            variant="contained"
            color="inherit"
            onClick={() => route.back()}
            type="button"
            className="
            inline-block 
            rounded-lg 
           bg-gray-500 
            px-5 
            py-3 
            text-sm 
            font-medium 
           text-white
            transition-all 
            duration-500
            active:scale-75"
          >
            กลับ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopDetailPage;
