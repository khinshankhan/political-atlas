import React, { useState } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

import BarChart from "./BarChart";
import PieChart from "./PieChart";
import TreeMap from "./TreeMap";

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
  error: {
    color: "rgb(220, 0, 78)",
  },
}));

const Visualization = ({ type, ...props }) =>
  ({
    "Bar Chart": <BarChart {...props} />,
    "Pie Chart": <PieChart {...props} />,
    "Tree Map": <TreeMap {...props} />,
  }[type]);

const DataVisualization = ({ ibm, da }) => {
  const classes = useStyles();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const down400 = useMediaQuery("(max-width:400px)");
  const down300 = useMediaQuery("(max-width:300px)");

  let baseWidth = 600;
  let baseHeight = 300;

  if (downSm) {
    baseWidth = 400;
  }
  if (down400) {
    baseWidth = 300;
  }
  if (down300) {
    baseWidth = 200;
  }

  const charts = ["Bar Chart", "Pie Chart", "Tree Map"];

  const [vizType, setVizType] = useState(charts[0]);

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
        <Visualization
          type={vizType}
          ibm={ibm}
          da={da}
          baseWidth={baseWidth}
          baseHeight={baseHeight}
        />

        {ibm == null && (
          <span className={classes.error}>
            IBM analysis is currently unavailable. <br />
          </span>
        )}
        {da == null && (
          <span className={classes.error}>
            DeepAffects analysis is currently unavailable. <br />
          </span>
        )}
      </div>
    </>
  );
};

export default DataVisualization;
