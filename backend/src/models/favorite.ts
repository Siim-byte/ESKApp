import { Sequelize, DataTypes } from "sequelize";

export default function UserFavoriteModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
    const UserFavorite = sequelize.define(
        "UserFavorite",
        {
            FavoritesID: {
                type:dataTypes.UUID,
                defaultValue: dataTypes.UUIDV4,
                primaryKey: true,
            },
            userID: {
                type: dataTypes.UUID,
                allowNull: false,
            },
            skateparkID: {
                type: dataTypes.UUID,
                allowNull: false,
            },
            created_at: {
                type:dataTypes.DATE,
            },
        },
    );
    console.log(UserFavorite === sequelize.models.Favorite);
    return UserFavorite;
    
}