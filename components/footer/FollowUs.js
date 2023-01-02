import React from "react";
import { Grid, Typography, useMediaQuery } from "@mui/material";
import FollowLink from "./FollowLink";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import { makeStyles, useTheme } from "@mui/styles";
import { FOLLOW_US_TEXT, FOLLOW_US_TITLE } from "../../data/footer/data";

const FollowUs = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid
      item
      xs={12}
      sm={4}
      container
      justifyContent={isDesktop ? "flex-end" : "center"}
    >
      <Typography className={classes.headerStyle}>{FOLLOW_US_TITLE}</Typography>
      <Typography
        className={classes.ccrt__follow__us__text}
        style={{ textAlign: isDesktop ? "right" : "center" }}
      >
        {FOLLOW_US_TEXT}
      </Typography>
      <Grid container justifyContent={isDesktop ? "flex-end" : "center"}>
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

const useStyles = makeStyles((theme) => ({
  ccrt__follow__us__text: {
    marginBottom: "20px",
    fontSize: "90%",
    color: theme.palette.custom.BLACK,
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
  headerStyle: {
    color: theme.palette.custom.BLACK,
    fontWeight: "bold",
    fontSize: "130%",
    textTransform: "capitalize",
  },
}));
export default FollowUs;
