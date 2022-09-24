import React from "react";
import { Grid, Typography } from "@mui/material";
import theme from "../../../themes/theme";
import { prettyDate } from "../../../controllers/DateController";

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
      ></Typography>
      <Grid
        container
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems="flex-end"
      >
        <Typography style={{ fontSize: "90%", fontWeight: "500" }}>
          Date: {prettyDate(new Date())}
        </Typography>
      </Grid>
    </>
  );
};

export default DateSection;
