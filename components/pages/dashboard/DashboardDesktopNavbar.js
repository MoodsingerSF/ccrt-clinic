import React, { useContext } from "react";
import Image from "next/image";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import logo from "../../../public/image/logo/logo.png";
import SearchField from "../../search-fields/SearchField";
import { Context } from "../../../contexts/user-context/UserContext";

const DashboardDesktopNavbar = () => {
  const classes = useStyles();
  const { getFullName, getProfileImageUrl } = useContext(Context);
  return (
    <Grid container className={classes.ccrt__dashboard__navbar}>
      <Grid
        container
        item
        sm={2}
        justifyContent="flex-start"
        alignItems="center"
        className={classes.ccrt__dashboard__navbar__logo__container}
      >
        <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
      </Grid>
      <Grid container justifyContent="center" alignItems="center" item xs={7}>
        <SearchField placeholder="Search..." />
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" item sm={3}>
        <Typography className={classes.ccrt__dashboard__navbar__profile__name}>
          {getFullName()}
        </Typography>
        <Grid
          className={classes.ccrt__dashboard__navbar__profile__image__container}
        >
          {getProfileImageUrl() && (
            <Image
              loader={({ url }) => url}
              src={getProfileImageUrl()}
              alt="profile"
            />
          )}
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
    position: "relative",
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
