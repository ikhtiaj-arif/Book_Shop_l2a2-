import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { userServices } from "./user.services";

const { blockUserIntoDB, getAllUsersFromDB,unblockUserIntoDB } = userServices;

const blockUser = catchAsync(async (req, res) => {
  const blockId = req.params.userId;

  await blockUserIntoDB(blockId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User blocked successfully!",
    // data: {},
  });
});
const unBlockUser = catchAsync(async (req, res) => {
  const blockId = req.params.userId;

  await unblockUserIntoDB(blockId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User unblocked successfully!",
    // data: {},
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await getAllUsersFromDB();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User Retrieved successfully!",
    data: result,
  });
});

export const userControllers = {
  // createUser,
  getAllUsers,
  blockUser,unBlockUser
};