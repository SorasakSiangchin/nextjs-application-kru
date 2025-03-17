"use client";

import { TextField } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchName: string;
  setSearchName: (searchName: string) => void;
};

const InputSearch: FC<Props> = ({ searchName, setSearchName }) => {
  const [debouncedQuery] = useDebounce(searchName, 300);

  // useEffect(() => {}, [debouncedQuery]);

  return (
    <div className="relative">
      <TextField
        size="small"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
        label="ค้นหาสินค้า"
        className="w-full"
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}
      />
    </div>
  );
};

export default InputSearch;
