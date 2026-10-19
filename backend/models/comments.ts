import { log } from "console";
import { Sequelize, DataTypes } from "sequelize";

export default function CommentModel(
  sequelize: Sequelize,
  dataTypes: typeof DataTypes
) {
    const Comment = sequelize.define(
        "Comment",
        {
            id: {
                type: dataTypes.UUID,
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
            content: {
                type: dataTypes.STRING,
            },
            created_at: {
                type: dataTypes.DATE,
            },
              updated_at: {
                type: dataTypes.DATE,
            },
            is_hidden: {
                type:dataTypes.BOOLEAN,
            },
        }
    )
    console.log(Comment === sequelize.models.Comment);
    return Comment;
    
}