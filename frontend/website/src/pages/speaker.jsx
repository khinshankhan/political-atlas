import React, { useState, useEffect } from "react";
import { useQueryParam, StringParam } from "use-query-params";

import Typography from "@material-ui/core/Typography";

import { getSpeakerAnalytics } from "src/api/Server";
import { uniformDaData, uniformIbmData } from "src/utils/dataTransformations";

import Layout from "src/components/Layout";
import DataVisualization from "src/components/DataVisualization";
import SpeechList from "src/components/SpeechList";

const Speech = () => {
  const [speaker] = useQueryParam("speaker", StringParam);
  const [data, setData] = useState(false);
  const [speeches, setSpeeches] = useState(null);
  const [ibm, setIbm] = useState(null);
  const [da, setDa] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const fetchedData = await getSpeakerAnalytics(speaker);
      // TODO: better handle this
      if (fetchedData == null) {
        return;
      }

      const {
        speeches: fetchedSpeeches,
        ibm: fetchedIbm,
        deepaffects: fetchedDa,
      } = fetchedData;

      setIbm(
        fetchedIbm.map(uniformIbmData).reduce(
          (stored, current) => {
            return {
              ...stored,
              sentences_tone: [
                ...stored.sentences_tone,
                ...current.sentences_tone,
              ],
            };
          },
          { sentences_tone: [] }
        )
      );
      setDa(fetchedDa.map(uniformDaData).flat());

      setSpeeches(fetchedSpeeches);

      setData(true);
    };

    if (speaker != null && speaker !== "") {
      setup();
    }
  }, [speaker, setData]);

  console.log({ speeches, ibm, da });

  if (speaker == null || speaker === "") {
    return (
      <Layout>
        <center>Invalid or no speaker provided.</center>
      </Layout>
    );
  }

  // TODO: add case for failed fetch
  if (data === false) {
    return <Layout>Loading.</Layout>;
  }

  return (
    <Layout title={`${speaker} Analytics`}>
      <Typography variant="h5" gutterBottom>
        Aggregation Across Speeches Data Visualization
      </Typography>
      <DataVisualization ibm={ibm} da={da} />
      <Typography variant="h5" gutterBottom>
        Speeches
      </Typography>
      {speeches != null && <SpeechList speeches={speeches} />}
    </Layout>
  );
};

export default Speech;
