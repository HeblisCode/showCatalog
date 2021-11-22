import favoriteModel from "../models/favoriteModel";

/**
 * @author Davide Stefania
 */
export default class FavoriteRepo {
  /**
   *
   * @param showId
   * @param userId
   * @description create a new entry inside the favorite table
   */
  public async create(showId: number, userId: number): Promise<favoriteModel> {
    return favoriteModel.create({ show_id: showId, user_id: userId });
  }

  /**
   *
   * @param showId
   * @param userId
   * @description delete a entry inside the favorite table
   */
  public async remove(showId: number, userId: number): Promise<number> {
    return favoriteModel.destroy({
      where: { show_id: showId, user_id: userId },
    });
  }

  /**
   *
   * @param showId
   * @param userId
   * @description finds the user fav entry for the show with showId
   */
  public async findFavorite(
    showId: number,
    userId: number
  ): Promise<favoriteModel[]> {
    return favoriteModel.findAll({
      where: { show_id: showId, user_id: userId },
    });
  }
}
