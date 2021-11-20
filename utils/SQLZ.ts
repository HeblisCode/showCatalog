import { Sequelize, Model, DataTypes } from "sequelize";

export class SQLZ {
  private static sequelize: Sequelize;
  private constructor() {}

  static getInstance() {
    if (!SQLZ.sequelize) {
      SQLZ.sequelize = new Sequelize("film-db-new", "root", "password", {
        dialect: "mysql",
      });
    }
    return SQLZ.sequelize;
  }
}
