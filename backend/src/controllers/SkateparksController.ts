import * as express from "express"
import { db } from "../db.ts"
import Utilities from "../Utilities.ts"
import { v7 as uuidv7 } from "uuid"

const SkateparksController = {
    async create(req: express.Request, res: express.Response){
        const incomingAddress = req.body.address || req.body.aadress || req.body.adress;

        if (
            !req.body.name || 
            !req.body.description ||
            !req.body.city ||
            !incomingAddress || 
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
            address: incomingAddress, 
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            admin_id: req.body.admin_id
        }

        const createdSkatepark = await db.skateparks.create(newSkatepark);
        return res
        .location(`${Utilities.getBaseURL(req)}/skateparks/${createdSkatepark.id}`).sendStatus(201);
    },

    async getAll(req: express.Request, res: express.Response) {
        try {
            const skateparks = await db.skateparks.findAll();
            console.log("GetAll tulemus:", skateparks);
            
            if (!skateparks || skateparks.length === 0) {
                return res.status(200).send([]);
            }

            const formattedSkateparks = skateparks.map((park: any) => {
                const data = park.get ? park.get({ plain: true }) : park;
                return {
                    id: data.id || data.ID,
                    name: data.name || data.NAME
                };
            });

            return res.status(200).send(formattedSkateparks);
            
        } catch (err) {
            console.error("Viga getAll funktsioonis:", err);
            return res.status(500).send({ error: "Andmebaasi päring ebaõnnestus" });
        }
    },

    async getByID(req: express.Request, res: express.Response) {
        const skatepark = await SkateparksController.getSkatepark(req, res);
        if (!skatepark) {
            console.log("no skatepark");
            return
        }
        console.log("Skatepark is found");
        return res.status(200).send(skatepark)
    },

    async modifyByID(req: express.Request, res: express.Response) {
        const skateparkToBeModified = await SkateparksController.getSkatepark(req, res)
        if (!skateparkToBeModified) {
            return;
        }

        const incomingAddress = req.body.address || req.body.aadress || req.body.adress;

        if (
            !req.body.name || 
            !req.body.description ||
            !req.body.city ||
            !incomingAddress ||
            !req.body.latitude ||
            !req.body.longitude ||
            !req.body.admin_id
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }

        skateparkToBeModified.name = req.body.name
        skateparkToBeModified.description = req.body.description
        skateparkToBeModified.city = req.body.city
        skateparkToBeModified.address = incomingAddress
        skateparkToBeModified.latitude = req.body.latitude
        skateparkToBeModified.longitude = req.body.longitude
        
        await skateparkToBeModified.save()

        return res.location(`${Utilities.getBaseURL(req)}/skateparks/${skateparkToBeModified.id}`)
        .status(201)
        .send(skateparkToBeModified)
    },

    async deleteByID(req: express.Request, res: express.Response) {
        let skateparkID: string = req.params.id as string
        if (!skateparkID) {
            return res.status(400).send({ error: "No ID is given" });
        }

        const skatepark = await db.skateparks.findByPk(skateparkID);
        if (!skatepark) {
            return res.status(404).send({ error: "Skatepark is not found" });
        }

        await (skatepark as any).destroy();
        return res.status(200).send({
            message: "Skatepark deleted successfully",
            deletedSkatepark: skatepark
        });
    },

    async getSkatepark(req: express.Request, res: express.Response){
        let skateparkID: string = req.params.id as string
        console.log(skateparkID)
        const skatepark = await db.skateparks.findByPk(skateparkID)
        if(!skatepark) {
            console.log("Skatepark not found")
            res.status(404).send({
                error: `Skatepark with this ID is not found. ${skateparkID}`
            })
            return null;
        }
        return skatepark
    },

    async addToFavorites(req: express.Request, res: express.Response) {
        if (!(req as any).user || !(req as any).user.id) {
            return res.status(401).send({ error: "User is not authorized" });
        }

        const skateparkID = req.params.Id;
        if (!skateparkID) {
            return res.status(400).send({ error: "Invalid or missing skatepark ID" });
        }

        const skatepark = await db.skateparks.findByPk(skateparkID);
        if (!skatepark) {
            return res.status(404).send({ error: `Skatepark with ID ${skateparkID} does not exist` });
        }

        const userId = (req as any).user.id;
        const favorite = await db.userFavorites.create({
            id: uuidv7(),
            user_id: userId,
            skatepark_id: skateparkID
        });

        return res.status(201).send({
            message: "Skatepark added to favorites",
            favorite,
            skatepark
        });
    }
}

export default SkateparksController
