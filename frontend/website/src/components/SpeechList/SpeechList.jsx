import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/core/Pagination";
import Stack from "@material-ui/core/Stack";

import SpeechCard from "./SpeechCard";

import { chunker, validNumberString } from "src/utils/utils";

const SpeechList = ({ speeches }) => {
  const chunks = chunker(10, speeches);
  const [page, setPage] = useState(1);

  if (speeches == null || speeches.length === 0) {
    return "No speeches found!";
  }

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  const handlePageChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setPage(1);
    }

    if (
      validNumberString(e.target.value) &&
      +e.target.value > 0 &&
      +e.target.value <= chunks.length
    ) {
      setPage(+e.target.value);
    }
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
        <Typography>
          Page:
          <input
            type="text"
            id="counter"
            className="form-inline"
            placeholder="#"
            value={page}
            size={speeches.length.toString.length}
            onChange={handlePageChange}
          />
          / {chunks.length}
        </Typography>
        <Pagination
          count={chunks.length}
          page={page}
          onChange={handlePaginationChange}
        />
      </Stack>
    </>
  );
};

export default SpeechList;
