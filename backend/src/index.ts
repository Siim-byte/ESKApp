import "dotenv/config";
import express from "express";
import cors from "cors";
import { sync } from "../../backend/src/db.ts";
import swaggerUI from "swagger-ui-express"
import swaggerDoc from "./docs/swagger.json" with { type: "json"}


import appRoutes from "../../backend/src/routes/appRoutes.ts"
import cookieParser from "cookie-parser";


const port = process.env.PORT || 8080
const host = "localhost";

const app = express();

const frontendURL = process.env.FRONTEND_URL;

if(!process.env.JWT_SECRET || !frontendURL) {
    throw new Error ("SIR! DO CONFIGURE THE TOKEN SECRET AND THE FRONT END ADDRESS - POST HASTE!")
}

app.use(cors({
    origin: frontendURL,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser())

app.use((req, res, next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return next();
    }
    const origin = req.get("Origin")
    if(origin !== frontendURL) {
        return res.status(403).send({error: "Request origin not allowed"})
    }
    next();
})
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
appRoutes(app);

app.listen(port, async () => {
    await sync(); 
    console.log(`API töötab aadressil http://${host}:${port}`);
});

app.get('/', (req, res) => {
  res.send('ESKApp API töötab!');
});