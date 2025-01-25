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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utils_1 = require("./auth.utils");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //check if the user exists
    const existingUserData = yield user_model_1.User.doesUserExistsByEmail(payload.email);
    if (!existingUserData) {
        throw new AppError_1.default(401, "Invalid credentials");
    }
    //check the user is blocked or not
    const isUserBlocked = existingUserData === null || existingUserData === void 0 ? void 0 : existingUserData.isBlocked;
    if (isUserBlocked) {
        throw new AppError_1.default(403, "The user is blocked!");
    }
    //check if the password matches the hashed password
    const passwordMatching = yield user_model_1.User.isPasswordMatching(payload.password, existingUserData === null || existingUserData === void 0 ? void 0 : existingUserData.password);
    if (!passwordMatching) {
        throw new AppError_1.default(401, "Invalid credentials");
    }
    //create token and send to the client
    const jwtPayload = {
        email: existingUserData === null || existingUserData === void 0 ? void 0 : existingUserData.email,
        role: existingUserData === null || existingUserData === void 0 ? void 0 : existingUserData.role,
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_exp_in);
    return {
        token,
    };
});
exports.AuthServices = { createUserIntoDB, loginUserIntoDB };
