import { Optional, Model, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";
import showModel from "./showModel";
import userModel from "./userModel";

const sequelize = SQLZ.getInstance();

interface ratingModelAttributes {
  id: number;
  user_id: number;
  show_id: number;
  rate: number;
}

export interface ratingModelCreationAttributes
  extends Optional<ratingModelAttributes, "id"> {}

export default class ratingModel extends Model<
  ratingModelAttributes,
  ratingModelCreationAttributes
> {
  public id: number;
  public rate: number;
  public user_id: number;
  public show_id: number;
}
ratingModel.init(
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
    rate: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "rating", timestamps: false, underscored: true }
);

ratingModel.belongsTo(showModel, { foreignKey: "show_id" });
ratingModel.belongsTo(userModel, { foreignKey: "user_id" });
showModel.hasOne(ratingModel, { foreignKey: "show_id" });
userModel.hasOne(ratingModel, { foreignKey: "user_id" });
