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
exports.userControllers = void 0;
const CatchAsync_1 = __importDefault(require("../../utils/CatchAsync"));
const SendResponse_1 = __importDefault(require("../../utils/SendResponse"));
const user_services_1 = require("./user.services");
const { blockUserIntoDB, getAllUsersFromDB, unblockUserIntoDB, changePasswordDB, } = user_services_1.userServices;
const blockUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blockId = req.params.userId;
    yield blockUserIntoDB(blockId);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User blocked successfully!",
        // data: {},
    });
}));
const unBlockUser = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blockId = req.params.userId;
    yield unblockUserIntoDB(blockId);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User unblocked successfully!",
        // data: {},
    });
}));
const getAllUsers = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield getAllUsersFromDB();
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User Retrieved successfully!",
        data: result,
    });
}));
const changePassword = (0, CatchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const currentUserPass = user === null || user === void 0 ? void 0 : user.password;
    const { oldPassword, newPassword } = req.body;
    const result = yield changePasswordDB(user, oldPassword, newPassword);
    (0, SendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User Retrieved successfully!",
        data: result,
    });
}));
exports.userControllers = {
    // createUser,
    getAllUsers,
    blockUser,
    unBlockUser,
    changePassword,
};
