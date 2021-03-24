import React from "react";

import Typography from "@material-ui/core/Typography";

import { confidenceShade } from "src/utils/emotions";

const determineColor = (color, score) => {
  const [r, g, b] = confidenceShade(color, score);
  return `rgb(${r}, ${g}, ${b})`;
};

const EmotionText = ({ sentences, emotionObj }) => {
  // this is for a special case
  // since the ibm emotions will be empty when the emotion is neutral
  const fallback = emotionObj.ibm.includes("neutral");
  const colorEmotionP = (tones) => {
    if (fallback) {
      return tones.length === 0;
    }
    return tones.some(({ tone_id }) => emotionObj.ibm.includes(tone_id));
  };

  return (
    <Typography variant="body1" gutterBottom>
      {sentences.map(({ tones, text }, i) => {
        if (colorEmotionP(tones)) {
          const score = tones.find(({ tone_id }) =>
            emotionObj.ibm.includes(tone_id)
          ).score;
          return (
            <span
              key={i}
              style={{
                backgroundColor: determineColor(emotionObj.color, score),
                color: "white",
              }}
            >
              {text}
            </span>
          );
        }

        return <span key={i}>{text}</span>;
      })}
    </Typography>
  );
};

export default EmotionText;
