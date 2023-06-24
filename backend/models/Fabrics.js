import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

const Fabrics = sequelize.define(
  "fabrics",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.TEXT,
    },
    ratio: {
      type: DataTypes.FLOAT,
    },
  },
  {
    timestamps: false,
  }
);

export { Fabrics };
