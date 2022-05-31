import app from "./server/app.js";

const port = 5080;

app.listen(port, () => console.log("Server running on port: " + port));
