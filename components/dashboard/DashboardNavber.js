import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../public/image/logo/logo.png";
import profile from "../../public/image/profile/profile.png";
import SearchField from "../search-fields/SearchField";

const DashboardNavber = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ccrt__dashboard__navbar}>
      <Grid container justifyContent="start" alignItems="center" item sm={3}>
        <Grid
          container
          justifyContent="start"
          alignItems="center"
          className={classes.ccrt__dashboard__navbar__logo__container}
        >
          <Image src={logo} alt="logo" />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" item sm={6}>
        <SearchField placeholder="Search..." />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" item sm={3}>
        <Typography
          style={{ marginRight: "10px", fontSize: "90%", fontWeight: "600" }}
        >
          Azizul Islam
        </Typography>
        <Grid
          className={classes.ccrt__dashboard__navbar__profile__image__container}
        >
          <Image src={profile} alt="profile" />
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__navbar: {
    // background: "red",
    height: "80px",
    // When phone change it
  },
  ccrt__dashboard__navbar__logo__container: {
    width: "100px",
    // When phone change it
    height: "auto",
  },
  ccrt__dashboard__navbar__profile__image__container: {
    width: "50px",
    height: "auto",
    borderRadius: "50%",
  },
});

export default DashboardNavber;
