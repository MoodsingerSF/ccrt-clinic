import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import bg from "../../../public/image/home-page/donate/bg.png";
import sponsor from "../../../public/image/home-page/donate/sponsor.png";
import { makeStyles, createStyles } from "@mui/styles";

const Sponsor = () => {
  const classes = useStyes();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__sponsor__section}
    >
      <Image src={bg} alt="bg" layout="fill" objectFit="cover" />
      <Grid container>
        <Grid
          item
          xs={12}
          sm={7}
          className={classes.ccrt__sponsor__description}
        >
          <Typography
            className={classes.ccrt__sponsor__description__first}
            style={{}}
          >
            Be the part
          </Typography>
          <Typography className={classes.ccrt__sponsor__description__first}>
            of a
          </Typography>
          <Typography className={classes.ccrt__sponsor__description__second}>
            noble
          </Typography>
          <Typography className={classes.ccrt__sponsor__description__second}>
            cause
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
          container
          justifyContent="center"
          alignItems="center"
          className={classes.ccrt__sponsor__button__wrapper}
        >
          <Grid container className={classes.ccrt__sponsor__button}>
            <Image
              src={sponsor}
              alt="sponsor"
              layout="fill"
              objectFit="contain"
              style={{
                cursor: "pointer",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyes = makeStyles((theme) =>
  createStyles({
    ccrt__sponsor__section: {
      position: "relative",
      marginTop: "30px",
      minHeight: "50vh",
    },
    ccrt__sponsor__description: {
      zIndex: "99",
      display: "flex",
      flexDirection: "column",
      textAlign: "right",
    },
    ccrt__sponsor__description__first: {
      color: "#737576",
      textTransform: "uppercase",
      fontSize: "250%",
      fontWeight: "900",
      lineHeight: "1.5",
    },
    ccrt__sponsor__description__second: {
      color: "#737576",
      textTransform: "uppercase",
      fontSize: "450%",
      fontWeight: "900",
      lineHeight: "1",
      letterSpacing: "5px",
    },

    ccrt__sponsor__button: {
      position: "relative",
      minHeight: "15vh",
      //   minWidth: "100%",
      overflow: "hidden",
      //   background: "red",
    },
  })
);
export default Sponsor;
