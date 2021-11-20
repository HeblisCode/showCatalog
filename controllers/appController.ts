import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Req,
  Res,
  Header,
  Authorized,
} from "routing-controllers";
import { userModelCreationAttributes } from "../models/userModel";
import UserRepo, { LoginData } from "../repository/userRepo";
import showService from "../services/showService";
import UserService, { tokenAndId } from "../services/userService";

@JsonController()
export class AppController {
  private service = new showService();
  private userService = new UserService();
  private jwt = require("jsonwebtoken");

  /**
   * http://localhost:3000/show
   * OR
   * http://localhost:3000/show?page=3&limit=1
   *
   * @returns paginated shows
   */
  @Get("/show")
  async getAll(@Req() request: any, @Res() response: any) {
    const page: number = +request.query?.page;
    const limit: number = +request.query?.limit;
    return await this.service.getAllShow(page, limit);
  }

  /*
  +
  + http://localhost:3000/show/detail/{showid}
  +
  */
  @Authorized()
  @Get("/show/detail/:showId")
  async getShowDetail(@Param("showId") showId: number, @Req() req: any) {
    return await this.service.getShowDetail(showId);
  }

  /*
  + http://localhost:3000/user/register
  + 
  + requires Body {email: string, password: string}
  */
  @Post("/user/register")
  async registerUser(@Body() payload: userModelCreationAttributes) {
    try {
      this.userService.register(payload);
      return { status: 200 };
    } catch (err) {
      return { status: 500, err: err.stack };
    }
  }

  /*
  + http://localhost:3000/user/login
  + 
  + requires Body {email: string, password: string}
  */
  @Post("/user/login")
  async login(@Body() payload: LoginData) {
    try {
      const userIdJson: { userId: number } = await this.userService.login(
        payload
      );
      const bearerToken: string = "Bearer " + this.jwt.sign(userIdJson, "test");
      return bearerToken;
    } catch (err) {
      return { status: 401, message: err.message };
    }
  }

  @Authorized()
  @Post("/show/vote/:rate/:showId")
  async rateShow(@Req() request: any, @Res() response: any) {
    try {
      const userId: number = request.headers["userinfo"];
      const showId: number = request.params["showId"];
      const rate: number = request.params["rate"];
      console.log(userId, showId, rate);
      await this.userService.rateShow(rate, userId, showId);
      return {};
    } catch (err) {
      return response.sendStatus(500);
    }
  }
}
