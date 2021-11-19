import { Optional, Model, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";
import showModel from "./showModel";
import userModel from "./userModel";

const sequelize = SQLZ.getInstance();

interface favoriteModelAttributes {
  id: number;
  user_id: number;
  show_id: number;
}

interface favoriteModelCreationAttributes
  extends Optional<favoriteModelAttributes, "id"> {}

export default class favoriteModel extends Model<
  favoriteModelAttributes,
  favoriteModelCreationAttributes
> {
  public id: number;
  public user_id: number;
  public show_id: number;
}
favoriteModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    show_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "favorite", timestamps: false, underscored: true }
);

favoriteModel.belongsTo(showModel, { foreignKey: "show_id" });
favoriteModel.belongsTo(userModel, { foreignKey: "user_id" });
showModel.hasOne(favoriteModel, { foreignKey: "show_id" });
userModel.hasOne(favoriteModel, { foreignKey: "user_id" });
