import React from "react";
import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Footer from "../components/footer/Footer";
export default function Home() {
  const classes = useStyles();
  return (
    <>
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
      <Footer />
    </>
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
