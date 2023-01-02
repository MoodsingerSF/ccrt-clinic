import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import React from "react";

const NotFoundComponent = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      style={{ height: "100vh" }}
      justifyContent="center"
      alignItems={"center"}
    >
      <Typography
        style={{
          fontWeight: "bold",
          fontSize: "300%",
          color: theme.palette.custom.BLACK,
        }}
      >
        404! Not Found
      </Typography>
    </Grid>
  );
};

export default NotFoundComponent;
