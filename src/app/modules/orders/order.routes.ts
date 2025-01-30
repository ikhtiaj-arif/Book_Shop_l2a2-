import express from "express";
import auth from "../../middlewears/auth";
import { UserRole } from "../user/user.constant";
import { orderController } from "./order.controller";

const router = express.Router();
const { getAllOrders, getRevenue, verifyPayment, createOrder, getOrdersById } =
  orderController;

router.post("/", auth(UserRole.admin, UserRole.user), createOrder);

router.get("/", auth(UserRole.admin), getAllOrders);
router.get("/:id", auth(UserRole.admin, UserRole.user), getOrdersById);

// router.get("/", auth("admin"), getAllOrders);
router.get("/revenue", auth(UserRole.admin), getRevenue);

router.get("/verify", auth(UserRole.admin, UserRole.user), verifyPayment);

export const orderRoutes = router;
