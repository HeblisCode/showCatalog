"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AppController = void 0;
const routing_controllers_1 = require("routing-controllers");
const showService_1 = __importDefault(require("../services/showService"));
let AppController = class AppController {
    constructor() {
        this.service = new showService_1.default();
    }
    getAll(request, response) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const page = +((_a = request.query) === null || _a === void 0 ? void 0 : _a.page);
            const limit = +((_b = request.query) === null || _b === void 0 ? void 0 : _b.limit);
            return yield this.service.getAllShow(page, limit);
        });
    }
    getShowDetail(showId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.service.getShowDetail(showId);
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/show"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)())
], AppController.prototype, "getAll", null);
__decorate([
    (0, routing_controllers_1.Get)("/show/detail/:showId"),
    __param(0, (0, routing_controllers_1.Param)("showId"))
], AppController.prototype, "getShowDetail", null);
AppController = __decorate([
    (0, routing_controllers_1.JsonController)()
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=appController.js.map