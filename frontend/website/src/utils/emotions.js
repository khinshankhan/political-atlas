export const emotionsMap = {
  anger: {
    color: [255, 0, 0],
    da: ["anger"],
    ibm: ["anger"],
  },
  sad: {
    color: [0, 0, 255],
    da: ["sad"],
    ibm: ["sadness"],
  },
  happy: {
    color: [255, 255, 0],
    da: ["happy"],
    ibm: ["joy"],
  },
  insecure: {
    color: [0, 255, 0],
    da: ["frustrated"],
    ibm: ["fear", "tentative"],
  },
  secure: {
    color: [128, 0, 128],
    da: ["excited"],
    ibm: ["analytical", "confident"],
  },
  neutral: {
    color: [128, 128, 128],
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
