import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
import { describe } from 'node:test';
dotenv.config();

const doc = {
    info: {
        title: "My skatepark API",
        description: "Description",
        version: "1.0.0"
    },
    host: process.env.HOST+':'+process.env.PORT,
    tags: [{name: 'Skateparks'}, {name: 'Users'}]
};

const outputFile = '../docs/swagger-autogen.json';
const routes = ['../routes/appRoutes.ts']


swaggerAutogen()(outputFile, routes, doc);