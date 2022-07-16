import { DataTypes } from "sequelize";
import { sequelize } from "../database";

import { Materials } from "./materials";

export const Providers = sequelize.define("providers", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  company: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Providers.hasMany(Materials, {
  foreignKey: {
    name: "id_provider",
    allowNull: false,
  }, // Añade en Materials
  sourceKey: "id", // Hace referencia al modelo providers
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Materials.belongsTo(Providers, {
  foreignKey: "id_provider",
  targetKey: "id",
});
