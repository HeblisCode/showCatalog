import episodeModel from "../models/episodeModel";
import filmModel from "../models/filmModel";
import seasonModel from "../models/seasonModel";
import showModel from "../models/showModel";

export default class ShowRepo {
  constructor() {}

  /*
  + @param: none
  + @return: ShowModel[]
  +
  + @description: returns all the shows
  */
  public async getAllShow() {
    return showModel.findAll({ raw: true });
  }

  /*
  + @param: page: number, limit: number
  + @return: ShowModel[]
  +
  + @description: returns all the shows paginated
  */
  public async getAllShowPaginated(page: number, limit: number) {
    const offset: number = (page - 1) * limit;
    return showModel.findAll({ raw: true, limit: limit, offset: offset });
  }

  /*
  + @param: none
  + @return: number
  +
  + @description: returns the total number of shows
  */
  public async getTotalShow() {
    return showModel.count();
  }

  /*
  + @param: showId:number
  + @return: ShowModel[]
  +
  + @description: returns the show with showId
  */
  public async getShowById(showId: number) {
    return showModel.findAll({ raw: true, where: { id: showId } });
  }

  public async getFilm(reqShowId: number) {
    return showModel.findAll({
      include: [
        { model: filmModel, required: true, where: { show_id: reqShowId } },
      ],
      raw: true,
    });
  }

  public async getSeasons(reqShowId: number) {
    return seasonModel.findAll({
      attributes: ["season_number", "id"],
      where: { show_id: reqShowId },
      raw: true,
    });
  }

  public async getEpisodes(reqSeasonId: number) {
    return episodeModel.findAll({
      attributes: ["episode_number", "id", "url"],
      raw: true,
      where: { season_id: reqSeasonId },
    });
  }

  public async hasSeasons(reqShowId: number) {
    const data = await showModel.findAll({
      where: { id: reqShowId },
      raw: true,
    });
    return !!data[0].has_seasons;
  }
}
