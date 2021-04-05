import { sortedEmotions, emotionsMap } from "./emotions";
import { capitalize } from "./utils";

const daMap = sortedEmotions.reduce((stored, currentEmotionKey) => {
  const emotions = emotionsMap[currentEmotionKey].da
    .map((daEmotion) => ({ [daEmotion]: currentEmotionKey }))
    .flat();
  emotions.forEach((emotions) => (stored = { ...stored, ...emotions }));
  return stored;
}, {});

const ibmMap = sortedEmotions.reduce((stored, currentEmotionKey) => {
  const emotions = emotionsMap[currentEmotionKey].ibm
    .map((ibmEmotion) => ({ [ibmEmotion]: currentEmotionKey }))
    .flat();
  emotions.forEach((emotions) => (stored = { ...stored, ...emotions }));
  return stored;
}, {});

export const uniformDaData = (da) => {
  if (!da || Object.keys(da).length === 0) {
    return null;
  }

  return da.response.map((daObj) => ({
    ...daObj,
    emotion: daMap[daObj.emotion],
  }));
};

export const uniformIbmData = (ibm) => {
  if (!ibm || Object.keys(ibm).length === 0) {
    return null;
  }

  return {
    ...ibm,
    sentences_tone: ibm.sentences_tone.map((sentence) => {
      if (sentence.tones.length === 0) {
        return {
          ...sentence,
          tones: [
            {
              tone_id: "neutral",
              tone_name: "Neutral",
              score: 90,
            },
          ],
        };
      }

      const newToneMap = sentence.tones.reduce((stored, tone) => {
        const uniformTone = ibmMap[tone.tone_id];
        if (uniformTone in stored) {
          stored[uniformTone] += tone.score;
        } else {
          stored[uniformTone] = tone.score;
        }
        return stored;
      }, {});

      const newTones = Object.entries(newToneMap).map(([emotion, score]) => ({
        tone_id: emotion,
        tone_name: capitalize(emotion),
        score,
      }));

      return {
        ...sentence,
        tones: newTones,
      };
    }),
  };
};
