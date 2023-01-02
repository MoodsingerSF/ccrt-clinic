import { Grid, Typography } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/animations/no-data-found.json";
import PropTypes from "prop-types";
import { useTheme } from "@mui/styles";
const NoContentToShowComponent = ({ title = "No blogs to show." }) => {
  const theme = useTheme();
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "40vh" }}
    >
      <Grid container justifyContent="center" alignItems="center">
        <Lottie
          animationData={animationData}
          style={{ height: "40vh", width: "40vh" }}
        />
      </Grid>
      <Typography
        style={{
          fontSize: "100%",
          fontWeight: "bold",
          color: theme.palette.custom.BLACK,
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
};
NoContentToShowComponent.propTypes = {
  title: PropTypes.string,
};

export default NoContentToShowComponent;
