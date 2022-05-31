import { guessFeedback } from "./guessFeedback";

const GuessLetters = ({ guess, correctWord }) => {
  return (
    <ul className="row">
      {guessFeedback(guess, correctWord, correctWord.length).map(
        (letter, index) => (
          <li key={index} className={letter.result}>
            {letter.letter}
          </li>
        )
      )}
    </ul>
  );
};

export { GuessLetters };
