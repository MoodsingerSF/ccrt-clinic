import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Grid, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const DashboardDesktopNavbar = dynamic(() =>
  import("../pages/dashboard/DashboardDesktopNavbar")
);
const DashboardMobileNavbar = dynamic(() =>
  import("../pages/dashboard/DashboardMobileNavbar")
);
const CustomDrawer = dynamic(() => import("../drawer/CustomDrawer"));

const DashboardNavber = () => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.up("md"));

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Grid container className={classes.ccrt__dashboard__navbar}>
      {matchesMD ? (
        <DashboardDesktopNavbar />
      ) : (
        <DashboardMobileNavbar setIsDrawerOpen={setIsDrawerOpen} />
      )}

      <CustomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__dashboard__navbar: {
    padding: "10px 0",
  },
});

export default DashboardNavber;
