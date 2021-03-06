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
        this.bcrypt = require("bcrypt");
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findUserByEmail(loginData.email);
            if (!user) {
                throw new Error("user not found");
            }
            const isPwCorrect = yield this.bcrypt.compare(loginData.password, user.password);
            if (isPwCorrect) {
                return { userId: user.id };
            }
            else {
                throw "incorrect password";
            }
        });
    }
    register(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            let hashedPassword = "";
            try {
                hashedPassword = yield this.bcrypt.hash(payload.password, 10);
            }
            catch (err) {
                return { status: 500, message: err.message };
            }
            try {
                const user = {
                    email: payload.email,
                    password: hashedPassword,
                    age: payload.age,
                };
                yield this.userRepo.registerUser(user);
                return { status: 200, message: "ok" };
            }
            catch (err) {
                return { status: 409, message: err.message };
            }
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map