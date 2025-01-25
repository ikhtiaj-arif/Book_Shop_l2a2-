"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewears/auth"));
const user_controllers_1 = require("./user.controllers");
const router = express_1.default.Router();
const { blockUser } = user_controllers_1.userControllers;
router.patch("/admin/users/:userId/block", (0, auth_1.default)("admin"), blockUser);
exports.userRoutes = router;
