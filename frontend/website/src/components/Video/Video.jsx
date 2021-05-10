import React from "react";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// TODO: make video size proportional to screen size
// TODO: add hooks for getting timestamps
const Video = ({ src }) => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));
  const down500 = useMediaQuery("(max-width:500px)");
  const down400 = useMediaQuery("(max-width:400px)");

  let videoDimensions = [900, 450];
  if (downMd) {
    videoDimensions = [600, 300];
  }
  if (downSm) {
    videoDimensions = [400, 200];
  }
  if (down500) {
    videoDimensions = [350, 150];
  }
  if (down400) {
    videoDimensions = [275, 150];
  }

  return (
    <video width={videoDimensions[0]} height={videoDimensions[1]} controls>
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
