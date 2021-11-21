import filmModel from "../models/filmModel";
import showModel from "../models/showModel";
import ShowRepo from "../repository/showRepo";

export default class showService {
  private repository = new ShowRepo();

  public async getAllShow(page?: number, limit?: number) {
    let list = [];
    const total = await this.repository.getTotalShow();

    if (page && limit) {
      list = await this.repository.getAllShowPaginated(page, limit);
    } else {
      list = await this.repository.getAllShow();
    }

    list = list.map((show: showModel) => {
      return {
        id: show.id,
        title: show.title,
        genre: show.genre,
        rating: show.rating,
        duration: show.duration,
        imageURL: show.image_url,
        minAge: show.min_age,
      };
    });

    return {
      list,
      total,
      page: page,
    };
  }

  public async getSerieByShow(reqShowId: number) {
    const show = await this.repository.getShowById(reqShowId);
    const seasons = await this.repository.getSeasons(reqShowId);

    const mappedSeasons = await Promise.all(
      seasons.map(async (el: any) => {
        const episodes = await this.repository.getEpisodes(el.id);
        return {
          seasonNumber: el.season_number,
          id: el.id,
          episodes: episodes,
        };
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
      minAge: show.min_age,
      seasons: mappedSeasons,
    };
  }

  public async getFilmByShow(showId: number) {
    const show: showModel = await this.repository.getShowById(showId);
    const film: filmModel = await this.repository.getFilm(showId);
    console.log(show);
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
      minAge: show.min_age,
      URL: film.url,
    };
  }

  public async getShowDetail(showId: number) {
    const hasSeasons: boolean = await this.repository.hasSeasons(showId);
    if (hasSeasons) {
      return this.getSerieByShow(showId);
    } else {
      return this.getFilmByShow(showId);
    }
  }

  public async updateShowRating(showId: number, newRating: number) {
    return this.repository.updateShowRating(showId, newRating);
  }

  public async getFavorites(userId: number) {
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
      };
    });
  }
}
