import { Category } from "../category/category";

export interface ProductData {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  detail?: string;
  categoryId: string;
  category: Category;
}

export interface ProductParam {
  searchName?: string;
  categoryId?: string;
  sortPrice?: string;
}
