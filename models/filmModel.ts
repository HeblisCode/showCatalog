import { Optional, Model, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";
import showModel from "./showModel";

const sequelize = SQLZ.getInstance();

interface filmModelAttributes {
  id: number;
  url: string;
  show_id: number;
}

interface filmModelCreationAttributes
  extends Optional<filmModelAttributes, "id"> {}

export default class filmModel extends Model<
  filmModelAttributes,
  filmModelCreationAttributes
> {
  public id: number;
  public url: string;
  public show_id: string;
}
filmModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
    show_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "film", timestamps: false, underscored: true }
);
filmModel.belongsTo(showModel, { foreignKey: "show_id" });
showModel.hasOne(filmModel, { foreignKey: "show_id" });
