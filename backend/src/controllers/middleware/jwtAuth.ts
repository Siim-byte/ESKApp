import type { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken"

const jwtAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken

    if (!token || typeof token !== "string") {
        return res.status(401).send({
            error: "You must be logged in"
        })
    }

    const secret = process.env.JWT_SECRET

    if (!secret) {
        return res.status(500).send({
            error: "JWT secret is not configured, contact system admin - kristjan.kivikangur@techno.ee or jyri.vaitmaa@techno.ee"
        })
    }

    try {
        const decoded = JWT.verify(token, secret, {algorithms: ["HS256"]})

        if (typeof decoded === "string" || !decoded.sub) {
            return res.status(401).send({error:"Token invalid"})
        }

        res.locals.userId = String(decoded.sub)

        next();
    } catch {
        return res.status(401).send({error: "Session is either invalid or expired"})
    }
}

export default jwtAuth;