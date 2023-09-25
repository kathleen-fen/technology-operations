import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Fabrics } from "./Fabrics.js";

const Models = sequelize.define(
  "models",
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
    finisingStitchFrequency: {
      type: DataTypes.FLOAT,
    },
    stitchFrequency: {
      type: DataTypes.FLOAT,
    },
    ageGroup: {
      type: DataTypes.TEXT,
    },
    sizeGroup: {
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
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);

Models.belongsTo(Fabrics, {
  foreignKey: "fabric_id",
  targetKey: "id",
});
Fabrics.hasMany(Models, {
  foreignKey: "fabric_id",
  sourceKey: "id",
});

export { Models };
