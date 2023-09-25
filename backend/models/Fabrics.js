import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

const Fabrics = sequelize.define(
  "fabrics",
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
    ratio: {
      type: DataTypes.FLOAT,
    },
  },
  {
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);

export { Fabrics };
