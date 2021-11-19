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
const episodeModel_1 = __importDefault(require("../models/episodeModel"));
const filmModel_1 = __importDefault(require("../models/filmModel"));
const seasonModel_1 = __importDefault(require("../models/seasonModel"));
const showModel_1 = __importDefault(require("../models/showModel"));
class ShowRepo {
    constructor() { }
    getAllShow() {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.findAll({ raw: true });
        });
    }
    getAllShowPaginated(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            return showModel_1.default.findAll({ raw: true, limit: limit, offset: offset });
        });
    }
    getTotalShow() {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.count();
        });
    }
    getShowById(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.findAll({ raw: true, where: { id: showId } });
        });
    }
    getFilm(reqShowId) {
        return __awaiter(this, void 0, void 0, function* () {
            return showModel_1.default.findAll({
                include: [
                    { model: filmModel_1.default, required: true, where: { show_id: reqShowId } },
                ],
                raw: true,
            });
        });
    }
    getSeasons(reqShowId) {
        return __awaiter(this, void 0, void 0, function* () {
            return seasonModel_1.default.findAll({
                attributes: ["season_number", "id"],
                where: { show_id: reqShowId },
                raw: true,
            });
        });
    }
    getEpisodes(reqSeasonId) {
        return __awaiter(this, void 0, void 0, function* () {
            return episodeModel_1.default.findAll({
                attributes: ["episode_number", "id", "url"],
                raw: true,
                where: { season_id: reqSeasonId },
            });
        });
    }
    hasSeasons(reqShowId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield showModel_1.default.findAll({
                where: { id: reqShowId },
                raw: true,
            });
            return !!data[0].has_seasons;
        });
    }
}
exports.default = ShowRepo;
//# sourceMappingURL=showRepo.js.map