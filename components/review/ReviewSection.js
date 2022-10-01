import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CommentSection from "./CommentSection";
import RatingSection from "./RatingSection";
import { postUserRating } from "../../controllers/RatingController";

const ReviewSection = ({ doctorId }) => {
  const classes = useStyles();

  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmitRating = async () => {
    try {
      setLoading(true);
      await postUserRating(doctorId, ratings);
      setLoading(false);
      setIsRatingGiven(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2} className={classes.ccrt_comment__section}>
      <Grid item xs={12} lg={5}>
        <Typography className={classes.ccrt_comment__section__header}>
          0 ratings
        </Typography>
        <RatingSection
          ratings={ratings}
          setRatings={setRatings}
          handleSubmitRating={handleSubmitRating}
          loading={loading}
        />
      </Grid>
      <Grid item xs={12} lg={7}>
        <Typography className={classes.ccrt_comment__section__header}>
          {comments.length} comments
        </Typography>
        <CommentSection comments={comments} setComments={setComments} />
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles({
  ccrt_comment__section: {
    margin: "20px 0",
  },
  ccrt_comment__section__header: {
    fontSize: "100%",
    textTransform: "capitalize",
    marginBottom: "20px",
  },
});
export default ReviewSection;
