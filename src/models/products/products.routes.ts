import express from 'express';
import { productControllers } from './products.controller';

const router = express.Router();

const { createBook, getAllBooks, getBook, updateBook, deleteBook } =
  productControllers;

//we will use controller function to determine the request response actions for each products routes
router.post('/products', createBook);
router.get('/products', getAllBooks);
router.get('/products/:productId', getBook);
router.put('/products/:productId', updateBook);
router.delete('/products/:productId', deleteBook);

export const productsRoutes = router;
