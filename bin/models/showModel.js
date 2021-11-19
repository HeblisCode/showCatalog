"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const SQLZ_1 = require("../utils/SQLZ");
const sequelize = SQLZ_1.SQLZ.getInstance();
class showModel extends sequelize_1.Model {
    constructor() {
        super();
    }
}
exports.default = showModel;
showModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
    },
    nation: {
        type: sequelize_1.DataTypes.STRING,
    },
    prod_year: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    rating: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    duration: {
        type: sequelize_1.DataTypes.NUMBER,
    },
    directed_by: {
        type: sequelize_1.DataTypes.STRING,
    },
    abstract: {
        type: sequelize_1.DataTypes.STRING,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING,
    },
    has_seasons: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    total_seasons: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
    min_age: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: true,
    },
}, { sequelize, tableName: "show", timestamps: false });
//# sourceMappingURL=showModel.js.map