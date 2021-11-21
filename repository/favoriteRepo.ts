import favoriteModel from "../models/favoriteModel";

export default class FavoriteRepo {
  public async create(showId: number, userId: number) {
    return favoriteModel.create({ show_id: showId, user_id: userId });
  }

  public async remove(showId: number, userId: number) {
    return favoriteModel.destroy({ where: { show_id: showId } });
  }

  public async isFavorite(showId: number, userId: number): Promise<boolean> {
    const favorite: favoriteModel[] = await favoriteModel.findAll({
      where: { show_id: showId, user_id: userId },
    });
    return favorite.length > 0;
  }
}
