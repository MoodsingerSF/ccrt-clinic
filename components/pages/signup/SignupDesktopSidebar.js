import React from "react";
import Image from "next/image";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { SUBTITLE, TITLE } from "../../../data/signup/data";
import logo from "../../../public/image/logo/logo.png";
import classNames from "classnames";
import { makeStyles } from "@mui/styles";

const SignupDesktopSidebar = () => {
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));
  const matchesLG = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Grid
      container
      item
      md={4}
      alignItems="flex-start"
      justifyContent={"center"}
      className={classNames({
        [classes.ccrt__signup__left__Sm]: matches,
        [classes.ccrt__signup__left__Md]: matchesMD,
        [classes.ccrt__signup__left__Lg]: matchesLG,
      })}
    >
      <Image src={logo} alt="ccrt logo" />
      <Grid
        container
        className={classNames({
          [classes.ccrt__signup__left__desc__Sm]: matches,
        })}
      >
        <Typography className={classes.ccrt__signup__left__title}>
          {TITLE}
        </Typography>
        <Typography className={classes.ccrt__signup__left__subtitle}>
          {SUBTITLE}
        </Typography>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__signup__left__Sm: {
    padding: "20px 10px",
  },
  ccrt__signup__left__Md: {
    padding: "30px 20px",
  },
  ccrt__signup__left__Lg: {
    padding: "30px 20px",
  },
  ccrt__signup__left__title: {
    color: "white",
    textAlign: "center",
    fontSize: "130%",
    fontWeight: "bold",
  },
  ccrt__signup__left__subtitle: {
    color: "white",
    fontSize: "80%",
    textAlign: "justify",
    fontWeight: 500,
  },
  ccrt__signup__left__desc__Sm: {
    display: "block",
    marginTop: 30,
  },
});

export default SignupDesktopSidebar;
