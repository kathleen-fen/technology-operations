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
    isFolder: {
      type: DataTypes.BOOLEAN,
    },
    parent: {
      type: DataTypes.INTEGER,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    },
    tariff: {
      type: DataTypes.FLOAT,
    },
    ratio: {
      type: DataTypes.FLOAT,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);

export { Categories };
