"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
//create Schema
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        unique: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9\s.,'’]+$/.test(value.trim()),
            message: 'Title contains invalid characters!',
        },
    },
    author: {
        type: String,
        required: [true, 'Author name is required!'],
        validate: {
            validator: (value) => validator_1.default.isAlpha(value.replace(/[\s.,']/g, ''), 'en-US'),
            message: 'Author name contains invalid characters!',
        },
    },
    price: {
        type: Number,
        required: [true, 'Price is required!'],
        validate: {
            validator: (value) => value > 0,
            message: 'Price must be a positive number!',
        },
    },
    category: {
        type: String,
        enum: {
            values: ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
            message: 'Invalid category',
        },
        required: [true, 'Category is required!'],
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        validate: [
            // Validating minimum characters
            {
                validator: (value) => value.trim().length >= 10,
                message: 'Description must be at least 10 characters!',
            },
            {
                validator: (value) => /^[\w\W\s]+$/.test(value.trim()),
                message: 'Description must contain valid characters!',
            },
        ],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required!'],
        validate: {
            validator: (value) => Number.isInteger(value) && value >= 0,
            message: 'Quantity must be a non-negative integer!',
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
exports.Book = (0, mongoose_1.model)('Books', bookSchema);
