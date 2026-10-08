import express, { type Request, type Response, type NextFunction } from "express"


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

let nextRatingId = 1;
const ratings = [
    { id: nextRatingId++, rate: "1" },
    { id: nextRatingId++, rate: "2" },
    { id: nextRatingId++, rate: "3" },
    { id: nextRatingId++, rate: "4" },
    { id: nextRatingId++, rate: "5" }
]
let nextSkateparkId = 1
const skateparks: { id: number; name: string; city: string }[] = [
    { id: nextSkateparkId++, name: "skatepark1", city: "Tallinn" },
    { id: nextSkateparkId++, name: "skatepark2", city: "Tartu" },
    { id: nextSkateparkId++, name: "skatepark3", city: "Tallinn" },
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

app.post('/ratings', (req: Request, res: Response) => {
    if (!req.body?.rate) {
        return res.status(400).send({ error: 'Required parameter: rate' })
    }
const newRating = {
        id: nextRatingId++,
        rate: req.body.rate
    }
    
    ratings.push(newRating)
    res.status(201)
    .location(`https:localhost${PORT}/ratings/` + (newRating.id))
    .send(newRating)
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
app.get("/skateparks", (req: Request, res: Response) => {
    const result = skateparks.map((skatepark) => ({ id: skatepark.id, name: skatepark.name, city: skatepark.city }))
    res.send(result)
})
app.get("/skateparks/:id", (req: Request, res: Response) => {
    const skateparkId = req.params.id ? typeof req.params.id === "string" ? parseInt(req.params.id) : parseInt(req.params.id[0]!) : null
    const result = skateparks.find(skatepark => skatepark.id === skateparkId);
    if (!result) {
        res.status(404).send({ error: "Skatepark not found" });
        return;
    }
    res.send(result);
});

app.post("/skateparks", (req:Request, res: Response) => {

    const name = req.body?.name;
    const city  = req.body?.city;
    if (!name) {
        res.status(400).send({ error: "Missing name parameter" })
        return
    }
    if (!city) {
        res.status(400).send({ error: "Missing city parameter" })
        return
    }
    const newID = Math.max(...skateparks.map(p => p.id)) + 1
    const newSkatepark = {
        id: nextSkateparkId++,
        name: name,
        city: city
    };
    skateparks.push(newSkatepark);
    res.status(201).send(newSkatepark);
});
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