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
exports.productServices = void 0;
const products_model_1 = require("./products.model");
const createBookIntoDB = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    //established connection to the book model to create data according to the models schema to the database
    const result = yield products_model_1.Book.create(bookData);
    return result;
});
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    //get all books from db
    const result = yield products_model_1.Book.find();
    return result;
});
const getBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //get one book by _id using findById
    const result = yield products_model_1.Book.findById(id);
    return result;
});
const updateBookToDB = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    //update using Partial to get any partial value of type IBook, and update using the _id
    const result = yield products_model_1.Book.findByIdAndUpdate(id, data, {
        new: true,
    });
    return result;
});
const deleteBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //get one book by _id using findById
    const result = yield products_model_1.Book.findByIdAndDelete(id);
    return result;
});
exports.productServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getBookFromDB,
    updateBookToDB,
    deleteBookFromDB,
};
