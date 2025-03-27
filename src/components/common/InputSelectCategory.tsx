"use client";

import { Category } from "@/interfaces/category/category";
import { Autocomplete, TextField } from "@mui/material";
import React, { FC } from "react";
import { boolean } from "zod";

type Props = {
  categories: Category[];
  categoriesLoaded: boolean;
  setCategoryId: (id: string) => void;
};

const InputSelectCategory: FC<Props> = ({
  categories,
  categoriesLoaded,
  setCategoryId,
}) => {
  return (
    <Autocomplete
      disablePortal
      loading={!categoriesLoaded}
      loadingText="กำลังโหลดข้อมูล..."
      getOptionLabel={(option) => option.name}
      getOptionKey={(option) => option.id}
      onChange={(_, value) => setCategoryId(value?.id ?? "")}
      options={categories}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label="ประเภทสินค้า"
          className="w-full"
        />
      )}
    />
  );
};

export default InputSelectCategory;
