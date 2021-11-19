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
} from "routing-controllers";
import showService from "../services/showService";

@JsonController()
export class AppController {
  private service = new showService();

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
  + http://localhost:3000/show/detail/{showid}
  */
  @Get("/show/detail/:showId")
  async getShowDetail(@Param("showId") showId: number) {
    return await this.service.getShowDetail(showId);
  }
}
