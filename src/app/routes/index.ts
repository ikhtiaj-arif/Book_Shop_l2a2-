import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { categoryRoutes } from "../modules/category/category.route";
import { orderRoutes } from "../modules/orders/order.routes";
import { productsRoutes } from "../modules/products/products.routes";
import { userRoutes } from "../modules/user/user.routes";
const router = Router();

const moduleRoutes = [
  { path: "/auth", route: AuthRoutes },
  { path: "/users", route: userRoutes },
  { path: "/products", route: productsRoutes },
  { path: "/orders", route: orderRoutes },
  { path: "/category", route: categoryRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
