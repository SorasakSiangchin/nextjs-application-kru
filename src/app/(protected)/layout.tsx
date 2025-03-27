import React from "react";

import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: "OTOP Store",
    template: "%s",
  },
};

export default function layout({ children }: Props) {
  return (
    <section className="flex flex-col min-h-screen ">
      <Header />
      <main className="p-5 max-w-[90rem] mx-auto w-full">{children}</main>
      <Footer />
    </section>
  );
}
