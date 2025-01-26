import config from "../../config";
import AppError from "../../errors/AppError";
import { IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { createToken } from "./auth.utils";

const createUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUserIntoDB = async (payload: ILoginUser) => {
  //check if the user exists
  const existingUserData = await User.doesUserExistsByEmail(payload.email);
  if (!existingUserData) {
    throw new AppError(401, "Invalid credentials");
  }
  //check the user is blocked or not
  const isUserBlocked = existingUserData?.isBlocked;
  if (isUserBlocked) {
    throw new AppError(403, "The user is blocked!");
  }

  //check if the password matches the hashed password
  const passwordMatching = await User.isPasswordMatching(
    payload.password,
    existingUserData?.password
  );
  if (!passwordMatching) {
    throw new AppError(401, "Invalid credentials");
  }
  //create token and send to the client
  const jwtPayload = {
    email: existingUserData?.email,
    role: existingUserData?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_exp_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_exp_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshTokenDB = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.doesUserExistsByEmail(email);

  if (!user) {
    throw new AppError(404, 'This user is not found !');
  }
  


  // checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(403, 'This user is blocked ! !');
  }

  // if (
  //   user.passwordChangedAt &&
  //   User.isJWTIssuedBeforePassChange(user.passwordChangedAt, iat as number)
  // ) {
  //   throw new AppError(401, 'You are not authorized !');
  // }

  //create token and send to the client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_exp_in as string,
  );

  return { accessToken };
};
export const AuthServices = { createUserIntoDB, loginUserIntoDB, refreshTokenDB};
