import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { confidenceShade, contrastColor } from "src/utils/emotions";

const useStyles = makeStyles((theme) => ({
  hoverUnderline: {
    "&:hover": {
      textDecoration: "underline #000000",
    },
  },
}));

const determineColor = (color, score) => {
  const backgroundColor = confidenceShade(color, score);
  const textColor = contrastColor(backgroundColor);
  const [r, g, b] = backgroundColor;
  return [`rgb(${r}, ${g}, ${b})`, textColor];
};

const EmotionText = ({ sentences, emotion, emotionObj }) => {
  const classes = useStyles();

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
          if (fallback) {
            score = 90;
          } else {
            score = tones.find(({ tone_id }) =>
              emotionObj.ibm.includes(tone_id)
            ).score;
          }
        }

        const [backgroundColor, textColor] = determineColor(
          emotionObj.color,
          score
        );

        return (
          <Tooltip
            key={i}
            title={`${emotion}: ${score * 100}%`}
            placement="top"
            interactive
          >
            <span
              className={classes.hoverUnderline}
              style={{
                backgroundColor: backgroundColor,
                color: textColor,
              }}
            >
              {text}{" "}
            </span>
          </Tooltip>
        );
      })}
    </Typography>
  );
};

export default EmotionText;
