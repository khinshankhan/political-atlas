import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { emotionsMap, sortedEmotions } from "src/utils/emotions";

import EmotionControls from "./EmotionControls";
import EmotionText from "./EmotionText";

// TODO: figure out actual coloring per sentence
// TODO: look into on hovers for the text

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
const EmotionCaptions = ({ sentences }) => {
  const classes = useStyles();

  const [selectedEmotion, setSelectedEmotion] = useState(sortedEmotions[0]);
  const updateEmotionOnChange = (e) => setSelectedEmotion(e.target.name);

  const selectedEmotionObj = emotionsMap[selectedEmotion];

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <EmotionControls
                  selectedEmotion={selectedEmotion}
                  handleOnChange={updateEmotionOnChange}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <EmotionText
              sentences={sentences}
              emotion={selectedEmotion}
              emotionObj={selectedEmotionObj}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmotionCaptions;
