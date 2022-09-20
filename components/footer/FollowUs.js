import React from "react";
import { Grid, Typography } from "@mui/material";
import FollowLink from "./FollowLink";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { makeStyles } from "@mui/styles";
import { FOLLOW_US_TEXT, FOLLOW_US_TITLE } from "../../data/footer/data";

const FollowUs = () => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={4} container justifyContent="flex-end">
      <h3>{FOLLOW_US_TITLE}</h3>
      <Typography className={classes.ccrt__follow__us__text}>
        {FOLLOW_US_TEXT}
      </Typography>
      <Grid container justifyContent="flex-end">
        <FollowLink
          link="#"
          icon={<FacebookIcon fontSize="medium" />}
          className={classes.ccrt__follow__fac}
        />
        <FollowLink
          link="#"
          icon={<InstagramIcon fontSize="medium" />}
          className={classes.ccrt__follow__ins}
        />
        <FollowLink
          link="#"
          icon={<YouTubeIcon fontSize="medium" />}
          className={classes.ccrt__follow__you}
        />
        <FollowLink
          link="#"
          icon={<TwitterIcon fontSize="medium" />}
          className={classes.ccrt__follow__twi}
        />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__follow__us__text: {
    marginBottom: "20px",
    textAlign: "right",
  },
  ccrt__follow__fac: {
    background: "#3d5a96",
    transition: "transform 0.12s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  ccrt__follow__ins: {
    background: "linear-gradient(180deg,#7024c4,#e09b3d)",
    transition: "transform 0.12s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  ccrt__follow__you: {
    background: "#f52929",
    transition: "transform 0.12s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  ccrt__follow__twi: {
    background: "#1ebef0",
    transition: "transform 0.12s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
}));
export default FollowUs;
