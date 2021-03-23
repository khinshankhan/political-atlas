export const emotionsMap = {
  anger: {
    color: "#FF0000",
    da: ["anger"],
    ibm: ["anger"],
  },
  sad: {
    color: "#0000FF",
    da: ["sad"],
    ibm: ["sadness"],
  },
  happy: {
    color: "#FFFF00",
    da: ["happy"],
    ibm: ["joy"],
  },
  insecure: {
    color: "#00FF00",
    da: ["frustrated"],
    ibm: ["fear", "tentative"],
  },
  secure: {
    color: "#800080",
    da: ["excited"],
    ibm: ["analytical", "confident"],
  },
  neutral: {
    color: "#808080",
    da: ["neutral"],
    // NOTE: ibm returns an empty array as neutral, not the keyword
    ibm: ["neutral"],
  },
};

export const sortedEmotions = (() => {
  const emotions = Object.keys(emotionsMap);
  emotions.sort();
  return emotions;
})();
