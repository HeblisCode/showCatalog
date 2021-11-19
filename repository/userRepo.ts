import { where } from "sequelize";
import favoriteModel from "../models/favoriteModel";
import ratingModel from "../models/ratingModel";
import userModel, { userModelCreationAttributes } from "../models/userModel";

export default class UserRepo {
  constructor() {}

  registerUser(payload: userModelCreationAttributes) {
    userModel.create(payload);
  }

  setShowAsFavorite(showId: number, userId: number) {
    favoriteModel.create({ show_id: showId, user_id: userId });
  }

  rateShow(rate: number, showId: number, userId: number) {
    ratingModel.create({ rate: rate, show_id: showId, user_id: userId });
  }

  async findUser(payload: User): Promise<LoginBody> {
    const user: userModel[] = await userModel.findAll({
      where: { email: payload.email, password: payload.password },
    });
    return {
      userFound: user.length > 0,
      userId: user[0]?.id,
    };
  }
}

export interface User {
  email: string;
  password: string;
}

export interface LoginBody {
  userFound: boolean;
  userId?: number;
}
