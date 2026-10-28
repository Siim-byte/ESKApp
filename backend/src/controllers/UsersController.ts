import * as express from "express";
import { db } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import type {User} from "../models/User.ts"


const UsersController = {
    async create(req: express.Request, res: express.Response) {
        if (!req.body.display_name || 
        !req.body.email ||
        !req.body.password_hash ||
        !req.body.PasswordConfirmation) {
            return res.status(400)
            .send({error:"Missing parameters, please check your info."})
        }
        if (req.body.Password_hash != req.body.PasswordConfirmation) 
            {
            return res.status(406)
            .send({error:"Passwords do not match, please check your info."})            
        }
        const passwordHash = await Utilities.gimmePassword(req.body.Password)

        const result = await db.users.create({
            id: uuidv7(),
            display_name: req.body.display_name,
            email: req.body.email,
            role: req.body.role,
            password_hash: passwordHash
        })

        return res.location(`${Utilities.getBaseURL(req)}/users/${result.id}`).sendStatus(201);

    },
    async getAll(req: express.Request, res: express.Response) {
        const users = await db.users.findAll();
        console.log("getAll"+users)
        return res.status(200).send(users.map(
            ({id, display_name, email }) => {return {id, display_name, email}}
        ))
        
    },
    async getById(req: express.Request, res: express.Response) {
        const user = await UsersController.getUser(req,res)
        if (!user) {
            return
        }
        return res.status(200).send(user)
    },
    async getUser(req: express.Request, res: express.Response) {
        let userID: string = req.params.id as string
        const user = await db.users.findByPk(userID);
        if(!user) {
            res.status(404).send(
                {
                    error: `user with this id does not exist: ${userID}`
                }
            )
            return null
        }
        return user
    }

}

export default UsersController