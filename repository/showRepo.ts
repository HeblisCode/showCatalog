import { Op } from "sequelize";
import { values } from "sequelize/types/lib/operators";
import episodeModel from "../models/episodeModel";
import favoriteModel from "../models/favoriteModel";
import filmModel from "../models/filmModel";
import seasonModel from "../models/seasonModel";
import showModel from "../models/showModel";
import { SQLZ } from "../utils/SQLZ";

/**
 * @author Davide Stefania
 */
export default class ShowRepo {
  /**
   *
   * @param filter
   * @returns every show that matches the filters params
   */
  public async getAllShow(filter: Filter): Promise<showModel[]> {
    return showModel.findAll({
      raw: true,
      where: filter,
    });
  }

  /**
   *
   * @param filter
   * @param page
   * @param limit
   * @returns every show that matches the filters params but with pagination
   */
  public async getAllShowPaginated(
    filter: Filter,
    page: number,
    limit: number
  ): Promise<showModel[]> {
    const offset: number = (page - 1) * limit;
    return showModel.findAll({
      raw: true,
      limit: limit,
      offset: offset,
      where: filter,
    });
  }

  /**
   *
   * @param title
   * @param filter
   * @returns every show with title like title arg
   */
  public async getByTitle(title: string, filter: Filter): Promise<showModel[]> {
    return showModel.findAll({
      raw: true,
      where: { ...filter, title: { [Op.substring]: title } },
    });
  }

  /**
   *
   * @param filter
   * @returns total number of shows that matches the filters
   */
  public async getTotalShow(filter: Filter): Promise<number> {
    return showModel.count({ where: filter });
  }

  /**
   *
   * @param showId
   * @returns a show with id = showId
   */
  public async getShowById(showId: number): Promise<showModel> {
    return showModel.findByPk(showId, { raw: true });
  }

  /**
   *
   * @param showId
   * @returns takes a show id and return the corresponding film
   */
  public async getFilm(showId: number): Promise<filmModel> {
    return filmModel.findOne({
      where: { show_id: showId },
      raw: true,
    });
  }

  /**
   *
   * @param showId
   * @returns takes a show id and return all its seasons
   */
  public async getSeasons(showId: number): Promise<seasonModel[]> {
    return seasonModel.findAll({
      attributes: ["season_number", "id"],
      where: { show_id: showId },
      raw: true,
    });
  }

  /**
   *
   * @param seasonId
   * @returns takes a season id and return all its episodes
   */
  public async getEpisodes(seasonId: number): Promise<episodeModel[]> {
    return episodeModel.findAll({
      raw: true,
      where: { season_id: seasonId },
      attributes: { exclude: ["season_id"] },
    });
  }

  /**
   *
   * @param showId
   * @returns true if the show has seasons
   */
  public async hasSeasons(showId: number): Promise<boolean> {
    const data = await showModel.findAll({
      where: { id: showId },
      raw: true,
    });
    return !!data[0].has_seasons;
  }

  /**
   *
   * @param showId
   * @param newRating
   * @description updates a show rating column
   */
  public async updateShowRating(showId: number, newRating: number) {
    //showModel.update is not working as intended, i'm using a raw query while i try to solve this
    SQLZ.getInstance().query(
      "UPDATE `show` SET rating = " + newRating + " WHERE id = " + showId
    );
  }

  /**
   *
   * @param userId
   * @returns an array with all the favorites
   */
  public async getFavorites(userId: number): Promise<any> {
    return showModel.findAll({
      include: {
        model: favoriteModel,
        where: { user_id: userId },
      },
      raw: true,
    });
  }
}
