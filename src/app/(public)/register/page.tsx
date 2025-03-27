import { getUser } from "@/app/_actions/userAction";
import RegisterPage from "@/components/page/register/RegisterPage";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
};

const Register = async () => {
  const user = await getUser();

  if (user) redirect("/shop");

  return <RegisterPage />;
};

export default Register;
