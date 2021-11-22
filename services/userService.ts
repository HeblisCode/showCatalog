import userModel, { userModelCreationAttributes } from "../models/userModel";
import UserRepo from "../repository/userRepo";

/**
 * @author Davide Stefania
 */
export default class UserService {
  private userRepo: UserRepo = new UserRepo();
  private bcrypt = require("bcrypt");

  /**
   *
   * @param loginData
   * @returns an object with the user id if the pw is correct, otherwise throws an error
   */
  async login(loginData: LoginData): Promise<{ userId: number }> {
    const user: userModel = await this.userRepo.findUserByEmail(
      loginData.email
    );
    if (!user) {
      throw new Error("user not found");
    }
    try {
      const isPwCorrect = await this.bcrypt.compare(
        loginData.password,
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

  /**
   *
   * @param payload
   * @description register a new user and encrypt the password
   */
  async register(payload: userModelCreationAttributes) {
    try {
      //pw encryption with bcrypt
      const hashedPassword: string = await this.bcrypt.hash(
        payload.password,
        10
      );
      const user: userModelCreationAttributes = {
        email: payload.email,
        password: hashedPassword,
        age: payload.age,
      };
      this.userRepo.registerUser(user);
    } catch {
      throw new Error("bcrypt error");
    }
  }
}
