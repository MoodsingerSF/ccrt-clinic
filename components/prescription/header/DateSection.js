import React from "react";
import { Grid, Typography } from "@mui/material";
import theme from "../../../themes/theme";

const DateSection = () => {
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
        when patient visit
      </Typography>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="flex-end"
      >
        <Typography style={{ fontSize: "90%", fontWeight: "500" }}>
          time
        </Typography>
        <Typography style={{ fontSize: "90%", fontWeight: "500" }}>
          date
        </Typography>
      </Grid>
    </>
  );
};

export default DateSection;
