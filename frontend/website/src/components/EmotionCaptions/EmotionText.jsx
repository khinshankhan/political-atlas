import React from "react";

import Typography from "@material-ui/core/Typography";

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
          return (
            <span
              key={i}
              style={{
                backgroundColor: emotionObj.color,
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
