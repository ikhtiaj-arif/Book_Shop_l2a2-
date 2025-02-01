import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
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
const changePasswordDB = async (
  existingUserData: JwtPayload,
  oldPassword: string,
  newPassword: string
) => {
  console.log(existingUserData?.password, oldPassword);
  //check the user is blocked or not

  //check if the password matches the hashed password
  const passwordMatching = await User.isPasswordMatching(
    oldPassword,
    existingUserData?.password
  );
  if (!passwordMatching) {
    throw new AppError(401, "Invalid credentials");
  }
  console.log(passwordMatching);
  return {
    message: "Password updated successfully!",
  };
  const changedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  await User.findByIdAndUpdate(
    existingUserData?.id, // Find user by ID
    { password: changedPassword }, // Update password
    { new: true, runValidators: true } // Ensure updated data is returned and validation runs
  );

  return {
    message: "Password updated successfully!",
  };
};

export const userServices = {
  blockUserIntoDB,
  getAllUsersFromDB,
  unblockUserIntoDB,
  changePasswordDB,
};
