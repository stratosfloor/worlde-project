import express from 'express';
import cors from "cors";
import path from 'path';
import { getWord } from './fetchWord.js'
import { Highscore } from "./models.js";

const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.get("/",  (req, res) => {
  res.sendFile(path.join(__dirname, "client/public", "index.html"));
});

app.get("/highscore", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public", "highscore.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "client/public", "about.html"));
});

// API to get number
// number = number of letters
// querystring unique=true for only unique letter
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

app.post("/api/highscores", async (req, res) => {
  const highscore = new Highscore(req.body);
  await highscore.save();
  res.status(201).json({ highscore })
})

app.use(express.static("client/public"));

export default app;