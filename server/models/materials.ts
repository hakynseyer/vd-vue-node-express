import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Materials = sequelize.define("materials", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  um: {
    type: DataTypes.ENUM,
    values: ["Kilogramos", "Gramos", "Litros", "Piezas", "Bultos"],
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
