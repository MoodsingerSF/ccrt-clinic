import React, { useCallback, useContext, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  Avatar,
  TextField,
  InputAdornment,
} from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import logo from "../../public/image/logo/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";
import { APP_BAR_HEIGHT } from "../../misc/constants";
import DonationSection from "./DonationSection";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from "next/dynamic";
import AppBarLink from "./AppBarLink";

import ProfileMenu from "../menu/ProfileMenu";
import { Context } from "../../contexts/user-context/UserContext";
const AppbarDrawer = dynamic(() => import("../drawer/AppbarDrawer"));

const AppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const { isSignedIn, getProfileImageUrl } = useContext(Context);
  const [openAppbarDrawer, setOpenAppbarDrawer] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const appbarDrawerOpen = () => {
    setOpenAppbarDrawer(true);
  };
  const appbarDrawerClose = useCallback(() => {
    setOpenAppbarDrawer(false);
  });
  const onSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        keyword: searchText,
      },
    });
  };

  return (
    <Grid
      container
      className={classes.ccrt_app_bar__container}
      style={
        {
          // height: router.pathname === "/" ? "20vh" : APP_BAR_HEIGHT,
          // background: "red",
        }
      }
      alignItems="center"
      justifyContent={"center"}
    >
      {router.pathname === "/" && <DonationSection />}
      {matches ? (
        <Grid container style={{ height: APP_BAR_HEIGHT }}>
          <Grid
            item
            xs={2}
            container
            style={{ position: "relative", margin: "12px 0px" }}
          >
            <Image
              src={logo}
              layout="fill"
              objectFit="contain"
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            />
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            item
            xs={3}
            // style={{ background: "red" }}
          >
            <TextField
              className={classes.ccrt__home_page__search_field}
              size="small"
              placeholder="Search Doctor and Blog"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    <SearchIcon onClick={onSearch} />
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder },
              }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
          </Grid>

          <Grid container justifyContent="center" alignItems="center" item xs>
            <AppBarLink name="Home" link="/" />
            <AppBarLink name="Doctors" link="/doctors" />
            <AppBarLink name="Blogs" link="/blogs" />
            <AppBarLink name="Contact" link="/contact-us" />
            <AppBarLink name="FAQ" link="/faq" />

            {!isSignedIn() && <AppBarLink name="Login" link="/login" />}

            {isSignedIn() && (
              <Avatar
                className={classes.avatar}
                onClick={handleProfileClick}
                src={"/" + getProfileImageUrl()}
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
              <Grid
                item
                xs={3}
                container
                flexDirection="column"
                justifyContent={"center"}
                alignItems="center"
              >
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
        // appBarDesktop
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
          <Grid
            container
            item
            xs={2}
            justifyContent="flex-end"
            alignItems={"center"}
          >
            <IconButton color="primary" onClick={appbarDrawerOpen}>
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
      )}
      {openAppbarDrawer && (
        <AppbarDrawer open={openAppbarDrawer} onClose={appbarDrawerClose} />
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt_app_bar__container: {
      background: "#fff",
      zIndex: 99,
      position: "fixed",
      top: 0,
      left: 0,
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
      marginRight: "2.5vw",
      border: `1px dashed ${theme.palette.primary.main}`,
      cursor: "pointer",
      marginLeft: 10,
    },
    ccrt__home_page__search_field: {
      width: "80%",
      background: "#fff",
      // borderRadius: 100,
      // boxShadow: "inset 0 0 5px rgba(0,0,0,0.1)",
      fontSize: "85%",
    },
    noBorder: {
      border: `1px solid ${theme.palette.custom.BLACK}`,
      borderRadius: 100,
      // border: "none",
    },
  })
);

export default AppBar;
