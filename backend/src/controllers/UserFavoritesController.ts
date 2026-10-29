import type { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const userFavorites = (db as any).userFavorites;

const UserFavoritesController = {
    async create(req: Request, res: Response) {
        try {
            const incomingUserId = req.body.UserID || req.body.userId || req.body.user_id;
            const incomingSkateparkId = req.body.SkateparkID || req.body.skateparkId || req.body.skatepark_id;

            if (!incomingUserId || !incomingSkateparkId) {
                return res.status(400).send({
                    error: "Missing parameters, please review data"
                });
            }

            const newUserFavorites = {
                id: uuidv7(),
                userID: incomingUserId,
                skateparkID: incomingSkateparkId,
                userId: incomingUserId,
                skateparkId: incomingSkateparkId,
                user_id: incomingUserId,
                skatepark_id: incomingSkateparkId
            };

            const addedUserFavorite = await userFavorites.create(newUserFavorites);
            
            return res.location(`${Utilities.getBaseURL(req)}/usercollections/${addedUserFavorite.id}`).sendStatus(201);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while adding favorite",
                details: error instanceof Error ? error.message : error
            });
        }
    },

    async getFavoriteById(req: Request, res: Response) {
        try {
            const favorite = await userFavorites.findByPk(req.params.id);

            if (!favorite) {
                return res.status(404).send({
                    error: "Favorite not found"
                });
            }

            return res.status(200).send(favorite);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while fetching favorite",
                details: error instanceof Error ? error.message : error
            });
        }
    },

    async getFavorites(req: Request, res: Response) {
        try {
            const favorites = await userFavorites.findAll();
            return res.status(200).send(favorites);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while fetching favorites list",
                details: error instanceof Error ? error.message : error
            });
        }
    },

    async update(req: Request, res: Response) {
        try {
            const favorite = await userFavorites.findByPk(req.params.id);

            if (!favorite) {
                return res.status(404).send({
                    error: "Favorite not found"
                });
            }

            await favorite.update(req.body);

            return res.status(200).send(favorite);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while updating favorite",
                details: error instanceof Error ? error.message : error
            });
        }
    },

    async remove(req: Request, res: Response) {
        try {
            const favorite = await userFavorites.findByPk(req.params.id);

            if (!favorite) {
                return res.status(404).send({
                    error: "Favorite not found"
                });
            }

            await favorite.destroy();

            return res.sendStatus(204);
        } catch (error) {
            return res.status(500).send({
                error: "Internal server error while removing favorite",
                details: error instanceof Error ? error.message : error
            });
        }
    }
};

export default UserFavoritesController;
