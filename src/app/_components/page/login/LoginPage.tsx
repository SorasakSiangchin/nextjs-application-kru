"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import loginSchemaValidate from "./loginValidate";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { login } from "@/app/_actions/userAction";
import Swal from "sweetalert2";
import useUserStore from "@/stores/userStore";
const LoginPage = () => {
  const route = useRouter();

  const [isHidePass, setIsHidePass] = useState<boolean>(false);
  const { setUser } = useUserStore();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchemaValidate),
  });

  const onSubmit = handleSubmit(async (value) => {
    const result = await login(value.email, value.password);

    if (result.success) {
      Swal.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        if (result.data) setUser(result.data);
      });

      return;
    }

    Swal.fire({
      icon: "error",
      title: "เข้าสู่ระบบไม่สำเร็จ",
      text: JSON.stringify(result.message),
    });
  });

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Login</h1>
      </div>
      <form
        onSubmit={onSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <Controller
          control={control}
          name="email"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                id="email"
                label="Email"
                // !! convert to boolean
                error={!!errors.email}
                helperText={errors.email?.message ?? ""}
                variant="outlined"
                className="w-full"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => {
            return (
              <TextField
                {...field}
                id="password"
                type={isHidePass ? "text" : "password"}
                label="Password"
                variant="outlined"
                className="w-full"
                error={!!errors.password}
                helperText={errors.password?.message ?? ""}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton>
                          {!isHidePass ? (
                            <VisibilityIcon
                              onClick={() => setIsHidePass(!isHidePass)}
                            />
                          ) : (
                            <VisibilityOffIcon
                              onClick={() => setIsHidePass(!isHidePass)}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            );
          }}
        />

        <div className="flex items-center justify-between">
          <Link href={"/register"} className="underline cursor-pointer">
            Register
          </Link>
          <Button
            variant="contained"
            type="submit"
            className="
            inline-block 
            rounded-lg 
            bg-blue-500 
            px-5 
            py-3 
            text-sm 
            font-medium 
            text-white
            transition-all 
            duration-500
            active:scale-75"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
