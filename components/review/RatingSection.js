import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import RatingField from "./RatingField";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import {
  postUserRating,
  retrieveUserRatingGivenToDoctor,
  updateUserRating,
} from "../../controllers/RatingController";
import CustomButton from "../button/CustomButton";
import CustomSnackbar from "../snackbar/CustomSnackbar";
import { SNACKBAR_INITIAL_STATE } from "../../misc/constants";
import { handleSnackbarClose, handleSnackbarOpen } from "../../misc/functions";
import LoaderComponent from "../misc/LoaderComponent";

const RatingSection = ({ doctorId }) => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState(SNACKBAR_INITIAL_STATE);
  const [isRatingAlreadyGiven, setIsRatingAlreadyGiven] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const handleRetrieveUserRatingGivenToDoctor = async () => {
    try {
      setInitialLoading(true);
      const { isRatingAlreadyGiven: isRatingAlreadyGivenTemp, data } =
        await retrieveUserRatingGivenToDoctor(doctorId);
      setRatings(data);
      setIsRatingAlreadyGiven(isRatingAlreadyGivenTemp);
      setInitialLoading(false);
    } catch (error) {
      setInitialLoading(false);
    }
  };

  const handleSubmitRating = async () => {
    try {
      setLoading(true);
      await postUserRating(doctorId, ratings);
      setLoading(false);
      openSnackbar("Rating has been added successfully.");
    } catch (error) {
      setLoading(false);
      openSnackbar("Rating couldn't be added.");
    }
  };

  const handleUpdateRating = async () => {
    try {
      setLoading(true);
      await updateUserRating(doctorId, ratings);
      setLoading(false);
      openSnackbar("Rating has been updated successfully.");
    } catch (error) {
      setLoading(false);
      openSnackbar("Rating couldn't be updated.");
    }
  };
  const openSnackbar = (message) => {
    handleSnackbarOpen(message, setSnackbar);
  };

  useEffect(() => {
    handleRetrieveUserRatingGivenToDoctor();
  }, []);
  return (
    <Grid container className={classes.ccrt__rating__section}>
      {initialLoading ? (
        <LoaderComponent />
      ) : (
        <>
          {ratings.map((item) => (
            <RatingField
              key={item.id}
              id={item.id}
              title={item.title}
              maxValue={item.maxValue}
              ratingValue={item.rating}
              setRatings={setRatings}
              ratings={ratings}
            />
          ))}
          <Grid
            container
            justifyContent={"flex-end"}
            style={{ marginTop: "10px" }}
          >
            <CustomButton
              title={isRatingAlreadyGiven ? "Update" : "Submit"}
              size="small"
              loading={loading}
              fullWidth
              variant="contained"
              onClick={
                isRatingAlreadyGiven ? handleUpdateRating : handleSubmitRating
              }
            />
          </Grid>
        </>
      )}

      <CustomSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={() => handleSnackbarClose(setSnackbar)}
      />
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt__rating__section: {
    borderRadius: "3px",
    padding: "10px",
    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  },
});

RatingSection.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

export default RatingSection;
