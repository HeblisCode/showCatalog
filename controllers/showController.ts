import {
  Param,
  Get,
  JsonController,
  Req,
  Authorized,
  Body,
} from "routing-controllers";
import FavoriteService from "../services/favoriteService";
import RatingService from "../services/ratingService";
import showService from "../services/showService";

/**
 * @author Davide Stefania
 */
@JsonController()
export class ShowController {
  private service = new showService();
  private favoriteService = new FavoriteService();
  private ratingService = new RatingService();

  /**
   * http://localhost:3000/show
   * OR
   * http://localhost:3000/show?page=3&limit=1
   * @param request
   * @param filter
   * @returns
   */
  @Get("/show")
  async getAll(@Req() request: any, @Body() filter: Filter) {
    const page: number = +request.query?.page;
    const limit: number = +request.query?.limit;
    try {
      return (await this.service.getAllShow(
        filter,
        page,
        limit
      )) as PaginatedShowJSONResponse;
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }

  /**
   * http://localhost:3000/show/title/{title}
   * @param title
   * @param filter
   * @description find the shows with {title} inside the title field (sql LIKE)
   */
  @Get("/show/title/:title")
  async getByTitle(@Param("title") title: string, @Body() filter: Filter) {
    try {
      return (await this.service.getByTitle(
        title,
        filter
      )) as ShowJSONResponse[];
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }

  /**
   * http://localhost:3000/show/detail/{showid}
   * @param showId
   * @param req
   * @description returns a show detail by id
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

  /**
   * http://localhost:3000/show/favorites
   * @param req
   * @description returns the user favorite shows
   */
  @Authorized()
  @Get("/show/favorites")
  async getFavorites(@Req() req: any) {
    try {
      return (await this.service.getFavorites(
        req.userId
      )) as ShowJSONResponse[];
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }
}
