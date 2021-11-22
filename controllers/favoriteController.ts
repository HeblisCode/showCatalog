import {
  Post,
  JsonController,
  Req,
  Authorized,
  Param,
} from "routing-controllers";
import FavoriteService from "../services/favoriteService";

/**
 * @author Davide Stefania
 */
@JsonController()
export class FavoriteController {
  private favoriteService = new FavoriteService();

  /**
   * http://localhost:3000/favorite/add/{showId}
   * @param showId
   * @param req
   * @description `add a show to the user favorite list`
   */
  @Authorized()
  @Post("/favorite/add/:showId")
  public async addFavorite(@Param("showId") showId: number, @Req() req: any) {
    try {
      await this.favoriteService.addShowToFavorite(showId, req.userId);
      return { status: 200, message: "Ok" };
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }

  /**
   * http://localhost:3000/favorite/remove/{showId}
   * @param showId
   * @param req
   * @description `remove a show to the user favorite list`
   */
  @Authorized()
  @Post("/favorite/remove/:showId")
  public async removeFavorite(
    @Param("showId") showId: number,
    @Req() req: any
  ) {
    try {
      await this.favoriteService.removeShowToFavorite(showId, req.userId);
      return { status: 200, message: "Ok" };
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }
}
