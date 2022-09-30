import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import RatingField from "./RatingField";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import { getReatingCriteria } from "../../controllers/RatingController";
import CustomButton from "../button/CustomButton";

const RatingSection = ({
  ratings,
  setRatings,
  handleSubmitRating,
  loading,
}) => {
  const classes = useStyles();

  const [criteria, setCriteria] = useState([]);

  const handleRatingCriteria = async () => {
    try {
      const response = await getReatingCriteria();
      setCriteria(response.data);
      const newArr = response.data.map((item) => ({
        criteriaId: item.id,
        rating: 0,
      }));
      setRatings(newArr);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRatingCriteria();
  }, []);

  return (
    <Grid container className={classes.ccrt__rating__section}>
      {criteria.map((item) => (
        <RatingField
          key={item.id}
          id={item.id}
          title={item.title}
          maxValue={item.maxValue}
          setRatings={setRatings}
          ratings={ratings}
        />
      ))}
      <Grid container justifyContent={"flex-end"} style={{ marginTop: "10px" }}>
        <CustomButton
          title="Send"
          size="small"
          loading={loading}
          fullWidth
          variant="contained"
          onClick={handleSubmitRating}
        />
      </Grid>
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
  ratings: PropTypes.array.isRequired,
  setRatings: PropTypes.func.isRequired,
  handleSubmitRating: PropTypes.func,
  loading: PropTypes.bool.isRequired,
};

export default RatingSection;
