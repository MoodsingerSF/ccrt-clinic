import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const ForbiddenComponent = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      style={{ height: "100vh" }}
      justifyContent="center"
      alignItems={"center"}
      flexDirection="column"
    >
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "300%",
          color: theme.palette.custom.BLACK,
        }}
      >
        403! Forbidden
      </Typography>
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "80%",
          color: theme.palette.custom.BLACK,
        }}
      >
        You are not allowed to view this page.
      </Typography>
    </Grid>
  );
};

export default ForbiddenComponent;
