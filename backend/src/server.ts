import express, { type Request, type Response } from "express"

const app: express.Express = express()
app.use(express.json())

const PORT: number = Number(process.env.PORT) || 3000

// Defineerime andmetüübi (ainult id ja name)
interface Skatepark {
  id: number;
  name: string;
}


const favorites: Skatepark[] = [
  { id: 1, name: "Männiku skatepark" },
  { id: 2, name: "Pärnu sisehall" },
  { id: 3, name: "Tähtvere skatepark" }
]

app.get("/", (_req: Request, res: Response) => {
  res.send("Töötab.")
})


app.get("/favorites", (_req: Request, res: Response) => {
    const result = favorites.map((favorite) => ({id: favorite.id, name: favorite.name}))
  res.json(result)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})