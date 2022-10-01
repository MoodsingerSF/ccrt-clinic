import React from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Image from "next/image";
import hero from "../../../public/image/home-page/hero/Cover.png";
import HotlineSection from "./HotlineSection";
import HeroRightSection from "./HeroRightSection";
import HeroMobile from "../../pages/home/HeroMobile";

const Hero = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      {matches ? (
        <Grid container className={classes.ccrt__hero__section}>
          <Grid container>
            <Grid
              item
              xs={6}
              className={classes.ccrt__hero__section__left__container}
            >
              <Image src={hero} alt="hero" layout="fill" objectFit="cover" />
            </Grid>
            <Grid
              // container
              item
              xs={12}
              sm={6}
              flexDirection={"column"}
              alignItems="flex-end"
              style={{ paddingRight: "2.5vw" }}
            >
              <HeroRightSection />
            </Grid>
            <HotlineSection />
          </Grid>
        </Grid>
      ) : (
        <HeroMobile />
      )}
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__hero__section: {
      paddingTop: "12vh",
      minHeight: "100vh",
      position: "relative",
    },
    ccrt__hero__section__left__container: {
      // height: "100vh",
      position: "relative",
    },
  })
);

export default Hero;
