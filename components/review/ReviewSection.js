import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import RatingSection from "./RatingSection";
import PropTypes from "prop-types";
const ReviewSection = ({ doctorId }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes.ccrt_comment__section}>
      <Grid item xs={12} lg={5}>
        <RatingSection doctorId={doctorId} />
      </Grid>
    </Grid>
  );
};

ReviewSection.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  ccrt_comment__section: {
    margin: "20px 0",
  },
  // ccrt_comment__section__header: {
  //   fontSize: "100%",
  //   textTransform: "capitalize",
  //   marginBottom: "20px",
  // },
});
export default ReviewSection;
