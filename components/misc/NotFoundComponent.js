import { Grid, Typography } from "@mui/material";
import React from "react";

const NotFoundComponent = () => {
  return (
    <Grid
      container
      style={{ height: "100vh" }}
      justifyContent="center"
      alignItems={"center"}
    >
      <Typography style={{ fontWeight: "bold", fontSize: "300%" }}>
        404! Not Found
      </Typography>
    </Grid>
  );
};

export default NotFoundComponent;
