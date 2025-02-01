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
exports.AuthControllers = void 0;
const config_1 = __importDefault(require("../../config"));
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SendResponse_1 = __importDefault(require("../../utils/SendResponse"));
const auth_services_1 = require("./auth.services");
const { createUserIntoDB, loginUserIntoDB, refreshTokenDB } = auth_services_1.AuthServices;
const createUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield createUserIntoDB(req.body);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: 201,
        message: "User is created successfully!",
        data: result,
    });
}));
const loginUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield loginUserIntoDB(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Login successful",
        data: { accessToken },
    });
}));
const refreshToken = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield refreshTokenDB(refreshToken);
    (0, SendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Retrieved access token Successful!",
        data: result,
    });
}));
exports.AuthControllers = {
    loginUser,
    createUser,
    refreshToken,
};
