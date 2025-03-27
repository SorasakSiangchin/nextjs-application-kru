"use client";

import React, { useEffect, useState } from "react";
import InputSearch from "../../common/InputSearch";
import CardProduct from "../../common/CardProduct";
import InputSelectCategory from "../../common/InputSelectCategory";
import useCategoryStore from "@/stores/categoryStore";
import useProductStore from "@/stores/productStore";
import InputSelectSort from "../../common/InputSelectSort";
import { sortData } from "@/data/sortData";
import { useDebounce } from "use-debounce";

const ShopPage = () => {
  const { categories, categoriesLoaded, loadCategories } = useCategoryStore();
  const { loadProducts, products, productsLoaded } = useProductStore();

  const [searchName, setSearchName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sortPrice, setSortPrice] = useState<"desc" | "asc">("asc");

  const [debouncedQuery] = useDebounce(searchName, 300);

  useEffect(() => {
    // console.log("searchName : ", searchName);
    loadCategories();
  }, []);

  useEffect(() => {
    loadProducts({
      categoryId,
      searchName: debouncedQuery,
      sortPrice,
    });
  }, [categoryId, sortPrice]);

  useEffect(() => {
    loadProducts({
      categoryId,
      searchName: debouncedQuery,
      sortPrice,
    });
  }, [debouncedQuery]);

  return (
    <div className="mt-8 h-auto">
      {/* toolbar */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="grid col-span-1">
          <h1 className="text-3xl">รายการสินค้า</h1>
        </div>
        <div className="grid col-span-2 ">
          <div className="flex flex-col w-full gap-3 justify-start lg:justify-end md:flex-row">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 ">
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
