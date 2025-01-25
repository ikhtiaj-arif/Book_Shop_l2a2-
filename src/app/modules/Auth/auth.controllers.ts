import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { AuthServices } from "./auth.services";

const { createUserIntoDB, loginUserIntoDB } = AuthServices;

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

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Login successful",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  createUser,
};
