"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SQLZ_1 = require("../utils/SQLZ");
const showModel_1 = __importDefault(require("./showModel"));
const userModel_1 = __importDefault(require("./userModel"));
const sequelize = SQLZ_1.SQLZ.getInstance();
class favoriteModel extends sequelize_1.Model {
}
exports.default = favoriteModel;
favoriteModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    show_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { sequelize, tableName: "favorite", timestamps: false, underscored: true });
favoriteModel.belongsTo(showModel_1.default, { foreignKey: "show_id" });
favoriteModel.belongsTo(userModel_1.default, { foreignKey: "user_id" });
showModel_1.default.hasOne(favoriteModel, { foreignKey: "show_id" });
userModel_1.default.hasOne(favoriteModel, { foreignKey: "user_id" });
//# sourceMappingURL=favoriteModel.js.map