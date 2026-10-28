import type express from "express"
import SkateparksController from "../controllers/SkateparksController.ts";
import UsersController from "../controllers/UsersController.ts";

export default (app: express.Application): void => {
    app.route("/Skateparks")
    .get(SkateparksController.getAll)
    .post(SkateparksController.create)

    app.route("/skateparks/:id")
    .get(SkateparksController.getByID)
    .delete(SkateparksController.deleteByID)
    .put(SkateparksController.modifyByID)
    
    app.route("/users")
    .get(UsersController.getAll)
    .post(UsersController.create)
    
}
