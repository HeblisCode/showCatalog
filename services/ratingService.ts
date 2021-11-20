// async rateShow(rate: number, userId: number, showId: number) {
//   if (rate < 0 || rate > 5) {
//     throw "Input error: field rate must be between 0 and 5";
//   }
//   this.userRepo.rateShow(rate, userId, showId);

import { ratingModelCreationAttributes } from "../models/ratingModel";
import RatingRepo from "../repository/ratingRepo";

// }
export default class RatingService {
  private ratingRepo = new RatingRepo();

  async rateShow(rating: ratingModelCreationAttributes) {
    if (rating.rate < 0 || rating.rate > 5) {
      throw new Error("Rate must be between 0 and 5");
    }
    return this.ratingRepo.rateShow(rating);
  }
}
