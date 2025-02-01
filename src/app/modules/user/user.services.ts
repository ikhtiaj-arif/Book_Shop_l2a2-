import { User } from "./user.model";

const getAllUsersFromDB = async () => {
  const result = User.find();
  return result;
};
const blockUserIntoDB = async (blockId: string) => {
  const result = User.findByIdAndUpdate(blockId, { isBlocked: true });
  return result;
};
const unblockUserIntoDB = async (blockId: string) => {
  const result = User.findByIdAndUpdate(blockId, { isBlocked: false });
  return result;
};

export const userServices = {
  blockUserIntoDB,
  getAllUsersFromDB,
  unblockUserIntoDB
};