import type {UUID} from "node:crypto"
import { DataTypes, Model, UUIDV4 } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";
import type {Json} from "sequelize/lib/utils";

export class Skatepark extends Model<InferAttributes<Skatepark>, InferCreationAttributes<Skatepark>> {
  //
  declare name: string;
  declare city: string;
  declare description: string;
  //
  declare id: CreationOptional<string>;
  declare address: CreationOptional<string>;
  declare latitude: CreationOptional<string>;
  declare longitude: CreationOptional<string>;
  //
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

}
export default function initSkateparkModel(sequelize: Sequelize)
{
  Skatepark.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.STRING,
      },
      longitude: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.TEXT,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "skatepark",
      tableName: "skateparks",
      freezeTableName: true,
      underscored: true
    }
  )
  return Skatepark;
}

