import express from "express";
import auth from "../../middlewears/auth";
import { UserRole } from "../user/user.constant";
import { orderController } from "./order.controller";

const router = express.Router();
const {  getAllOrders, getRevenue, verifyPayment, createOrder } =
  orderController;

router.post("/", auth(UserRole.admin), createOrder);

router.get("/", auth(UserRole.admin), getAllOrders);

// router.get("/", auth("admin"), getAllOrders);
router.get("/revenue", auth("admin"), getRevenue);

router.get("/verify", verifyPayment);

export const orderRoutes = router;
