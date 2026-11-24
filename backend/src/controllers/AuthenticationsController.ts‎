import * as express from "express";
import {db} from "../db.ts";
import Utilities from "./Utilities.ts"
import JWT from "jsonwebtoken"

const AuthenticationsController = {
    async newToken(req: express.Request, res: express.Response) {

        // vaata kas staff on.
        const requiredFields = ["EmailAddress", "Password"];
        const missingFields = requiredFields.filter(
            field => !req.body?.[field]
        ) 
        //kui ei, kisa anonüümselt
        if (missingFields.length > 0) {
            return res.status(400).send({
                error: "Some or all parameters are missing"
            });
        }
        //tekita 2 muutujat, sinna omista parameetrid req.bodyst
        const {EmailAddress,Password} = req.body;

        //kui neid pole, kisa veelkord anonüümselt
        if(typeof EmailAddress !== "string" || typeof Password !== "string") {
            return res.status(400).send({
                error: "Some or all parameters are invalid"
            });
        }

        //otsi kasutajat
        const user = await db.users.findOne({
            where: {
                EmailAddress: EmailAddress
            }
        })

        //kui kasutajat pole, kisa veel uuesti anonüümselt
        if (!user) {
            return res.status(401).send({
                error: "Some or all parameters are invalid"
            });            
        }

        //kontrolli kas parool on vastavuses hashiga
        const passwordMatches = await Utilities.letMeIn(Password, user.PasswordHash)

        //kui ei, kisa jälle anonüümselt
        if (!passwordMatches) {
            return res.status(401).send({
                error: "Some or all parameters are invalid"
            });            
        }
        //otsi sekret
        const secret = process.env.JWT_SECRET
        //kui sekretit pole, siis serveri error
        if (!secret) {
            return res.status(500).send({
                error: "JWT secret is not configured, contact system admin - kristjan.kivikangur@techno.ee or jyri.vaitmaa@techno.ee"
            });   
        }
        //genereeri JWT
        const newToken = JWT.sign(
            {},
            secret,
            {
                subject: user.id,
                expiresIn: "1h",
                algorithm: "HS256"
            }
        )
        res.cookie("accessToken", newToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 60*60*1000,
            path: "/"
        })
        return res.status(200).send({
            message: "Login Successful.",
            user: {
                id: user.id,
                UserName: user.UserName,
                EmailAddress: user.EmailAddress,
                UserStatus: user.UserStatus
            }
        })

    }
}