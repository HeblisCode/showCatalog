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
    getAllShow(filter, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            let list = [];
            const total = yield this.repository.getTotalShow(filter);
            if (page && limit) {
                list = yield this.repository.getAllShowPaginated(filter, page, limit);
            }
            else {
                list = yield this.repository.getAllShow(filter);
            }
            list = list.map((show) => {
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
        });
    }
    getFilmByShow(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            const show = yield this.repository.getShowById(showId);
            const film = yield this.repository.getFilm(showId);
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
        });
    }
    getShowDetail(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hasSeasons = yield this.repository.hasSeasons(showId);
            if (hasSeasons) {
                return this.getSerieByShow(showId);
            }
            else {
                return this.getFilmByShow(showId);
            }
        });
    }
    updateShowRating(showId, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.updateShowRating(showId, newRating);
        });
    }
    getFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const shows = yield this.repository.getFavorites(userId);
            return shows.map((show) => {
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
        });
    }
    getByTitle(title, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const shows = yield this.repository.getByTitle(title, filter);
            return shows.map((show) => {
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
        });
    }
}
exports.default = showService;
//# sourceMappingURL=showService.js.map