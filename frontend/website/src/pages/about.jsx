import React from "react";
import { Link } from "gatsby";

import Typography from "@material-ui/core/Typography";

import {
  sortedEmotions,
  emotionsMap,
  determineColor,
} from "src/utils/emotions";
import { capitalize } from "src/utils/utils";

import Layout from "src/components/Layout";
import Legend from "src/components/Legend";
import MemberCards from "src/components/About/MemberCards";

const About = () => {
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

      {sortedEmotions.map((emotion, index) => (
        <Typography key={index} variant="body1" gutterBottom>
          - {capitalize(emotion)} <br />
          IBM API: {emotionsMap[emotion].ibm.join(", ")}
          <br />
          DeepAffects API: {emotionsMap[emotion].da.join(", ")}
        </Typography>
      ))}

      <Typography variant="body1" gutterBottom>
        We also associated colors with each emotion. We decided to associate the
        strength of the color sentences based on confidence of the emotions. It
        is as follows:
      </Typography>

      <Legend />

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
