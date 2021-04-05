import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  center: {
    textAlign: "center",
  },
  actions: {
    justifyContent: "center",
  },
});

const MemberCard = ({ member }) => {
  const classes = useStyles();

  const { name, link, description } = member;

  return (
    <Card className={classes.card}>
      <CardActionArea href={`https://github.com/${link}`} target="_blank">
        <CardMedia
          className={classes.media}
          component="img"
          alt={`Picture of ${name}`}
          image={`https://github.com/${link}.png`}
          title={`Picture of ${name}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" align="center">
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className={classes.center}
          >
            "{description}"
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.actions}>
        <Button
          size="small"
          color="primary"
          href={`https://github.com/${link}`}
          target="_blank"
        >
          Github
        </Button>
      </CardActions>
    </Card>
  );
};

export default MemberCard;
