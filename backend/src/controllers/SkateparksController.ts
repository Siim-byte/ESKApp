import * as express from "express"
import { db } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import {error} from "node:console";
import type {Skatepark} from "../models/skatepark.ts"

const SkateparksController = {
        async create(req: express.Request, res: express.Response){
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
        admin_id: req.body.admin_id
    }
    const createdSkatepark = await db.skateparks.create(newSkatepark);
    return res
    .location(`${Utilities.getBaseURL(req)}/skateparks/${createdSkatepark.id}`).sendStatus(201);
    },
    async getAll(req: express.Request, res: express.Response) {
        const skateparks = await db.skateparks.findAll();
        console.log("GetAll: "+skateparks)
        return res
        .status(200)
        .send(
            skateparks.map
            (
                ({id, name}) => {return {id, name}}
            )
        )
        
    },
    async getByID(req: express.Request, res: express.Response) {

        const skatepark = await SkateparksController.getSkatepark(req, res);
        if (!skatepark) {
            console.log("no skatepark");
            return
        }
        console.log("Skatepark is found");
        return res.status(200).send(skatepark)
        
        return skatepark
    },
    async modifyByID(req: express.Request, res: express.Response) {
        const skateparkToBeModified = await SkateparksController.getSkatepark(req, res)
        if (!skateparkToBeModified) {
            return;
        }
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
            )
        }
        skateparkToBeModified.name = req.body.name
        skateparkToBeModified.description = req.body.description
        skateparkToBeModified.city = req.body.city
        skateparkToBeModified.address = req.body.aadress
        skateparkToBeModified.latitude = req.body.latitude
        skateparkToBeModified.longitude = req.body.longitude
        
        await skateparkToBeModified.save()

        return res.location(`${Utilities.getBaseURL(req)}/skateparks/${skateparkToBeModified.id}`)
        .status(201)
        .send(skateparkToBeModified)
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