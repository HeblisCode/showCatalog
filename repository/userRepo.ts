import userModel, { userModelCreationAttributes } from "../models/userModel";

export default class UserRepo {
  constructor() {}

  /**
   *
   * @param user `{email: string, password: string, age: number}`
   * @description register a new user
   *
   */
  async registerUser(user: userModelCreationAttributes): Promise<userModel> {
    return userModel.create(user);
  }

  /**
   *
   * @param user `email: string`
   * @returns `Promise<userModel>`
   * @description find an existing user by mail
   *
   */
  async findUserByEmail(email: string): Promise<userModel> {
    const user: userModel = await userModel.findOne({
      where: { email: email },
    });
    return user;
  }
}
