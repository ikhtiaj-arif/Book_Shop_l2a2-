"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
//create Schema
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required!"],
        unique: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9\s.,'’]+$/.test(value.trim()),
            message: "Title contains invalid characters!",
        },
    },
    author: {
        type: String,
        required: [true, "Author name is required!"],
    },
    price: {
        type: Number,
        required: [true, "Price is required!"],
        // validate: {
        //   validator: (value: number) => value > 0,
        //   message: 'Price must be a positive number!',
        // },
    },
    imageUrl: { type: String, required: [true, "Image is required!"] },
    category: {
        type: String,
        enum: {
            values: ["Fiction", "Science", "SelfDevelopment", "Poetry", "Religious"],
            message: "Invalid category",
        },
        required: [true, "Category is required!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
        // validate: [
        //   // Validating minimum characters
        //   {
        //     validator: (value: string) => value.trim().length >= 10,
        //     message: 'Description must be at least 10 characters!',
        //   },
        //   {
        //     validator: (value: string) => /^[\w\W\s]+$/.test(value.trim()),
        //     message: 'Description must contain valid characters!',
        //   },
        // ],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required!"],
        validate: {
            validator: (value) => Number.isInteger(value) && value >= 0,
            message: "Quantity must be a non-negative integer!",
        },
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});
// create a Model.
exports.Book = (0, mongoose_1.model)("Books", bookSchema);
