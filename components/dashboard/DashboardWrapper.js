import React from "react";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "../../styles/dashBoardstyle";
import dynamic from "next/dynamic";
import useMediaQuery from "@mui/material/useMediaQuery";
import { APP_BAR_HEIGHT } from "../../misc/constants";
// import DashboardNavbar from "./DashboardNavbar";
const DashboardSidebar = dynamic(() =>
  import("../../components/dashboard/DashboardSidebar")
);
// eslint-disable-next-line react/prop-types
const DashboardWrapper = ({ children, routeName }) => {
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
            <DashboardSidebar routeName={routeName} />
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
            justifyContent="center"
            item
            xs={12}
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              item
              style={{ width: "95%", marginTop: APP_BAR_HEIGHT }}
            >
              {children}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default DashboardWrapper;
