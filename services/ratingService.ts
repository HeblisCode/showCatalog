import ratingModel, {
  ratingModelCreationAttributes,
} from "../models/ratingModel";
import RatingRepo from "../repository/ratingRepo";
import showService from "./showService";

/**
 * @author Davide Stefania
 */
export default class RatingService {
  private ratingRepo = new RatingRepo();
  private showService = new showService();

  /**
   *
   * @param rating
   * @description saves a new rate entry and updates the show rating average
   */
  public async rateShow(rating: ratingModelCreationAttributes) {
    await this.ratingRepo.rateShow(rating);

    //eval the new avg rating after the new vote
    const newRating: number = await this.ratingRepo.evalAvgShowRating(
      rating.show_id
    );
    //saves the new rate avg inside the show
    await this.showService.updateShowRating(rating.show_id, newRating);
    return { status: 200, message: "Ok" };
  }

  /**
   *
   * @param userId
   * @param showId
   * @returns true if the user already voted for a specific show
   */
  public async hasUserVoted(userId: number, showId: number): Promise<boolean> {
    const userVote: ratingModel[] = await this.ratingRepo.findUserVote(
      userId,
      showId
    );
    return userVote.length > 0;
  }
}
