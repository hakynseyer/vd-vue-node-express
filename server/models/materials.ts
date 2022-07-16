import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

interface MaterialsAttributes {
  id: number;
  name: string;
  description: string;
  amount: number;
  um: string;
  price: number;
  id_provider: number;
}

export interface MaterialsInput extends Optional<MaterialsAttributes, "id"> {}
export interface MaterialsOutput extends Required<MaterialsAttributes> {}

export class Materials
  extends Model<MaterialsAttributes, MaterialsInput>
  implements MaterialsAttributes
{
  public id!: number;
  public name!: string;
  public description!: string;
  public amount!: number;
  public um!: string;
  public price!: number;
  public id_provider!: number;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Materials.init(
  {
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
    id_provider: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "materials",
    sequelize,
  }
);
