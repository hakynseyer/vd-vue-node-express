import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

import { Materials } from "./materials";

interface ProvidersAttributes {
  id: number;
  company: string;
  description: string;
  id_user: number;
}

export interface ProvidersInput extends Optional<ProvidersAttributes, "id"> {}
export interface ProvidersOutput extends Required<ProvidersAttributes> {}

export class Providers
  extends Model<ProvidersAttributes, ProvidersInput>
  implements ProvidersAttributes
{
  public id!: number;
  public company!: string;
  public description!: string;
  public id_user!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Providers.init(
  {
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
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "providers",
    sequelize,
  }
);

Providers.hasMany(Materials, {
  foreignKey: "id_provider", // Añade en Materials
  sourceKey: "id", // Hace referencia al modelo providers
  onDelete: "RESTRICT",
  onUpdate: "CASCADE",
});

Materials.belongsTo(Providers, {
  foreignKey: "id_provider",
  targetKey: "id",
});
