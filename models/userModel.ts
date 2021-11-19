import { Optional, Model, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";

const sequelize = SQLZ.getInstance();

interface userModelAttributes {
  id: number;
  email: string;
  password: number;
}

export interface userModelCreationAttributes
  extends Optional<userModelAttributes, "id"> {}

export default class userModel extends Model<
  userModelAttributes,
  userModelCreationAttributes
> {
  public id: number;
  public email: number;
  public password: number;
}
userModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, tableName: "user", timestamps: false, underscored: true }
);
