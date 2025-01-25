import express from "express";
import ValidateRequest from "../../middlewears/ValidateRequest";
import { userValidations } from "../user/user.validation";
import { AuthControllers } from "./auth.controllers";

const router = express.Router();
const { createUser, loginUser } = AuthControllers;

router.post(
  "/register",
  ValidateRequest(userValidations.createUserValidationSchema),
  createUser
);

router.post("/login", loginUser);

export const AuthRoutes = router;
