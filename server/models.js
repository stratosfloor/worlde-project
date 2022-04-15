import mongoose from "mongoose";


const Cat = mongoose.model("Cat", { name: String });
const Highscore = mongoose.model("Highscore", {
  length: String,
  guesses: Array,
  time: Number,
  name: String,
  unique: Boolean
})

// export const saveHighscore = async (highscore) => {

// }

// export const loadHighscores = async (highscores) => {

// }


// j6qmeaYfKPiQzZYq

export { Cat, Highscore };