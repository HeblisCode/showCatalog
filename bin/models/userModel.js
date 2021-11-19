"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SQLZ_1 = require("../utils/SQLZ");
const sequelize = SQLZ_1.SQLZ.getInstance();
class userModel extends sequelize_1.Model {
}
exports.default = userModel;
userModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
}, { sequelize, tableName: "user", timestamps: false, underscored: true });
//# sourceMappingURL=userModel.js.map