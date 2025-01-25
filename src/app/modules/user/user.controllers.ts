import catchAsync from "../../utils/CatchAsync";
import sendResponse from "../../utils/SendResponse";
import { userServices } from "./user.services";

const {  blockUserIntoDB } = userServices;



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



export const userControllers = {
  // createUser,
  blockUser,
 
};
