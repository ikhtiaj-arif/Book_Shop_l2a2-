import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { User } from "../modules/user/user.model";
import catchAsync from "../utils/CatchAsync";

const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
  

    // checking if the token is missing
    if (!header || !header.startsWith("Bearer ")) {
      throw new AppError(401, "You are not authorized!");
    }

    const token = header.split(" ")[1];
 
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { role, email, iat } = decoded;

    // checking if the user is exist
    const user = await User.doesUserExistsByEmail(email);

    if (!user) {
      throw new AppError(404, "This user is not found !");
    }

    // checking if the user is blocked
    const isUserBlocked = user?.isBlocked;

    if (isUserBlocked) {
      throw new AppError(403, "This user is blocked!");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(401, "You are not authorized!");
    }

    // req.user = user;
    req.user = user as JwtPayload;

    next();
  });
};

export default auth;
