import { Sequelize, DataTypes } from "sequelize";

export default function RatingModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
)
{
    const Rating = sequelize.define(
        "Rating",
        {
            id: {
                type: dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: dataTypes.INTEGER,
                allowNull: false,
            },
            skatepark_id: {
                type: dataTypes.INTEGER,
                allowNull: false,
            },

        }
    )
}