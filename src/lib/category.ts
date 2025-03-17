import { db } from "./db";

const getCategories = async () => {
  return await db.category.findMany();
};

const categoryService = {
  getCategories,
};

export default categoryService;
