import express, { type Request, type Response, type NextFunction } from "express"

const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

const ratings = [
    { id: 1, rate: "1" },
    { id: 2, rate: "2" },
    { id: 3, rate: "3" },
    { id: 4, rate: "4" },
    { id: 5, rate: "5" }
]

const details = [
    { id: 1, name: "skatepark1", city: "Tallinn" },
    { id: 2, name: "skatepark2", city: "Tartu" },
    { id: 3, name: "skatepark3", city: "Tallinn" },
]

let nextfavoriteId = 1

const favorites = [
    { id: nextfavoriteId++, name: "Männiku skatepark" },
    { id: nextfavoriteId++, name: "Pärnu sisehall" },
    { id: nextfavoriteId++, name: "Tähtvere skatepark" }
]

app.get("/", (req: Request, res: Response) => {
    res.send("Töötab.")
})

app.get("/ratings", (req: Request, res: Response) => {
    const result = ratings.map((rating) => ({ id: rating.id, rate: rating.rate }))
    res.send(result)
})

app.get("/ratings/:id", (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "ID required" })
    }

    const ratingId = req.params.id ? typeof req.params.id === "string" ? parseInt(req.params.id) : parseInt(req.params.id[0]!) : null
    const result = ratings.map((rating) => rating.id === ratingId ? rating : undefined).filter(Boolean)[0]

    if (result === undefined) {
        return res.status(404).send({ error: "Rating not found" })
    }
    res.send(result)
})

app.get("/details", (req: Request, res: Response) => {
    const result = details.map((detail) => ({ id: detail.id, name: detail.name }))   
    res.send(result)
})

app.get("/details/:id", (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).send({ error: "Missing id parameter" })
        return
    }
    const detailId = req.params.id ?
        typeof req.params.id === "string" ?
            parseInt(req.params.id) 
            : parseInt(req.params.id[0]!) 
         : null
            
    const result = details.find(detail => detail.id === detailId);
    if (result === undefined) {
        res.status(404).send({ error: "Detail not found" })
        return
    }
    res.send(result)
})


app.get("/favorites", (req: Request, res: Response) => {
    const result = favorites.map((favorite) => ({ id: favorite.id, name: favorite.name }))
    res.send(result)
})

app.get("/favorites/:id", (req: Request, res: Response) => {
    if (!req.params.id) {
        res.status(400).send({ error: "Missing id parameter" })
        return
    }
    const favoriteId = req.params.id ?
        typeof req.params.id === "string" ?
            parseInt(req.params.id) 
            : parseInt(req.params.id[0]!) 
         : null
            
    const result = favorites.find(favorite => favorite.id === favoriteId);
    if (result === undefined) {
        res.status(404).send({ error: "Favorite not found" })
        return
    }
    res.send(result)
})
app.post("/favorites", (req: Request, res: Response) => {
    if (!req.body || !req.body.name) {
        res.status(400).send({ error: "Missing name in request body" })
        return
    }

    const newFavorite = {
        id: favorites.length > 0 ? Math.max(...favorites.map(f => f.id)) + 1 : 1,
        name: req.body.name
    }

    favorites.push(newFavorite)
    res.status(201).send(newFavorite)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})