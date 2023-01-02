import { CircularProgress, Grid } from "@mui/material";
import React from "react";
// import Lottie from "lottie-react";
// import animationData from "../../public/animations/fourdotsloaderblack.json";
const LoaderComponent = () => {
  return (
    <Grid
      item
      xs={12}
      container
      justifyContent="center"
      alignItems="center"
      style={{ width: "100%" }}
    >
      <CircularProgress size={30} />
      {/* <Lottie
        animationData={animationData}
        style={{ width: 140, height: 140 }}
      ></Lottie> */}
    </Grid>
  );
};

export default LoaderComponent;
