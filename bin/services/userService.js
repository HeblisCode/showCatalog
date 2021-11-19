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
const userRepo_1 = __importDefault(require("../repository/userRepo"));
class UserService {
    constructor() {
        this.userRepo = new userRepo_1.default();
    }
    login(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findUser(payload);
            if (user.userFound) {
                return {
                    token: "testToken:190561756138456197418347194",
                    userId: user.userId,
                };
            }
            else {
                throw "not registered";
            }
        });
    }
    rateShow(rate, userId, showId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (rate < 0 || rate > 5) {
                throw "Input error: field rate must be between 0 and 5";
            }
            this.userRepo.rateShow(rate, userId, showId);
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map