import ratingModel, {
  ratingModelCreationAttributes,
} from "../models/ratingModel";

export default class RatingRepo {
  /**
   *
   * @param rate
   * @param showId
   * @param userId
   * @description creates a new rate entry
   *
   */
  async rateShow(rating: ratingModelCreationAttributes) {
    return ratingModel.create(rating);
  }

  /**
   *
   * @param showId
   * @returns `Promise<number>`
   * @description `returns the avg votes for a given showId`
   *
   */
  async evalAvgShowRating(showId: number): Promise<number> {
    const totalVotes: number = await ratingModel.count({
      where: { show_id: showId },
    });
    const votes: ratingModel[] = await ratingModel.findAll({
      where: { show_id: showId },
    });
    const votesSum: number = votes.reduce(
      (acc: number, el: ratingModel): number => {
        return acc + el.rate;
      },
      0
    );
    return votesSum / totalVotes;
  }

  async findUserVote(userId: number, showId: number) {
    return ratingModel.findAll({
      raw: true,
      where: { user_id: userId, show_id: showId },
    });
  }
}
