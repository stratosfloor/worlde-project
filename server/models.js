import mongoose from "mongoose";

const Highscore = mongoose.model("Highscore", {
  length: String,
  guesses: Array,
  time: Number,
  name: String,
  unique: Boolean,
});

// j6qmeaYfKPiQzZYq

export { Highscore };
