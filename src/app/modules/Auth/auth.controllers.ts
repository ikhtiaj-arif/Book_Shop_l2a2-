import config from "../../config";
import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { AuthServices } from "./auth.services";

const { createUserIntoDB, loginUserIntoDB, refreshTokenDB } = AuthServices;

const createUser = catchAsync(async (req, res) => {
  const result = await createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "User is created successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await loginUserIntoDB(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: { accessToken },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await refreshTokenDB(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Retrieved access token Successful!",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  createUser,
  refreshToken,
};
