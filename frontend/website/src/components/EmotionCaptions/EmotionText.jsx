import React from "react";

import Typography from "@material-ui/core/Typography";

import { confidenceShade, contrastColor } from "src/utils/emotions";

const determineColor = (color, score) => {
  const backgroundColor = confidenceShade(color, score);
  const textColor = contrastColor(backgroundColor);
  console.log(backgroundColor, textColor);
  const [r, g, b] = backgroundColor;
  return [`rgb(${r}, ${g}, ${b})`, textColor];
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
        let score = 0;
        if (colorEmotionP(tones)) {
          score = tones.find(({ tone_id }) => emotionObj.ibm.includes(tone_id))
            .score;
        }

        const [backgroundColor, textColor] = determineColor(
          emotionObj.color,
          score
        );

        console.log(score, backgroundColor, textColor, text);
        return (
          <span
            key={i}
            style={{
              backgroundColor: backgroundColor,
              color: textColor,
            }}
          >
            {text}
          </span>
        );
      })}
    </Typography>
  );
};

export default EmotionText;
