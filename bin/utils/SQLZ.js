"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLZ = void 0;
const sequelize_1 = require("sequelize");
class SQLZ {
    constructor() { }
    static getInstance() {
        if (!SQLZ.sequelize) {
            SQLZ.sequelize = new sequelize_1.Sequelize("film-db", "root", "password", {
                dialect: "mysql",
            });
        }
        return SQLZ.sequelize;
    }
}
exports.SQLZ = SQLZ;
//# sourceMappingURL=SQLZ.js.map