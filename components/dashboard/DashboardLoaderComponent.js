import { Grid } from "@mui/material";
import React from "react";
import LoaderComponent from "../misc/LoaderComponent";

const DashboardLoaderComponent = () => {
  return (
    <Grid container alignItems="center" style={{ height: "80vh" }}>
      <LoaderComponent />
    </Grid>
  );
};

export default DashboardLoaderComponent;
