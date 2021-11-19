import { Optional, Model, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";
import showModel from "./showModel";

const sequelize = SQLZ.getInstance();

interface seasonModelAttributes {
  id: number;
  total_episode: string;
  show_id: number;
  season_number: number;
}

interface seasonModelCreationAttributes
  extends Optional<seasonModelAttributes, "id"> {}

export default class seasonModel extends Model<
  seasonModelAttributes,
  seasonModelCreationAttributes
> {
  public id: number;
  public season_number: number;
  public show_id: number;
  public total_episode: number;
}
seasonModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    season_number: {
      type: DataTypes.INTEGER,
    },
    show_id: {
      type: DataTypes.INTEGER,
    },
    total_episode: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "season", timestamps: false, underscored: true }
);

seasonModel.belongsTo(showModel, { foreignKey: "show_id" });
showModel.hasOne(seasonModel, { foreignKey: "show_id" });
