import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import Layout from "src/components/Layout";
import SpeechList from "src/components/SpeechList";

import { getSpeechList } from "src/api/Server";

const useStyles = makeStyles((theme) => ({
  load: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Search = () => {
  const classes = useStyles();

  const [speeches, setSpeeches] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const list = await getSpeechList();
      setSpeeches(list);
    };
    setup();
  }, []);

  return (
    <Layout title="Search">
      <br />
      {speeches === null ? (
        <div className={classes.load}>
          <br />
          <CircularProgress size={100} />
        </div>
      ) : (
        <SpeechList speeches={speeches.data} />
      )}
    </Layout>
  );
};

export default Search;
