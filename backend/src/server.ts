import express, { type Request, type Response, type NextFunction} from "express"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const ratings = [
    {id: 1, rate: "1"},
    {id: 2, rate: "2"},
    {id: 3, rate: "3"},
    {id: 4, rate: "4"},
    {id: 5, rate: "5"}
]
const details =[
    {id: 1, name: "skatepark1", city: "Tallinn"},
    {id: 2, name: "skatepark2", city: "Tartu"},
    {id: 3, name: "skatepark3", city: "Tallinn"},
]
app.get("/", (req:Request, res: Response) => {
    res.send("Töötab.")
})

app.get("/ratings", (req:Request, res: Response) => {
    const result = ratings.map((rating) => ({ id: rating.id, rate: rating.rate }))
    res.send(result)
})

app.get("/details", (req: Request, res: Response) => {
    const result = details.map((detail) => ({id: detail.id, name: detail.name}))   
    res.send(result)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})