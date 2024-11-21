"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//we will use controller function to determine the request response actions for each products routes
router.post('/create-product');
exports.ProductsRoutes = router;
