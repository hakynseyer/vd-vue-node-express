import { DataTypes } from "sequelize";
import { sequelize } from "../database";

import { Providers } from "./providers";

export const Users = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  surname_first: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  surname_second: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Users.hasMany(Providers, {
  foreignKey: {
    name: "id_user",
    allowNull: false,
  }, // Añade en Providers
  sourceKey: "id", // Hace referencia al modelo Users
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Providers.belongsTo(Users, {
  foreignKey: "id_user",
  targetKey: "id",
});
