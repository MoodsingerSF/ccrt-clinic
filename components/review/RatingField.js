import React, { useEffect, useState } from "react";
import { Grid, Rating, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/styles";

const RatingField = ({
  title,
  maxValue,
  setRatings,
  ratings,
  id,
  ratingValue,
}) => {
  const theme = useTheme();
  const [rating, setRating] = useState(ratingValue);
  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleSubmitRatingObj = () => {
    const newArr = ratings.map((obj) => {
      if (obj.id === id) {
        return { ...obj, rating: Number(rating) };
      } else return obj;
    });
    setRatings(newArr);
  };

  useEffect(() => {
    handleSubmitRatingObj();
  }, [rating]);
  return (
    <Grid container flexDirection={"column"}>
      <Typography
        style={{
          fontSize: "85%",
          marginBottom: "5px",
          color: theme.palette.custom.BLACK,
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Grid container flexDirection="row" justifyContent={"space-between"}>
        <Rating
          size="medium"
          value={rating}
          onChange={handleRating}
          precision={0.1}
        />
        <Typography
          style={{
            fontSize: "85%",
            marginBottom: "5px",
            color: theme.palette.custom.BLACK,
            fontWeight: 500,
          }}
        >
          {rating ? rating : 0}/{maxValue}
        </Typography>
      </Grid>
    </Grid>
  );
};

RatingField.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maxValue: PropTypes.number.isRequired,
  ratingValue: PropTypes.number.isRequired,

  setRatings: PropTypes.func.isRequired,
  ratings: PropTypes.array.isRequired,
};
export default RatingField;
