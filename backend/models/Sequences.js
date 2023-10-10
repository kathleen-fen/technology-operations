import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";
import { Categories } from "./Categories.js";
import { Equipment } from "./Equipment.js";
import { Operations } from "./Operations.js";
import { Specialties } from "./Specialties.js";

const Sequences = sequelize.define(
  "sequences",
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
    operationCtid: {
      type: DataTypes.TEXT,
    },
    operationXmin: {
      type: DataTypes.TEXT,
    },
    seamWidth: {
      type: DataTypes.FLOAT,
    },
    laborAct: {
      type: DataTypes.INTEGER,
    },
    itemLaborAct: {
      type: DataTypes.INTEGER,
    },
    multiplicity: {
      type: DataTypes.INTEGER,
    },
    cost: {
      type: DataTypes.FLOAT,
    },
    order: {
      type: DataTypes.INTEGER,
    },
    code: {
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
Sequences.belongsTo(Specialties, {
  foreignKey: "specialty_id",
  targetKey: "id",
});
Specialties.hasMany(Sequences, {
  foreignKey: "specialty_id",
  sourceKey: "id",
});
Sequences.belongsTo(Categories, {
  foreignKey: "category_id",
  targetKey: "id",
});
Categories.hasMany(Sequences, {
  foreignKey: "category_id",
  sourceKey: "id",
});
Sequences.belongsTo(Equipment, {
  foreignKey: "equipment_id",
  targetKey: "id",
});
Equipment.hasMany(Sequences, {
  foreignKey: "equipment_id",
  sourceKey: "id",
});
Sequences.belongsTo(Operations, {
  foreignKey: "operation_id",
  targetKey: "id",
});
Operations.hasMany(Sequences, {
  foreignKey: "operation_id",
  sourceKey: "id",
});

export { Sequences };
