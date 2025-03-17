import { fetchCategories } from "@/app/_actions/categoryAction";
import { Category } from "@/interfaces/category/category";
import { ProductParam } from "@/interfaces/product/product";
import { create } from "zustand";

interface States {
  categories: Category[];
  categoriesLoaded: boolean;
}

interface Actions {
  loadCategories: () => void;
}

const useCategoryStore = create<States & Actions>((set) => ({
  categories: [],
  categoriesLoaded: false,
  loadCategories: async () => {
    set(() => ({ categoriesLoaded: false }));
    const response = await fetchCategories();
    set(() => ({ categories: response, categoriesLoaded: true }));
  },
}));

export default useCategoryStore;
