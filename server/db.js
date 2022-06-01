import fetch from "node-fetch";

const getHighscores = async (number = null) => {
  let URL = "http://localhost:5080/api/highscores/";
  if (number) {
    URL += `${number}`;
  }
  const highscores = await fetch(URL);
  return highscores.json();
};

const sortedHighscores = async (number = null) => {
  const highscores = await getHighscores(number);

  highscores.sort((a, b) => a.guesses.length - b.guesses.length);
  highscores.sort((a, b) => {
    if (a.guesses.length === b.guesses.length) {
      return a.time - b.time;
    }
  });
  return highscores;
};

export { getHighscores, sortedHighscores };
