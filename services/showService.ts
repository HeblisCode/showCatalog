import filmModel from "../models/filmModel";
import showModel from "../models/showModel";
import ShowRepo from "../repository/showRepo";

/**
 * @author Davide Stefania
 */
export default class showService {
  private repository = new ShowRepo();

  /**
   *
   * @param filter
   * @param page
   * @param limit
   * @returns returns all the shows that matches the filters and return a paginated array if page and limit are defined
   */
  public async getAllShow(
    filter: Filter,
    page?: number,
    limit?: number
  ): Promise<PaginatedShowJSONResponse> {
    let modelList: showModel[] = [];
    const total: number = await this.repository.getTotalShow(filter);

    if (page && limit) {
      modelList = await this.repository.getAllShowPaginated(
        filter,
        page,
        limit
      );
    } else {
      modelList = await this.repository.getAllShow(filter);
    }

    const list: ShowJSONResponse[] = modelList.map((show: showModel) => {
      return {
        id: show.id,
        title: show.title,
        genre: show.genre,
        rating: show.rating,
        duration: show.duration,
        imageURL: show.image_url,
        minAge: show.min_age,
        hasSeasons: !!show.has_seasons,
      } as ShowJSONResponse;
    });

    return {
      list,
      total,
      page: page,
    } as PaginatedShowJSONResponse;
  }

  /**
   *
   * @param reqShowId
   * @returns the show details when the show is a serie
   */
  public async getSerieByShow(
    reqShowId: number
  ): Promise<ShowDetailJSONResponse> {
    const show = await this.repository.getShowById(reqShowId);
    const seasons = await this.repository.getSeasons(reqShowId);

    const mappedSeasons: SeasonJSONResponse[] = await Promise.all(
      seasons.map(async (el: any) => {
        const episodes: EpisodeJSONResponse[] =
          await this.repository.getEpisodes(el.id);
        return {
          seasonNumber: el.season_number,
          id: el.id,
          episodes: episodes,
        } as SeasonJSONResponse;
      })
    );

    return {
      id: show.id,
      title: show.title,
      genre: show.genre,
      nation: show.nation,
      prodYear: show.prod_year,
      rating: show.rating,
      duration: show.duration,
      directedBy: show.directed_by,
      abstract: show.abstract,
      imageURL: show.image_url,
      hasSeasons: !!show.has_seasons,
      totalSeason: show.total_seasons,
      url: null,
      minAge: show.min_age,
      seasons: mappedSeasons,
    } as ShowDetailJSONResponse;
  }

  /**
   *
   * @param showId
   * @returns the show detail when the show is a film
   */
  public async getFilmByShow(showId: number) {
    const show: showModel = await this.repository.getShowById(showId);
    const film: filmModel = await this.repository.getFilm(showId);

    return {
      id: show.id,
      title: show.title,
      genre: show.genre,
      nation: show.nation,
      prodYear: show.prod_year,
      rating: show.rating,
      duration: show.duration,
      directedBy: show.directed_by,
      abstract: show.abstract,
      imageURL: show.image_url,
      hasSeasons: show.has_seasons,
      totalSeason: show.total_seasons,
      imageUrl: show.image_url,
      minAge: show.min_age,
      url: film.url,
      seasons: null,
    } as ShowDetailJSONResponse;
  }

  /**
   *
   * @param showId
   * @returns calls the correct method based on the show type (serie/film)
   */
  public async getShowDetail(showId: number): Promise<ShowDetailJSONResponse> {
    const hasSeasons: boolean = await this.repository.hasSeasons(showId);
    if (hasSeasons) {
      return this.getSerieByShow(showId);
    } else {
      return this.getFilmByShow(showId);
    }
  }

  /**
   *
   * @param showId
   * @param newRating
   * @returns updates the show rating field
   */
  public async updateShowRating(showId: number, newRating: number) {
    return this.repository.updateShowRating(showId, newRating);
  }

  /**
   *
   * @param userId
   * @returns an array with all the user favorite shows
   */
  public async getFavorites(userId: number): Promise<ShowJSONResponse[]> {
    const shows: showModel[] = await this.repository.getFavorites(userId);
    return shows.map((show: showModel) => {
      return {
        id: show.id,
        title: show.title,
        genre: show.genre,
        rating: show.rating,
        duration: show.duration,
        imageURL: show.image_url,
        minAge: show.min_age,
        hasSeasons: !!show.has_seasons,
      } as ShowJSONResponse;
    });
  }

  public async getByTitle(title: string, filter: Filter) {
    const shows: showModel[] = await this.repository.getByTitle(title, filter);
    return shows.map((show: showModel) => {
      return {
        id: show.id,
        title: show.title,
        genre: show.genre,
        rating: show.rating,
        duration: show.duration,
        imageURL: show.image_url,
        minAge: show.min_age,
        hasSeasons: !!show.has_seasons,
      } as ShowJSONResponse;
    });
  }
}
