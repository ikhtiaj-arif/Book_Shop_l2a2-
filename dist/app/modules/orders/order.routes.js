"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewears/auth"));
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
const { getAllOrders, getRevenue, verifyPayment, createOrder, getOrdersById } = order_controller_1.orderController;
router.post("/", (0, auth_1.default)(user_constant_1.UserRole.admin, user_constant_1.UserRole.user), createOrder);
router.get("/verify", (0, auth_1.default)(user_constant_1.UserRole.admin, user_constant_1.UserRole.user), verifyPayment);
// router.get("/", auth("admin"), getAllOrders);
router.get("/revenue", (0, auth_1.default)(user_constant_1.UserRole.admin), getRevenue);
router.get("/", (0, auth_1.default)(user_constant_1.UserRole.admin), getAllOrders);
router.get("/:id", (0, auth_1.default)(user_constant_1.UserRole.admin, user_constant_1.UserRole.user), getOrdersById);
exports.orderRoutes = router;
