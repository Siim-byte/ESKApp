import SkateparksController from "../controllers/SkateparksController.ts";
import UsersController from "../controllers/UsersController.ts";
import type {Express} from "express";

export default (app: Express): void => {
    app.route("/Skateparks")
    .get(SkateparksController.getAll)
    .post(SkateparksController.create)

    app.route("/skateparks/:id")
    .get(SkateparksController.getByID)
    .delete(SkateparksController.deleteByID)
    .put(SkateparksController.modifyByID)
}
