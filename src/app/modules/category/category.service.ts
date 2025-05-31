import { Types } from "mongoose";
import { Book } from "../products/products.model";
import { Category, ICategory } from "./category.model";

const createCategoryIntoDB = async (bookData: ICategory) => {
  const result = await Category.create(bookData);
  return result;
};

const getAllCategoriesFromDB = async () => {
  const categories = await Category.find();
    for (const category of categories) {
    const bookCount = await Book.countDocuments({ category: category._id });
    if (category.count !== bookCount) {
      category.count = bookCount;
      await category.save();
    }
  }
  return categories;
};

const getCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id);

  return result;
};

export const updateCategoryDB = async (id: string, payload: Partial<ICategory>) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid category ID");
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, payload, {
    new: true, // returns the updated document
    runValidators: true,
  });

  if (!updatedCategory) {
    throw new Error("Category not found or update failed");
  }

  return updatedCategory;
};

export const deleteCategoryDB = async (id: string) => {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error("Invalid category ID");
  }

  const deletedCategory = await Category.findByIdAndDelete(id);

  if (!deletedCategory) {
    throw new Error("Category not found or already deleted");
  }

  return deletedCategory;
};


export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
  getCategoryFromDB, updateCategoryDB,
  deleteCategoryDB
};
