import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts"
import UserCommentsController from "../controllers/UserCommentsController.ts";

const router = express.Router();

router.get("/", UserCommentsController.GetAll);
router.post("/", checkRequestBody, UserCommentsController.create);
router.get("/:id", UserCommentsController.getCommentById);
router.put("/:id", checkRequestBody, UserCommentsController.modifyByID);
router.delete("/:id", UserCommentsController.deleteByID);

export default router;