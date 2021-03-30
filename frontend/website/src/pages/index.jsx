import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";

import Layout from "src/components/Layout";
import SpeechList from "src/components/SpeechList";

import { getSpeechList } from "src/api/Server";

const Index = () => {
  const [speeches, setSpeeches] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const list = await getSpeechList();
      setSpeeches(list);
    };
    setup();
  }, []);

  return (
    <Layout>
      <br />
      <Typography variant="h4" gutterBottom>
        Speeches
      </Typography>
      {speeches === null ? "Loading!" : <SpeechList speeches={speeches.data} />}
    </Layout>
  );
};

export default Index;
