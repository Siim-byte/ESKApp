import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
    //
    declare content: string
    //
    declare id: CreationOptional<string>
    declare is_hidden: CreationOptional<boolean>
    //
    declare updatedAt: CreationOptional<Date>
    declare createdAt: CreationOptional<Date>
}

export default function CommentModel(
    sequelize: Sequelize
)
 {
    Comment.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            content: {
                type: DataTypes.STRING,
            },
            is_hidden: {
                type:DataTypes.BOOLEAN,
            },
            updatedAt: DataTypes.DATE,
            createdAt: DataTypes.DATE
        },
        {
            sequelize,
            modelName: "Comment"
        }
    )
    return Comment
 }
