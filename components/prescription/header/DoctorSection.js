import React from "react";
import { Grid, Typography } from "@mui/material";
import theme from "../../../themes/theme";

const DoctorSection = () => {
  return (
    <>
      <Typography
        variant="h6"
        gutterBottom
        style={{
          textTransform: "uppercase",
          color: `${theme.palette.custom.HEADING}`,
        }}
      >
        Doctor's section
      </Typography>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="flex-start"
      >
        <Typography variant="h6" style={{ textTransform: "capitalize" }}>
          Doctor name
        </Typography>
        <Typography style={{ fontSize: "90%", fontWeight: "500" }}>
          Doctor department
        </Typography>
      </Grid>
    </>
  );
};

export default DoctorSection;
