import React from "react";
import { Link } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import logo from "src/assets/logo.png";

const useStyles = makeStyles((theme) => ({
  navButton: {
    color: "white",
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    // based off appbar's min height
    // https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/styles/createMixins.js
    maxHeight: 56,
    [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
      maxHeight: 48,
    },
    [theme.breakpoints.up("sm")]: {
      maxHeight: 64,
    },
  },
}));

const DesktopNavbar = ({ buttons, links }) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* assume home is always 0th key */}
        <Link to={links[0]}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>
        <div className={classes.title} />
        {buttons.map((button, index) => (
          <Link to={links[index]} key={index}>
            <Button color="default" className={classes.navButton}>
              {button}
            </Button>
          </Link>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default DesktopNavbar;
