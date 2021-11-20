import ratingModel from "../models/ratingModel";

export default class RatingRepo {
  rateShow(rate: number, showId: number, userId: number) {
    ratingModel.create({ rate: rate, show_id: showId, user_id: userId });
  }
}
