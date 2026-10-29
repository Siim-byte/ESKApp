import { DataTypes, Model} from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  //kohustulikud väljad
  declare display_name: string;
  declare password_hash: string;
  declare email: string;
  //valikulised väljad
  declare id: CreationOptional<string>;
  declare role: CreationOptional<string>;
  declare is_blocked: CreationOptional<string>;
  //süsteemsed väljad
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default function initUserModel(sequelize: Sequelize) {
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
    {
      sequelize,
      modelName: "user",
      tableName: "users",  
      freezeTableName: true, 
      underscored: true
    }
  
);
return User;
}