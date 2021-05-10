import React, { useState } from "react";

import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
    color: theme.palette.text.secondary,
  },
  center: {
    textAlign: "center",
  },
}));
const EmotionCaptions = ({ sentences }) => {
  const classes = useStyles();
  const theme = useTheme();
  const downXm = useMediaQuery(theme.breakpoints.down("xm"));
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const [selectedEmotions, setSelectedEmotions] = useState([]);

  const updateEmotionOnChange = (e) => {
    const emotion = e.target.name;
    const ret = selectedEmotions.includes(emotion)
      ? selectedEmotions.filter((c) => {
          return c !== emotion;
        })
      : [...selectedEmotions, emotion];
    setSelectedEmotions(ret);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={downMd ? 12 : 2}>
        <Grid item xs={downMd ? 12 : 2}>
          <Paper className={clsx(classes.paper, !downXm && classes.center)}>
            {downMd ? (
              <EmotionControls
                handleOnChange={updateEmotionOnChange}
                downMd={downMd}
              />
            ) : (
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <EmotionControls
                    handleOnChange={updateEmotionOnChange}
                    downMd={downMd}
                  />
                </Grid>
              </Grid>
            )}
          </Paper>
        </Grid>
        <Grid item xs={downMd ? 12 : 10}>
          <Paper className={classes.paper}>
            <EmotionText sentences={sentences} emotions={selectedEmotions} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmotionCaptions;
