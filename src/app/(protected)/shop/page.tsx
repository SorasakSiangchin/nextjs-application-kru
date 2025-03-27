import ShopPage from "@/components/page/shop/ShopPage";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "Shop",
  description: "Shop page",
};

const Shop = async () => {
  return <ShopPage />;
};

export default Shop;
