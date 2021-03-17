import React, { useState, useEffect } from "react";
import { useQueryParam, NumberParam } from "use-query-params";

import { getSpeechMeta } from "src/api/Server";

import Layout from "src/components/Layout";

const Speech = () => {
  const [id] = useQueryParam("id", NumberParam);
  const [validId] = useState(id != null && !Number.isNaN(id));
  const [speechMeta, setSpeechMeta] = useState(null);

  useEffect(() => {
    const setup = async () => {
      const fetchedSpeechMeta = await getSpeechMeta(id);
      setSpeechMeta((prev) => fetchedSpeechMeta);
      // TODO: split up other api calls into use effects relying on speechMetaData change
    };

    if (validId) {
      setup();
    }
  }, [validId, id]);

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
      <center>
        [title]
        <br />
        [description]
        <br />
        [video]
        <br />
        [legend]
        <br />
        [charts]
        <br />
        [text with emotions]
      </center>
    </Layout>
  );
};

export default Speech;
