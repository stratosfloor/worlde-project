import "./App.css";
import { useEffect, useState } from "react";
import { Loading } from "./Loading.js";
import { Game } from "./Game.js";

function App() {
  const [correctWord, setCorrectWord] = useState(null);
  const [gameState, setGameState] = useState("start");
  const [letters, setLetters] = useState({ letters: "4" });
  const [unique, setUnique] = useState({ unique: "false" });
  const [dictionary, setDictionary] = useState({});

  const options = [
    {
      label: "Play with 4-letter word",
      value: "4",
    },
    {
      label: "Play with 5-letter word",
      value: "5",
    },
    {
      label: "Play with 6-letter word",
      value: "6",
    },
    {
      label: "Play with 7-letter word",
      value: "7",
    },
    {
      label: "Play with 8-letter word",
      value: "8",
    },
    {
      label: "Play with 9-letter word",
      value: "9",
    },
    {
      label: "Play with 10-letter word",
      value: "10",
    },
  ];

  const onClickPlay = () => {
    setGameState("loading");
    fetchWord(letters.letters, unique.unique);
  };

  const handleLetters = (event) => {
    setLetters({
      letters: event.target.value,
    });
    console.log("letters: " + event.target.value);
  };

  const handleUnique = (event) => {
    setUnique({ unique: event.target.value });
  };

  const fetchWord = async (number, unique) => {
    const url = `http://localhost:5080/api/word/${number}?unique=${unique}`;
    const res = await fetch(url);
    const word = await res.json();
    setCorrectWord(word.toUpperCase());
    console.log(word);
    handleGameState("playing");
  };

  useEffect(() => {
    fetchDictionary();
    console.log("dictionary set");
  }, []);

  const fetchDictionary = async () => {
    const url = "http://localhost:5080/api/dictionary";
    const res = await fetch(url);
    const dictionary = await res.json();
    setDictionary(dictionary);
  };

  const handleGameState = (state) => {
    setGameState(state);
  };

  if (gameState === "start") {
    return (
      <div className="gameConfig">
        <h2>Configure game</h2>
        <form className="game-configure">
          <div>
            <label classeName="letters" for="numberOfLetters">
              How many letters:{" "}
            </label>
            <select
              id="numberOfLetters"
              name="numberOfLetters"
              onChange={handleLetters}
            >
              {options.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div>
            <input
              type="radio"
              name="unique"
              id="notunique"
              value="false"
              checked="checked"
              onChange={handleUnique}
            ></input>
            <label for="notunique" className="radiotext">
              Allow repeating charcters (e.g. HELLO)
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="unique"
              id="unique"
              value="true"
              onChange={handleUnique}
            ></input>
            <label for="unique" className="radiotext">
              Allow unique charcters only (e.g. CURLY)
            </label>
          </div>
          <div>
            <submit className="play" onClick={onClickPlay}>
              Play
            </submit>
          </div>
        </form>
      </div>
    );
  } else if (gameState === "loading") {
    return <Loading />;
  } else if (gameState === "playing") {
    return (
      <Game
        correctWord={correctWord}
        handleGameState={handleGameState}
        unique={unique}
        dictionary={dictionary}
      />
    );
  } else if (gameState === "win") {
    return <h2>WON!</h2>;
  } else if (gameState === "lost") {
    return <h2>LOST</h2>;
  }
}

export default App;
