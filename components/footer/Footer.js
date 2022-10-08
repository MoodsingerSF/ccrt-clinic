import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import UsefulLinks from "./UsefulLinks";
import FollowUs from "./FollowUs";
import { COPY_RIGHT } from "../../data/footer/data";
import classNames from "classnames";
import MiddleSection from "./MiddleSection";

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid
      container
      justifyContent={"center"}
      alignItems="center"
      className={classNames({
        [classes.ccrt__footer__container__mobile]: !matches,
        [classes.ccrt__footer__container__desktop]: matches,
      })}
    >
      <Grid container style={{ width: "95%" }}>
        <Grid container spacing={2} style={{ marginTop: 10 }}>
          <UsefulLinks />
          <MiddleSection />
          <FollowUs />
        </Grid>
        <Grid
          container
          className={classes.ccrt__footer__bottom__divider}
        ></Grid>
        <Grid container justifyContent="center" alignItems="center">
          <Typography className={classes.ccrt__footer__rights}>
            {COPY_RIGHT}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  ccrt__footer__container__mobile: {
    background: theme.palette.custom.FOOTER_BG,
    // padding: "0 30px",
  },
  ccrt__footer__container__desktop: {
    background: theme.palette.custom.FOOTER_BG,
    // padding: "0 80px",
  },
  ccrt__footer__bottom__divider: {
    borderBottom: `1px solid ${theme.palette.custom.BLACK}`,
    marginTop: "10px",
  },
  ccrt__footer__rights: {
    margin: "10px 0",
    fontSize: "80%",
    fontWeight: "500",
    color: theme.palette.custom.BLACK,
  },
}));

export default Footer;
