import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

import { Providers } from "./providers";
import { Ranks } from "./ranks";

interface UsersAttributes {
  id: number;
  name: string;
  surname_first: string;
  surname_second: string;
  password: string;
  address: string;
  city: string;
  country: string;
  notes: string | null;
  id_rank: number;
}

export interface UsersInput extends Optional<UsersAttributes, "id" | "notes"> {}
export interface UsersOutput extends Required<UsersAttributes> {}

export class Users
  extends Model<UsersAttributes, UsersInput>
  implements UsersAttributes
{
  public id!: number;
  public name!: string;
  public surname_first!: string;
  public surname_second!: string;
  public password!: string;
  public address!: string;
  public city!: string;
  public country!: string;
  public notes!: string | null;
  public id_rank!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Users.init(
  {
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
    id_rank: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

Users.hasMany(Providers, {
  foreignKey: "id_user", // Añade en Providers
  sourceKey: "id", // Hace referencia al modelo Users
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Providers.belongsTo(Users, {
  foreignKey: "id_user",
  targetKey: "id",
});
