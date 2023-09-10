import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

const SettingsInt = sequelize.define(
  "settings_int",
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
    value: {
      type: DataTypes.FLOAT,
    },
  },
  {
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);

export { SettingsInt };
