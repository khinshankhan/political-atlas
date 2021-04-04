import React, { useState, useEffect } from "react";
import { useQueryParam, NumberParam } from "use-query-params";

import Typography from "@material-ui/core/Typography";

import { getSpeechMeta, getIbmAnalysis, getDaAnalysis } from "src/api/Server";

import Layout from "src/components/Layout";
import Video from "src/components/Video";
import Legend from "src/components/Legend";
import DataVisualization from "src/components/DataVisualization";
import EmotionCaptions from "src/components/EmotionCaptions";

const Speech = () => {
  const [id] = useQueryParam("id", NumberParam);
  const [validId] = useState(id != null && !Number.isNaN(id));
  const [speechMeta, setSpeechMeta] = useState(null);
  const [ibm, setIBM] = useState(null);
  const [da, setDA] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const fetchedSpeechMeta = await getSpeechMeta(id);
      setSpeechMeta(fetchedSpeechMeta);
      // TODO: split up other api calls into use effects relying on speechMetaData change
      const fetchedDa = await getDaAnalysis(id);
      setDA(fetchedDa);
    };

    if (validId) {
      setup();
    }
  }, [validId, id]);

  useEffect(() => {
    const setup = async () => {
      const ibm = await getIbmAnalysis(id);
      setIBM(ibm);
    };

    if (validId && speechMeta != null) {
      // TODO: setup conditional loading for each type of data needed for visualization
      setup();
    }
  }, [id, validId, speechMeta]);

  if (!validId) {
    return (
      <Layout>
        <center>Invalid or no id provided.</center>
      </Layout>
    );
  }

  // TODO: add case for failed fetch
  if (speechMeta == null) {
    return <Layout>Loading.</Layout>;
  }

  return (
    <Layout>
      <br />
      <Typography variant="h4" gutterBottom>
        {speechMeta.title}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {speechMeta.description}
      </Typography>
      <center>
        {/* TODO: conditionally show audio when video is missing */}
        <Video src={speechMeta.video_link} />
        <br />
        <Legend />
        <br />
        <DataVisualization ibm={ibm} da={da} />
      </center>
      {ibm != null && <EmotionCaptions sentences={ibm.sentences_tone} />}
    </Layout>
  );
};

export default Speech;
