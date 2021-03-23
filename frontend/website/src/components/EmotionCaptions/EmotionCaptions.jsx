import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Switch from "@material-ui/core/Switch";

import { emotionMap, sortedEmotions } from "src/utils/emotions";
import { capitalize } from "src/utils/utils";

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

  const text = sentences.map(({ text }) => text).join(" ");

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Choose Emotion</FormLabel>
                  <FormGroup>
                    {sortedEmotions.map((emotion, i) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={emotion === selectedEmotion}
                            onChange={updateEmotionOnChange}
                            name={emotion}
                          />
                        }
                        label={capitalize(emotion)}
                      />
                    ))}
                  </FormGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <Paper className={classes.paper}>{text}</Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmotionCaptions;
