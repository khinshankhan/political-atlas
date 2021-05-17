import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";

import SpeechCard from "./SpeechCard";
import PaginationBar from "./PaginationBar";

import { chunker } from "src/utils/utils";

const SpeechList = ({ speeches }) => {
  const chunks = chunker(10, speeches);
  const [page, setPage] = useState(1);

  if (speeches == null || speeches.length === 0) {
    return "No speeches found!";
  }

  return (
    <>
      <Typography>
        Showing speeches {(page - 1) * 10 + 1}-
        {page * 10 < speeches.length ? page * 10 : speeches.length} of{" "}
        {speeches.length}
      </Typography>

      {chunks.length > 0 &&
        chunks[page - 1].map((speech, i) => (
          <div key={i}>
            <SpeechCard speech={speech} /> <br />
          </div>
        ))}

      <PaginationBar pages={chunks} pageNum={page} setPage={setPage} />
    </>
  );
};

export default SpeechList;
