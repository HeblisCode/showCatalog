"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SQLZ_1 = require("../utils/SQLZ");
const showModel_1 = __importDefault(require("./showModel"));
const sequelize = SQLZ_1.SQLZ.getInstance();
class filmModel extends sequelize_1.Model {
}
exports.default = filmModel;
filmModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
    },
    show_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { sequelize, tableName: "film", timestamps: false, underscored: true });
filmModel.belongsTo(showModel_1.default, { foreignKey: "show_id" });
showModel_1.default.hasOne(filmModel, { foreignKey: "show_id" });
//# sourceMappingURL=filmModel.js.map