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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const products_model_1 = require("../products/products.model");
const order_model_1 = __importDefault(require("./order.model"));
const order_utils_1 = require("./order.utils");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrderToDB = (user, payload, client_ip) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = payload === null || payload === void 0 ? void 0 : payload.products) === null || _a === void 0 ? void 0 : _a.length))
        throw new Error("Order is not specified");
    const session = yield mongoose_1.default.startSession();
    session.startTransaction(); // Start Transaction
    try {
        const products = payload.products;
        let totalPrice = 0;
        const productDetails = yield Promise.all(products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield products_model_1.Book.findById(item.product).session(session);
            if (!product)
                throw new Error(`Product with ID ${item.product} not found`);
            if (product.quantity < item.quantity)
                throw new Error(`Insufficient stock for ${product.title}`);
            // Reduce product quantity
            product.quantity -= item.quantity;
            yield product.save({ session });
            // Calculate total price
            totalPrice += (product.price || 0) * item.quantity;
            return { product: product._id, quantity: item.quantity };
        })));
        let order = yield order_model_1.default.create([{ user, products: productDetails, totalPrice }], { session });
        // Payment integration
        const shurjopayPayload = {
            amount: totalPrice,
            order_id: order[0]._id,
            currency: "BDT",
            customer_name: user.name,
            customer_address: "user.address",
            customer_email: user.email,
            customer_phone: "user.phone",
            customer_city: "user.city",
            client_ip,
        };
        const payment = yield order_utils_1.orderUtils.makePayment(shurjopayPayload);
        if (payment === null || payment === void 0 ? void 0 : payment.transactionStatus) {
            yield order_model_1.default.updateOne({ _id: order[0]._id }, {
                transaction: {
                    id: payment.sp_order_id,
                    transactionStatus: payment.transactionStatus,
                },
            }, { session });
        }
        // Commit the transaction if everything is successful
        yield session.commitTransaction();
        session.endSession();
        return payment.checkout_url;
    }
    catch (error) {
        yield session.abortTransaction(); // Rollback in case of an error
        session.endSession();
        throw error; // Propagate the error
    }
});
const verifyPaymentDB = (order_id) => __awaiter(void 0, void 0, void 0, function* () {
    const verifiedPayment = yield order_utils_1.orderUtils.verifyPayment(order_id);
    if (verifiedPayment.length) {
        yield order_model_1.default.findOneAndUpdate({
            "transaction.id": order_id,
        }, {
            "transaction.bank_status": verifiedPayment[0].bank_status,
            "transaction.sp_code": verifiedPayment[0].sp_code,
            "transaction.sp_message": verifiedPayment[0].sp_message,
            "transaction.method": verifiedPayment[0].method,
            "transaction.transactionStatus": verifiedPayment[0].transaction_status,
            "transaction.date_time": verifiedPayment[0].date_time,
            status: verifiedPayment[0].bank_status == "Success"
                ? "Paid"
                : verifiedPayment[0].bank_status == "Failed"
                    ? "Pending"
                    : verifiedPayment[0].bank_status == "Cancel"
                        ? "Cancelled"
                        : "",
        });
    }
    return verifiedPayment;
});
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
const getOrdersByIdFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ user: payload }).populate({
        path: "products.product", // Use dot notation for nested population
        model: "Books", // Ensure this matches your Mongoose model name
    });
    return result;
});
const getRevenueByBookFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
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
                from: "books",
                foreignField: "_id",
                localField: "product",
                as: "bookData",
            },
        },
        // Step: 2
        // here the bookData is an array, we need to break the array to access its value
        //we can use $unwind to get each value of the array
        {
            $unwind: "$bookData",
        },
        // Step: 3
        // now we have the bookData object, we can access its value
        // using $project only the revenue and calculate using $multiply
        {
            $project: {
                revenue: { $multiply: ["$quantity", "$bookData.price"] },
            },
        },
        // Step: 4
        //we can group all the documents and sum there revenue using $sum
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$revenue" },
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
    const result = yield order_model_1.default.aggregate([
        //we can group all the documents using _id: null and sum there revenue using $sum
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
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
    getAllOrdersFromDB,
    verifyPaymentDB,
    getOrdersByIdFromDB,
};
