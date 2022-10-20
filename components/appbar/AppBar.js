import React, { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Grid, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

import logo from "../../public/image/logo/logo2.png";
import MenuIcon from "@mui/icons-material/Menu";
import { APP_BAR_HEIGHT } from "../../misc/constants";
import DonationSection from "./DonationSection";
import dynamic from "next/dynamic";
import AppBarDeskTop from "./AppBarDeskTop";
const AppbarDrawer = dynamic(() => import("../drawer/AppbarDrawer"));

const AppBar = () => {
  const classes = useStyles();
  const router = useRouter();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [openAppbarDrawer, setOpenAppbarDrawer] = useState(false);

  const appbarDrawerOpen = () => {
    setOpenAppbarDrawer(true);
  };
  const appbarDrawerClose = useCallback(() => {
    setOpenAppbarDrawer(false);
  }, [setOpenAppbarDrawer]);
  console.log("app bar");
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
        appBarDesktop
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
      {openAppbarDrawer && (
        <AppbarDrawer open={openAppbarDrawer} onClose={appbarDrawerClose} />
      )}
    </Grid>
  );
};

const useStyles = makeStyles(() =>
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
  })
);

export default AppBar;
