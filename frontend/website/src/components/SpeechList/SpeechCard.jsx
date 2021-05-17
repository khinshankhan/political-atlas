import React, { useState, useEffect } from "react";
import { Link } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { copy } from "src/utils/utils";
import { makeSpeechLink } from "./utils";

const useStyles = makeStyles({
  root: {
    maxWidth: 1440,
  },
  media: {
    height: 140,
  },
  right: {
    float: "right",
  },
  hideLink: {
    textDecoration: "none",
  },
});

const defaultTooltipMessage = "Copy Link";

const SpeechCard = ({ speech }) => {
  const classes = useStyles();

  const [tooltipMessage, setTooltipMessage] = useState(defaultTooltipMessage);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTooltipMessage(defaultTooltipMessage);
    }, 500);
    return () => clearTimeout(timer);
  }, [tooltipMessage]);

  const speechLink = makeSpeechLink(speech.id);
  // NOTE: assume there is no weird masking of links
  // and the current page appears as `/` after baselink
  const baseLink = (typeof window !== "undefined"
    ? window.location.href
    : "/"
  ).slice(0, -1);

  const copySpeechLink = async () => {
    const newTooltipMessage = await copy(baseLink + speechLink);
    setTooltipMessage(newTooltipMessage);
  };

  return (
    <Card className={classes.root}>
      <Link to={speechLink} className={classes.hideLink}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {speech.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Speaker:{" "}
              <Link to={`/speaker?speaker=${speech.politician}`}>
                {speech.politician}
              </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {speech.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions className={classes.right}>
        <Tooltip title={tooltipMessage}>
          <Button size="small" color="primary" onClick={copySpeechLink}>
            Share
          </Button>
        </Tooltip>
        <Link to={speechLink} className={classes.hideLink}>
          <Button size="small" color="primary">
            View Speech
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SpeechCard;
