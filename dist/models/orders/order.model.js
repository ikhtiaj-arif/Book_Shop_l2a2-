"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
//create Schema
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: (value) => validator_1.default.isEmail(value),
            message: 'Invalid email format',
        },
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, 'Product is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        validate: {
            validator: (value) => value > 0,
            message: 'Quantity must be a positive integer',
        },
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        validate: {
            validator: (value) => value > 0,
            message: 'Total price must be a positive number',
        },
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
//using pre middleware to check the quantity of the product
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const orders = this.
            const bookId = this.product;
            const quantity = this.quantity;
            const book = yield mongoose_1.default.model('Books').findById(bookId);
            //if bookId dosen't match any books
            if (!book) {
                const error = new Error('Book not found');
                error.name = 'bookNotFound';
                return next(error);
            }
            //check if the quantity of order is more then the stock
            if (book.quantity < quantity) {
                const error = new Error('Insufficient books in stock');
                error.name = 'insufficientStock';
                return next(error);
            }
            //reducing the quantity from the books stock
            book.quantity -= quantity;
            // check if the quantity becomes 0, set inStock = false
            if (book.quantity === 0) {
                book.inStock = false;
            }
            yield book.save();
            next();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            next(error);
        }
    });
});
// create a Model.
exports.Order = (0, mongoose_1.model)('Orders', orderSchema);
