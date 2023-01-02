import React from "react";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AverageRatingField from "../review/AverageRatingField";
import PropTypes from "prop-types";

const ReviewModal = ({ onNegativeFeedback, averageRatings }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={true}
      onClose={onNegativeFeedback}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogContent>
        <Grid container justifyContent="center" alignItems="center">
          <Grid
            container
            style={{ width: "95%" }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography className={classes.ccrt__patient_review__header}>
              Patient Reviews
            </Typography>
            <Grid container>
              {averageRatings.length === 0 ? (
                <Typography>There is no rating to given</Typography>
              ) : (
                averageRatings.map((item, index) => (
                  <AverageRatingField
                    key={index}
                    title={item.ratingCriteria.title}
                    value={item.rating}
                    maxValue={item.ratingCriteria.maxValue}
                  />
                ))
              )}
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

const useStyles = makeStyles(() => ({
  ccrt__patient_review__header: {
    fontSize: "120%",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "20px",
  },
  ccrt_overall_review__text: {
    fontWeight: "500",
    fontSize: "105%",
  },
  ccrt__overall_review__span: {
    margin: "0 10px",
    fontSize: "100%",
    fontWeight: "300",
  },
}));

ReviewModal.propTypes = {
  onNegativeFeedback: PropTypes.func.isRequired,
  averageRatings: PropTypes.array.isRequired,
};

export default ReviewModal;
