import MemberPage from "@/app/_components/page/member/MemberPage";
import { Metadata } from "next";
import React from "react";

export const metaData: Metadata = {
  title: "Member",
  description: "Member Page",
};

const page = () => {
  return <MemberPage />;
};

export default page;
