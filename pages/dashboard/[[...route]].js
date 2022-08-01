import React, { useState } from "react";
import { useRouter } from "next/router";
import { Grid } from "@mui/material";
import { useStyles } from "../../styles/dashBoardstyle";
import DashboardSidebar from "../../components/dashboard/DashboardSidebar";
import Overview from "../../components/dashboard/Overview";
import DoctorsRequest from "../../components/dashboard/DoctorsRequest";
import DashboardNavber from "../../components/dashboard/DashboardNavber";
import CreateNewAdmin from "../../components/dashboard/CreateNewAdmin";

const Dashboard = () => {
  const classes = useStyles();

  const router = useRouter();

  const [optionTitle, setOptopnTitle] = useState("Dashboard");
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
        <Grid
          container
          justifyContent="start"
          alignItems="start"
          item
          xs={12}
          md={3}
          className={classes.ccrt__dashboard__left__container}
        >
          <DashboardSidebar setOptopnTitle={setOptopnTitle} />
        </Grid>
        <Grid
          // container
          item
          xs={12}
          md={9}
          // justifyContent="start"
          // alignItems="start"
          className={classes.ccrt__dashboard__right__container}
        >
          <Grid container item xs={12}>
            <DashboardNavber />
          </Grid>
          {getComponent(router.query.route)}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
