import { where } from "sequelize";
import userModel, { userModelCreationAttributes } from "../models/userModel";

export default class UserRepo {
  constructor() {}

  registerUser(payload: userModelCreationAttributes) {
    userModel.create(payload);
  }

  async isUserRegistered(payload: User): Promise<boolean> {
    const user: userModel[] = await userModel.findAll({
      where: { email: payload.email, password: payload.password },
    });
    return user.length > 0;
  }
}

export interface User {
  email: string;
  password: string;
}
