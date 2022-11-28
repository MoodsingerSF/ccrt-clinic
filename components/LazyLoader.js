import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { CircularProgress, Grid } from "@mui/material";
import { useTheme } from "@mui/styles";
const LazyLoader = ({ children }) => {
  const theme = useTheme();
  return (
    <Suspense
      fallback={
        <Grid
          item
          xs={12}
          container
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <CircularProgress
            size={"small"}
            style={{ color: theme.palette.custom.BLACK }}
          />
        </Grid>
      }
    >
      {children}
    </Suspense>
  );
};

LazyLoader.propTypes = {
  children: PropTypes.node,
};

export default LazyLoader;
