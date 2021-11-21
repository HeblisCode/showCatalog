// async rateShow(rate: number, userId: number, showId: number) {
//   if (rate < 0 || rate > 5) {
//     throw "Input error: field rate must be between 0 and 5";
//   }
//   this.userRepo.rateShow(rate, userId, showId);

import { ratingModelCreationAttributes } from "../models/ratingModel";
import RatingRepo from "../repository/ratingRepo";
import showService from "./showService";

// }
export default class RatingService {
  private ratingRepo = new RatingRepo();
  private showService = new showService();

  async rateShow(rating: ratingModelCreationAttributes) {
    await this.ratingRepo.rateShow(rating);

    //eval the new avg rating after the new vote
    const newRating: number = await this.ratingRepo.evalAvgShowRating(
      rating.show_id
    );

    await this.showService.updateShowRating(rating.show_id, newRating);

    return { status: 200, message: "Ok" };
  }
}
