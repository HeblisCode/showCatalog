import userModel, { userModelCreationAttributes } from "../models/userModel";
import UserRepo from "../repository/userRepo";

export default class UserService {
  private userRepo: UserRepo = new UserRepo();
  private bcrypt = require("bcrypt");

  async login(payload: LoginData) {
    const user: userModel = await this.userRepo.findUserByEmail(payload.email);
    if (!user) {
      throw new Error("user not found");
    }
    try {
      const isPwCorrect = await this.bcrypt.compare(
        payload.password,
        user.password
      );
      if (isPwCorrect) {
        return { userId: user.id };
      } else {
        throw new Error("incorrect password");
      }
    } catch {
      throw new Error("bcrypt error");
    }
  }

  async register(payload: userModelCreationAttributes) {
    try {
      //pw encryption
      const hashedPassword: string = await this.bcrypt.hash(
        payload.password,
        10
      );
      const user: userModelCreationAttributes = {
        email: payload.email,
        password: hashedPassword,
        age: payload.age,
      };
      return this.userRepo.registerUser(user);
    } catch {
      throw new Error("bcrypt error");
    }
  }

  // async rateShow(rate: number, userId: number, showId: number) {
  //   if (rate < 0 || rate > 5) {
  //     throw "Input error: field rate must be between 0 and 5";
  //   }
  //   this.userRepo.rateShow(rate, userId, showId);
  // }
}

export interface tokenAndId {
  token: string;
  userId: number;
}
