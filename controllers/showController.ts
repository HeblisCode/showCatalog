import {
  Param,
  Get,
  JsonController,
  Req,
  Authorized,
} from "routing-controllers";
import { userModelCreationAttributes } from "../models/userModel";
import showService from "../services/showService";
import UserService from "../services/userService";

@JsonController()
export class ShowController {
  private service = new showService();

  /**
   * http://localhost:3000/show
   * OR
   * http://localhost:3000/show?page=3&limit=1
   *
   * @description paginated shows
   */
  @Get("/show")
  async getAll(@Req() request: any) {
    const page: number = +request.query?.page;
    const limit: number = +request.query?.limit;
    return await this.service.getAllShow(page, limit);
  }

  /**
   *
   * http://localhost:3000/show/detail/{showid}
   * @description returns a show detail by id
   *
   */
  @Authorized()
  @Get("/show/detail/:showId")
  async getShowDetail(@Param("showId") showId: number, @Req() req: any) {
    console.log(showId);
    return await this.service.getShowDetail(showId);
  }
}
