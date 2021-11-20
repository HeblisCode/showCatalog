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

    return show.map((el: any) => {
      return {
        id: el.id,
        title: el.title,
        genre: el.genre,
        nation: el.nation,
        prodYear: el.prod_year,
        // rating: el.rating,
        duration: el.duration,
        directedBy: el.directed_by,
        abstract: el.abstract,
        imageURL: el.image_url,
        hasSeasons: !!el.has_seasons,
        totalSeason: el.total_seasons,
        minAge: el.min_age,
        seasons: mappedSeasons,
      };
    });
  }

  public async getFilmByShow(reqShowId: number) {
    const data: any = await this.repository.getFilm(reqShowId);
    return data.map((film: any) => {
      return {
        id: film.id,
        title: film.title,
        genre: film.genre,
        nation: film.nation,
        prodYear: film.prod_year,
        // rating: film.rating,
        duration: film.duration,
        directedBy: film.directed_by,
        abstract: film.abstract,
        imageURL: film.image_url,
        hasSeasons: !!film.has_seasons,
        totalSeason: film.total_seasons,
        minAge: film.min_age,
        URL: film["filmModel.url"],
      };
    });
  }

  public async getShowDetail(showId: number) {
    const hasSeasons: boolean = await this.repository.hasSeasons(showId);
    console.log(hasSeasons);
    if (hasSeasons) {
      return this.getSerieByShow(showId);
    } else {
      return this.getFilmByShow(showId);
    }
  }
}
