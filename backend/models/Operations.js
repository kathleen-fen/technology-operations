import { DataTypes } from "sequelize";
import { sequelize } from "./../connection.js";

const Operations = sequelize.define(
  "operations",
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
    adultLaborCost: {
      type: DataTypes.FLOAT,
    },
    kidLaborCost: {
      type: DataTypes.FLOAT,
    },
  },
  {
    createdAt: "created_on",
    updatedAt: "modified_on",
  }
);
Operations.belongsTo(Specialties, {
  foreignKey: "specialty_id",
  targetKey: "id",
});
Specialties.hasMany(Operations, {
  foreignKey: "specialty_id",
  sourceKey: "id",
});
Operations.belongsTo(Categories, {
  foreignKey: "category_id",
  targetKey: "id",
});
Categories.hasMany(Operations, {
  foreignKey: "category_id",
  sourceKey: "id",
});
Operations.belongsTo(Equipment, {
  foreignKey: "equipment_id",
  targetKey: "id",
});
Equipment.hasMany(Operations, {
  foreignKey: "equipment_id",
  sourceKey: "id",
});

export { Operations };
