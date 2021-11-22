import favoriteModel from "../models/favoriteModel";
import FavoriteRepo from "../repository/favoriteRepo";

/**
 * @author Davide Stefania
 */
export default class FavoriteService {
  private favoriteRepo = new FavoriteRepo();

  /**
   *
   * @param showId
   * @param userId
   * @description adds a show to favorites
   */
  public async addShowToFavorite(
    showId: number,
    userId: number
  ): Promise<favoriteModel> {
    return this.favoriteRepo.create(showId, userId);
  }

  /**
   *
   * @param showId
   * @param userId
   * @description removes a show from favorites
   */
  public async removeShowToFavorite(
    showId: number,
    userId: number
  ): Promise<number> {
    return this.favoriteRepo.remove(showId, userId);
  }

  /**
   *
   * @param showId
   * @param userId
   * @returns true if the user already added the show to favorites
   */
  public async isFavorite(showId: number, userId: number): Promise<boolean> {
    const favorite: favoriteModel[] = await this.favoriteRepo.findFavorite(
      showId,
      userId
    );
    return favorite.length > 0;
  }
}
