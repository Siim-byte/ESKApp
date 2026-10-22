import { Sequelize, DataTypes } from "sequelize";

export default function SkateparkModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
  const Skatepark = sequelize.define(
    "Skatepark",
    {
      id: {
        type: dataTypes.UUID,
        defaultValue: dataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      latitude: {
        type: dataTypes.STRING,
      },
      longitude: {
        type: dataTypes.STRING,
      },
      description: {
        type: dataTypes.TEXT,
      },
      admin_id: {
        type: dataTypes.INTEGER, // Või dataTypes.UUID olenevalt admin kasutaja ID tüübist
        allowNull: false,
      },
      created_at: {
        type: dataTypes.DATE,
      },
      updated_at: {
        type: dataTypes.DATE,
      },
    },
    {
      underscored: true, // Tagab snake_case väljanimed (created_at, updated_at)
    }
  );

  console.log(Skatepark === sequelize.models.Skatepark);
  return Skatepark;
}