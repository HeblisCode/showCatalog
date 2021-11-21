import { Body, Post, JsonController } from "routing-controllers";
import { userModelCreationAttributes } from "../models/userModel";
import UserService from "../services/userService";

@JsonController()
export class UserController {
  private userService = new UserService();
  private jwt = require("jsonwebtoken");

  /**
   *
   * http://localhost:3000/user/register
   * @description register a new user
   *
   */
  @Post("/user/register")
  async registerUser(@Body() payload: userModelCreationAttributes) {
    try {
      await this.userService.register(payload);
      return { status: 200, message: "OK" };
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }

  /**
   *
   * http://localhost:3000/user/login
   * @description log a user and returns the auth token by jwt
   *
   */
  @Post("/user/login")
  async login(@Body() payload: LoginData) {
    try {
      const userIdJson: { userId: number } = await this.userService.login(
        payload
      );
      const bearerToken: string = "Bearer " + this.jwt.sign(userIdJson, "test");
      return { status: 200, token: bearerToken };
    } catch (err) {
      return { status: 401, message: err.message };
    }
  }
}
