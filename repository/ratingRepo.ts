import ratingModel, {
  ratingModelCreationAttributes,
} from "../models/ratingModel";

/**
 * @author Davide Stefania
 */
export default class RatingRepo {
  /**
   *
   * @param rating
   * @description creates a new rate entry
   */
  public async rateShow(
    rating: ratingModelCreationAttributes
  ): Promise<ratingModel> {
    return ratingModel.create(rating);
  }

  /**
   *
   * @param showId
   * @description returns the avg votes for a given showId
   */
  public async evalAvgShowRating(showId: number): Promise<number> {
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

  /**
   *
   * @param userId
   * @param showId
   * @description finds the user vote entry for the show with showId
   */
  public async findUserVote(
    userId: number,
    showId: number
  ): Promise<ratingModel[]> {
    return ratingModel.findAll({
      raw: true,
      where: { user_id: userId, show_id: showId },
    });
  }
}
