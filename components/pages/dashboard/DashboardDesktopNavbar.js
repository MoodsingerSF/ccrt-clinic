import React from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../../public/image/logo/logo.png";
import profile from "../../../public/image/profile/profile.png";
import SearchField from "../../search-fields/SearchField";

const DashboardDesktopNavbar = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.ccrt__dashboard__navbar}>
      <Grid container justifyContent="start" alignItems="center" item sm={2}>
        <Grid
          container
          justifyContent="flex-start"
          alignItems="center"
          className={classes.ccrt__dashboard__navbar__logo__container}
        >
          <Image src={logo} alt="logo" />
        </Grid>
      </Grid>
      <Grid container justifyContent="center" alignItems="center" item xs={7}>
        <SearchField placeholder="Search..." />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" item sm={3}>
        <Typography className={classes.ccrt__dashboard__navbar__profile__name}>
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
    padding: "10px 0",
  },
  ccrt__dashboard__navbar__logo__container: {
    width: "90px",
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
export default DashboardDesktopNavbar;
