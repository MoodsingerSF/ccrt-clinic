import React from "react";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "../../styles/dashBoardstyle";
import dynamic from "next/dynamic";
import useMediaQuery from "@mui/material/useMediaQuery";
// import DashboardNavbar from "./DashboardNavbar";
const DashboardSidebar = dynamic(() =>
  import("../../components/dashboard/DashboardSidebar")
);
// eslint-disable-next-line react/prop-types
const DashboardWrapper = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.ccrt__dashboard__section}
    >
      <Grid container className={classes.ccrt__dashboard__container}>
        {matchesMD ? (
          <Grid
            container
            alignItems="flex-start"
            item
            xs={2}
            className={classes.ccrt__dashboard__left__container}
          >
            <DashboardSidebar />
          </Grid>
        ) : null}

        {matchesMD ? (
          <Grid container>
            <Grid container item xs={2}></Grid>
            <Grid
              container
              alignItems="flex-start"
              item
              xs={10}
              className={classes.ccrt__dashboard__right__container}
            >
              <Grid container item xs={12}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            alignItems="flex-start"
            item
            xs={12}
            className={classes.ccrt__dashboard__right__container}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              item
              xs={12}
            >
              {/* <DashboardNavbar /> */}

              {children}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default DashboardWrapper;
