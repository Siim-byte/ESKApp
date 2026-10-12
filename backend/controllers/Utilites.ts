import { Request } from 'express';
//installi bcrypt hiljem siia tuleb hashing ka 


export const getBaseURl = (req: Request): string => {
    return `${req.protocol}://${req.get("host")}`;
}