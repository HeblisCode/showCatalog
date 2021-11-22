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
    const isPwCorrect = await this.bcrypt.compare(
      loginData.password,
      user.password
    );
    if (isPwCorrect) {
      return { userId: user.id };
    } else {
      throw "incorrect password";
    }
  }

  /**
   *
   * @param payload
   * @description register a new user and encrypt the password
   */
  async register(payload: userModelCreationAttributes) {
    let hashedPassword: string = "";

    //pw encryption with bcrypt
    try {
      hashedPassword = await this.bcrypt.hash(payload.password, 10);
    } catch (err) {
      return { status: 500, message: err.message };
    }

    //user creation
    try {
      const user: userModelCreationAttributes = {
        email: payload.email,
        password: hashedPassword,
        age: payload.age,
      };
      await this.userRepo.registerUser(user);
      return { status: 200, message: "ok" };
    } catch (err) {
      return { status: 409, message: err.message };
    }
  }
}
