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
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
require("reflect-metadata");
const appController_1 = require("./controllers/appController");
const app = (0, routing_controllers_1.createExpressServer)({
    controllers: [appController_1.AppController],
    cors: true,
    authorizationChecker: (action, roles) => __awaiter(void 0, void 0, void 0, function* () {
        const token = action.request.headers["testtoken"];
        return token === "testToken:190561756138456197418347194";
    }),
});
app.listen(3000, () => {
    console.log("Server up and running");
});
//# sourceMappingURL=index.js.map