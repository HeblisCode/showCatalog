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
import UserRepo, { User } from "../repository/userRepo";
import showService from "../services/showService";
import UserService from "../services/userService";

@JsonController()
export class AppController {
  private service = new showService();
  private userService = new UserService();

  /*
  + http://localhost:3000/show
  +
  + http://localhost:3000/show?page=3&limit=1
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
  async getShowDetail(@Param("showId") showId: number) {
    return await this.service.getShowDetail(showId);
  }

  /*
  + http://localhost:3000/user/register
  + 
  + requires Body
  */
  @Post("/user/register")
  registerUser(@Body() payload: userModelCreationAttributes) {
    const repo = new UserRepo();
    try {
      repo.registerUser(payload);
      return { status: 200 };
    } catch (err) {
      return { status: 500, err: err.stack };
    }
  }

  @Get("/user/login")
  async login(@Body() payload: User) {
    try {
      const token: string = await this.userService.login(payload);
      return { staus: 200, token: token };
    } catch (err) {
      return { status: 401 };
    }
  }
}
