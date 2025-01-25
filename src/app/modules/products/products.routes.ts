import express from "express";
import { productControllers } from "./products.controller";

const router = express.Router();

const { createBook, getAllBooks, getBook, updateBook, deleteBook } =
  productControllers;

//we will use controller function to determine the request response actions for each products routes
router.post("/", createBook);
router.get("/", getAllBooks);
router.get("/:productId", getBook);
router.put("/:productId", updateBook);
router.delete("/:productId", deleteBook);

export const productsRoutes = router;
