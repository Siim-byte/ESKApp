import { Sequelize, DataTypes } from 'sequelize';
import SkateparkModel from './models/skatepark.ts'; 

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
    skateparkModel: SkateparkModel(sequelize, DataTypes)
};

const sync = async (): Promise<void> => {
    try {
        await sequelize.sync({ alter: true });
        console.log("DB is synced");
    } catch (error) {
        console.error("DB sync error:", error);
    }
};

export { db, sync, connect };
