import express from 'express';
import { productControllers } from './products.controller';

const router = express.Router();

const { createProduct } = productControllers;

//we will use controller function to determine the request response actions for each products routes
router.post('/create-product', createProduct);

export const ProductsRoutes = router;
