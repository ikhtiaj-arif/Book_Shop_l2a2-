import express from "express";
import auth from "../../middlewears/auth";
import { userControllers } from "./user.controllers";

const router = express.Router();

const { getAllUsers, blockUser, unBlockUser, changePassword } = userControllers;

router.get("/", auth("admin"), getAllUsers);
router.patch("/:userId/block", auth("admin"), blockUser);
router.patch("/:userId/unblock", auth("admin"), unBlockUser);
router.patch("/change-password", auth("admin", "user"), changePassword);

export const userRoutes = router;
