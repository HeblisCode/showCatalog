import userModel, { userModelCreationAttributes } from "../models/userModel";

/**
 * @author Davide Stefania
 */
export default class UserRepo {
  /**
   *
   * @param user `{email: string, password: string, age: number}`
   * @description register a new user
   */
  public async registerUser(
    user: userModelCreationAttributes
  ): Promise<userModel> {
    return userModel.create(user);
  }

  /**
   *
   * @param email
   * @returns finds a user by email
   */
  public async findUserByEmail(email: string): Promise<userModel> {
    const user: userModel = await userModel.findOne({
      where: { email: email },
    });
    return user;
  }
}
