import { Sequelize, DataTypes } from 'sequelize';

//modelite pathid
import SkateparkModel from "../src/models/skatepark.ts"
import UserModel from "./models/User.ts";
import UserFavoriteModel from './models/favorite.ts';

const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOSTNAME!,
        dialect: "mariadb",
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
const _Skatepark = SkateparkModel(sequelize )
const _User = UserModel(sequelize )
//andmebaasi instants ja seostused

const db = {
    Sequelize, 
    sequelize,
    skateparks: _Skatepark,
    users: _User
};
//db.userFavorites = require("./models/favorites.ts")(sequelize, DataTypes, db.skateparks, db.users)
//db.skateparks.BelongsToMany(db.users,{through: db.userFavorites, as: "userid"})
//db.users.belongsTo(db.skateparks, {through: db.userFavorites, as: "skateparkid"})


//db.users.HasMany(db.userFavorites, {foreignKey: "userid" as "skateparkid"})
//db.userFavorites.BelongsTo(db.users, {foreignKey: "userid" as "skateparkid"})
const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

export { db, sync, connect };
