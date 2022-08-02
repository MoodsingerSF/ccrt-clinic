import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "../../styles/dashBoardstyle";
// import classNames from "classnames";
import useMediaQuery from "@mui/material/useMediaQuery";
// import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
const DashboardSidebar = dynamic(() =>
  import("../../components/dashboard/DashboardSidebar")
);
import Overview from "../../components/dashboard/Overview";
import DoctorsRequest from "../../components/dashboard/DoctorsRequest";
import DashboardNavber from "../../components/dashboard/DashboardNavber";
import CreateNewAdmin from "../../components/dashboard/CreateNewAdmin";
// import CustomDrawer from "../../components/drawer/CustomDrawer";

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const router = useRouter();

  const getComponent = (route) => {
    console.log(route);
    if (typeof route !== "undefined" && route.length !== 1) return null;
    if (typeof route === "undefined" || route[0] === "overview") {
      return <Overview />;
    } else if (route[0] === "doctor-request") {
      return <DoctorsRequest />;
    } else if (route[0] === "create-new-admin") {
      return <CreateNewAdmin />;
    }
  };
  // useEffect(() => {
  //   setOptopnTitle("Dashboard");
  // }, []);

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
            xs={3}
            className={classes.ccrt__dashboard__left__container}
          >
            <DashboardSidebar />
          </Grid>
        ) : null}

        {matchesMD ? (
          <Grid container>
            <Grid container item xs={3}></Grid>
            <Grid
              container
              alignItems="flex-start"
              item
              xs={9}
              className={classes.ccrt__dashboard__right__container}
            >
              <Grid container item xs={12}>
                <DashboardNavber />
                {getComponent(router.query.route)}
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
              <DashboardNavber />
              {getComponent(router.query.route)}
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Dashboard;
