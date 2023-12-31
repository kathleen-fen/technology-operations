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
  },
  {
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);

export { Specialties };
