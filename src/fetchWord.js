import fetch from "node-fetch";

const URL = "https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json";

// Fetch data with word
const fetchData = async (numberOfLetters, uniqueLetters = false) => {
  const response = await fetch(URL);
  const data = await response.json();
  const dataList = Object.keys(data);
  return dataList;
}

// Filter out one word
const filterWord = async (list, numberOfLetters, uniqueLetters = false) => {
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

// Word to return
export const getWord = async (numberOfLetters, uniqueLetters = false) => {
  const list = await fetchData();
  const word = await filterWord(list, numberOfLetters, uniqueLetters)
  return word;
}