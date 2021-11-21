import { Optional, Model, DataTypes } from "sequelize";
import { SQLZ } from "../utils/SQLZ";

const sequelize = SQLZ.getInstance();

interface showModelAttributes {
  id: number;
  title: string;
  genre: string;
  nation: string;
  prod_year: number;
  duration: number;
  directed_by: string;
  abstract: string;
  has_seasons: boolean;
  image_url: string;
  total_seasons: number | null;
  min_age: number | null;
  rating: number;
}

interface showModelCreationAttributes
  extends Optional<showModelAttributes, "id"> {}

export default class showModel extends Model<
  showModelAttributes,
  showModelCreationAttributes
> {
  public id: number;
  public title: string;
  public genre: string;
  public nation: string;
  public prod_year: number;
  public duration: number;
  public directed_by: string;
  public abstract: string;
  public has_seasons: boolean;
  public image_url: string;
  public total_seasons: number | null;
  public min_age: number | null;
  public rating: number;

  public constructor() {
    super();
  }
}
showModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    nation: {
      type: DataTypes.STRING,
    },
    prod_year: {
      type: DataTypes.NUMBER,
    },
    duration: {
      type: DataTypes.NUMBER,
    },
    directed_by: {
      type: DataTypes.STRING,
    },
    abstract: {
      type: DataTypes.STRING,
    },
    image_url: {
      type: DataTypes.STRING,
    },
    has_seasons: {
      type: DataTypes.BOOLEAN,
    },
    total_seasons: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    min_age: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    rating: {
      type: DataTypes.FLOAT,
    },
  },
  { sequelize, tableName: "show", timestamps: false }
);
