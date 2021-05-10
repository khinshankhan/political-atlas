import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { emotionsMap, determineColor } from "src/utils/emotions";
import { roundDecimal2 } from "src/utils/utils";

const useStyles = makeStyles((theme) => ({
  hoverUnderline: {
    "&:hover": {
      textDecoration: "underline #000000",
    },
  },
}));

const EmotionText = ({ sentences, emotions }) => {
  const classes = useStyles();

  const filterEmotions = (tones) => {
    const ret = tones.filter(({tone_id}) => emotions.includes(tone_id) );
    return ret.sort((a, b) => b.score - a.score);
  };

  return (
    <Typography variant="body1" gutterBottom>
      {sentences.map(({ tones, text }, i) => {
        let score = 0;
        let emotion = "neutral";
        const filtered = filterEmotions(tones);
        if (filtered.length !== 0) {
          score = filtered[0].score;
          emotion = filtered[0].tone_id;
        }
        const emotionObj = emotionsMap[emotion];

        const [backgroundColor, textColor] = determineColor(
          emotionObj.color,
          score
        );

        return (
          <span key={i}>
            <Tooltip
              title={`${emotion}: ${roundDecimal2(score * 100)}%`}
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
                {text}
              </span>
            </Tooltip>{" "}
          </span>
        );
      })}
    </Typography>
  );
};

export default EmotionText;
