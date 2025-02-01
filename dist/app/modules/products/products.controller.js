"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productControllers = void 0;
const product_service_1 = require("./product.service");
const { createBookIntoDB, getAllBooksFromDB, getBookFromDB, updateBookToDB, deleteBookFromDB, } = product_service_1.productServices;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        //passed the client data to the services function to handle the database actions
        const result = yield createBookIntoDB(productData);
        res.status(200).json({
            message: "Book created successfully",
            success: true,
            data: result,
        });
        console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: error || "Something went wrong",
        });
    }
});
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield getAllBooksFromDB();
        res.status(200).json({
            message: "Books retrieved successfully",
            success: true,
            data: result,
        });
        console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: error || "Something went wrong",
        });
    }
});
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.productId;
        const result = yield getBookFromDB(bookID);
        if (result) {
            res.status(200).json({
                message: "Book retrieved successfully",
                success: true,
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }
        console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: error || "Something went wrong",
        });
    }
});
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.productId;
        const bookData = req.body;
        //  checking if the user is updating the quantity of the book or not
        if (bookData.quantity !== undefined) {
            if (bookData.quantity === 0) {
                bookData.inStock = false;
            }
            else {
                bookData.inStock = true;
            }
        }
        const result = yield updateBookToDB(bookID, bookData);
        if (result) {
            res.status(200).json({
                message: "Book updated successfully",
                success: true,
                data: result,
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }
        console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: error || "Something went wrong",
        });
    }
});
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookID = req.params.productId;
        const result = yield deleteBookFromDB(bookID);
        if (result) {
            res.status(200).json({
                message: "Book deleted successfully",
                success: true,
                data: {},
            });
        }
        else {
            res.status(404).json({
                success: false,
                message: "Book not found!",
            });
        }
        console.log(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: error || "Something went wrong",
        });
    }
});
exports.productControllers = {
    createBook,
    getAllBooks,
    getBook,
    updateBook,
    deleteBook,
};
