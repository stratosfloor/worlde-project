export function guessFeedback(guess, answer, numberOfLEtters) {
  if (guess.length !== answer.length) {
    return null;
  }
  const uniqueLetters = new Array(...new Set(answer));
  const NUMBER_OF_LETTERS = numberOfLEtters;
  const payload = [];

  // Sets correct or incorrect for all unique letters
  for (let i = 0; i < NUMBER_OF_LETTERS; i++) {
    const obj = {};
    let value = "";

    if (guess[i] === answer[i]) {
      value = "correct";
      let index = uniqueLetters.indexOf(guess[i]);
      uniqueLetters.splice(index, 1);
    } else if (!answer.includes(guess[i])) {
      value = "incorrect";
    }

    obj.letter = guess[i];
    obj.result = value;
    payload.push(obj);
  }

  for (let j = 0; j < NUMBER_OF_LETTERS; j++) {
    if (payload[j].result === "" && uniqueLetters.includes(guess[j])) {
      payload[j].result = "misplaced";
      let index = uniqueLetters.indexOf(guess[j]);
      uniqueLetters.splice(index, 1);
    } else if (payload[j].result === "" && !uniqueLetters.includes(guess[j])) {
      payload[j].result = "incorrect";
    }
  }
  return payload;
}
