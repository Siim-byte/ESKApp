import express, { type Request, type Response, type NextFunction } from "express"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

app.get("/", (req:Request, res: Response) => {
    res.send("Töötab.")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})