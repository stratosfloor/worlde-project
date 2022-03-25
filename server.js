import express from 'express';

const app = express();
const port = 5080;

app.get("/", (req, res) => {
  res.json('heeeeeeeeej');
})

app.listen(port, () => console.log('Server running on port: ' + port));