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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("./user.model");
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.find();
    return result;
});
const blockUserIntoDB = (blockId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.findByIdAndUpdate(blockId, { isBlocked: true });
    return result;
});
const unblockUserIntoDB = (blockId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.findByIdAndUpdate(blockId, { isBlocked: false });
    return result;
});
const changePasswordDB = (existingUserData, oldPassword, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(existingUserData === null || existingUserData === void 0 ? void 0 : existingUserData.password, oldPassword);
    //check the user is blocked or not
    //check if the password matches the hashed password
    const passwordMatching = yield user_model_1.User.isPasswordMatching(oldPassword, existingUserData === null || existingUserData === void 0 ? void 0 : existingUserData.password);
    if (!passwordMatching) {
        throw new AppError_1.default(401, "Invalid credentials");
    }
    const changedPassword = yield bcrypt_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findByIdAndUpdate(existingUserData === null || existingUserData === void 0 ? void 0 : existingUserData.id, // Find user by ID
    { password: changedPassword }, // Update password
    { new: true, runValidators: true } // Ensure updated data is returned and validation runs
    );
    return {
        message: "Password updated successfully!",
    };
});
exports.userServices = {
    blockUserIntoDB,
    getAllUsersFromDB,
    unblockUserIntoDB,
    changePasswordDB,
};
