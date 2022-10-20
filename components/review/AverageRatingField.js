import React from "react";
import { Grid, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";
const AverageRatingField = ({ value, title, maxValue }) => {
  return (
    <Grid container flexDirection={"column"}>
      <Typography style={{ fontSize: "90%", marginBottom: "5px" }}>
        {title}
      </Typography>
      <Grid container flexDirection="row" justifyContent={"space-between"}>
        <Rating size="medium" value={value} precision={0.5} />
        <Typography>
          {value}/{maxValue}
        </Typography>
      </Grid>
    </Grid>
  );
};

AverageRatingField.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  maxValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AverageRatingField;
