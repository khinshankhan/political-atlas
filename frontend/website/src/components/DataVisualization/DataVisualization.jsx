import React from "react";

import BarChart from "./BarChart";

import { uniformDaData, uniformIbmData } from "src/utils/dataTransformations";

const DataVisualization = ({ ibm, da }) => {
  return (
    <>
      <BarChart ibm={uniformIbmData(ibm)} da={uniformDaData(da)} />
    </>
  );
};

export default DataVisualization;
