import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";

const DataVisualization = ({ ibm, da }) => {
  console.log({ ibm, da });
  return (
    <>
      <BarChart ibm={ibm} da={da} />
    </>
  );
};

export default DataVisualization;
