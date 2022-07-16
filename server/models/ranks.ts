import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

import { Users } from "./users";

interface RanksAttributes {
  id: number;
  rank: string;
  description: string;
}

export interface RanksInput extends Optional<RanksAttributes, "id"> {}
export interface RanksOutput extends Required<RanksAttributes> {}

export class Ranks
  extends Model<RanksAttributes, RanksInput>
  implements RanksAttributes
{
  public id!: number;
  public rank!: string;
  public description!: string;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ranks.init(
  {
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
  },
  {
    tableName: "ranks",
    sequelize,
  }
);

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
  // as: "ranguitos",
  foreignKey: "id_rank", // Añade en Users
  targetKey: "id", // Hace referencia al modelo ranks
});
