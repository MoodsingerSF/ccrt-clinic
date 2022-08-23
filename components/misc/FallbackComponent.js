import { Grid } from "@mui/material";
import React from "react";
import Lottie from "lottie-react";
import animationData from "../../public/animations/loading5.json";
const FallbackComponent = () => {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Lottie
        animationData={animationData}
        style={{ width: 80, height: 80 }}
      ></Lottie>
    </Grid>
  );
};

export default FallbackComponent;
