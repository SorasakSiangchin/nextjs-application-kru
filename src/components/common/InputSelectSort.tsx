"use client";

import { Autocomplete, TextField } from "@mui/material";
import React, { FC } from "react";

type Props = {
  setSortPrice: (data: "asc" | "desc") => void;
  sortPrice: "asc" | "desc";
  dataSort: {
    title: string;
    value: string;
  }[];
};

const InputSelectSort: FC<Props> = ({ sortPrice, setSortPrice, dataSort }) => {
  return (
    <Autocomplete
      disablePortal
      getOptionLabel={(option) => option.title}
      getOptionKey={(option) => option.value}
      onChange={(_, value) => setSortPrice((value?.value as any) ?? "asc")}
      options={dataSort}
      className="min-w-48"
      renderInput={(params) => (
        <TextField {...params} size="small" label="เรียงราคา" />
      )}
    />
  );
};

export default InputSelectSort;
