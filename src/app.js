import express from 'express';
import path from 'path';

const app = express();
const __dirname = path.resolve();

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
  res.send('You request number: ' + req.params.number);
})

app.use(express.static("client/public"));

export default app;