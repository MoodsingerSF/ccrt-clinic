import { Avatar, Grid, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
// import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
// import logo from "../../public/image/logo/logo.png";
import AppBarLink from "./AppBarLink";
import { Context } from "../../contexts/user-context/UserContext";
import ProfileMenu from "../menu/ProfileMenu";
const AppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const { isSignedIn } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.app_bar_container}
    >
      <Grid
        container
        justifyContent="space-between"
        className={classes.app_bar_content_container}
      >
        <Grid item xs={2} className={classes.image_container}>
          {/* <Image src={logo} layout="fill" objectFit="contain"></Image> */}
        </Grid>
        <Grid
          item
          xs={2}
          container
          justifyContent={"center"}
          alignItems="center"
        >
          {!isSignedIn() && (
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
          )}
        </Grid>
        <Grid container alignItems="center" item xs={4}></Grid>
        <Grid container alignItems="center" item xs={4}>
          <AppBarLink name="Home" link="/" />
          <AppBarLink name="Blogs" link="/blogs" />
          {!isSignedIn() && <AppBarLink name="Login" link="/login" />}
          <AppBarLink name="Contact" link="/" />
          <AppBarLink name="FAQ" link="/" />
          {isSignedIn() && (
            <Avatar
              className={classes.avatar}
              onClick={handleProfileClick}
            ></Avatar>
          )}
          {open && (
            <ProfileMenu
              open={open}
              onClose={handleProfileClose}
              anchorEl={anchorEl}
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    app_bar_container: {
      position: "fixed",
      top: "0",
      background: "#fff",
      zIndex: "1",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },
    app_bar_content_container: {
      height: "12vh",
      width: "95%",
    },
    image_container: {
      position: "relative",
      margin: "5px 0px",
    },
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
    avatar: {
      border: `1px dashed ${theme.palette.primary.main}`,
      cursor: "pointer",
    },
  })
);

export default AppBar;
