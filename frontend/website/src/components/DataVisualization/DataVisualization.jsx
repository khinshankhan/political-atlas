import React, { useState, useEffect } from "react";

import BarChart from "./BarChart";

import { ibmMap, daMap } from "src/utils/emotions";

const DataVisualization = ({ ibm, da }) => {
  const [dataIbm, setIbm] = useState(null);
  const [dataDa, setDa] = useState(null);

  useEffect(() => {
    if (ibm && Object.keys(ibm).length !== 0) {
      setIbm(ibm);
    }
  }, [ibm]);

  useEffect(() => {
    if (da && Object.keys(da).length !== 0) {
      console.log({ daMap });
      setDa(
        da.response.map((daObj) => {
          if (daMap[daObj.emotion] == null) {
            console.log(daObj.emotion);
          }
          return {
            ...daObj,
            emotion: daMap[daObj.emotion],
          };
        })
      );
    }
  }, [da]);

  return (
    <>
      <BarChart ibm={dataIbm} da={dataDa} />
    </>
  );
};

export default DataVisualization;
