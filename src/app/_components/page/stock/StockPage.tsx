"use client";
import useCategoryStore from "@/stores/categoryStore";
import useProductStore from "@/stores/productStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import InputSearch from "../../common/InputSearch";
import InputSelectCategory from "../../common/InputSelectCategory";
import InputSelectSort from "../../common/InputSelectSort";
import { sortData } from "@/data/sortData";
import { BiSolidEdit } from "react-icons/bi";
import { BiSolidTrashAlt } from "react-icons/bi";
import { BiInfoCircle } from "react-icons/bi";
import { BiAddToQueue } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ProductData } from "@/interfaces/product/product";
import { removeProduct } from "@/app/_actions/productAction";
import Swal from "sweetalert2";

const StockPage = () => {
  const route = useRouter();
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

  const onRemove = async (id: string) => {
    Swal.fire({
      title: "ลบสินค้าหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await removeProduct(id);

        if (result === "OK") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ลบสินค้าสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() =>
            loadProducts({
              categoryId,
              searchName,
              sortPrice,
            })
          );

          return;
        }

        Swal.fire({
          position: "center",
          icon: "error",
          title: "ลบสินค้าไม่สำเร็จ",
          text: result,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const columns: GridColDef<ProductData>[] = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
      renderCell: ({ row }) => row.name,
    },
    {
      field: "price",
      headerName: "Price",
      width: 200,
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 200,
      renderCell: ({ row }) => row.category.name,
    },
    {
      field: "stock",
      headerName: "Stock",
      width: 200,
    },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 200,
      cellClassName: "flex justify-center items-center",
      renderCell: ({ row }) => (
        <div>
          {row.imageUrl && (
            <Image
              src={row.imageUrl ?? ""}
              alt={row.name}
              width={100}
              height={100}
            />
          )}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: ({ row }) => (
        <div className="h-full flex items-center gap-3">
          <IconButton
            onClick={() => route.push(`/stock/edit?id=${row.id}`)}
            color="warning"
          >
            <BiSolidEdit className="text-2xl" />
          </IconButton>
          <IconButton onClick={() => onRemove(row.id)} color="error">
            <BiSolidTrashAlt className="text-2xl" />
          </IconButton>
          <IconButton
            color="info"
            onClick={() => route.push(`/shop/${row.id}`)}
          >
            <BiInfoCircle className="text-2xl" />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col items-center ">
        {/* title */}
        <p className="font-bold text-2xl ">Product Stock</p>

        <div className="flex w-full justify-between mt-8">
          <div className="flex gap-3">
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
          <Button
            onClick={() => route.push("/stock/add")}
            variant="contained"
            color="success"
            startIcon={<BiAddToQueue className="text-2xl" />}
          >
            Create Product
          </Button>
        </div>

        {/* table */}
        <div className="overflow-x-auto w-full rounded-lg border border-gray-200 mt-4">
          <DataGrid
            rows={products}
            columns={columns}
            rowHeight={110}
            rowSelection={false}
            loading={!productsLoaded}
          />
        </div>
      </div>
    </div>
  );
};

export default StockPage;
