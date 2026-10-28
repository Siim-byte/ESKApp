import type { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import {error} from "node:console";

const comments = (db as any).comments || (db as any).Comments;

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
    }
};

export default UserCommentsController;