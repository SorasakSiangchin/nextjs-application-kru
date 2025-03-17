"use client";

import useCategoryStore from "@/stores/categoryStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, styled, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import formValidate from "./formValidate";
import { createProduct } from "@/app/_actions/productAction";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const StockAddPage = () => {
  const { categories, categoriesLoaded, loadCategories } = useCategoryStore();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const route = useRouter();
  useEffect(() => {
    // โหลด category list
    loadCategories();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      file: "",
      detail: "",
      categoryId: "",
    },

    resolver: zodResolver(formValidate),
  });

  const onSubmit = handleSubmit(async (value) => {
    console.log("value : ", value);

    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("price", value.price.toString());
    formData.append("stock", value.stock.toString());
    formData.append("detail", value.detail);
    formData.append("categoryId", value.categoryId);
    formData.append("file", value.file);

    const result = await createProduct(formData as any);
    if (result.success) {
      alert("บันทึกสำเร็จ");
      route.push("/stock");
      return;
    }
    alert("บันทึกไม่สำเร็จ");
  });

  return (
    <div className="flex flex-col justify-center items-center gap-4 mx-auto max-w-2xl ">
      <p className="text-3xl">Create Product</p>
      <form onSubmit={onSubmit} className="w-full">
        <div className="flex gap-4 flex-col w-full">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                label="Price"
                inputProps={{ min: 0 }}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                }}
                type="number"
                variant="outlined"
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="stock"
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value === 0 ? "" : field.value}
                inputProps={{ min: 0 }}
                onChange={(e) => {
                  field.onChange(Number(e.target.value));
                }}
                label="Stock"
                type="number"
                variant="outlined"
                error={!!errors.stock}
                helperText={errors.stock?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={categories.find((c) => c.id === field.value) || null}
                onChange={(_, value) => field.onChange(value?.id || "")}
                options={categories}
                loading={!categoriesLoaded}
                getOptionLabel={(option) => option.name}
                getOptionKey={(option) => option.id}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    error={!!errors.categoryId}
                    helperText={errors.categoryId?.message}
                  />
                )}
              />
            )}
          />

          <Controller
            control={control}
            name="detail"
            render={({ field }) => (
              <TextField
                {...field}
                label="Detail"
                variant="outlined"
                error={!!errors.detail}
                helperText={errors.detail?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="file"
            render={({ field }) => (
              <Box>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<CloudUploadIcon />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.target.files && event.target.files.length > 0) {
                        const file = event.target.files[0];

                        // set file to form
                        field.onChange(file);

                        const reader = new FileReader();
                        reader.onload = () => {
                          setPreviewImage(reader.result as string);
                        };
                        reader.onerror = () => {
                          setPreviewImage(null);
                        };

                        reader.readAsDataURL(file);
                        return;
                      }
                      console.log("file null : ");
                      setPreviewImage(null);
                      field.onChange(null);
                    }}
                  />
                </Button>
              </Box>
            )}
          />

          {previewImage && (
            <Box
              sx={{
                width: 200,
                height: 200,
              }}
            >
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Box>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="contained"
              color="inherit"
              onClick={() => route.back()}
            >
              กลับ
            </Button>
            <Button variant="contained" color="success" type="submit">
              บันทึก
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StockAddPage;
