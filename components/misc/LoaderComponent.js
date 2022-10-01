import { Grid } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/animations/fourdotsloaderblack.json";
const LoaderComponent = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ width: "100%" }}
    >
      <Lottie
        animationData={animationData}
        style={{ width: 140, height: 140 }}
      ></Lottie>
    </Grid>
  );
};

export default LoaderComponent;
