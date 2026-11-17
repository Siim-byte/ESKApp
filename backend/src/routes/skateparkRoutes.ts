import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts"
import SkateparksController from "../controllers/SkateparksController.ts";

const router = express.Router();

router.get("/", SkateparksController.getAll);
router.post("/", checkRequestBody, SkateparksController.create);
router.get("/:id", SkateparksController.getByID);
router.put("/:id", checkRequestBody, SkateparksController.modifyByID);
router.delete("/:id", SkateparksController.deleteByID);

export default router;