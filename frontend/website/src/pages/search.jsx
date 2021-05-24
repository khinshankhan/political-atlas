import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import FilterListIcon from "@material-ui/icons/FilterList";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import Button from "@material-ui/core/Button";

import isBefore from "date-fns/isBefore";

import * as JsSearch from "js-search";
import * as Stemmer from "porter-stemmer";

import Layout from "src/components/Layout";
import { Autocomplete, DateRangePicker } from "src/components/SearchComponents";
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
    position: "relative",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const FilterIcon = ({ filterListOrder }) =>
  ({
    relevance: <FilterListIcon />,
    newest: <TrendingDownIcon />,
    oldest: <TrendingUpIcon />,
  }[filterListOrder]);

const Search = () => {
  const classes = useStyles();

  const stemmer = Stemmer.stemmer;

  const [speeches, setSpeeches] = useState(null);
  const [loading, setLoading] = useState(true);
  const [speechesToDisplay, setSpeechesToDisplay] = useState(null);

  const [politicians, setPoliticians] = useState([]);
  const [dateConstraints, setDateContraints] = useState([
    new Date(),
    new Date(),
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const filterListOptions = ["relevance", "newest", "oldest"];
  const [filterListEl, setFilterListEl] = useState(null);
  const open = Boolean(filterListEl);

  const [input, setInput] = useState({
    context: "",
    politician: null,
    filterListOrder: filterListOptions[0],
  });

  useEffect(() => {
    const setup = async () => {
      const list = await getSpeechList();
      if (list && list.data.length > 0) {
        setSpeeches(list.data);

        setPoliticians(() => {
          const politicians = [
            ...new Set(list.data.map(({ politician }) => politician)),
          ];
          politicians.sort();
          return politicians;
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

  const handleFilterListClick = (event) => {
    setFilterListEl(event.currentTarget);
  };

  const handleFilterListClose = (e) => {
    if (e.target.id) {
      handleInputChange({
        target: { id: "filterListOrder", value: e.target.id },
      });
    }
    setFilterListEl(null);
  };

  const searchList = () => {
    setLoading(true);
    setSpeechesToDisplay(null);

    const filteredSpeeches = speeches.filter((speech) => {
      if (input.politician != null && input.politician !== speech.politician) {
        return false;
      }

      const date = new Date(speech.date);
      if (isBefore(date, startDate) || isBefore(endDate, date)) {
        return false;
      }

      return true;
    });

    let relevantSpeeches = filteredSpeeches;

    if (input.context !== "") {
      let search = new JsSearch.Search("id");
      search.tokenizer = new JsSearch.StemmingTokenizer(
        stemmer,
        new JsSearch.SimpleTokenizer()
      );
      search.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
      search.addIndex("title");
      search.addIndex("description");
      search.addDocuments(filteredSpeeches);

      relevantSpeeches = search.search(input.context);
    }

    if (input.filterListOrder === "newest") {
      relevantSpeeches.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    if (input.filterListOrder === "oldest") {
      relevantSpeeches.sort((a, b) => (a.id < b.id ? 1 : -1));
    }

    setSpeechesToDisplay(relevantSpeeches);

    setLoading(false);
  };

  return (
    <Layout title="Search">
      {speeches != null && speeches.length > 0 && (
        <div className={classes.searchinput}>
          <TextField
            id="context"
            label="Search terms"
            value={input.context}
            onChange={handleInputChange}
          />

          <div style={{ display: "inline-flex" }}>
            <Autocomplete
              id="politician"
              options={politicians}
              value={input.politician}
              onChange={(_event, newValue) => {
                const target = { id: "politician", value: newValue };
                handleInputChange({ target });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Politician"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password", // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </div>

          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            dateConstraints={dateConstraints}
          />

          <br />
          <IconButton
            id="filter-ordering-option"
            onClick={handleFilterListClick}
          >
            <FilterIcon filterListOrder={input.filterListOrder} />
          </IconButton>

          <Menu
            id="basic-menu"
            anchorEl={filterListEl}
            open={open}
            onClose={handleFilterListClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {filterListOptions.map((filterListOption) => (
              <MenuItem
                key={filterListOption}
                id={filterListOption}
                onClick={handleFilterListClose}
              >
                {capitalize(filterListOption)}
              </MenuItem>
            ))}
          </Menu>

          <Button color="primary" variant="contained" onClick={searchList}>
            Search
          </Button>
        </div>
      )}

      <br />

      {loading && (
        <div className={classes.load}>
          <br />
          <CircularProgress size={100} />
        </div>
      )}

      {speechesToDisplay != null && <SpeechList speeches={speechesToDisplay} />}
    </Layout>
  );
};

export default Search;
