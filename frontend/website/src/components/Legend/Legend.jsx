import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import {
  sortedEmotions,
  emotionsMap,
  determineColor,
} from "src/utils/emotions";
import { capitalize } from "src/utils/utils";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Legend = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          Emotion
          <hr />
          {sortedEmotions.map((emotion, index) => (
            <span key={index}>
              {capitalize(emotion)}
              <br />
            </span>
          ))}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          {"<50%"}
          <hr />
          {sortedEmotions.map((emotion, index) => {
            const emotionColor = emotionsMap[emotion].color;
            const [backgroundColor, textColor] = determineColor(
              emotionColor,
              0.25
            );
            return (
              <span
                key={index}
                style={{
                  backgroundColor: backgroundColor,
                  color: textColor,
                }}
              >
                {"text"}
                <br />
              </span>
            );
          })}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          {"50%-75%"}
          <hr />
          {sortedEmotions.map((emotion, index) => {
            const emotionColor = emotionsMap[emotion].color;
            const [backgroundColor, textColor] = determineColor(
              emotionColor,
              0.63
            );
            return (
              <span
                key={index}
                style={{
                  backgroundColor: backgroundColor,
                  color: textColor,
                }}
              >
                {"text"}
                <br />
              </span>
            );
          })}
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          {">75%"}
          <hr />
          {sortedEmotions.map((emotion, index) => {
            const emotionColor = emotionsMap[emotion].color;
            const [backgroundColor, textColor] = determineColor(
              emotionColor,
              0.87
            );
            return (
              <span
                key={index}
                style={{
                  backgroundColor: backgroundColor,
                  color: textColor,
                }}
              >
                {"text"}
                <br />
              </span>
            );
          })}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Legend;
