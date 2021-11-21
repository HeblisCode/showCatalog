import {
  Body,
  Post,
  JsonController,
  Req,
  Res,
  Authorized,
  Get,
  Param,
} from "routing-controllers";
import { userModelCreationAttributes } from "../models/userModel";
import FavoriteService from "../services/favoriteService";
import UserService from "../services/userService";

@JsonController()
export class FavoriteController {
  private favoriteService = new FavoriteService();

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
