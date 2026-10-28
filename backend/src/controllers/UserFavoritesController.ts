import type { Request, Response } from "express";
import { db } from "../db.js";
import { v7 as uuidv7 } from "uuid";

type UserFavoritesModel = {
    findOne(options: { where: { UserID: unknown; SkateparkID: unknown } }): Promise<unknown>;
    create(values: { id: string; UserID: unknown; SkateparkID: unknown }): Promise<{ id: string }>;
};

const UserFavoritesController = {
    async create(req: Request, res: Response) {
        try {
            if (!req.body.UserID || !req.body.SkateparkID) {
                return res.status(400).send({
                    error: "Missing parameters, please review data"
                });
            }

            const userFavorites = (db as unknown as { userFavorites: UserFavoritesModel }).userFavorites;
            const existingFavorite = await userFavorites.findOne({
                where: {
                    UserID: req.body.UserID,
                    SkateparkID: req.body.SkateparkID
                }
            });

            if (existingFavorite) {
                return res.status(409).send({
                    error: "Favorite already exists"
                });
            }

            const newUserFavorites = {
                id: uuidv7(),
                UserID: req.body.UserID,
                SkateparkID: req.body.SkateparkID
            };

            const addedUserFavorite = await userFavorites.create(newUserFavorites);
            
            return res.location(`${req.protocol}://${req.get("host")}/usercollections/${addedUserFavorite.id}`).sendStatus(201);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while adding favorite",
                details: error instanceof Error ? error.message : error
            });
        }
    }
};

