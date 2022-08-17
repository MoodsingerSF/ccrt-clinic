import React, { useContext } from "react";
import { useRouter } from "next/router";
import { Context } from "../../contexts/user-context/UserContext";
import NotFoundComponent from "../../components/misc/NotFoundComponent";
import { DASHBOARD_ROUTES } from "../../components/dashboard/Routes";
import ForbiddenComponent from "../../components/misc/ForbiddenComponent";
import DashboardWrapper from "../../components/dashboard/DashboardWrapper";
// import { Grid, Typography } from "@mui/material";

const Dashboard = () => {
  const { getRole } = useContext(Context);
  const router = useRouter();

  const getComponent = (route) => {
    if (typeof route !== "undefined" && route.length !== 1) return null;
    if (typeof route === "undefined") {
      // router.replace("/dashboard/profile");
      return DASHBOARD_ROUTES[0].path;
    }
    for (let r of DASHBOARD_ROUTES) {
      if (route[0] === r.path) {
        return r.allowedRoles.includes(getRole()) === true ? (
          <DashboardWrapper>{r.component}</DashboardWrapper>
        ) : (
          <ForbiddenComponent />
        );
      }
    }
    return <NotFoundComponent />;
  };

  return (
    <>
      {
        getComponent(router.query.route)
        // : null
        // <Grid
        //   container
        //   style={{ minHeight: "100vh" }}
        //   justifyContent="center"
        //   alignItems={"center"}
        // >
        //   <Typography>loading...</Typography>
        // </Grid>
      }
    </>
  );
};

export default Dashboard;
