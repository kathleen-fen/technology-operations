import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

const Specialties = sequelize.define(
  "specialties",
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
  },
  {
    underscored: true,
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);

export { Specialties };
