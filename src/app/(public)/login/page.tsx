import { getUser } from "@/app/_actions/userAction";
import LoginPage from "@/components/page/login/LoginPage";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
};

const Login = async () => {
  const user = await getUser();

  if (user) redirect("/shop");
  return <LoginPage />;
};

export default Login;
