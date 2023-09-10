import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

const Categories = sequelize.define(
  "categories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
    tariff: {
      type: DataTypes.FLOAT,
    },
    ratio: {
      type: DataTypes.FLOAT,
    },
  },
  {
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);

export { Categories };
