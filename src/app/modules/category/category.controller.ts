import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const {
  getCategoryFromDB,
  getAllCategoriesFromDB,
  createCategoryIntoDB,
  updateCategoryDB,
  deleteCategoryDB,
} = CategoryService;

const createCategory = async (req: Request, res: Response) => {
  try {
    const categoryData = req.body;
    //passed the client data to the services function to handle the database actions
    const result = await createCategoryIntoDB(categoryData);

    res.status(200).json({
      message: "Category created successfully",
      success: true,
      data: result,
    });
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || "Something went wrong",
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await getAllCategoriesFromDB();
    res.status(200).json({
      message: "Categories retrieved successfully",
      success: true,
      data: result,
    });
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || "Something went wrong",
    });
  }
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.categoryId;
    const result = await getCategoryFromDB(categoryId);

    if (result) {
      res.status(200).json({
        message: "Book retrieved successfully",
        success: true,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book not found!",
      });
    }
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || "Something went wrong",
    });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const categoryID = req.params.categoryId;
    const categoryData = req.body;

    const result = await updateCategoryDB(categoryID, categoryData);
    if (result) {
      res.status(200).json({
        message: "Category updated successfully",
        success: true,
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || "Something went wrong",
    });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryID = req.params.categoryId;
    const result = await deleteCategoryDB(categoryID);

    if (result) {
      res.status(200).json({
        message: "Category deleted successfully",
        success: true,
        data: {},
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Category not found!",
      });
    }
    console.log(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      message: error._message,
      success: false,
      error: error || "Something went wrong",
    });
  }
};

export const CategoryController = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
