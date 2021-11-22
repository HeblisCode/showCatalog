import {
  Param,
  Get,
  JsonController,
  Req,
  Authorized,
  Res,
  Body,
} from "routing-controllers";
import { userModelCreationAttributes } from "../models/userModel";
import FavoriteService from "../services/favoriteService";
import RatingService from "../services/ratingService";
import showService from "../services/showService";
import UserService from "../services/userService";

@JsonController()
export class ShowController {
  private service = new showService();
  private favoriteService = new FavoriteService();
  private ratingService = new RatingService();

  /**
   * http://localhost:3000/show
   * OR
   * http://localhost:3000/show?page=3&limit=1
   *
   * @description paginated shows
   */
  @Get("/show")
  async getAll(@Req() request: any, @Body() filter: Filter) {
    const page: number = +request.query?.page;
    const limit: number = +request.query?.limit;
    try {
      return await this.service.getAllShow(filter, page, limit);
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }

  @Get("/show/title/:title")
  async getByTitle(@Param("title") title: string, @Body() filter: Filter) {
    try {
      return await this.service.getByTitle(title, filter);
    } catch (err) {
      return { status: 500, message: err.message };
    }
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
    try {
      const data: ShowDetailJSONResponse = await this.service.getShowDetail(
        showId
      );
      const isFavorite: boolean = await this.favoriteService.isFavorite(
        showId,
        req.userId
      );
      const hasVoted: boolean = await this.ratingService.hasUserVoted(
        req.userId,
        showId
      );
      return { ...data, isFavorite, hasVoted } as ShowDetailJSONResponse;
    } catch (err) {
      return { status: 404, message: "notFound" };
    }
  }

  @Authorized()
  @Get("/show/favorites")
  async getFavorites(@Req() req: any) {
    try {
      return await this.service.getFavorites(req.userId);
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }
}
