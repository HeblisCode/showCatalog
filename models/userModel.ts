import { Optional, Model, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";

const sequelize = SQLZ.getInstance();

interface userModelAttributes {
  id: number;
  email: string;
  password: string;
  age: number;
}

export interface userModelCreationAttributes
  extends Optional<userModelAttributes, "id"> {}

export default class userModel extends Model<
  userModelAttributes,
  userModelCreationAttributes
> {
  public id: number;
  public email: string;
  public password: string;
  public age: number;
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
    age: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, tableName: "user", timestamps: false, underscored: true }
);
