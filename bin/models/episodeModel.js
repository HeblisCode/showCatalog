"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SQLZ_1 = require("../utils/SQLZ");
const seasonModel_1 = __importDefault(require("./seasonModel"));
const sequelize = SQLZ_1.SQLZ.getInstance();
class episodeModel extends sequelize_1.Model {
}
exports.default = episodeModel;
episodeModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    url: {
        type: sequelize_1.DataTypes.STRING,
    },
    season_id: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    episode_number: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, { sequelize, tableName: "episode", timestamps: false, underscored: true });
episodeModel.belongsTo(seasonModel_1.default, { foreignKey: "season_id" });
seasonModel_1.default.hasOne(episodeModel, { foreignKey: "season_id" });
//# sourceMappingURL=episodeModel.js.map