import express from "express";
import auth from "../../middlewears/auth";
import { userControllers } from "./user.controllers";

const router = express.Router();

const { blockUser } = userControllers;

router.patch("/admin/users/:userId/block", auth("admin"), blockUser);

export const userRoutes = router;
