import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Grid, IconButton, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../public/image/logo/logo.png";
import profile from "../../public/image/profile/profile.png";
import SearchField from "../search-fields/SearchField";
import useMediaQuery from "@mui/material/useMediaQuery";
import DehazeIcon from "@mui/icons-material/Dehaze";
const CustomDrawer = dynamic(() => import("../drawer/CustomDrawer"));

const DashboardNavber = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Grid container className={classes.ccrt__dashboard__navbar}>
      {matchesMD ? (
        <Grid container justifyContent="start" alignItems="center" item sm={3}>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="center"
            className={classes.ccrt__dashboard__navbar__logo__container}
          >
            <Image src={logo} alt="logo" />
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ marginBottom: "10px" }}
        >
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            item
            xs={6}
          >
            <IconButton onClick={() => setIsDrawerOpen(true)}>
              <DehazeIcon />
            </IconButton>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              className={classes.ccrt__dashboard__navbar__logo__container}
            >
              <Image src={logo} alt="logo" />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            alignItems="center"
            item
            xs={6}
          >
            <Typography
              className={classes.ccrt__dashboard__navbar__profile__name}
            >
              Azizul Islam
            </Typography>
            <Grid
              className={
                classes.ccrt__dashboard__navbar__profile__image__container
              }
            >
              <Image src={profile} alt="profile" />
            </Grid>
          </Grid>
        </Grid>
      )}
      {matchesMD ? (
        <Grid container justifyContent="center" alignItems="center" item xs={6}>
          <SearchField placeholder="Search..." />
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
        >
          <SearchField placeholder="Search..." />
        </Grid>
      )}
      {matchesMD ? (
        <Grid
          container
          justifyContent="flex-end"
          alignItems="center"
          item
          sm={3}
        >
          <Typography
            style={{ marginRight: "10px", fontSize: "90%", fontWeight: "600" }}
          >
            Azizul Islam
          </Typography>
          <Grid
            className={
              classes.ccrt__dashboard__navbar__profile__image__container
            }
          >
            <Image src={profile} alt="profile" />
          </Grid>
        </Grid>
      ) : null}
      <CustomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__navbar: {
    padding: "10px 0",
  },
  ccrt__dashboard__navbar__logo__container: {
    width: "100px",
    height: "auto",
  },
  ccrt__dashboard__navbar__profile__name: {
    marginRight: "10px",
    fontSize: "90%",
    fontWeight: "600",
  },
  ccrt__dashboard__navbar__profile__image__container: {
    width: "50px",
    height: "auto",
    borderRadius: "50%",
  },
});

export default DashboardNavber;
