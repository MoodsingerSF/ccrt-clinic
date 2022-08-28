import React from "react";
import { Grid } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Image from "next/image";
import hero from "../../../public/image/home-page/hero/Cover.png";
import HotlineSection from "./HotlineSection";
import HeroRighttSection from "./HeroRighttSection";

const Hero = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.ccrt__hero__section}>
      <Grid
        item
        xs={6}
        className={classes.ccrt__hero__section__left__container}
      >
        <Image src={hero} alt="hero" layout="fill" objectFit="cover" />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={6}
        flexDirection={"column"}
        alignItems="flex-end"
        style={{ paddingRight: "50px" }}
      >
        <HeroRighttSection />
      </Grid>
      <HotlineSection />
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__hero__section: {
      marginTop: "12vh",
      minHeight: "100vh",
      position: "relative",
    },
    ccrt__hero__section__left__container: {
      height: "88vh",
      position: "relative",
    },
  })
);

export default Hero;
