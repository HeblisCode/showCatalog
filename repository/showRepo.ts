import episodeModel from "../models/episodeModel";
import filmModel from "../models/filmModel";
import seasonModel from "../models/seasonModel";
import showModel from "../models/showModel";

export default class ShowRepo {
  constructor() {}

  /**
   * @param: `none`
   * @return: `Promise<showModel[]>`
   * @description: `returns an array with all the shows`
   */
  public async getAllShow(): Promise<showModel[]> {
    return showModel.findAll({ raw: true });
  }

  /**
   * @param: `page: number, limit: number`
   * @return: `Promise<showModel[]>`
   * @description: `returns a paginated array of shows`
   */
  public async getAllShowPaginated(
    page: number,
    limit: number
  ): Promise<showModel[]> {
    const offset: number = (page - 1) * limit;
    return showModel.findAll({ raw: true, limit: limit, offset: offset });
  }

  /**
   * @param: `none`
   * @return: `Promise<number>`
   * @description: `returns the total number of shows`
   */
  public async getTotalShow(): Promise<number> {
    return showModel.count();
  }

  /**
   * @param: `showId: number`
   * @return: `Promise<showModel>`
   * @description: `returns the a show`
   */
  public async getShowById(showId: number): Promise<showModel> {
    return showModel.findByPk(showId, { raw: true });
  }

  /**
   * @param `showId: number`
   * @returns `Promise<filmModel>`
   * @description takes a show id and return the corresponding film
   */
  public async getFilm(showId: number): Promise<filmModel> {
    return filmModel.findOne({
      where: { show_id: showId },
      raw: true,
    });
  }

  /**
   * @param `showId: number`
   * @returns `Promise<seasonModel[]>`
   * @description takes a show id and return all its seasons
   */
  public async getSeasons(showId: number): Promise<seasonModel[]> {
    return seasonModel.findAll({
      attributes: ["season_number", "id"],
      where: { show_id: showId },
      raw: true,
    });
  }

  /**
   * @param `seasonId: number`
   * @returns `Promise<episodeModel[]>`
   * @description takes a season id and return all its episodes
   */
  public async getEpisodes(seasonId: number): Promise<episodeModel[]> {
    return episodeModel.findAll({
      raw: true,
      where: { season_id: seasonId },
      attributes: { exclude: ["season_id"] },
    });
  }

  /**
   * @param `showId: number`
   * @returns `Promise<boolean>`
   * @description returns true if the show has seasons
   */
  public async hasSeasons(showId: number): Promise<boolean> {
    const data = await showModel.findAll({
      where: { id: showId },
      raw: true,
    });
    return !!data[0].has_seasons;
  }
}
