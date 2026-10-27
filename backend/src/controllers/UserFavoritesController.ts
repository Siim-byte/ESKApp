import { Request, Response } from "express";
import { db } from "../db";
import Utilities from "./Utilities";
import { v7 as uuidv7} from "uuid";
import { error } from "node:console";
import { UUID } from "node:crypto"; 

const UserFavoritesController = {
    async create(req: Request, res: Response) {
        const UserWhoUploaded = "userid"
        const skateparkidToBeAddedToCollection = ["skateparkid"]
        //check if req body has a user id
        //if not, use status 403
        //else, add into object to be created
        if (!req.body.FavoriteID
            || !req.body.skatepark_id
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            )
        }
        const newUserFavorites = {
            id: uuidv7(),
            UserID: UserWhoUploaded, // later get real userid
            SkateparkID: skateparkidToBeAddedToCollection //later ger real skateparkid

        }
        const addedUserFavorite = await db.userFavorites.create(newUserFavorites)
        
        return res.location(`${Utilities.getBaseURL(req)}/usercollections/${addedUserFavorite.id}`).sendStatus(201)

    }
}
export default UserFavoritesController