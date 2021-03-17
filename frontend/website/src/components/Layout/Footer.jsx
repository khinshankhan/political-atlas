import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "gray",
    textAlign: "center",
    color: "white",
  },
  nolink: {
    color: "white",
  },
}));

const Footer = ({ buttons, links }) => {
  const classes = useStyles();

  const startYear = 2021;
  const currentYear = new Date().getFullYear();

  return (
    <div className={classes.root}>
      <a
        href="https://github.com/kkhan01/political-atlas/blob/main/LICENSE"
        target="_blank"
        rel="noreferrer"
        className={classes.nolink}
      >
        Political Atlas &copy; {startYear} {currentYear !== startYear && `- ${currentYear}`}
      </a>
    </div>
  );
};

export default Footer;
