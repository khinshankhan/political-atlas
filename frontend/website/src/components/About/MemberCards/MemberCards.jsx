import React from "react";

import Grid from "@material-ui/core/Grid";

import { group } from "../constants";
import MemberCard from "./MemberCard";

const MemberCards = () => {
  return (
    <>
      <Grid container spacing={3}>
        {group.map((member, index) => (
          <Grid key={index} item xs={6} sm={3}>
            <MemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MemberCards;
