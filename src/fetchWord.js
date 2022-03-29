import fetch from "node-fetch";

const URL = "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json";

export const fetchData = async (numberOfLetters, uniqueLetters = false) => {
  const response = await fetch(URL);
  const data = await response.json();
  const dataList = Object.keys(data);
  const payload = filterWord(dataList, numberOfLetters, uniqueLetters);
  return payload;
}


export function filterWord(list, numberOfLetters, uniqueLetters = false) {
  let payload = [];
  if (!uniqueLetters) {
    payload = list.filter((word) => word.length == numberOfLetters);
  } else {
    payload = list
      .filter((word) => word.length == numberOfLetters)
      .filter((word) => numberOfLetters == new Set(word).size);
  }
  if (payload.length > 0) {
    return payload[Math.floor(Math.random() * payload.length)];
  } else {
    console.log("No word found");
    return null;
  }
}
