import React from "react";

import Layout from "src/components/Layout";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  card: {

  },
  media: {
    height: 400
  }
});


const About = () => {
  const classes = useStyles()

  return <Layout>
    <Typography gutterBottom variant="h5" component="h2" align="center">
      Team Members
          </Typography>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardActionArea href="https://github.com/adeeburrahman" target="_blank">
            <CardMedia className={classes.media}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Adeebur Rahman
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Backend
          </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" href="https://github.com/adeeburrahman" target="_blank">
              Github
        </Button>
          </CardActions>
        </Card>

      </Grid>
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardActionArea href="https://github.com/BrianCheung1" target="_blank">
            <CardMedia className={classes.media}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Brian Cheung
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Backend
          </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" href="https://github.com/BrianCheung1" target="_blank">
              Github
        </Button>

          </CardActions>
        </Card>

      </Grid>
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardActionArea href="https://github.com/kkhan01" target="_blank">
            <CardMedia className={classes.media}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Khinshan Khan
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Frontend
          </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" href="https://github.com/kkhan01" target="_blank">
              Github
        </Button>

          </CardActions>
        </Card>

      </Grid>
      <Grid item xs={6}>
        <Card className={classes.card}>
          <CardActionArea href="https://github.com/TalhaR" target="_blank">
            <CardMedia className={classes.media}
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Talha Rahman
          </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Backend
          </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" href="https://github.com/TalhaR" target="_blank">
              Github
        </Button>

          </CardActions>
        </Card>
      </Grid>
    </Grid>
  </Layout>;
};

export default About;
