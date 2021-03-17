import React from "react";
import { useQueryParam, StringParam } from "use-query-params";

import Layout from "src/components/Layout";

const Speech = () => {
  const [id] = useQueryParam("id", StringParam);

  if (id == null) {
    return <Layout>bad id</Layout>;
  }

  return <Layout>Speech {id}</Layout>;
};

export default Speech;
