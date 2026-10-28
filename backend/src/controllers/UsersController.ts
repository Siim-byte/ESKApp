import * as express from "express";
import { db } from "../db.ts";
import Utilities from "../Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import {User} from "../models/User.ts"


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
    async modifyById(req: express.Request, res: express.Response) {
        if(!req.params.id) {
            return res.status(400).send({"error":"No id supplied"})
        }
        console.log("+++++++ id is"+req.params.id);
        
        const userToBeModified = await UsersController.getUser(req, res) as User
        console.log("++++++ user is"+userToBeModified);
        if (!req.body) {
            return res.status(400).send({"error":"No body was supplied, nothing was changed"})
        }
        console.log("++++++ body: "+req.body);
        
        const modifiedUser = new User

        modifiedUser.email = userToBeModified.email
        modifiedUser.display_name = userToBeModified.display_name
        modifiedUser.password_hash = userToBeModified.password_hash
        modifiedUser.role = userToBeModified.role
        modifiedUser.createdAt = userToBeModified.createdAt
        modifiedUser.updatedAt = userToBeModified.updatedAt
        modifiedUser.is_blocked = userToBeModified.is_blocked

        if (req.body.display_name) {
            modifiedUser.display_name = req.body.display_name
        }
        if (req.body.password_hash) {
            if (req.body.password_hash != req.body.PasswordConfirmation)
            {
                return res.status(406)
                .send({error:"Passwords do not match, please check your info."})
            }
        }
        if (req.body.role) {
            modifiedUser.role = req.body.role
        }
        if (req.body.email) {
            console.log("+++++ found email is")
            
            modifiedUser.email = req.body.email
        }
        modifiedUser.updatedAt = new Date()
        console.log("+++++ modifieduser is: "+modifiedUser);
        
        await db.users.update(modifiedUser, {
            where: {
                id: req.params.id
            }
        })
        return res.location(`${Utilities.getBaseURL(req)}/users/${modifiedUser}`).status(201).send(modifiedUser)
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
    },
}

export default UsersController