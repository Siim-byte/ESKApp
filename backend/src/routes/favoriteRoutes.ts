import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts"
import UserFavoritesController from "../controllers/UserFavoritesController.ts";

const router = express.Router();

router.get("/", UserFavoritesController.getFavorites);
router.post("/", checkRequestBody, UserFavoritesController.create);
router.get("/:id", UserFavoritesController.getFavoriteById);
router.put("/:id", checkRequestBody, UserFavoritesController.update);
router.delete("/:id", UserFavoritesController.remove);

export default router;