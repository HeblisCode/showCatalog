import favoriteModel from "../models/favoriteModel";

export default class FavoriteRepo {
  setShowAsFavorite(showId: number, userId: number) {
    favoriteModel.create({ show_id: showId, user_id: userId });
  }
}
