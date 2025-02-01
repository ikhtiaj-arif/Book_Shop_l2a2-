"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const ErrorHandler_1 = __importDefault(require("./app/middlewears/ErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
const port = 3000;
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "https://book-shop-client-l2a4.vercel.app",
    credentials: true,
}));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use((0, cookie_parser_1.default)());
//application routes
// app.use("/api", userRoutes);
// app.use("/api", AuthRoutes);
app.use("/api", routes_1.default);
const getController = (req, res) => {
    res.send("Hello World!");
};
app.get("/", getController);
app.use(ErrorHandler_1.default);
exports.default = app;
