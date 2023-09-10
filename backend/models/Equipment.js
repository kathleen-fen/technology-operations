import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

const Equipment = sequelize.define(
  "equipment",
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

export { Equipment };
