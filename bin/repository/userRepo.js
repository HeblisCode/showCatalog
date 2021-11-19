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
const favoriteModel_1 = __importDefault(require("../models/favoriteModel"));
const ratingModel_1 = __importDefault(require("../models/ratingModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
class UserRepo {
    constructor() { }
    registerUser(payload) {
        userModel_1.default.create(payload);
    }
    setShowAsFavorite(showId, userId) {
        favoriteModel_1.default.create({ show_id: showId, user_id: userId });
    }
    rateShow(rate, showId, userId) {
        ratingModel_1.default.create({ rate: rate, show_id: showId, user_id: userId });
    }
    findUser(payload) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.default.findAll({
                where: { email: payload.email, password: payload.password },
            });
            return {
                userFound: user.length > 0,
                userId: (_a = user[0]) === null || _a === void 0 ? void 0 : _a.id,
            };
        });
    }
}
exports.default = UserRepo;
//# sourceMappingURL=userRepo.js.map