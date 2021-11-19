"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const showRepo_1 = __importDefault(require("../repository/showRepo"));
class showService {
    constructor() {
        this.repository = new showRepo_1.default();
    }
    getAllShow(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = [];
            const total = yield this.repository.getTotalShow();
            if (page && limit) {
                list = yield this.repository.getAllShowPaginated(page, limit);
            }
            else {
                list = yield this.repository.getAllShow();
            }
            return {
                list,
                total,
                page: page,
            };
        });
    }
    getSerieByShow(reqShowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.repository.getShowById(reqShowId);
            const seasons = yield this.repository.getSeasons(reqShowId);
            const mappedSeasons = yield Promise.all(seasons.map((el) => __awaiter(this, void 0, void 0, function* () {
                const episodes = yield this.repository.getEpisodes(el.id);
                return {
                    seasonNumber: el.season_number,
                    id: el.id,
                    episodes: episodes,
                };
            })));
            return show.map((el) => {
                return {
                    id: el.id,
                    title: el.title,
                    genre: el.genre,
                    nation: el.nation,
                    prodYear: el.prod_year,
                    rating: el.rating,
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
        });
    }
    getFilmByShow(reqShowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.repository.getFilm(reqShowId);
            return data.map((film) => {
                return {
                    id: film.id,
                    title: film.title,
                    genre: film.genre,
                    nation: film.nation,
                    prodYear: film.prod_year,
                    rating: film.rating,
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
        });
    }
    getShowDetail(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasSeasons = yield this.repository.hasSeasons(showId);
            console.log(hasSeasons);
            if (hasSeasons) {
                return this.getSerieByShow(showId);
            }
            else {
                return this.getFilmByShow(showId);
            }
        });
    }
}
exports.default = showService;
//# sourceMappingURL=showService.js.map