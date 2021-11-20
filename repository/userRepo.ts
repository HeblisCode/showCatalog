import { where } from "sequelize";
import favoriteModel from "../models/favoriteModel";
import ratingModel from "../models/ratingModel";
import userModel, { userModelCreationAttributes } from "../models/userModel";

export default class UserRepo {
  constructor() {}

  async registerUser(user: userModelCreationAttributes) {
    return userModel.create(user);
  }

  setShowAsFavorite(showId: number, userId: number) {
    favoriteModel.create({ show_id: showId, user_id: userId });
  }

  rateShow(rate: number, showId: number, userId: number) {
    ratingModel.create({ rate: rate, show_id: showId, user_id: userId });
  }

  async findUserByEmail(email: string): Promise<userModel> {
    const user: userModel = await userModel.findOne({
      where: { email: email },
    });
    return user;
  }
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginBody {
  userFound: boolean;
  userId?: number;
}
