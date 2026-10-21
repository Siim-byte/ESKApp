import { Sequelize, DataTypes } from 'sequelize';
import SkateparkModel from "../backend/models/Skatepark.ts"; 
import UserModel from "../backend/models/Users.ts";
import UserFavoriteModel from './models/favorites.ts';

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

const db = {
    Sequelize, 
    sequelize,
    skateparks: require("../backend/models/skatepark.ts")(sequelize, DataTypes),
    users: require("../backend/models/Users.ts")(sequelize, DataTypes),
    userFavorites: require("./models/favorites.ts")(sequelize, DataTypes)
};
db.userFavorites = require("./models/favorites.ts")(sequelize, DataTypes, db.skateparks, db.users)
db.skateparks.BelongsToMany(db.users,{through: db.userFavorites, as: "UserID"})
db.users.belongsTo(db.skateparks, {through: db.userFavorites, as: "SkateparkID"})


db.users.HasMany(db.userFavorites, {foreignKey: "UserID" as "SkateparkID"})
db.userFavorites.BelongsTo(db.users, {foreignKey: "UserID" as "SkateparkID"})



const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

export { db, sync, connect };
