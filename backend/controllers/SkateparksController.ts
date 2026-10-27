import type { Request, Response } from "express";
import { db } from "../db.js";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const SkateparksController = {
    async create(req: Request, res: Response){
        if (
            !req.body.name || 
            !req.body.description ||
            !req.body.city ||
            !req.body.aadress ||
            !req.body.latitude ||
            !req.body.longitude ||
            !req.body.admin_id
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            );
        
        }
        const newSkatepark = {
            id: uuidv7(),
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            aadress: req.body.aadress,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            admin_id: req.body.admin_id,
            created_at: Utilities.getCurrentDateTime(),
            updated_at: Utilities.getCurrentDateTime(),
        }
        const createdSkatepark = (await db.skateparkModel.create(newSkatepark)) as unknown as { id: string };

        return res
        .location(`${Utilities.getBaseUrl(req)}/skateparks/${createdSkatepark.id}`).sendStatus(201);
    },
    async deleteByID(req: Request, res: Response) {
        const skateparkID = req.params.Id;
        if (!skateparkID) {
            return res.status(400).send({ error: "No ID is given" });
        }

        const skatepark = await db.skateparkModel.findByPk(skateparkID);
        if (!skatepark) {
            return res.status(404).send({ error: "Skatepark is not found" });
        }

        await (skatepark as any).destroy();
        return res.status(200).send({
            message: "Skatepark deleted successfully",
            deletedSkatepark: skatepark
        });
    }
}

export default SkateparksController