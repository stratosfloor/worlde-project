import express from 'express';
import path from 'path';
import { fetchData } from './fetchWord.js'

const app = express();
const __dirname = path.resolve();

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

// APIs
app.get("/api/word/:number", async (req, res) => {
  const data = await fetchData(req.params.number);
  const query = req.query;
  console.log(query);
  res.json(data);
})

app.use(express.static("client/public"));

export default app;