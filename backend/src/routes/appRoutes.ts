import type express from "express"
import skateparkRoutes from "./skateparkRoutes.ts"
import userRoutes from "./usersRouters.ts"
import commentRoutes from "./commentRoutes.ts"
import favoriteRoutes from "./favoriteRoutes.ts"
import authRoutes from "./authRoutes.ts"


export default (app: express.Application): void => {
      // Globaalne 500 vastus kõigile allolevatele otspunktidele
    app.use((req, res, next) => {
        /* #swagger.responses = { 
            description: 'Internal Server Error' 
        } */
        next();
    });

    app.use("/skateparks", (req, res, next) => {
        // #swagger.tags = ['Skateparks']
        next();
    }, skateparkRoutes);

    app.use("/users", (req, res, next) => {
        // #swagger.tags = ['Users']
        next();
    }, userRoutes);

    app.use("/usercomments", (req, res, next) => {
        // #swagger.tags = ['UserComments']
        next();
    }, commentRoutes);

    app.use("/favorites", (req, res, next) => {
        // #swagger.tags = ['Favorites']
        next();
    }, favoriteRoutes);

        app.use("/authentication", (req, res, next) => {
        // #swagger.tags = ['Authentication']
        next();
    }, authRoutes);
};
