import {
  Body,
  Post,
  JsonController,
  Req,
  Authorized,
} from "routing-controllers";
import RatingService from "../services/ratingService";

/**
 *
 * http://localhost:3000/rate
 *
 */
@JsonController()
export class RatingController {
  private ratingService = new RatingService();

  @Authorized()
  @Post("/rate")
  async rateShow(@Req() request: any, @Body() data: any) {
    try {
      const userId: number = request.userId;
      await this.ratingService.rateShow({
        user_id: userId,
        rate: data.rate,
        show_id: data.showId,
      });
      return { status: 200 };
    } catch (err) {
      return { status: 500, message: err.message };
    }
  }
}
