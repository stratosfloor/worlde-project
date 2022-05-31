import { useEffect, useState } from "react";
import { GuessElements } from "./GuessElements";

export const Game = ({ correctWord, handleGameState, unique, dictionary }) => {
  const [startTime] = useState(new Date());
  const [endTime, setEndTime] = useState(null);
  const [inputText, setInputText] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [errorText, setErrorText] = useState("");
  const [winOrLose, setWinOrLose] = useState();
  const [name, setName] = useState("");

  const handleGuess = () => {
    if (inputText.length !== correctWord.length) {
      setErrorText("Fel antal bokstäver");
    } else if (!dictionary.includes(inputText.toLowerCase())) {
      setErrorText("Ordet finns inte i ordlistan");
    } else {
      setGuesses([...guesses, inputText]);
    }

    setInputText("");
    if (inputText === correctWord) {
      setWinOrLose("won");
      setEndTime(new Date());
    } else if (guesses.length === 4) {
      setWinOrLose("lost");
    }
  };

  const handleKeyUp = (keyCode) => {
    if (keyCode === "Enter") {
      handleGuess();
    }
  };

  const onTextChange = (event) => {
    setErrorText("");
    setInputText(event.target.value.toUpperCase());
  };

  const submitHighscore = async (event) => {
    event.preventDefault();

    const highscore = {
      length: correctWord.length,
      guesses,
      time: (endTime - startTime) / 1000,
      name,
      unique: unique.unique,
    };

    await fetch("http://localhost:5080/api/highscores", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(highscore),
    });

    handleGameState("start");
  };

  const handleWinOrLose = () => {
    if (winOrLose === "won") {
      return (
        <>
          <h2>Win!</h2>
          <p>The correct was {correctWord}</p>
          <p>You guessed right in {guesses.length} tries</p>
          <p>Your time was {(endTime - startTime) / 1000}s</p>
          <form onSubmit={submitHighscore}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Submit name for highscore"
            />
            <input type="submit" value="Send" />
          </form>
        </>
      );
    } else if (winOrLose === "lost") {
      return (
        <>
          <h2>Lost! :(</h2>
          <p>The correct word was {correctWord}</p>
          <a href="/">
            <button className="play">Play again</button>
          </a>
        </>
      );
    } else
      return (
        <>
          <input
            value={inputText}
            onChange={onTextChange}
            onKeyUp={(event) => handleKeyUp(event.code)}
            type="text"
            className="guess"
          ></input>
          <button onClick={handleGuess}>Guess</button>
        </>
      );
  };

  return (
    <div className="game">
      <h3>GAAAAAME</h3>
      <h5>Ord med {correctWord.length} bokstäver</h5>
      <h5>{5 - guesses.length} guesses left</h5>

      <div className="guesses">
        <GuessElements guesses={guesses} correctWord={correctWord} />
      </div>
      <div> {handleWinOrLose()}</div>
      <div>
        <small>{errorText}</small>
      </div>
    </div>
  );
};
