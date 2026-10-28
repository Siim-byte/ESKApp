import type { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const userFavorites = (db as any).userFavorites;

const UserFavoritesController = {
    async create(req: Request, res: Response) {
        try {
            if (!req.body.UserID || !req.body.SkateparkID) {
                return res.status(400).send({
                    error: "Missing parameters, please review data"
                });
            }

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
};

export default UserFavoritesController;