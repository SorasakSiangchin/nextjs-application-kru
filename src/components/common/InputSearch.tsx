"use client";
import { TextField } from "@mui/material";
import { FC } from "react";

import SearchIcon from "@mui/icons-material/Search";

type Props = {
  searchName: string;
  setSearchName: (searchName: string) => void;
};

const InputSearch: FC<Props> = ({ searchName, setSearchName }) => {
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
