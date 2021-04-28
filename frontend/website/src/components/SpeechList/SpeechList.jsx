import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/core/Pagination";
import Stack from "@material-ui/core/Stack";

import SpeechCard from "./SpeechCard";

import { chunker } from "src/utils/utils";

const SpeechList = ({ speeches }) => {
  const chunks = chunker(10, speeches);
  const [page, setPage] = useState(1);

  if (speeches == null || speeches.length === 0) {
    return "No speeches found!";
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Typography>
        Showing speeches {(page - 1) * 10 + 1}-
        {page * 10 < speeches.length ? page * 10 : speeches.length} of{" "}
        {speeches.length}
      </Typography>
      {chunks[page - 1].map((speech, i) => (
        <div key={i}>
          <SpeechCard speech={speech} /> <br />
        </div>
      ))}

      <Stack spacing={2} alignItems="center">
        <Typography>Page: {page}</Typography>
        <Pagination count={chunks.length} page={page} onChange={handleChange} />
      </Stack>
    </>
  );
};

export default SpeechList;
