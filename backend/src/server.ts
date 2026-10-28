import express, { type Request, type Response, type NextFunction } from "express"
import { db } from "./db.ts";
import type { UUID } from "node:crypto";


const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000

let nextRatingId = 1;
const ratings: { id: number; skateparkId: number; rate: string }[] = [
    { id: nextRatingId++, skateparkId: 1, rate: "1" },
    { id: nextRatingId++, skateparkId: 1, rate: "2" },
    { id: nextRatingId++, skateparkId: 2, rate: "3" },
    { id: nextRatingId++, skateparkId: 2, rate: "4" },
    { id: nextRatingId++, skateparkId: 3, rate: "5" }
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
    if (!req.body?.rate || !req.body?.skateparkId) {
        return res.status(400).send({ error: 'Required parameter: rate, skateparkID' })
    }
    const parkExists = skateparks.some(p => p.id === parseInt(req.body.skateparkId))
    if (!parkExists) {
        return res.status(404).send({error: 'Skatepark not found'})
    }
const newRating = {
        id: nextRatingId++,
        skateparkId: parseInt(req.body.skateparkId),
        rate: req.body.rate
    }
    
    ratings.push(newRating)
    res.status(201)
    .location(`https:localhost${PORT}/ratings/` + (newRating.id))
    .send(newRating)
})
app.delete('/ratings/:id', (req: Request, res: Response) => {
    if (!req.params.id || isNaN(parseInt(req.params.id))) {
        return res.status(400).send({
            error: "Rating ID was not given or is invalid"
        })
    }

    const ratingId = parseInt(req.params.id)
    const ratingIndex = ratings.findIndex(rating => rating.id === ratingId)

    if (ratingIndex === -1) {
        return res.status(404).send({
            error: "Rating not found"
        })
    }

    ratings.splice(ratingIndex, 1)
    res.send({
        message: "Rating successfully removed"
    })
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
    const result = skateparks.map((skatepark) => {
        const parkRatings = ratings.filter(r => r.skateparkId === skatepark.id)
        return {
         id: skatepark.id,
          name: skatepark.name,
           city: skatepark.city,
           ratings: parkRatings
        }
    })
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
7})

let nextCommentsId = 1;
const comments: { commentsID: number; userID: string; skateparkID: number; content: string }[] = [
    { commentsID: nextCommentsId++, userID: "1", skateparkID: 1, content: "hea skeit" },
    { commentsID: nextCommentsId++, userID: "2", skateparkID: 2, content: "norm ramp" },
    { commentsID: nextCommentsId++, userID: "1", skateparkID: 3, content: "lemmik koht rummu karj22ris" }
];

app.get("/comments", (req: Request, res: Response) => {
    const result = comments.map((comment) => ({
        commentsID: comment.commentsID,
        userID: comment.userID,
        skateparkID: comment.skateparkID,
        content: comment.content
    }));
    
    res.send(result);
});

app.get("/comments/:id", (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "commentsID missing" });
    }

    const commentId = typeof req.params.id === "string" ? parseInt(req.params.id) : parseInt(req.params.id[0]!);
    const result = comments.find(comment => comment.commentsID === commentId);

    if (!result) {
        return res.status(404).send({ error: "Comment not found" });
    }

    res.send(result);
});
app.post("/comments", (req: Request, res: Response) => {
    const userID = req.body?.userID;
    const skateparkID = req.body?.skateparkID;
    const content = req.body?.content;
    if (!userID) {
        res.status(400).send({ error: "Missing userID parameter" });
        return;
    }
    if (!skateparkID) {
        res.status(400).send({ error: "Missing skateparkID parameter" });
        return;
    }
    if (!content) {
        res.status(400).send({ error: "Missing content parameter" });
        return;
    }
    const newComment = {
        commentID: nextCommentsId++,
        userID: userID,
        skateparkID: skateparkID,
        content: content
    };
    comments.push(newComment);
    res.status(201).send(newComment);
});

export interface Comment {
    commentID: UUID; 
    author?: string;
    createdAt?: Date;
}

app.delete('/comments/:id', (req: Request, res: Response) => {
    const commentId = req.params.id;

    if (!commentId) {
        return res.status(400).send({
            error: "Comment ID was not given or is invalid"
        });
    }
    const commentIndex = comments.findIndex(
        comment => String(comment.commentsID) === String(commentId)
    );
    if (commentIndex === -1) {
        return res.status(404).send({
            error: "Comment not found"
        });
    }
    comments.splice(commentIndex, 1);
    res.send({
        message: "Comment successfully removed"
    });
});

app.put('/comments/:id', async (req: Request, res: Response) => {
    try {
        const rawId = req.params.id;
        const commentId = Array.isArray(rawId) ? rawId[0] : rawId;
        if (!commentId) {
            return res.status(400).send({
                error: "Comment ID was not given or is invalid"
            });
        }
        if (!req.body || !req.body.content) {
            return res.status(400).send({
                error: "Missing parameters, please review data"
            });
        }
        const commentToBeModified = await db.comments.findByPk(commentId);
        if (!commentToBeModified) {
            return res.status(404).send({
                error: "Comment not found"
            });
        }
        commentToBeModified.content = req.body.content;
        if (req.body.is_hidden !== undefined) {
            commentToBeModified.is_hidden = req.body.is_hidden;
        }
        await commentToBeModified.save();
        return res.status(200).send({
            message: "Comment successfully modified",
            comment: commentToBeModified
        });
    } catch (error: any) {
        console.error("Error updating comment:", error);
        return res.status(500).send({
            error: "Internal server error",
            details: error?.message || String(error)
        });
    }
});



////////////
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})