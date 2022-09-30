import React, { useEffect, useState } from "react";
import { Grid, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";

const RatingField = ({ title, maxValue, setRatings, ratings, id }) => {
  const [rating, setRating] = useState(0);
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitRatingObj = () => {
    const ratingItem = {
      criteriaId: id,
      rating: Number(rating),
    };
    if (ratings.find((item) => item.criteriaId === id)) {
      const newArr = ratings.map((obj) => {
        if (obj.criteriaId === id) {
          return { ...obj, rating: ratingItem.rating };
        }
        return obj;
      });
      setRatings(newArr);
    }
  };

  useEffect(() => {
    handleSubmitRatingObj();
  }, [rating]);
  return (
    <Grid container flexDirection={"column"}>
      <Typography style={{ fontSize: "90%", marginBottom: "5px" }}>
        {title}
      </Typography>
      <Grid container flexDirection="row" justifyContent={"space-between"}>
        <Rating
          size="medium"
          value={rating}
          onChange={handleRating}
          precision={0.5}
        />
        <Typography>
          {rating}/{maxValue}
        </Typography>
      </Grid>
    </Grid>
  );
};

RatingField.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
  setRatings: PropTypes.func.isRequired,
  ratings: PropTypes.array.isRequired,
};
export default RatingField;
