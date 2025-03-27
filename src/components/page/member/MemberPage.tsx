"use client";

import useUserStore from "@/stores/userStore";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect } from "react";

const MemberPage = () => {
  const { loadMembers, members, membersLoaded } = useUserStore();

  useEffect(() => {
    loadMembers();
  }, []);

  const columns: GridColDef<(typeof members)[number]>[] = [
    {
      field: "fullName",
      headerName: "ชื่อ-นามสกุล",
      headerClassName: "font-bold",
      width: 300,
      renderCell: ({ row }) => {
        return `${row.firstName} ${row.lastName}`;
      },
    },
    {
      field: "email",
      headerClassName: "font-bold",
      headerName: "อีเมล",
      width: 300,
    },
    {
      field: "age",
      headerClassName: "font-bold",
      headerName: "อายุ",
      width: 300,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full">
      {/* title */}
      <p className="font-bold text-2xl ">Members</p>
      <DataGrid
        showColumnVerticalBorder
        showCellVerticalBorder
        columns={columns}
        rows={members}
        loading={!membersLoaded}
      />
    </div>
  );
};

export default MemberPage;
