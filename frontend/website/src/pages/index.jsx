import React, { useState, useEffect } from "react";

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
      {speeches === null ? "Loading!" : <SpeechList speeches={speeches} />}
    </Layout>
  );
};

export default Index;
