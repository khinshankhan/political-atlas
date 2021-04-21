import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import Button from "@material-ui/core/Button";

import DateFnsUtils from "@date-io/date-fns";
import { default as dateFormat } from "date-fns/format";
import isBefore from "date-fns/isBefore";

import Layout from "src/components/Layout";
import SpeechList from "src/components/SpeechList";

import { getSpeechList } from "src/api/Server";

const useStyles = makeStyles((theme) => ({
  load: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  searchinput: {
    textAlign: "center",
    position: "relative",
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
  const [dateConstraints, setDateContraints] = useState([
    new Date(),
    new Date(),
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [input, setInput] = useState({
    description: "",
    transcript: "",
    president: null,
  });

  useEffect(() => {
    const setup = async () => {
      const list = await getSpeechList();
      if (list && list.data.length > 0) {
        setSpeeches(list.data);

        setPresidents((prev) => {
          const presidents = [
            ...new Set(list.data.map(({ politician }) => politician)),
          ];
          presidents.sort();
          return presidents;
        });

        const firstDate = new Date(list.data[0].date);
        let [minDate, maxDate] = [firstDate, firstDate];
        list.data.forEach(({ date }) => {
          const newDate = new Date(date);
          if (isBefore(newDate, minDate)) minDate = newDate;
          if (isBefore(maxDate, newDate)) maxDate = newDate;
        });

        setStartDate(minDate);
        setEndDate(maxDate);
        setDateContraints([minDate, maxDate]);
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

  return (
    <Layout title="Search">
      {/* {speeches != null && speeches.length > 0 && ( */}
      {/* )} */}

      <div className={classes.searchinput}>
        {["description", "transcript"].map((field) => (
          <TextField
            key={field}
            id={field}
            label={field}
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
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </div>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            id="start"
            autoOk
            label="Start"
            value={startDate}
            format="MM/dd/yyyy"
            variant="inline"
            minDate={dateConstraints[0]}
            maxDate={endDate}
            onChange={(date) => setStartDate(date)}
          />
          <DatePicker
            id="end"
            autoOk
            label="End"
            value={endDate}
            format="MM/dd/yyyy"
            variant="inline"
            minDate={startDate}
            maxDate={dateConstraints[1]}
            onChange={(date) => setEndDate(date)}
          />
        </MuiPickersUtilsProvider>
        <Button
          color="primary"
          variant="contained"
          style={{ position: "absolute", bottom: "0px" }}
        >
          Search
        </Button>
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
