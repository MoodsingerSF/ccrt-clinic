import React from "react";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import News from "../components/home-page/news/News";
import Doctor from "../components/home-page/doctor/Doctor";
import Review from "../components/home-page/review/Review";
import Sponsor from "../components/home-page/sponsor/Sponsor";
import Blog from "../components/home-page/blogs/Blog";
export default function Home() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid
        container
        justifyContent={"flex-end"}
        alignItems="center"
        style={{ minHeight: "88vh" }}
      >
        <Grid
          container
          item
          xs={4}
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          style={{ marginRight: 30 }}
        >
          <Grid
            item
            container
            flexDirection={"column"}
            alignItems="flex-end"
            justifyContent={"center"}
          >
            <Typography className={classes.cover_header_1}>Cancer</Typography>
            <Typography className={classes.cover_header_2}>support</Typography>
            <Typography className={classes.cover_sub_header}>
              is just
            </Typography>
            <Typography className={classes.cover_sub_header}>
              a click away
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <News />
      <Doctor />
      <Sponsor />
      <Review />
      <Blog />
    </Grid>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    cover_header_1: {
      color: theme.palette.grey[900],
      fontSize: "280%",
      fontWeight: "bold",
      padding: 0,
      margin: 0,
    },
    cover_header_2: {
      color: "black",
      fontSize: "260%",
      fontWeight: "bold",
      padding: 0,
      margin: 0,
    },
    cover_sub_header: {
      fontSize: "240%",
      fontWeight: "bold",
      color: theme.palette.grey[600],
      padding: 0,
      margin: 0,
    },
  })
);
