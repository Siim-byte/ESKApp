import { Sequelize, DataTypes } from "sequelize";

export default function FavoriteModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
    const Favorite = sequelize.define(
        "Favorite",
        {
            id: {
                type:dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: dataTypes.UUID,
                allowNull: false,
            },
            skatepark_id: {
                type: dataTypes.UUID,
                allowNull: false,
            },
            created_at: {
                type:dataTypes.DATE,
            },
        },
    );
    console.log(Favorite === sequelize.models.Favorite);
    return Favorite;
    
}