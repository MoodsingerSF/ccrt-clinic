import React, { memo } from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import sponsor from "../../../public/image/home-page/donate/sponsor.png";
import { makeStyles, createStyles } from "@mui/styles";
import { useRouter } from "next/router";

const Sponsor = () => {
  const classes = useStyes();
  const router = useRouter();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__sponsor__section}
    >
      <Grid container>
        <Grid
          item
          xs={12}
          sm={7}
          className={classes.ccrt__sponsor__description}
          container
          justifyContent={"center"}
          alignItems="center"
        >
          <Typography className={classes.ccrt__sponsor__description__first}>
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
              onClick={() => router.push("/donation-requests")}
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
      // minHeight: "50vh",
      padding: "30px 0px",
      background: "url(/image/home-page/donate/bg.png)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundAttachment: "fixed",
    },
    ccrt__sponsor__description: {
      zIndex: "3",
      display: "flex",
      flexDirection: "column",
      textAlign: "right",
    },
    ccrt__sponsor__description__first: {
      color: theme.palette.custom.BLACK,
      textTransform: "uppercase",
      fontSize: "250%",
      fontWeight: "900",
      lineHeight: "1.5",
    },
    ccrt__sponsor__description__second: {
      color: theme.palette.custom.BLACK,
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
export default memo(Sponsor);
