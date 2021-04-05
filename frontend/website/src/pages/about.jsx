import React from "react";

import Typography from "@material-ui/core/Typography";

import Layout from "src/components/Layout";
import MemberCards from "src/components/About/MemberCards";

const About = () => {
  return (
    <Layout>
      <br />
      <Typography variant="h4" gutterBottom>
        About
      </Typography>

      <Typography variant="h5" gutterBottom>
        Goal
      </Typography>
      <Typography variant="body1" gutterBottom>
        Better the understanding of rhetoric used by politicians through a
        comprehensive analysis of the tones in their speeches.
      </Typography>

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
