import React from "react";
import { Grid, useTheme } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import dynamic from "next/dynamic";
import useMediaQuery from "@mui/material/useMediaQuery";
import { APP_BAR_HEIGHT, MODAL_APP_BAR_HEIGHT } from "../../misc/constants";
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

const useStyles = makeStyles((theme) =>
  createStyles({
    ccrt__dashboard__container: {
      position: "relative",
    },
    ccrt__dashboard__left__container: {
      minHeight: "100vh",
      background: theme.palette.custom.BLACK,
      position: "fixed",
      top: "12%",
      overflowY: "scroll",
      /* Hide scrollbar for IE, Edge and Firefox */
      "-ms-overflow-style": "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,

      /* Hide scrollbar for Chrome, Safari and Opera */
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
    ccrt__dashboard__right__container: {
      padding: `${MODAL_APP_BAR_HEIGHT} 20px 0px 20px`,
    },
  })
);

export default DashboardWrapper;
