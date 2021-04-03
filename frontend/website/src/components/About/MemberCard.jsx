import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
    media: {},
    card: {},
    actions: {
        justifyContent: "center",
    },
});

function MemberCard({ name, link, pic }) {
    const classes = useStyles();

    return (
        <Grid item xs={10} sm={5} md={3}>
            <Card className={classes.card}>
                <CardActionArea
                    href={`https://github.com/${link}`}
                    target="_blank"
                >
                    <CardMedia
                        className={classes.media}
                        component="img"
                        alt={`Picture of ${name}`}
                        // image="https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png"
                        image={pic}
                        title={`Picture of ${name}`}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" align="center">
                            {name}
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
        </Grid>
    );
}

export default MemberCard;
