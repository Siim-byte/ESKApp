import "dotenv/config";
import express from "express";
import cors from "cors";
import { sync } from "../../backend/src/db.ts";
import swaggerUI from "swagger-ui-express"
import swaggerDoc from "./docs/swagger-autogen.json" with { type: "json"}


import appRoutes from "../../backend/src/routes/appRoutes.ts"


const port = process.env.PORT || 8080
const host = "localhost";

const app = express();

app.use(cors())
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
appRoutes(app);

app.listen(port, async () => {
    await sync(); 
    console.log(`API töötab aadressil http://${host}:${port}`);
});

app.get('/', (req, res) => {
  res.send('ESKApp API töötab!');
});