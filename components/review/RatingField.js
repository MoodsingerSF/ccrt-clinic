import React from "react";
import { Grid, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";

const RatingField = ({ title, value, onChange }) => {
  return (
    <Grid container flexDirection={"column"}>
      <Typography style={{ fontSize: "90%", marginBottom: "5px" }}>
        {title}
      </Typography>
      <Grid container flexDirection="row" justifyContent={"space-between"}>
        <Rating
          size="medium"
          value={value}
          onChange={onChange}
          precision={0.5}
        />
        <Typography>{value}/5</Typography>
      </Grid>
    </Grid>
  );
};

RatingField.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};
export default RatingField;
