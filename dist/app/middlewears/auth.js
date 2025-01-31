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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const CatchAsync_1 = __importDefault(require("../utils/CatchAsync"));
const auth = (...requiredRole) => {
    return (0, CatchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //!use headers to send token
        // const header = req.headers.authorization;
        // if (!header || !header.startsWith("Bearer")) {
        //   throw new AppError(401, "You are not authorized!");
        // }
        // const token = header.split(" ")[1];
        const token = req.headers.authorization;
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.default(401, 'You are not authorized!');
        }
        // checking if the given token is valid
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        const { role, email, iat } = decoded;
        // checking if the user is exist
        const user = yield user_model_1.User.doesUserExistsByEmail(email);
        if (!user) {
            throw new AppError_1.default(404, "This user is not found !");
        }
        // checking if the user is blocked
        const isUserBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (isUserBlocked) {
            throw new AppError_1.default(403, "This user is blocked!");
        }
        if (requiredRole && !requiredRole.includes(role)) {
            throw new AppError_1.default(401, "You are not authorized!");
        }
        // req.user = user;
        req.user = user;
        next();
    }));
};
exports.default = auth;
