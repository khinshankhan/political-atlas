import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/core/Pagination";
import Stack from "@material-ui/core/Stack";

import { validNumberString } from "src/utils/utils";

const PaginationBar = ({ pages, pageNum, setPage }) => {
  const [searchPage, setSearchPage] = useState(pageNum);

  useEffect(() => {
    const delayedSearchPageUpdate = setTimeout(() => {
      if (searchPage === "") {
        return;
      }

      if (searchPage > 0 && searchPage <= pages.length) {
        setPage(+searchPage);
      }
    }, 750);

    return () => clearTimeout(delayedSearchPageUpdate);
  }, [searchPage, setPage, pages]);

  if (pages.length === 0) {
    return <></>;
  }

  const handlePaginationChange = (_event, value) => {
    if (value == null) {
      return;
    }

    setPage(value);
    setSearchPage(value.toString());
  };

  const handlePageChange = (event) => {
    if (event.target.value === "" || validNumberString(event.target.value)) {
      setSearchPage(event.target.value);
    }
  };

  return (
    <Stack spacing={2} alignItems="center">
      <Typography>
        Page:
        <input
          type="text"
          id="counter"
          className="form-inline"
          placeholder="#"
          size={1}
          onChange={handlePageChange}
          value={searchPage}
        />
        / {pages.length}
      </Typography>
      <Pagination
        count={pages.length}
        page={pageNum}
        onChange={handlePaginationChange}
      />
    </Stack>
  );
};

export default PaginationBar;
