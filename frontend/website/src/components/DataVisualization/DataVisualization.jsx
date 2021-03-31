import React, { useState, useEffect } from "react";
import BarChart from "./BarChart";

const DataVisualization = ({ ibm, da }) => {
  const [dataIBM, setIBM] = useState(null);
  const [dataDA, setDA] = useState(null);

  useEffect(() => {
    if (ibm) {
      const temp = ibm.sentences_tone.reduce((stored, current) =>{
        const tones = current.tones;
        if (tones === []) return stored;
        const emotions = tones.reduce((innerstored, innercurrent) => {
          const emotion = innercurrent.tone_id;
          return [...innerstored, emotion];
        }, []);
        return [...stored, ...emotions];
      }, [])
      const cleanedData = temp.reduce((stored, current) => {
        return {...stored, [current]: (stored[current] + 1) || 1};
      }, {});
      const dataIBM = Object.entries(cleanedData).map(([emotion, value]) => ({
        emotion,
        value,
      }));
      setIBM(dataIBM);
    }
  }, [ibm]);

  useEffect(() => {
    if (da) {
      const cleanedData = da.response.reduce((stored, current) => {
        const emotion = current.emotion;
        if (emotion === "neutral") return stored;
        return { ...stored, [emotion]: stored[emotion] + 1 || 1 };
      }, {});

      const dataDA = Object.entries(cleanedData).map(([emotion, value]) => ({
        emotion,
        value,
      }));
      setDA(dataDA);
    }
  }, [da]);

  return <>
           {dataIBM != null && <BarChart data={dataIBM} />}
           {dataDA != null && <BarChart data={dataDA} />}
         </>;
};

export default DataVisualization;
