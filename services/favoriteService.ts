import FavoriteRepo from "../repository/favoriteRepo";

export default class FavoriteService {
  private favoriteRepo = new FavoriteRepo();

  public async addShowToFavorite(showId: number, userId: number) {
    return this.favoriteRepo.create(showId, userId);
  }

  public async removeShowToFavorite(showId: number, userId: number) {
    return this.favoriteRepo.remove(showId, userId);
  }

  public async isFavorite(showId: number, userId: number) {
    return this.favoriteRepo.isFavorite(showId, userId);
  }
}
