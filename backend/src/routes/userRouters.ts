import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts"
import UsersController from "../controllers/UsersController.ts";
const router = express.Router();

router.get("/", UsersController.getAll);
router.post("/", checkRequestBody, UsersController.create);
router.get("/:id", UsersController.getById);
router.put("/:id", checkRequestBody, UsersController.modifyById);
router.delete("/:id", UsersController.deleteById);

export default router;