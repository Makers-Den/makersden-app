export const sentenceToId = (sentence: string, numOfWords = 5) =>
  sentence.split(" ").slice(0, numOfWords).join("-").toLowerCase();
