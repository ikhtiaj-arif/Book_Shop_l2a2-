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
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const { createOrderToDB, getRevenueFromDB } = order_services_1.orderServices;
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const result = yield createOrderToDB(orderData);
        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        if (error.name == 'bookNotFound') {
            res.status(404).json({
                message: error._message,
                success: false,
                error: error.message || 'Something went wrong',
            });
        }
        else if (error.name == 'insufficientStock') {
            res.status(400).json({
                message: error._message,
                success: false,
                error: error.message || 'Something went wrong',
            });
        }
        else {
            res.status(500).json({
                message: error._message,
                success: false,
                error: error || 'Something went wrong',
            });
        }
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield getRevenueFromDB();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            message: error._message,
            success: false,
            error: error.message || 'Something went wrong',
        });
    }
});
exports.orderController = {
    createOrder,
    getRevenue,
};
