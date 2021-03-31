import React from "react";

import Layout from "src/components/Layout";
import MemberCard from "../components/About/MemberCard";
import { group } from "../components/About/constants";

import { makeStyles } from "@material-ui/core/styles";
import { Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles({
    container: {
        justifyContent: "center",
    },
    content: {
        textAlign: "center",
    },
});

const About = () => {
    const classes = useStyles();

    const getMembers = (group) => {
        return group.map((member) => {
            return <MemberCard {...member} />;
        });
    };

    return (
        <Layout>
            <Grid container className={classes.container}>
                <Grid
                    item
                    className={classes.content}
                    xs={12}
                    sm={10}
                    md={8}
                    component="section"
                >
                    <Typography variant="h1">About</Typography>
                    <br />

                    <Typography variant="h3" component="h2" > Background </Typography>
                    <Typography style={{ padding: "10px" }} variant="body1">
                        We are a group of 4 students at Hunter College that
                        wanted to contribute positively to political discord. We
                        noticed that as of late that political discourse was
                        lacking. Many people are losing trust in our instiutions
                        and officials so we wanted to create a resource to help
                        the American electorate.
                    </Typography>
                    <br />

                    <Typography variant="h3" component="h2"> Goal </Typography>
                    <Typography style={{ padding: "10px" }} variant="body1">
                        Better the understanding of rhetoric used by politicians
                        through a comprehensive analysis of the tones in their
                        speeches.
                    </Typography>
                    <br />
                </Grid>
                <br />
            </Grid>

            <Grid
                container
                className={classes.container}
                style={{ paddingBottom: "10px" }}
                spacing={2}
            >
                <Grid item className={classes.content} xs={12}>
                    <Typography variant="h3" component="h2">Team Members</Typography>
                </Grid>
                {getMembers(group)}
            </Grid>
        </Layout>
    );
};

export default About;
