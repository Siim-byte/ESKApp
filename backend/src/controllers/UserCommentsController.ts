import type { Request, Response } from "express";
import { db } from "../db.ts";
import { connect, sync } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import {error} from "node:console";
import { Comment } from "../models/comment.ts";

const comments = db.comments;

const UserCommentsController = {
    async GetAll(req: Request, res: Response) {
        try {
            const allComments = await comments.findAll();
            return res.status(200).send(allComments);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while fetching comments list",
                details: error instanceof Error ? error.message : error
            });
        }
    },
async getCommentById(req: Request, res: Response) {
        try {
            const commentId = req.params.id;
            if (!commentId) {
                return res.status(400).send({
                    error: "commentsID missing"
                });
            }
            const idToFind = Array.isArray(commentId) ? commentId[0] : commentId;
            const comment = await db.comments.findByPk(idToFind);
            if (!comment) { 
                return res.status(404).send({
                    error: "Comment not found"
                });
            }
            return res.status(200).send(comment);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while fetching comment",
                details: error instanceof Error ? error.message : error
            });
        }
    },
    async create(req: Request, res: Response) {
        try {
            const newComment = {
                commentsID: uuidv7(),
                UserID: req.body.UserID,
                SkateparkID: req.body.SkateparkID,
                Content: req.body.Content,
                Is_hidden: req.body.Is_hidden ?? false
            };

            const createdComment = await db.comments.create(newComment);
            
            return res
                .location(`${Utilities.getBaseURL(req)}/comments/${createdComment.commentsID}`)
                .status(201)
                .send(createdComment);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while creating comment",
                details: error instanceof Error ? error.message : error
            });
        }
    },
    async deleteByID(req: Request, res: Response) {
        try {
            const commentId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

            if (!commentId) {
                return res.status(400).send({
                    error: "commentsID missing or invalid"
                });
            }

            const comment = await db.comments.findByPk(commentId);

            if (!comment) {
                return res.status(404).send({
                    error: "Comment not found"
                });
            }

            await comment.destroy();

            return res.status(200).send({
                message: "Comment successfully removed"
            });
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while deleting comment",
                details: error instanceof Error ? error.message : error
            });
        }
    }
};


export default UserCommentsController;