import { Sequelize, DataTypes } from "sequelize";

export default function UserModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
  return sequelize.define("User", {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password_hash: {
      type: dataTypes.STRING,
      allowNull: false
    },
    role: {
      type: dataTypes.ENUM("user", "admin"),
      allowNull: false
    },
    display_name: {
      type: dataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW
    },
    updated_at: {
      type: dataTypes.DATE,
      defaultValue: dataTypes.NOW
    },
    is_blocked: {
      type: dataTypes.BOOLEAN,
      defaultValue: false
    },
  }
);
}