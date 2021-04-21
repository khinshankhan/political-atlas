import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

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

  const [presidents, setPresidents] = useState([]);
  const [input, setInput] = useState({
    description: "",
    transcript: "",
    president: null,
  });

  useEffect(() => {
    const setup = async () => {
      const list = await getSpeechList();
      if (list) {
        setSpeeches(list.data);
        setPresidents((prev) => {
          const presidents = [
            ...new Set(list.data.map(({ politician }) => politician)),
          ];
          presidents.sort();
          return presidents;
        });
      } else {
        setSpeeches([]);
      }

      setLoading(false);
    };
    setup();
  }, []);

  const handleInputChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log({ input });

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
        <div style={{ display: "inline-flex" }}>
          <Autocomplete
            id="president"
            options={presidents}
            value={input.president}
            onChange={(event, newValue) => {
              const target = { id: "president", value: newValue };
              handleInputChange({ target });
            }}
            autoHighlight
            getOptionLabel={(option) => option}
            renderOption={(option) => <>{option}</>}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a President"
                variant="outlined"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>
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
