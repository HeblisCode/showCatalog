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
const sequelize_1 = require("sequelize");
const episodeModel_1 = __importDefault(require("../models/episodeModel"));
const favoriteModel_1 = __importDefault(require("../models/favoriteModel"));
const filmModel_1 = __importDefault(require("../models/filmModel"));
const seasonModel_1 = __importDefault(require("../models/seasonModel"));
const showModel_1 = __importDefault(require("../models/showModel"));
const SQLZ_1 = require("../utils/SQLZ");
class ShowRepo {
    getAllShow(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.findAll({
                raw: true,
                where: filter,
            });
        });
    }
    getAllShowPaginated(filter, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            return showModel_1.default.findAll({
                raw: true,
                limit: limit,
                offset: offset,
                where: filter,
            });
        });
    }
    getByTitle(title, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.findAll({
                raw: true,
                where: Object.assign(Object.assign({}, filter), { title: { [sequelize_1.Op.substring]: title } }),
            });
        });
    }
    getTotalShow(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.count({ where: filter });
        });
    }
    getShowById(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.findByPk(showId, { raw: true });
        });
    }
    getFilm(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            return filmModel_1.default.findOne({
                where: { show_id: showId },
                raw: true,
            });
        });
    }
    getSeasons(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            return seasonModel_1.default.findAll({
                attributes: ["season_number", "id"],
                where: { show_id: showId },
                raw: true,
            });
        });
    }
    getEpisodes(seasonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return episodeModel_1.default.findAll({
                raw: true,
                where: { season_id: seasonId },
                attributes: { exclude: ["season_id"] },
            });
        });
    }
    hasSeasons(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield showModel_1.default.findAll({
                where: { id: showId },
                raw: true,
            });
            return !!data[0].has_seasons;
        });
    }
    updateShowRating(showId, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            SQLZ_1.SQLZ.getInstance().query("UPDATE `show` SET rating = " + newRating + " WHERE id = " + showId);
        });
    }
    getFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.findAll({
                include: {
                    model: favoriteModel_1.default,
                    where: { user_id: userId },
                },
                raw: true,
            });
        });
    }
}
exports.default = ShowRepo;
//# sourceMappingURL=showRepo.js.map