import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
  const text = sentences.map(({ text }) => text).join(" ");

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              {[...Array(7).keys()].map((i) => (
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    key={i}
                  >
                    Enotion {i}
                  </Button>
                </Grid>
              ))}
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
