import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: "gray",
  },
}));

const Footer = ({ buttons, links }) => {
  const classes = useStyles();

  return <div className={classes.root}>Footer</div>;
};

export default Footer;
