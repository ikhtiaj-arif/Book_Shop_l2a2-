import express from "express";
import { CategoryController } from "./category.controller";

const router = express.Router();

const { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory } = CategoryController;

//we will use controller function to determine the request response actions for each products routes
router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:categoryId", getCategory);
router.patch("/:categoryId",updateCategory);
router.delete("/:categoryId", deleteCategory);

export const categoryRoutes = router;
