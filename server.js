import app from "./server/app.js";
import mongoose from "mongoose"

const port = 5080;

mongoose.connect("mongodb+srv://emilnoren:j6qmeaYfKPiQzZYq@cluster0.j0lsw.mongodb.net/myFirstDatabase")

app.listen(port, () => console.log('Server running on port: ' + port));