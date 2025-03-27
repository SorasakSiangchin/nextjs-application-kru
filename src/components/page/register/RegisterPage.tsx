"use client";

import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import registerSchemaValidate from "./registerValidate";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { register } from "@/app/_actions/userAction";
import { RegisterRequest } from "@/interfaces/user/registerRequest";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const route = useRouter();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      age: 0,
    },

    resolver: zodResolver(registerSchemaValidate),
  });

  const onSubmit = handleSubmit(async (value) => {
    const result = await register(value as RegisterRequest);

    if (result.success) {
      Swal.fire({
        title: "เข้าสู่ระบบสำเร็จ",
        timer: 1500,
        icon: "success",
        showCancelButton: false,
      }).then(() => {
        route.push("/login");
      });

      return;
    }

    Swal.fire({
      title: "เข้าสู่ระบบไม่สำเร็จ",
      text: JSON.stringify(result.message),
      icon: "error",
      showCancelButton: false,
    });
  });

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>
      </div>
      <form
        onSubmit={onSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              id="firstName"
              name="firstName"
              error={(errors.firstName?.message ?? "") != ""}
              helperText={errors.firstName?.message ?? ""}
              label="First Name"
              variant="outlined"
              className="w-full"
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.lastName}
              helperText={errors.lastName?.message ?? ""}
              label="Last Name"
              variant="outlined"
              className="w-full"
            />
          )}
        />

        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.age}
              type="number"
              helperText={errors.age?.message ?? ""}
              label="Age"
              variant="outlined"
              className="w-full"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.email}
              helperText={errors.email?.message ?? ""}
              label="Email"
              variant="outlined"
              className="w-full"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={!!errors.password}
              helperText={errors.password?.message ?? ""}
              label="Password"
              variant="outlined"
              className="w-full"
            />
          )}
        />

        <div className="flex items-center justify-between">
          <Link href={"/login"} className="underline cursor-pointer">
            Back
          </Link>
          <Button
            type="submit"
            variant="contained"
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
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
