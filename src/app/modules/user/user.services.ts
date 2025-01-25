import { User } from "./user.model";

const blockUserIntoDB = async (blockId: string) => {
  const result = User.findByIdAndUpdate(blockId, { isBlocked: true });
  return result;
};

export const userServices = {
  blockUserIntoDB,
};
