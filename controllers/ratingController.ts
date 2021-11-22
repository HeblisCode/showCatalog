import {
  Body,
  Post,
  JsonController,
  Req,
  Authorized,
} from "routing-controllers";
import RatingService from "../services/ratingService";

/**
 * @author Davide Stefania
 */
@JsonController()
export class RatingController {
  private ratingService = new RatingService();

  /**
   *
   * @param req
   * @param data `{"rate": number, "showId": number}`
   * @description saves the user vote for a given show inside the db
   */
  @Authorized()
  @Post("/rate")
  async rateShow(
    @Req() req: any,
    @Body() data: { rate: number; showId: number }
  ) {
    if (data.rate < 0 || data.rate > 5) {
      return { status: 400, message: "invalid rate field" };
    }
    try {
      const userId: number = req.userId;
      await this.ratingService.rateShow({
        user_id: userId,
        rate: data.rate,
        show_id: data.showId,
      });
      return { status: 200, message: "OK" };
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }
}
