import { Sequelize, DataTypes } from "sequelize";

export default function RatingModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
)
{
    const Rating = sequelize.define(
        "Rating",
        {
            RatingsID: {
                type: dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4,
                primaryKey: true,
            },
            UserID: {
                type: dataTypes.INTEGER,
                allowNull: false,
            },
            skateparkid: {
                type: dataTypes.INTEGER,
                allowNull: false,
            },
            rating: {
                type: dataTypes.STRING,
            },
            created_at: {
                type: dataTypes.DATE,
            },
            update_at: {
                type: dataTypes.DATE,
            },


        }
    )
    console.log(Rating === sequelize.models.Rating);
    return Rating;
    
}