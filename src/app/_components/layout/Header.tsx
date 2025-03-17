"use client";

import useUserStore from "@/stores/userStore";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { BsShop } from "react-icons/bs";
import { logout } from "@/app/_actions/userAction";
import Swal from "sweetalert2";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const Header = () => {
  const route = useRouter();
  const { user } = useUserStore();

  const onLogout = async () => {
    Swal.fire({
      title: "ออกจากระบบหรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await logout();
        if (result === "OK") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "ออกจากระบบสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => route.push("/"));

          return;
        }
      }
    });
  };

  return (
    <header className="bg-white border">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* logo & menu */}
          <div className="flex gap-7 items-center">
            <div className="md:flex md:items-center md:gap-12">
              <a
                className="block text-teal-600"
                onClick={() => route.push("/")}
              >
                <BsShop size={35} />
              </a>
            </div>
            <div className="hidden md:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <a
                      className="text-gray-500 transition cursor-pointer hover:text-gray-500/75"
                      onClick={() => route.push("/shop")}
                    >
                      Shop
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-500 transition cursor-pointer hover:text-gray-500/75"
                      onClick={() => route.push("/stock")}
                    >
                      Stock
                    </a>
                  </li>
                  {user?.roleCode === "ADMIN" && (
                    <li>
                      <a
                        className="text-gray-500 transition cursor-pointer hover:text-gray-500/75"
                        onClick={() => route.push("/member")}
                      >
                        Member
                      </a>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>

          {/* my name */}
          <div className="flex gap-3 items-center">
            <div className="flex gap-1">
              {user?.roleCode === "ADMIN" && <AdminPanelSettingsIcon />}
              <p>{(user?.firstName ?? "") + " " + (user?.lastName ?? "")}</p>
            </div>
            <IconButton onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
