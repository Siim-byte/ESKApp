import type express from "express"
import SkateparksController from "../controllers/SkateparksController.ts";
import UsersController from "../controllers/UsersController.ts";
import { User } from "../models/User.ts";
import UserCommentsController from "../controllers/UserCommentsController.ts";
import UserFavoritesController from "../controllers/UserFavoritesController.ts";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";


export default (app: express.Application): void => {
    app.route("/skateparks")
    .get(SkateparksController.getAll)
    .post(SkateparksController.create)

    app.route("/skateparks/:id")
    .get(SkateparksController.getByID)
    .delete(SkateparksController.deleteByID)
    .put(SkateparksController.modifyByID)
    
    app.route("/users")
    .get(UsersController.getAll)
    .post(UsersController.create)

    app.route("/users/:id")
    .get(UsersController.getById)
    .put(UsersController.modifyById)
    .delete(UsersController.deleteById)


    app.route("/comments")
    .get(UserCommentsController.GetAll)
    .post(UserCommentsController.create)
    
    app.route("/comments/:id")
    .get(UserCommentsController.getCommentById)
    .delete(UserCommentsController.deleteByID)
    

    app.route("/favorites")
  .get(UserFavoritesController.getFavorites)
  .post(checkRequestBody, UserFavoritesController.create); 

    app.route("/favorites/:id")
    .get(UserFavoritesController.getFavoriteById)
    .put(UserFavoritesController.update)
    .delete(UserFavoritesController.remove);
}
