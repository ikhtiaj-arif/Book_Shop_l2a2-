"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
const { createBook, getAllBooks, getBook, updateBook, deleteBook } = products_controller_1.productControllers;
//we will use controller function to determine the request response actions for each products routes
router.post('/products', createBook);
router.get('/products', getAllBooks);
router.get('/products/:productId', getBook);
router.put('/products/:productId', updateBook);
router.delete('/products/:productId', deleteBook);
exports.productsRoutes = router;
