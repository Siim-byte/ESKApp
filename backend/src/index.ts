import "dotenv/config";
import express from "express";
import cors from "cors";
import { sync } from "../../backend/src/db.js";

import appRoutes from "../../backend/src/routes/appRoutes.ts"


const port = process.env.PORT || 8080
const host = "localhost";

const app = express();

app.use(cors())
app.use(express.json());

appRoutes(app);

app.listen(port, async() => {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`API töötab aadressil http://${host}:${port}`);
    
})

app.get('/', (req, res) => {
  res.send('ESKApp API töötab!');
});