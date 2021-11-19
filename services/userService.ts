import userModel from "../models/userModel";
import UserRepo, { LoginBody, User } from "../repository/userRepo";

export default class UserService {
  private userRepo: UserRepo = new UserRepo();

  async login(payload: User): Promise<tokenAndId> {
    const user: LoginBody = await this.userRepo.findUser(payload);
    if (user.userFound) {
      return {
        token: "testToken:190561756138456197418347194",
        userId: user.userId,
      };
    } else {
      throw "not registered";
    }
  }

  async rateShow(rate: number, userId: number, showId: number) {
    if (rate < 0 || rate > 5) {
      throw "Input error: field rate must be between 0 and 5";
    }
    this.userRepo.rateShow(rate, userId, showId);
  }
}

export interface tokenAndId {
  token: string;
  userId: number;
}
