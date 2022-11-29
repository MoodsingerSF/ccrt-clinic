import React, { useCallback, useMemo, useState } from "react";
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
// import { Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import logo from "../../public/image/logo/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";
import { APP_BAR_HEIGHT } from "../../misc/constants";
import DonationSection from "./DonationSection";
import SearchIcon from "@mui/icons-material/Search";
import dynamic from "next/dynamic";
import AppBarDeskTop from "./AppBarDeskTop";
import AppBarLink from "./AppBarLink";
import {
  getProfileImageUrl,
  isSignedIn,
} from "../../contexts/user-context/UserContextFunctions";
import ProfileMenu from "../menu/ProfileMenu";
const AppbarDrawer = dynamic(() => import("../drawer/AppbarDrawer"));

const AppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

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

  // }, [setOpenAppbarDrawer]);
  // console.log("app bar");
  const appBarDesktop = useMemo(() => <AppBarDeskTop />, []);
  return (
    <Grid
      container
      className={classes.ccrt_app_bar__container}
      style={{
        height: router.pathname === "/" ? "20vh" : APP_BAR_HEIGHT,
      }}
    >
      {router.pathname === "/" && <DonationSection />}
      {matches ? (
        <Grid container>
          <Grid item xs={2} className={classes.ccrt_app_bar__logo}>
            <Image src={logo} layout="fill" objectFit="contain" />
          </Grid>
          <Grid
            container
            justifyContent={"center"}
            alignItems="center"
            item
            xs={5}
          >
            <TextField
              className={classes.ccrt__home_page__search_field}
              size="small"
              placeholder="search doctor and blog"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" style={{ cursor: "pointer" }}>
                    <SearchIcon onClick={onSearch} />
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder },
              }}
              // onClick={() => {
              //   router.push("/search");
              // }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
          </Grid>

          {/* {isSignedIn() && (
            <Grid container alignItems="center" item xs={3}></Grid>
          )} */}
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            item
            xs
            // xs={8}
          >
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
      background: "#fff",
      borderRadius: "20px",
      boxShadow: "inset 0 0 5px rgba(0,0,0,0.5)",
      margin: "20px 0 20px 0",
    },
    noBorder: {
      border: "none",
    },
  })
);

export default AppBar;
