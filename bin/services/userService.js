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
            const isUserRegistered = yield this.userRepo.isUserRegistered(payload);
            if (isUserRegistered) {
                return "testToken:190561756138456197418347194";
            }
            else {
                throw "not registered";
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map