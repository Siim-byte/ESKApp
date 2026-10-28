import type { UUID } from "node:crypto";
import { DataTypes, Model, UUIDV4 } from "sequelize";
import type { InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from "sequelize";

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare userID: string;
  declare skateparkID: string;
  declare content: string;
  
  declare commentsID: CreationOptional<string>;
  declare is_hidden: CreationOptional<boolean>;
  
  declare Created_at: CreationOptional<Date>;
  declare Updated_at: CreationOptional<Date>;
}

export default function initCommentModel(sequelize: Sequelize) {
  Comment.init(
    {
      commentsID: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        field: "CommentsID",
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "UserID",
      },
      skateparkID: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "SkateparkID",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "Content",
      },
      is_hidden: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: "Is_hidden",
      },
      Created_at: {
        type: DataTypes.DATE,
        field: "Created_at",
      },
      Updated_at: {
        type: DataTypes.DATE,
        field: "Updated_at",
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "Comments",
      timestamps: true,
      createdAt: "Created_at",
      updatedAt: "Updated_at",
    }
  );
  return Comment;
}