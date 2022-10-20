import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { createStyles, makeStyles, useTheme } from "@mui/styles";
import Image from "next/image";
import hero from "../../../public/image/home-page/hero/Cover.png";
import HotlineSection from "./HotlineSection";
import HeroRightSection from "./HeroRightSection";
import {
  APP_BAR_HEIGHT,
  HERO_SECTION_HEIGHT,
  HERO_SECTION_HEIGHT_MOBILE,
} from "../../../misc/constants";

const Hero = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <Grid
        container
        className={classes.ccrt__hero__section}
        style={{
          height: isDesktop ? HERO_SECTION_HEIGHT : HERO_SECTION_HEIGHT_MOBILE,
          ...(isDesktop
            ? {}
            : {
                background: `linear-gradient(to right,rgba(255,255,255,.5),rgba(255,255,255,.5)),url(/image/home-page/hero/Cover.png)`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }),
        }}
      >
        <Grid container>
          {isDesktop && (
            <Grid
              item
              xs={12}
              sm={6}
              className={classes.ccrt__hero__section__left__container}
            >
              <Image src={hero} alt="hero" layout="fill" objectFit="cover" />
            </Grid>
          )}
          <Grid
            item
            xs={12}
            sm={6}
            flexDirection={"column"}
            alignItems="flex-end"
            style={{
              paddingRight: "2.5vw",
            }}
          >
            <HeroRightSection />
          </Grid>
          <HotlineSection />
        </Grid>
      </Grid>
    </>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    ccrt__hero__section: {
      paddingTop: APP_BAR_HEIGHT,
      position: "relative",
    },
    ccrt__hero__section__left__container: {
      position: "relative",
    },
  })
);

export default Hero;
