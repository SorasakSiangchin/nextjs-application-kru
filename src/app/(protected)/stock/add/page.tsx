import StockAddPage from "@/components/page/stock/StockAddPage";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Stock Add",
  description: "Stock Add page",
};

const StockAdd = () => {
  return <StockAddPage />;
};

export default StockAdd;
