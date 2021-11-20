import { Model, Optional, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";
import seasonModel from "./seasonModel";

const sequelize = SQLZ.getInstance();

interface episodeModelAttributes {
  id: number;
  url: string;
  season_id: number;
  episode_number: number;
  title: string;
  duration: number;
}

interface episodeModelCreationAttributes
  extends Optional<episodeModelAttributes, "id"> {}

export default class episodeModel extends Model<
  episodeModelAttributes,
  episodeModelCreationAttributes
> {
  public id: number;
  public url: string;
  public show_id: string;
  public title: string;
  public duration: number;
}
episodeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    season_id: {
      type: DataTypes.INTEGER,
    },
    episode_number: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "episode", timestamps: false, underscored: true }
);
episodeModel.belongsTo(seasonModel, { foreignKey: "season_id" });
seasonModel.hasOne(episodeModel, { foreignKey: "season_id" });
