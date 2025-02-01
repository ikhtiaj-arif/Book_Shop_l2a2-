"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_routes_1 = require("../modules/user/user.routes");
const products_routes_1 = require("../modules/products/products.routes");
const order_routes_1 = require("../modules/orders/order.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: "/auth", route: auth_route_1.AuthRoutes },
    { path: "/users", route: user_routes_1.userRoutes },
    { path: "/products", route: products_routes_1.productsRoutes },
    { path: "/orders", route: order_routes_1.orderRoutes },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
