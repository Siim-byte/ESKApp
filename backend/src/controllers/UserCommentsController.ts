import type { Request, Response } from "express";
import { db } from "../db.ts";
import { connect, sync } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import {error} from "node:console";

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
    }
    
}

export default UserCommentsController;