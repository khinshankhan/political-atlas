import React from "react";

import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
  const buttons = ["Home", "About"];
  const links = ["/", "/about"];

  // TODO: create mobile navbar and add in conditional rendering
  return <DesktopNavbar buttons={buttons} links={links} />;
};

export default Navbar;
