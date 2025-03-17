import StockPage from "@/app/_components/page/stock/StockPage";
import { Metadata } from "next";
import React from "react";

export const metaData: Metadata = {
  title: "Stock",
  description: "Stock page",
};

const Stock = () => {
  return <StockPage />;
};

export default Stock;
