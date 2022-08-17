import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Grid, useTheme } from "@mui/material";
import { useStyles } from "../../styles/dashBoardstyle";
import useMediaQuery from "@mui/material/useMediaQuery";
import DehazeIcon from "@mui/icons-material/Dehaze";
const DashboardSidebar = dynamic(() =>
  import("../../components/dashboard/DashboardSidebar")
);
import Overview from "../../components/dashboard/Overview";
import DoctorsRequest from "../../components/dashboard/DoctorsRequest";
// import DashboardNavber from "../../components/dashboard/DashboardNavber";
import CreateNewAdmin from "../../components/dashboard/CreateNewAdmin";
import DashboardBlogs from "../../components/dashboard/DashboardBlogs";
import DashboardProfile from "../../components/dashboard/DashboardProfile";
import DoctorTimeSlot from "../../components/dashboard/doctor/DoctorTimeSlot";
import CustomDrawer from "../../components/drawer/CustomDrawer";
import BlogRequest from "../../components/dashboard/blog-request/BlogRequest";

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();

  const getComponent = (route) => {
    // console.log(route);
    if (typeof route !== "undefined" && route.length !== 1) return null;
    if (typeof route === "undefined" || route[0] === "user-profile") {
      return <DashboardProfile />;
    } else if (route[0] === "overview") {
      return <Overview />;
    } else if (route[0] === "doctor-request") {
      return <DoctorsRequest />;
    } else if (route[0] === "create-new-admin") {
      return <CreateNewAdmin />;
    } else if (route[0] === "user-blogs") {
      return <DashboardBlogs />;
    } else if (route[0] === "time-schedule") {
      return <DoctorTimeSlot />;
    } else if (route[0] === "blog-request") {
      return <BlogRequest />;
    }
  };
  // useEffect(() => {
  //   setOptopnTitle("Dashboard");
  // }, []);

  return (
    <Grid container className={classes.ccrt__dashboard__container}>
      {matchesMD ? (
        <>
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            item
            xs={2}
          >
            <Grid
              container
              item
              xs={2}
              className={classes.ccrt__dashboard__left__container}
            >
              <DashboardSidebar />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            alignItems="flex-start"
            item
            xs={10}
            className={classes.ccrt__dashboard__right__container}
          >
            <Grid container item>
              {getComponent(router.query.route)}
            </Grid>
          </Grid>
        </>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          item
          xs={12}
          className={classes.ccrt__dashboard__right__container}
        >
          <Grid container item>
            <Grid container style={{ zIndex: "99" }}>
              <DehazeIcon onClick={() => setIsDrawerOpen(true)} />
            </Grid>
            {getComponent(router.query.route)}
          </Grid>
        </Grid>
      )}
      <CustomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </Grid>
  );
};

export default Dashboard;
