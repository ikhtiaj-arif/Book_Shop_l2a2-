"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ErrorHandler_1 = __importDefault(require("./app/middlewears/ErrorHandler"));
const auth_route_1 = require("./app/modules/Auth/auth.route");
const user_routes_1 = require("./app/modules/user/user.routes");
const app = (0, express_1.default)();
const port = 3000;
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use("/api", user_routes_1.userRoutes);
app.use("/api", auth_route_1.AuthRoutes);
const getController = (req, res) => {
    res.send("Hello World!");
};
app.get("/", getController);
app.use(ErrorHandler_1.default);
exports.default = app;
