import React, { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";

import Layout from "src/components/Layout";
import SpeechList from "src/components/SpeechList";

import { getSpeechList } from "src/api/Server";

import { capitalize } from "src/utils/utils";

const useStyles = makeStyles((theme) => ({
  load: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchinput: {
    textAlign: "center",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Search = () => {
  const classes = useStyles();

  const [speeches, setSpeeches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [speechesToDisplay, setSpeechesToDisplay] = useState(null);

  const [input, setInput] = useState({
    description: "",
    transcript: "",
    president: "",
  });

  useEffect(() => {
    const setup = async () => {
      const list = await getSpeechList();
      setSpeeches((list && list.data) || []);
      setLoading(false);
    };
    setup();
  }, []);

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <Layout title="Search">
      <div className={classes.searchinput}>
        {["description", "transcript"].map((field) => (
          <TextField
            key={field}
            id={field}
            label={capitalize(field)}
            value={input[field]}
            onChange={handleInputChange}
          />
        ))}
        <TextField
          id="president"
          label="President"
          value={input.president}
          onChange={handleInputChange}
        />
      </div>

      {loading && (
        <div className={classes.load}>
          <br />
          <CircularProgress size={100} />
        </div>
      )}

      {speechesToDisplay != null && <SpeechList speeches={speeches} />}
    </Layout>
  );
};

export default Search;
