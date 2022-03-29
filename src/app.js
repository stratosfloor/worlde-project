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

// API to get number
// number = number of letters
// querystring unique=true for only unique letter
app.get("/api/word/:number", async (req, res) => {
  let unique = false;
  if(req.query.unique === 'true') {
    unique = true;
  }  
  // const data = await fetchData(req.params.number, unique);
  res.json(await fetchData(req.params.number, unique));
})

app.use(express.static("client/public"));

export default app;