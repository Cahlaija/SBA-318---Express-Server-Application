const express = require("express");
const movies = require("./data/movie");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/movies", (req, res) => {
    res.json(movies);
});




app.get("/movies/:id", (req, res) => {
const movie = movies.find(m => m.id == req.params.id);
    if (!movie) {
        return res.status(404).json({ message: "Movie not found"});
    }
    res.json(movie);
});


app.post("/movies", (req, res) => {
    const newMovie = {
        id: movies.length + 1,
        ...req.body
    };

    movies.push(newMovie);
    res.json(newMovie);
});

app.delete("/movies/:id", (req, res) => {
    const index = movies.findIndex(m => m.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Movie not found"});
    }

    movies.splice(index, 1);
    res.json({ message: "Movie deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});