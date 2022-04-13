import mongoose from "mongoose";


const Cat = mongoose.model("Cat", { name: String });
const Highscore = mongoose.model("Highscore", {
  correctWord: String,
  guesses: Array,
  time: Number,
  name: String,
})

// export const saveHighscore = async (highscore) => {

// }

// export const loadHighscores = async (highscores) => {

// }


// j6qmeaYfKPiQzZYq

export { Cat, Highscore };