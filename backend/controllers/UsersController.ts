import { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import { error, time } from "node:console";
import { DataTypes } from "sequelize";

const UsersController = {
    async create(req: Request, res: Response) {
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
        const newUser = {
            id: uuidv7(),
            display_name: req.body.display_name,
            email: req.body.email,
            role: req.body.role,
            created_at: Date.now,
            updated_at: "",
            UserStatus: "unverified",
            password_hash: ""
        }
        newUser.password_hash = await Utilities.gimmePassword(req.body.password_hash)

        const result = await db.users.create(newUser);

        return res.location(`${Utilities.getBaseURL(req)}/users/${result.id}`).sendStatus(201);

    }
}