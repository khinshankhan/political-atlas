import React from "react";
import { Link } from "gatsby";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
});

const SpeechCard = ({ speech }) => {
  const classes = useStyles();

  const speechLink = makeSpeechLink(speech.id);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {speech.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {speech.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.right}>
        <Button size="small" color="primary">
          Share
        </Button>
        <Link to={speechLink}>
          <Button size="small" color="primary">
            View Speech
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SpeechCard;
