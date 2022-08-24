import { Grid, Typography } from "@mui/material";
import React from "react";

const ForbiddenComponent = () => {
  return (
    <Grid
      container
      style={{ height: "100vh" }}
      justifyContent="center"
      alignItems={"center"}
      flexDirection="column"
    >
      <Typography style={{ fontWeight: "bold", fontSize: "300%" }}>
        403! Forbidden
      </Typography>
      <Typography style={{ fontWeight: "bold", fontSize: "80%" }}>
        You are not allowed to view this page.
      </Typography>
    </Grid>
  );
};

export default ForbiddenComponent;
