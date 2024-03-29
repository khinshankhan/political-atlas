import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import { useQueryParam, NumberParam } from "use-query-params";

import Typography from "@material-ui/core/Typography";

import { getSpeechMeta, getIbmAnalysis, getDaAnalysis } from "src/api/Server";
import { uniformDaData, uniformIbmData } from "src/utils/dataTransformations";

import Layout from "src/components/Layout";
import Video from "src/components/Video";
import Legend from "src/components/Legend";
import DataVisualization from "src/components/DataVisualization";
import EmotionCaptions from "src/components/EmotionCaptions";

const Speech = () => {
  const [id] = useQueryParam("id", NumberParam);
  const [validId] = useState(id != null && !Number.isNaN(id));
  const [speechMeta, setSpeechMeta] = useState(null);
  const [ibm, setIbm] = useState(null);
  const [da, setDa] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const fetchedSpeechMeta = await getSpeechMeta(id);
      setSpeechMeta(fetchedSpeechMeta);
      // TODO: split up other api calls into use effects relying on speechMetaData change
      const fetchedDa = await getDaAnalysis(id);
      setDa(uniformDaData(fetchedDa));
    };

    if (validId) {
      setup();
    }
  }, [validId, id]);

  useEffect(() => {
    const setup = async () => {
      const fetchedIbm = await getIbmAnalysis(id);
      setIbm(uniformIbmData(fetchedIbm));
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
    <Layout title={speechMeta.title}>
      <Typography variant="h5" gutterBottom>
        Speaker
      </Typography>
      <Typography variant="body1" gutterBottom>
        <Link to={`/speaker?speaker=${speechMeta.politician}`}>
          {speechMeta.politician}
        </Link>
      </Typography>

      <Typography variant="h5" gutterBottom>
        Description
      </Typography>
      <Typography variant="body1" gutterBottom>
        {speechMeta.description}
      </Typography>

      {/* TODO: conditionally show audio when video is missing */}
      <Typography variant="h5" gutterBottom>
        Speech Video
      </Typography>
      <center>
        <Video src={speechMeta.video_link} />
      </center>

      <br />

      <Typography variant="h5" gutterBottom>
        Data Visualization
      </Typography>
      <DataVisualization ibm={ibm} da={da} />

      <br />

      <Typography variant="h5" gutterBottom>
        Legend
      </Typography>
      <Legend />

      <br />

      {/* TODO: allow for speech meta decription when ibm analysis is missing */}
      <Typography variant="h5" gutterBottom>
        Transcript
      </Typography>
      <EmotionCaptions ibm={ibm} transcript={speechMeta.transcript} />
    </Layout>
  );
};

export default Speech;
