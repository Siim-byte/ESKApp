import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts"
import jwtAuth from "../controllers/middleware/jwtAuth.ts";
import UsersController from "../controllers/UsersController.ts";
const router = express.Router();

router.get("/", jwtAuth, UsersController.getAll);
router.post("/", checkRequestBody, UsersController.create);
router.get("/:id", jwtAuth, UsersController.getById);
router.put("/:id", jwtAuth, checkRequestBody, UsersController.modifyById);
router.delete("/:id", jwtAuth, UsersController.deleteById);

export default router;