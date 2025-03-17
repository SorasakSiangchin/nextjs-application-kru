"use client";

import React, { FC, use, useEffect, useState } from "react";
import InputSearch from "../../common/InputSearch";
import CardProduct from "../../common/CardProduct";
import { ProductData } from "@/interfaces/product/product";
import InputSelectCategory from "../../common/InputSelectCategory";
import useCategoryStore from "@/stores/categoryStore";
import useProductStore from "@/stores/productStore";
import InputSelectSort from "../../common/InputSelectSort";
import { sortData } from "@/data/sortData";

const ShopPage = () => {
  const { categories, categoriesLoaded, loadCategories } = useCategoryStore();
  const { loadProducts, products, productsLoaded } = useProductStore();

  const [searchName, setSearchName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sortPrice, setSortPrice] = useState<"desc" | "asc">("asc");

  useEffect(() => {
    // console.log("searchName : ", searchName);
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts({
      categoryId,
      searchName,
      sortPrice,
    });
  }, [categoryId, searchName, sortPrice]);

  return (
    <div className="mt-8 h-auto">
      {/* toolbar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="grid col-span-1">
          <h1 className="text-3xl">รายการสินค้า</h1>
        </div>
        <div className="grid col-span-2">
          <div className="flex gap-3 justify-end">
            <InputSearch
              searchName={searchName}
              setSearchName={setSearchName}
            />
            <InputSelectCategory
              categories={categories}
              categoriesLoaded={categoriesLoaded}
              setCategoryId={setCategoryId}
            />
            <InputSelectSort
              setSortPrice={setSortPrice}
              sortPrice={sortPrice}
              dataSort={sortData}
            />
          </div>
        </div>
      </div>

      {/* product list */}
      <div className="mt-14">
        <div className="grid grid-cols-4 gap-5 ">
          {productsLoaded ? (
            products.length > 0 ? (
              products.map((product, index) => (
                <div key={index}>
                  <CardProduct product={product} />
                </div>
              ))
            ) : (
              <p className="flex justify-center items-center col-span-4">
                ไม่มีสินค้า
              </p>
            )
          ) : (
            <p className="flex justify-center items-center col-span-4">
              กำลังโหลด...{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
