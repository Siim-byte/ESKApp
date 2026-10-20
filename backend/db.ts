import { Sequelize, DataTypes } from 'sequelize';
import SkateparkModel from "../backend/models/Skatepark.ts"; 
import UserModel from "../backend/models/Users.ts";

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
};

const sync = async(): Promise<void> => {
    await sequelize.sync({alter:true})
    console.log("DB is synced")
}

export { db, sync, connect };
