import "dotenv/config";
import { Sequelize, DataTypes } from 'sequelize';

import initSkateparkModel from "./models/skatepark.ts";
import initUserModel from "./models/User.ts";
import initUserFavoriteModel from './models/favorite.ts';
import initCommentModel from "./models/comment.ts";

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOSTNAME!,
        port: Number(process.env.DB_PORT) || 3306,
        dialect: "mariadb",
        dialectOptions: {
            connectTimeout: 60000, 
            ssl: {
                rejectUnauthorized: false 
            }
        },
        logging: console.log,
    }
);

const connect = async (): Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log("Connection established.");
    } catch (error) {
        console.error("db connection error", error);
    }
};

const _Skatepark = initSkateparkModel(sequelize);
const _User = initUserModel(sequelize);
const _Comment = initCommentModel(sequelize);
const _UserFavorite = initUserFavoriteModel(sequelize, DataTypes); 

const db: any = {
    Sequelize, 
    sequelize,
    skateparks: _Skatepark,
    users: _User,
    comments: _Comment,
    userFavorites: _UserFavorite 
};

const sync = async(): Promise<void> => {
    try {
        await connect();
        
        // Sunnime mõlemad põhimudelid ükshaaval enne globaalset sünkroniseerimist käima
        await _Skatepark.sync();
        await _User.sync();
        
        await sequelize.sync();
        console.log("Andmebaasi täielik sünkroniseerimine õnnestus (DB is synced)");
    } catch (err) {
        console.error("Viga sünkroniseerimisel:", err);
    }
};

export { db, sync, connect };
