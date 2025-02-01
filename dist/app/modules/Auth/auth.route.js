"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ValidateRequest_1 = __importDefault(require("../../middlewears/ValidateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_controllers_1 = require("./auth.controllers");
const auth_validations_1 = require("./auth.validations");
const router = express_1.default.Router();
const { createUser, loginUser, refreshToken } = auth_controllers_1.AuthControllers;
router.post("/register", (0, ValidateRequest_1.default)(user_validation_1.userValidations.createUserValidationSchema), createUser);
router.post("/login", (0, ValidateRequest_1.default)(auth_validations_1.AuthValidation.loginValidationSchema), loginUser);
router.post("/refresh-token", (0, ValidateRequest_1.default)(auth_validations_1.AuthValidation.refreshTokenValidationSchema), refreshToken);
exports.AuthRoutes = router;
