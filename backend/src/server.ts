import express, { type Request, type Response } from "express"

const app: express.Express = express()
app.use(express.json())
const PORT = process.env.PORT || 3000
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

app.get("/ratings", (req:Request, res: Response) => {
    const result = ratings.map((rating) => ({ id: rating.id, rate: rating.rate }))
    res.send(result)
})

// Lemmikute nimekirja tagastamine
app.get("/favorites", (_req: Request, res: Response) => {
  const result = favorites.map((favorite) => ({
    id: favorite.id,
    name: favorite.name
  }))
  res.json(result)
})

// Serveri käivitamine
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})