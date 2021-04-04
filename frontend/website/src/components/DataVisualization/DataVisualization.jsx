import React from "react";

import BarChart from "./BarChart";

const DataVisualization = ({ ibm, da }) => {
  return (
    <>
      <BarChart ibm={ibm} da={da} />
    </>
  );
};

export default DataVisualization;
