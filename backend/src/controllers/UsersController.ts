import * as express from "express";
import { db } from "../db.ts";
import Utilities from "../Utilities.ts";
import { User } from "../models/User.ts";
import SkateparksController from "./SkateparksController.ts";

const UsersController = {
    async create(req: express.Request, res: express.Response) {
        const incomingPassword = req.body.Password_hash || req.body.password_hash || req.body.Password || req.body.password;
        const incomingConfirmation = req.body.PasswordConfirmation || req.body.passwordConfirmation;

        if (!req.body.display_name || 
        !req.body.email ||
        !incomingPassword ||
        !incomingConfirmation) {
            return res.status(400)
            .send({error:"Missing parameters, please check your info."})
        }

        if (incomingPassword !== incomingConfirmation) {
            return res.status(406)
            .send({error:"Passwords do not match, please check your info."})            
        }

        const passwordHash = await Utilities.gimmePassword(incomingPassword)

        const result = await db.users.create({
            display_name: req.body.display_name,
            email: req.body.email,
            role: req.body.role || "user",
            password_hash: passwordHash
        })

        return res.location(`${Utilities.getBaseURL(req)}/users/${result.id}`).sendStatus(201);
    },

    async getAll(req: express.Request, res: express.Response) {
        try {
            const users = await db.users.findAll();
            console.log("getAll tulemus:", users);
            
            if (!users || users.length === 0) {
                return res.status(200).send([]);
            }

            const formattedUsers = users.map((u: any) => {
                const data = u.get ? u.get({ plain: true }) : u;
                return {
                    id: data.id || data.ID || "",
                    display_name: data.display_name || data.DISPLAY_NAME || "",
                    email: data.email || data.EMAIL || ""
                };
            });

            return res.status(200).send(formattedUsers);
            
        } catch (err) {
            console.error("Viga kasutajate getAll funktsioonis:", err);
            return res.status(500).send({ error: "Andmebaasi päring ebaõnnestus" });
        }
    },

    async getById(req: express.Request, res: express.Response) {
        const user = await UsersController.getUser(req,res)
        if (!user) {
            return
        }
        return res.status(200).send(user)
    },

    async modifyById(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            return res.status(400).send({ "error": "No id supplied" });
        }
        
        try {
            const userToBeModified = await UsersController.getUser(req, res) as any;
            if (!userToBeModified) {
                return;
            }

            if (!req.body) {
                return res.status(400).send({ "error": "No body was supplied, nothing was changed" });
            }

            if (req.body.display_name) {
                userToBeModified.display_name = req.body.display_name;
            }
            if (req.body.role) {
                userToBeModified.role = req.body.role;
            }
            if (req.body.email) {
                userToBeModified.email = req.body.email;
            }
            
            if (req.body.password_hash) {
                const incomingConf = req.body.PasswordConfirmation || req.body.passwordConfirmation;
                if (req.body.password_hash !== incomingConf) {
                    return res.status(406).send({ error: "Passwords do not match, please check your info." });
                }
                userToBeModified.password_hash = await Utilities.gimmePassword(req.body.password_hash);
            }

            await userToBeModified.save();

            return res.location(`${Utilities.getBaseURL(req)}/users/${userToBeModified.id}`)
                .status(201)
                .send(userToBeModified);

        } catch (err) {
            console.error("Viga kasutaja muutmise funktsioonis:", err);
            return res.status(500).send({ error: "Andmete uuendamine ebaõnnestus" });
        }
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

    async deleteById(req: express.Request, res: express.Response) {
        const userToBeDeleted = await UsersController.getUser(req, res)
        if (!userToBeDeleted) {
            return
        }
        await userToBeDeleted.destroy();
        return res.status(204).send({error :"No Content"})
    },
}

export default UsersController
