import { Body, Post, JsonController } from "routing-controllers";
import { userModelCreationAttributes } from "../models/userModel";
import UserService from "../services/userService";

/**
 * @author Davide Stefania
 */
@JsonController()
export class UserController {
  private userService = new UserService();
  private jwt = require("jsonwebtoken");

  /**
   * http://localhost:3000/user/register
   * @param payload
   * @description register a new user
   */
  @Post("/user/register")
  async registerUser(@Body() user: userModelCreationAttributes) {
    try {
      return await this.userService.register(user);
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }

  /**
   * http://localhost:3000/user/login
   * @param payload
   * @description log a user and returns the auth token by jwt
   */
  @Post("/user/login")
  async login(@Body() payload: LoginData) {
    try {
      const userIdJson: { userId: number } = await this.userService.login(
        payload
      );
      //signing the jwt token with an env var
      const bearerToken: string =
        "Bearer " + this.jwt.sign(userIdJson, process.env.JWT_SECRET_TOKEN);
      return { status: 200, token: bearerToken };
    } catch (err) {
      return { status: 401, message: err };
    }
  }
}
