import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { userRoutes } from "../modules/user/user.routes";
import { productsRoutes } from "../modules/products/products.routes";
import { orderRoutes } from "../modules/orders/order.routes";
const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: userRoutes },
  { path: "/products", route: productsRoutes },
  { path: "/orders", route: orderRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
