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
exports.orderServices = void 0;
const order_model_1 = require("./order.model");
const createOrderToDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(orderData);
    return result;
});
const getRevenueByBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.aggregate([
        //! here we need the total revenue generated from all orders -->
        // to achieve this we need to aggregate in different stages.
        // first we need to get the book price for each order with the bookID saved in every order
        // we need the quantity of every order
        // we can multiply the price with the quantity to get the revenue of each order.
        // we need to create an array of number to save each orders revenue
        // now we can sum all the numbers of the array to get the final revenue
        //! implementation
        // Step: 1
        // using $lookup to get the book data
        {
            $lookup: {
                from: 'books',
                foreignField: '_id',
                localField: 'product',
                as: 'bookData',
            },
        },
        // Step: 2
        // here the bookData is an array, we need to break the array to access its value
        //we can use $unwind to get each value of the array
        {
            $unwind: '$bookData',
        },
        // Step: 3
        // now we have the bookData object, we can access its value
        // using $project only the revenue and calculate using $multiply
        {
            $project: {
                revenue: { $multiply: ['$quantity', '$bookData.price'] },
            },
        },
        // Step: 4
        //we can group all the documents and sum there revenue using $sum
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$revenue' },
            },
        },
        {
            $project: { _id: 0, totalRevenue: 1 },
        },
    ]);
    return result;
    //   console.log(JSON.stringify(result, null, 2));
});
const getRevenueFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.aggregate([
        //we can group all the documents using _id: null and sum there revenue using $sum
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
        {
            $project: { _id: 0, totalRevenue: 1 },
        },
    ]);
    return result[0];
    // console.log(JSON.stringify(result, null, 2));
});
exports.orderServices = {
    createOrderToDB,
    getRevenueFromDB,
    getRevenueByBookFromDB,
};
