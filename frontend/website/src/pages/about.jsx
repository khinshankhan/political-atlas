import React from "react";
import { Link } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import {
  sortedEmotions,
  emotionsMap,
  determineColor,
} from "src/utils/emotions";
import { capitalize } from "src/utils/utils";

import Layout from "src/components/Layout";
import Legend from "src/components/Legend";
import MemberCards from "src/components/About/MemberCards";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const About = () => {
  const classes = useStyles();

  const ibmEmotions = (() => {
    const emotions = sortedEmotions
      .map((emotion) => emotionsMap[emotion].ibm)
      .flat();
    emotions.sort();
    return emotions;
  })();

  const daEmotions = (() => {
    const emotions = sortedEmotions
      .map((emotion) => emotionsMap[emotion].da)
      .flat();
    emotions.sort();
    return emotions;
  })();

  return (
    <Layout title="About">
      <Typography variant="h5" gutterBottom>
        Goal
      </Typography>
      <Typography variant="body1" gutterBottom>
        Better the understanding of rhetoric used by politicians through a
        comprehensive analysis of the tones in their speeches.
      </Typography>
      <Typography variant="h5" gutterBottom>
        What We Did
      </Typography>
      <Typography variant="body1" gutterBottom>
        We used the{" "}
        <Link to="https://www.ibm.com/watson/services/tone-analyzer/">
          IBM API
        </Link>{" "}
        to analyze the transcript of speeches to detect emotions based off word
        choices and clustering. We also used the{" "}
        <Link to="https://www.deepaffects.com/">DeepAffects API</Link> to
        ananalyze inflections in the audio to determine emotions. We then
        compared the two outputs.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Emotion Key
      </Typography>
      <Typography variant="body1" gutterBottom>
        The IBM API would return <i>{ibmEmotions.join(", ")}</i> and the
        DeepAffects API would return <i>{daEmotions.join(", ")}</i>. Actually,
        the IBM API would return no emotions for a sentence it found neutral,
        but we decided to make that neutral in order to be able to analyze the
        sentence.
      </Typography>
      <Typography variant="body1" gutterBottom>
        As is, the data is really incomparable, so we decided to transform the
        data such that uniform emotions are used. We created the keys{" "}
        <i>{sortedEmotions.join(", ")}</i>. This is how the emotions map over
        from each kind of API:
      </Typography>

      <br />

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            Our Emotions
            <hr />
            {sortedEmotions.map((emotion, index) => (
              <span key={index}>
                {capitalize(emotion)}
                <br />
              </span>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            IBM API
            <hr />
            {sortedEmotions.map((emotion, index) => (
              <span key={index}>
                {capitalize(emotionsMap[emotion].ibm.join(", "))}
                <br />
              </span>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>
            DeepAffects API
            <hr />
            {sortedEmotions.map((emotion, index) => (
              <span key={index}>
                {capitalize(emotionsMap[emotion].da.join(", "))}
                <br />
              </span>
            ))}
          </Paper>
        </Grid>
      </Grid>

      <br />

      <Typography variant="body1" gutterBottom>
        We also associated colors with each emotion. We decided to associate the
        strength of the color sentences based on confidence of the emotions. It
        is as follows:
      </Typography>

      <br />

      <Legend />

      <br />

      <Typography variant="h5" gutterBottom>
        Background
      </Typography>
      <Typography variant="body1" gutterBottom>
        We are a group of 4 students at Hunter College that wanted to contribute
        positively to political discord. We noticed that as of late that
        political discussion was struggling. Many people are losing trust in our
        institutions and officials so we wanted to create a resource to help the
        American electorate.
      </Typography>
      <Typography variant="h5" gutterBottom>
        Members
      </Typography>
      <MemberCards />
    </Layout>
  );
};

export default About;
