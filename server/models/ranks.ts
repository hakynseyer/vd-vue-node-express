import { DataTypes } from "sequelize";
import { sequelize } from "../database";

import { Users } from "./users";

export const Ranks = sequelize.define("ranks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rank: {
    type: DataTypes.STRING(30),
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

Ranks.hasMany(Users, {
  foreignKey: {
    name: "id_rank",
    allowNull: false,
  }, // Añade en Users
  sourceKey: "id", // Hace referencia al modelo ranks
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Users.belongsTo(Ranks, {
  foreignKey: "id_rank", // Añade en Users
  targetKey: "id", // Hace referencia al modelo ranks
});
