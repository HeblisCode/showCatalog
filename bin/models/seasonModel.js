"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SQLZ_1 = require("../utils/SQLZ");
const showModel_1 = __importDefault(require("./showModel"));
const sequelize = SQLZ_1.SQLZ.getInstance();
class seasonModel extends sequelize_1.Model {
}
exports.default = seasonModel;
seasonModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    season_number: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    show_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    total_episode: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { sequelize, tableName: "season", timestamps: false, underscored: true });
seasonModel.belongsTo(showModel_1.default, { foreignKey: "show_id" });
showModel_1.default.hasOne(seasonModel, { foreignKey: "show_id" });
//# sourceMappingURL=seasonModel.js.map