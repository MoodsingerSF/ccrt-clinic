import React from "react";
import Head from "next/head";
import { Grid } from "@mui/material";
import { useStyles } from "../styles/loginstyles";

const login = () => {
  const classes = useStyles();

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Grid container justifyContent="center" alignItems="center">
        <Grid
          container
          className={classes.ccrt__login__container}
          // style={{ background: "red", width: "50%" }}
        >
          <h2>Login</h2>
        </Grid>
      </Grid>
    </>
  );
};

export default login;
