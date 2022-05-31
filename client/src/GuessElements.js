import { GuessLetters } from "./GuessLetters";

const GuessElements = ({ guesses, correctWord }) => {
  return (
    <ul className="guessList">
      {guesses.map((guess, index) => (
        <li key={index}>
          <GuessLetters guess={guess} correctWord={correctWord} />
        </li>
      ))}
    </ul>
  );
};

export { GuessElements };
