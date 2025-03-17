import { fetchProducts } from "@/app/_actions/productAction";
import { ProductData, ProductParam } from "@/interfaces/product/product";
import { create } from "zustand";

interface States {
  products: ProductData[];
  productsLoaded: boolean;
}

interface Actions {
  loadProducts: (params: ProductParam) => void;
}

const useProductStore = create<States & Actions>((set) => ({
  loadProducts: async (params) => {
    set(() => ({ productsLoaded: false }));
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await fetchProducts(params);
    set(() => ({ productsLoaded: true, products: response }));
  },
  products: [],
  productsLoaded: false,
}));

export default useProductStore;
