import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sync } from "../../backend/db.js";
import appRoutes from "../routes/appRoutes.ts"
import { log } from "console";

dotenv.config();

const post = process.env.env.PORT
const host = "localhost";

const app = express();

app.use(cors())
app.use(express.json());

appRoutes(app);

app.listen(port, async() => {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`API töötab aadressil http://${host}:${PORT}`);
    
})

