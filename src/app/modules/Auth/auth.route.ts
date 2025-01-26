import express from "express";
import ValidateRequest from "../../middlewears/ValidateRequest";
import { userValidations } from "../user/user.validation";
import { AuthControllers } from "./auth.controllers";
import { AuthValidation } from "./auth.validations";

const router = express.Router();
const { createUser, loginUser, refreshToken } = AuthControllers;

router.post(
  "/register",
  ValidateRequest(userValidations.createUserValidationSchema),
  createUser
);

router.post("/login", ValidateRequest(AuthValidation.loginValidationSchema), loginUser);
router.post(
  "/refresh-token",
  ValidateRequest(AuthValidation.refreshTokenValidationSchema),
  refreshToken
);

export const AuthRoutes = router;
