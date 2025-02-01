import { Model, Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isBlocked: boolean;
}
export interface UserModel extends Model<IUser> {
  //create methods
  doesUserExistsByEmail(email: string): Promise<IUser>;
  isPasswordMatching(
    plainPassword: string,
    hashedPassword: string
  ): Promise<Boolean>;
}