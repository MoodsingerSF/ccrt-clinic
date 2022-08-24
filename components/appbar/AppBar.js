import React, { useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import logo from "../../public/image/logo/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";
import AppbarDrawer from "../drawer/AppbarDrawer";
import AppBarLink from "./AppBarLink";

import { Context } from "../../contexts/user-context/UserContext";
import ProfileMenu from "../menu/ProfileMenu";

const AppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const { isSignedIn } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const [openAppbarDrawer, setOpenAppbarDrawer] = useState(false);

  const appbarDrawerOpen = () => {
    setOpenAppbarDrawer(true);
  };
  const appbarDrawerClose = () => {
    setOpenAppbarDrawer(false);
  };

  return (
    <Grid container className={classes.ccrt_app_bar__container}>
      {matches ? (
        <Grid container>
          <Grid item xs={2} className={classes.ccrt_app_bar__logo}>
            <Image src={logo} layout="fill" objectFit="contain" />
          </Grid>
          <Grid container alignItems="center" item xs={2}></Grid>
          <Grid container alignItems="center" item xs={6}>
            <AppBarLink name="Home" link="/" />
            <AppBarLink name="Departments" link="/" />
            <AppBarLink name="Product&Service" link="/" />
            <AppBarLink name="Blogs" link="/blogs" />
            <AppBarLink name="Contact" link="/contact" />
            <AppBarLink name="FAQ" link="/faq" />

            {!isSignedIn() && <AppBarLink name="Login" link="/login" />}
          </Grid>
          <Grid
            item
            xs={2}
            container
            justifyContent={"center"}
            alignItems="center"
          >
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
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="space-between"
          style={{ padding: "0 20px" }}
        >
          <Grid container item xs={2} className={classes.ccrt_app_bar__logo}>
            <Image
              src={logo}
              layout="fill"
              objectFit="contain"
              onClick={() => {
                router.push("/");
              }}
            />
          </Grid>
          <Grid container item xs={2} justifyContent="flex-end">
            <IconButton
              size="large"
              color="inherit"
              aria-label="menu"
              onClick={appbarDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      <AppbarDrawer open={openAppbarDrawer} onClose={appbarDrawerClose} />
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt_app_bar__container: {
      height: "12vh",
      background: "#fff",
      zIndex: 1,
      position: "fixed",
      boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    },
    ccrt_app_bar__logo: {
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
