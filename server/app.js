import express from 'express';
import cors from "cors";
import path from 'path';
import { getWord } from './fetchWord.js'
import { Highscore } from "./models.js";
import { getHighscores, sortedHighscores } from './db.js';

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");

// Routes
//
app.get("/",  (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.get("/highscore", async (req, res) => {
  const highscores = await sortedHighscores();
  res.render("index", { highscores });
});

app.get("/highscore/:number", async (req, res) => {
  const highscores = await getHighscores(req.params.number);
  res.render("index", { highscores });
})

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public", "about.html"));
});

// API
//
app.get("/api/word/:number", async (req, res) => {
  let unique = false;
  if(req.query.unique === 'true') {
    unique = true;
  }  
  res.json(await getWord(req.params.number, unique)); 
})

app.get("/api/highscores", async (req, res) => {
  const highscore = await Highscore.find();
  res.json(highscore);
})

app.get("/api/highscores/:number", async (req, res) => {
  const highscore = await Highscore.find({ length: req.params.number })
  if (highscore == []) {
    res.send("Empty highscore");
  } else {
  res.json(highscore);
  }
})

app.post("/api/highscores", async (req, res) => {
  const highscore = new Highscore(req.body);
  await highscore.save();
  res.status(201).json({ highscore })
})

app.use(express.static("client/public"));
app.use(express.static("client/build"));

export default app;