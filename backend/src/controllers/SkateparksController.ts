import type { Request, Response } from "express";
import { db } from "../db.ts";
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
        admin_id: req.body.admin_id
    }
    const createdSkatepark = await db.skateparks.create(newSkatepark);
    return res
    .location(`${Utilities.getBaseURL(req)}/skateparks/${createdSkatepark.SkateparkID}`).sendStatus(201);
},
    async getAll(req: Request, res: Response) {
        const skateparks = await db.skateparks.findAll();
        console.log("GetAll: "+skateparks)
        return res
        .status(200)
        .send(
            skateparks.map
            (
                ({ Id, name }: { Id: string; name: string }) => ({ Id, name })
            )
        )
        
    },
    async getByID(req: Request, res: Response) {
        let skateparkID: string = req.params.Id as string
        console.log(skateparkID)
        const skatepark = await db.skateparks.findByPk(skateparkID);
        if (!skatepark) {
            res.status(404).send({
                error: `Skatepark with this ID is not found. ${skateparkID}`
            })
            return null;
        }
        return skatepark
    },
    async modifyByID(req: Request, res: Response) {
        const skateparkToBeModified = await this.getByID(req,res)
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
        skateparkToBeModified.aadress = req.body.aadress
        skateparkToBeModified.latitude = req.body.latitude
        skateparkToBeModified.longitude = req.body.longitude
        
        await skateparkToBeModified.save()

        return res.location(`${Utilities.getBaseURL(req)}/skateparks/${skateparkToBeModified.id}`)
        .status(201)
        .send(skateparkToBeModified)
    }
}

export default SkateparksController