import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

import BarChart from "./BarChart";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  center: {
    textAlign: "center",
  },
}));

const DataVisualization = ({ ibm, da }) => {
  const classes = useStyles();
  const charts = ["Bar Chart"];

  const [vizType, setVizType] = React.useState(charts[0]);

  const handleChange = (e) => {
    setVizType(e.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <NativeSelect
          className={classes.selectEmpty}
          value={vizType}
          name="Visualization Chart"
          onChange={handleChange}
        >
          {charts.map((chart) => (
            <option key={chart} value={chart}>
              {chart}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <br />

      <div aria-label={"Data Visualization"} className={classes.center}>
        <BarChart ibm={ibm} da={da} />
      </div>
    </>
  );
};

export default DataVisualization;
