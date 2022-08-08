import React from "react";
import Image from "next/image";
import DehazeIcon from "@mui/icons-material/Dehaze";
import classNames from "classnames";
import PropTypes from "prop-types";
import SearchField from "../../search-fields/SearchField";
import {
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import logo from "../../../public/image/logo/logo.png";
import profile from "../../../public/image/profile/profile.png";
import { makeStyles } from "@mui/styles";

const DashboardMobileNavbar = ({ setIsDrawerOpen }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesTablet = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid
        container
        justifyContent="flex-start"
        alignItems="center"
        item
        xs={6}
      >
        <IconButton onClick={() => setIsDrawerOpen(true)}>
          <DehazeIcon />
        </IconButton>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classNames({
            [classes.ccrt__dashboard__navbar__logo__container__mobile]:
              !matchesTablet,
            [classes.ccrt__dashboard__navbar__logo__container__tablet]:
              matchesTablet,
          })}
        >
          <Image src={logo} alt="logo" />
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" alignItems="center" item xs={6}>
        <Typography
          className={classNames({
            [classes.ccrt__dashboard__navbar__profile__name__mobile]:
              !matchesTablet,
            [classes.ccrt__dashboard__navbar__profile__name__tablet]:
              matchesTablet,
          })}
        >
          Azizul Islam
        </Typography>
        <Grid
          container
          justifyContent="flex-end"
          className={classNames({
            [classes.ccrt__dashboard__navbar__profile__image__container__mobile]:
              !matchesTablet,
            [classes.ccrt__dashboard__navbar__profile__image__container__tablet]:
              matchesTablet,
          })}
        >
          <Image src={profile} alt="profile" />
        </Grid>
      </Grid>
      <Grid container mt={1}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
        >
          <SearchField placeholder="Search..." />
        </Grid>
      </Grid>
    </Grid>
  );
};
const useStyles = makeStyles({
  ccrt__dashboard__navbar__logo__container__mobile: {
    width: "60px",
    height: "auto",
  },
  ccrt__dashboard__navbar__logo__container__tablet: {
    width: "70px",
    height: "auto",
  },
  ccrt__dashboard__navbar__profile__name__mobile: {
    marginRight: "5px",
    fontSize: "70%",
    fontWeight: "600",
  },
  ccrt__dashboard__navbar__profile__name__tablet: {
    marginRight: "5px",
    fontSize: "85%",
    fontWeight: "600",
  },
  ccrt__dashboard__navbar__profile__image__container__mobile: {
    width: "30px",
    height: "auto",
    borderRadius: "50%",
  },
  ccrt__dashboard__navbar__profile__image__container__tablet: {
    width: "40px",
    height: "auto",
    borderRadius: "50%",
  },
});

export default DashboardMobileNavbar;

DashboardMobileNavbar.propTypes = {
  setIsDrawerOpen: PropTypes.func,
};
