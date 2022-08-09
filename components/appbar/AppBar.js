import { Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import logo from "../../public/image/logo/logo.png";
import AppBarLink from "./AppBarLink";
const AppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Grid
      container
      justifyContent="space-between"
      style={{
        height: "12vh",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      }}
    >
      <Grid item xs={2} style={{ position: "relative", margin: "5px 0px" }}>
        <Image src={logo} layout="fill" objectFit="contain"></Image>
      </Grid>
      <Grid item xs={2} container justifyContent={"center"} alignItems="center">
        <Grid container justifyContent={"center"} alignItems="center">
          <Typography
            className={classes.sign_up_title}
          >{`Haven't registered yet?`}</Typography>
          <Typography
            className={classes.sign_up_button_style}
            onClick={() => {
              router.push("/signup");
            }}
          >
            Register Now
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" item xs={4}></Grid>
      <Grid container alignItems="center" item xs={4}>
        <AppBarLink name="Home" link="/" />
        <AppBarLink name="Blogs" link="/blogs" />
        <AppBarLink name="Login" link="/login" />
        <AppBarLink name="Contact" link="/login" />
        <AppBarLink name="FAQ" link="/login" />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    sign_up_title: {
      fontSize: "80%",
      fontWeight: "500",
    },
    sign_up_button_style: {
      background: theme.palette.primary.main_minus_2,
      color: "white",
      padding: "5px 20px",
      fontSize: "80%",
      fontWeight: 500,
      cursor: "pointer",
      borderRadius: 30,
      transition: "background .2s",
      "&:hover": {
        background: theme.palette.primary.main,
      },
    },
  })
);

export default AppBar;
