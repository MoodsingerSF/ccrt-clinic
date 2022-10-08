import { Grid } from "@mui/material";
import React from "react";

import LoaderComponent from "./LoaderComponent";
const FallbackComponent = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <LoaderComponent />
    </Grid>
  );
};

export default FallbackComponent;
